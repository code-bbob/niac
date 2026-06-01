# WordPress → Django Import Toolkit

Three Django management commands + one diagnostic script.

---

## Setup

1. **Copy files into your Django project:**

```
yourproject/
├── wp_import/
│   ├── wp_api.py                        ← shared API client
│   └── management/
│       └── commands/
│           ├── import_blogs.py
│           ├── import_teams.py
│           └── import_media.py
└── explore_wp.py                        ← run this first (plain Python)
```

2. **Add `wp_import` to `INSTALLED_APPS`** in `settings.py`:

```python
INSTALLED_APPS = [
    ...
    "wp_import",
]
```

3. **Install dependency:**

```bash
pip install requests
```

4. **Edit `wp_api.py`** — set your site URL:

```python
WP_BASE = "https://niac.asia/wp-json/wp/v2"
```

5. **Replace `yourapp`** in the three import files with your actual Django app name.

---

## Step 1 — Diagnose first

```bash
pip install requests
python explore_wp.py
```

This shows you:
- What custom post types exist (important for team members)
- What ACF/meta fields are available per post type
- Total counts of posts, team members, categories

**Read the output before running imports.** It tells you which `--post-type` flag to use.

---

## Step 2 — (Optional) Add WP credentials

Needed only if you want draft posts or private content.

Go to **WP Admin → Users → Your Profile → Application Passwords**, create one, then set in `wp_api.py`:

```python
WP_USER = "your-username"
WP_APP_PASSWORD = "xxxx xxxx xxxx xxxx xxxx xxxx"
```

---

## Step 3 — Run imports in order

### Teams first (blogs link to team members as authors)

```bash
# Dry run — see what will be imported without saving
python manage.py import_teams --dry-run

# If explore_wp.py found a CPT named 'staff' or 'team_member', pass it:
python manage.py import_teams --post-type=staff

# Full import
python manage.py import_teams
```

### Blogs

```bash
python manage.py import_blogs --dry-run
python manage.py import_blogs
```

### Images only (if you skipped images before, or want to re-sync)

```bash
python manage.py import_media              # all missing images
python manage.py import_media --type blog  # blogs only
python manage.py import_media --type team  # team only
python manage.py import_media --force      # re-download everything
```

---

## Flags summary

| Command | Flags |
|---|---|
| `import_teams` | `--dry-run`, `--skip-images`, `--post-type=<slug>`, `--category=<slug>` |
| `import_blogs` | `--dry-run`, `--skip-images`, `--status=publish/draft/any` |
| `import_media` | `--type=blog/team/all`, `--force` |

---

## Field mapping

### Blog → `yourapp.Blog`
| WordPress | Django field |
|---|---|
| `title.rendered` | `title` |
| `slug` | `slug` |
| `content.rendered` | `content` |
| `excerpt.rendered` | `excerpt` |
| `date` | `published_date` |
| `status == "publish"` | `is_published` |
| `_embedded.wp:term[0][0].name` | `category` |
| `_embedded.author[].name` → Team lookup | `author` (M2M) |
| `_embedded.wp:featuredmedia[0].source_url` | `featured_image` |

### Team → `yourapp.Team`
| WordPress (ACF / meta) | Django field |
|---|---|
| `title.rendered` | `full_name` |
| `slug` | `slug` |
| `acf.job_title` / `position` / `designation` | `job_title` |
| `acf.category` / `team_category` / `group` | `category` |
| `acf.short_bio` / `tagline` | `short_bio` |
| `acf.biography` / `bio` / `content.rendered` | `professional_background` |
| `acf.email` / `team_email` | `email` |
| `acf.phone` / `contact_number` | `phone` |
| `acf.specializations` / `expertise` | `specializations` |
| `menu_order` | `order` |
| `_embedded.wp:featuredmedia[0].source_url` | `photo` |

---

## Troubleshooting

**Team members not found via CPT:**
The site may store team as standard Posts in a "Team" category. Run:
```bash
python manage.py import_teams --category=team
```

**ACF fields empty:**
ACF fields only appear in REST API if the field group has "Show in REST API" enabled.
In WP Admin → ACF → Field Groups → edit each group → scroll to "REST API" → enable it.

**Images 403/404:**
Some WP installs protect uploads. Try adding auth credentials to `wp_api.py`.

**`published_date` not updating:**
`published_date` has `auto_now_add=True`. The import uses a direct `QuerySet.update()` to bypass this — if it still doesn't work, temporarily remove `auto_now_add=True`, run the import, then add it back.
