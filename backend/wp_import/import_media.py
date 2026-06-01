"""
Usage:
    python manage.py import_media
    python manage.py import_media --type blog    # only re-download blog images
    python manage.py import_media --type team
    python manage.py import_media --force        # re-download even if image already set

Bulk downloads featured images for all Blog and Team records that are
missing a local image, without re-importing content.
"""

from django.core.management.base import BaseCommand
from pages.models import Blog, Team             # ← replace with your app name
from wp_import.wp_api import fetch_all, download_image, get_rendered
import html


class Command(BaseCommand):
    help = "Download/re-download featured images from WordPress for Blog and Team records"

    def add_arguments(self, parser):
        parser.add_argument("--type", choices=["blog", "team", "all"], default="all")
        parser.add_argument("--force", action="store_true", help="Re-download even if image exists")

    def handle(self, *args, **options):
        kind = options["type"]
        force = options["force"]

        if kind in ("blog", "all"):
            self._sync_blog_images(force)
        if kind in ("team", "all"):
            self._sync_team_images(force)

    def _sync_blog_images(self, force):
        self.stdout.write("\n── Blog images ──")
        posts = fetch_all("posts", {"_embed": 1, "per_page": 100})
        slug_map = {p["slug"]: p for p in posts}

        qs = Blog.objects.all() if force else Blog.objects.filter(featured_image="")
        self.stdout.write(f"Blogs needing images: {qs.count()}")

        for blog in qs:
            post = slug_map.get(blog.slug)
            if not post:
                self.stdout.write(f"  ⚠ No WP post found for slug '{blog.slug}'")
                continue
            media_list = post.get("_embedded", {}).get("wp:featuredmedia", [])
            if not media_list:
                self.stdout.write(f"  – No featured image in WP for '{blog.title}'")
                continue
            img_url = media_list[0].get("source_url", "")
            content_file, filename = download_image(img_url, f"blog_{blog.slug}")
            if content_file:
                blog.featured_image.save(filename, content_file, save=True)
                self.stdout.write(f"  ✓ {blog.title} → {filename}")

    def _sync_team_images(self, force):
        self.stdout.write("\n── Team images ──")

        # Try all known CPT slugs
        from wp_import.wp_api import _get, fetch_all as fa
        TEAM_TYPES = ["team", "team_member", "staff", "our_team", "members", "posts"]

        posts = []
        for cpt in TEAM_TYPES:
            try:
                data = fa(cpt, {"_embed": 1})
                if data:
                    posts = data
                    self.stdout.write(f"  Using CPT: {cpt}")
                    break
            except Exception:
                pass

        slug_map = {p["slug"]: p for p in posts}

        qs = Team.objects.all() if force else Team.objects.filter(photo="")
        self.stdout.write(f"Team members needing photos: {qs.count()}")

        for member in qs:
            post = slug_map.get(member.slug)
            if not post:
                self.stdout.write(f"  ⚠ No WP post for slug '{member.slug}'")
                continue
            media_list = post.get("_embedded", {}).get("wp:featuredmedia", [])
            if not media_list:
                self.stdout.write(f"  – No photo in WP for '{member.full_name}'")
                continue
            img_url = media_list[0].get("source_url", "")
            content_file, filename = download_image(img_url, f"team_{member.slug}")
            if content_file:
                member.photo.save(filename, content_file, save=True)
                self.stdout.write(f"  ✓ {member.full_name} → {filename}")
