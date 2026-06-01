"""
Usage:
    python manage.py import_teams
    python manage.py import_teams --post-type=team_member   # if WP uses a custom CPT
    python manage.py import_teams --skip-images
    python manage.py import_teams --dry-run

WordPress doesn't have a built-in team post type.
This command tries two sources in order:
  1. A custom post type (default slug: 'team') registered via CPT UI / ACF / etc.
  2. Falls back to parsing standard Posts in a 'Team' category.

Field mapping from common WP team plugins (Team by BestWebSoft, WP Team Manager,
Our Team Showcase, or plain ACF fields) is handled automatically via _get_meta().
"""

from django.core.management.base import BaseCommand
from django.utils.text import slugify
from pages.models import Team                    # ← replace with your app name
from wp_import.wp_api import fetch_all, download_image, get_rendered, _get
import html
import requests


TEAM_POST_TYPES = ["team", "team_member", "staff", "our_team", "members"]


def _get_meta(post, key, fallback=""):
    """Pull from ACF fields, meta, or rendered content."""
    # ACF / custom fields block
    acf = post.get("acf", {})
    if key in acf:
        return acf[key] or fallback

    meta = post.get("meta", {})
    if key in meta:
        return meta[key] or fallback

    return fallback


def _detect_post_type(preferred):
    """Check which team post type actually exists on this WP install."""
    candidates = [preferred] + TEAM_POST_TYPES if preferred not in TEAM_POST_TYPES else [preferred] + [t for t in TEAM_POST_TYPES if t != preferred]
    for cpt in candidates:
        try:
            data, _ = _get(f"types/{cpt}")
            print(f"  Found custom post type: '{cpt}'")
            return cpt
        except Exception:
            pass
    return None


class Command(BaseCommand):
    help = "Import team members from WordPress REST API"

    def add_arguments(self, parser):
        parser.add_argument("--post-type", default="team", help="WP custom post type slug for team members")
        parser.add_argument("--skip-images", action="store_true")
        parser.add_argument("--dry-run", action="store_true")
        parser.add_argument("--category", default="team", help="Fallback: category slug to filter posts by")

    def handle(self, *args, **options):
        skip_images = options["skip_images"]
        dry_run = options["dry_run"]
        preferred_type = options["post_type"]

        # 1. Try custom post type
        cpt = _detect_post_type(preferred_type)
        if cpt:
            self.stdout.write(f"Fetching team from custom post type '{cpt}'…")
            try:
                members = fetch_all(cpt, {"_embed": 1, "status": "publish"})
            except Exception as e:
                self.stdout.write(f"  ⚠ CPT fetch failed ({e}), falling back to Posts…")
                members = self._fallback_posts(options["category"])
        else:
            self.stdout.write("No team CPT found. Falling back to Posts + category filter…")
            members = self._fallback_posts(options["category"])

        self.stdout.write(f"Found {len(members)} team member(s). Importing…\n")

        created = updated = 0
        for i, post in enumerate(members):
            full_name = html.unescape(get_rendered(post.get("title", "")))
            if not full_name:
                self.stdout.write(f"  ⚠ Skipping post with no title (id={post.get('id')})")
                continue

            # --- Field extraction with common ACF/plugin key variants ---
            job_title = (
                _get_meta(post, "job_title")
                or _get_meta(post, "position")
                or _get_meta(post, "designation")
                or _get_meta(post, "role")
                or ""
            )
            category = (
                _get_meta(post, "category")
                or _get_meta(post, "team_category")
                or _get_meta(post, "group")
                or ""
            )
            short_bio = (
                _get_meta(post, "short_bio")
                or _get_meta(post, "tagline")
                or _get_meta(post, "bio_short")
                or ""
            )[:300]

            professional_background = (
                _get_meta(post, "professional_background")
                or _get_meta(post, "biography")
                or _get_meta(post, "bio")
                or get_rendered(post.get("content", ""))
                or ""
            )
            email = (
                _get_meta(post, "email")
                or _get_meta(post, "team_email")
                or ""
            )
            phone = (
                _get_meta(post, "phone")
                or _get_meta(post, "contact_number")
                or ""
            )
            specializations = (
                _get_meta(post, "specializations")
                or _get_meta(post, "expertise")
                or _get_meta(post, "skills")
                or ""
            )

            # WP menu_order is a natural ordering field
            order = post.get("menu_order", i)

            slug = post.get("slug") or slugify(full_name)

            if dry_run:
                self.stdout.write(
                    f"  [DRY RUN] {full_name} | title={job_title} | cat={category} | slug={slug}"
                )
                continue

            member, was_created = Team.objects.get_or_create(
                slug=slug,
                defaults={"full_name": full_name},
            )

            member.full_name = full_name
            member.job_title = job_title
            member.category = category
            member.short_bio = short_bio
            member.professional_background = professional_background
            member.email = email
            member.phone = phone
            member.specializations = specializations
            member.order = order
            member.is_active = True

            # Photo
            if not skip_images:
                media_list = post.get("_embedded", {}).get("wp:featuredmedia", [])
                if media_list:
                    img_url = media_list[0].get("source_url", "")
                    content_file, filename = download_image(img_url, f"team_{slug}")
                    if content_file:
                        member.photo.save(filename, content_file, save=False)
                        self.stdout.write(f"    ↳ photo saved: {filename}")

            member.save()

            action = "created" if was_created else "updated"
            if was_created:
                created += 1
            else:
                updated += 1
            self.stdout.write(f"  ✓ [{action}] {full_name} ({job_title})")

        self.stdout.write(
            self.style.SUCCESS(f"\nDone. Created: {created}  Updated: {updated}")
        )

    def _fallback_posts(self, category_slug):
        """Fetch standard posts filtered by a given category slug."""
        # First resolve category slug → id
        try:
            cats, _ = _get("categories", {"slug": category_slug})
            if not cats:
                self.stdout.write(f"  ⚠ Category '{category_slug}' not found. Fetching all posts.")
                return fetch_all("posts", {"_embed": 1})
            cat_id = cats[0]["id"]
            return fetch_all("posts", {"categories": cat_id, "_embed": 1})
        except Exception as e:
            self.stdout.write(f"  ⚠ Category lookup failed: {e}")
            return []
