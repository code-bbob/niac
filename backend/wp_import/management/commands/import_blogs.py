"""
Usage:
    python manage.py import_blogs
    python manage.py import_blogs --skip-images
    python manage.py import_blogs --dry-run

Maps WordPress posts → Blog model.
Run import_teams first so author links work.
"""

from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.utils.dateparse import parse_datetime, parse_date
from pages.models import Blog, Team  # ← replace 'yourapp' with your app name
from wp_import.wp_api import fetch_all, download_image, get_rendered
import html


class Command(BaseCommand):
    help = "Import blog posts from WordPress REST API"

    def add_arguments(self, parser):
        parser.add_argument("--skip-images", action="store_true", help="Skip downloading featured images")
        parser.add_argument("--dry-run", action="store_true", help="Parse and print without saving")
        parser.add_argument("--status", default="publish", help="Post status to import (publish/draft/any)")

    def handle(self, *args, **options):
        skip_images = options["skip_images"]
        dry_run = options["dry_run"]
        status = options["status"]

        self.stdout.write("Fetching WordPress posts…")
        posts = fetch_all("posts", {"status": status, "_embed": 1})
        self.stdout.write(f"Found {len(posts)} post(s). Importing…\n")

        created = updated = skipped = 0

        for post in posts:
            title = html.unescape(get_rendered(post.get("title", "")))
            slug = post.get("slug") or slugify(title)
            content = get_rendered(post.get("content", ""))
            excerpt = html.unescape(get_rendered(post.get("excerpt", "")))
            # Strip the auto <p> tags WP adds around excerpts
            excerpt = excerpt.strip().removeprefix("<p>").removesuffix("</p>").strip()
            excerpt = excerpt[:500]  # model max_length

            category = ""
            categories_data = post.get("_embedded", {}).get("wp:term", [])
            if categories_data:
                cats = [t["name"] for t in categories_data[0] if t.get("taxonomy") == "category"]
                category = cats[0] if cats else ""

            published_date = None
            raw_date = post.get("date") or post.get("date_gmt")
            if raw_date:
                dt = parse_datetime(raw_date)
                published_date = dt.date() if dt else parse_date(raw_date[:10])

            is_published = post.get("status") == "publish"

            # --- Author linking (best-effort) ---
            author_names = []
            authors_embedded = post.get("_embedded", {}).get("author", [])
            for a in authors_embedded:
                author_names.append(a.get("name", ""))

            if dry_run:
                self.stdout.write(
                    f"  [DRY RUN] '{title}' | slug={slug} | category={category} | authors={author_names}"
                )
                continue

            # Create or update
            blog, was_created = Blog.objects.get_or_create(
                slug=slug,
                defaults={"title": title},
            )
            action = "created" if was_created else "updated"

            blog.title = title
            blog.content = content
            blog.excerpt = excerpt or title[:200]
            blog.category = category
            blog.is_published = is_published
            if published_date:
                # published_date is auto_now_add=True so we override at DB level
                Blog.objects.filter(pk=blog.pk).update(published_date=published_date)

            # Featured image
            if not skip_images:
                media_details = post.get("_embedded", {}).get("wp:featuredmedia", [])
                if media_details:
                    img_url = media_details[0].get("source_url", "")
                    content_file, filename = download_image(img_url, f"blog_{slug}")
                    if content_file:
                        blog.featured_image.save(filename, content_file, save=False)
                        self.stdout.write(f"    ↳ image saved: {filename}")

            blog.save()

            # Link authors by matching Team slugs / names
            for name in author_names:
                team_qs = Team.objects.filter(full_name__iexact=name)
                if not team_qs.exists():
                    # Try fuzzy: last name match
                    last = name.split()[-1] if name else ""
                    team_qs = Team.objects.filter(full_name__icontains=last)
                for member in team_qs:
                    blog.author.add(member)

            if was_created:
                created += 1
            else:
                updated += 1

            self.stdout.write(f"  ✓ [{action}] {title}")

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone. Created: {created}  Updated: {updated}  Skipped: {skipped}"
            )
        )
