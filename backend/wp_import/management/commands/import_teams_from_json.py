"""
Usage:
    python manage.py import_teams_from_json
    python manage.py import_teams_from_json --file=team_data.json
    python manage.py import_teams_from_json --dry-run
    python manage.py import_teams_from_json --skip-images

Imports team members from the JSON produced by scrape_team.py.
"""

from django.core.management.base import BaseCommand
from django.utils.text import slugify
from pages.models import Team                    # ← replace with your app name
from wp_import.wp_api import download_image
import json
import os


class Command(BaseCommand):
    help = "Import team members from scraped team_data.json"

    def add_arguments(self, parser):
        parser.add_argument("--file", default="team_data.json")
        parser.add_argument("--dry-run", action="store_true")
        parser.add_argument("--skip-images", action="store_true")

    def handle(self, *args, **options):
        path = options["file"]
        dry_run = options["dry_run"]
        skip_images = options["skip_images"]

        if not os.path.exists(path):
            self.stderr.write(f"File not found: {path}")
            return

        with open(path, encoding="utf-8") as f:
            members = json.load(f)

        self.stdout.write(f"Loaded {len(members)} members from {path}\n")
        created = updated = 0

        for m in members:
            full_name = m.get("full_name", "").strip()
            if not full_name:
                continue

            slug = slugify(full_name)

            if dry_run:
                self.stdout.write(
                    f"  [DRY RUN] {full_name} | {m.get('job_title','')} | {m.get('category','')}"
                )
                continue

            member, was_created = Team.objects.get_or_create(
                slug=slug,
                defaults={"full_name": full_name},
            )

            member.full_name = full_name
            member.job_title = m.get("job_title", "")[:255]
            member.category = m.get("category", "")[:100]
            member.short_bio = m.get("short_bio", "")[:300]
            member.professional_background = m.get("professional_background", "")
            member.email = m.get("email", "")
            member.phone = m.get("phone", "")
            member.specializations = m.get("specializations", "")[:500]
            member.order = m.get("order", 0)
            member.is_active = True

            if not skip_images:
                photo_url = m.get("photo_url", "")
                if photo_url and not member.photo:
                    content_file, filename = download_image(photo_url, f"team_{slug}")
                    if content_file:
                        member.photo.save(filename, content_file, save=False)
                        self.stdout.write(f"    ↳ photo: {filename}")

            member.save()
            action = "created" if was_created else "updated"
            if was_created:
                created += 1
            else:
                updated += 1
            self.stdout.write(f"  ✓ [{action}] {full_name}")

        self.stdout.write(
            self.style.SUCCESS(f"\nDone. Created: {created}  Updated: {updated}")
        )
