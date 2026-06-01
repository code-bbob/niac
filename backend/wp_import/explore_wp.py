"""
Run this FIRST before importing.
It tells you exactly what's available on your WordPress site:
  - Available post types (detects custom team CPT)
  - Sample blog post fields
  - Sample team member fields + ACF/meta keys
  - Total counts per type

Usage:
    python explore_wp.py

No Django needed — plain Python. Requires: requests
"""

import requests
import json
import sys

WP_BASE = "https://niac.asia/wp-json/wp/v2"   # ← your site
WP_USER = ""          # optional — fill in to see private content
WP_APP_PASSWORD = ""  # WP Admin → Users → Application Passwords

auth = (WP_USER, WP_APP_PASSWORD) if WP_USER else None
SEP = "─" * 60


def get(path, params=None):
    r = requests.get(f"{WP_BASE}/{path}", params=params, auth=auth, timeout=15)
    r.raise_for_status()
    return r.json(), r.headers


def section(title):
    print(f"\n{SEP}\n  {title}\n{SEP}")


# ── 1. Post types ───────────────────────────────────────────
section("AVAILABLE POST TYPES")
try:
    types, _ = get("types")
    for slug, info in types.items():
        rest = info.get("rest_base", slug)
        print(f"  {slug:25s}  rest_base={rest}")
except Exception as e:
    print(f"  Error: {e}")

# ── 2. Blog posts ────────────────────────────────────────────
section("BLOG POSTS (posts)")
try:
    posts, headers = get("posts", {"per_page": 1, "_embed": 1})
    total = headers.get("X-WP-Total", "?")
    print(f"  Total posts: {total}\n")
    if posts:
        p = posts[0]
        print("  Top-level keys:", list(p.keys()))
        print("  title:", p.get("title", {}).get("rendered", "")[:80])
        print("  slug:", p.get("slug"))
        print("  status:", p.get("status"))
        print("  categories:", p.get("categories"))
        print("  acf keys:", list(p.get("acf", {}).keys()))
        print("  meta keys:", list(p.get("meta", {}).keys()))
        embedded = p.get("_embedded", {})
        print("  _embedded keys:", list(embedded.keys()))
        media = embedded.get("wp:featuredmedia", [{}])
        if media:
            print("  featured image url:", media[0].get("source_url", "(none)"))
except Exception as e:
    print(f"  Error: {e}")

# ── 3. Detect team CPT ───────────────────────────────────────
TEAM_CANDIDATES = ["team", "team_member", "staff", "our_team", "members"]
section("TEAM CPT DETECTION")
found_cpt = None
for cpt in TEAM_CANDIDATES:
    try:
        data, headers = get(cpt, {"per_page": 1, "_embed": 1})
        total = headers.get("X-WP-Total", "?")
        print(f"  ✓ '{cpt}' exists — total: {total}")
        if not found_cpt:
            found_cpt = cpt
    except requests.HTTPError as e:
        print(f"  ✗ '{cpt}' — {e.response.status_code}")
    except Exception as e:
        print(f"  ✗ '{cpt}' — {e}")

# ── 4. Sample team member ────────────────────────────────────
if found_cpt:
    section(f"SAMPLE TEAM MEMBER ({found_cpt})")
    try:
        members, _ = get(found_cpt, {"per_page": 1, "_embed": 1})
        if members:
            m = members[0]
            print("  Top-level keys:", list(m.keys()))
            print("  title:", m.get("title", {}).get("rendered", "")[:80])
            print("  slug:", m.get("slug"))
            print("  acf keys:", list(m.get("acf", {}).keys()))
            print("  acf sample:", json.dumps(m.get("acf", {}), indent=4)[:600])
            print("  meta keys:", list(m.get("meta", {}).keys()))
            media = m.get("_embedded", {}).get("wp:featuredmedia", [{}])
            if media:
                print("  photo url:", media[0].get("source_url", "(none)"))
    except Exception as e:
        print(f"  Error: {e}")

# ── 5. Categories ────────────────────────────────────────────
section("CATEGORIES")
try:
    cats, _ = get("categories", {"per_page": 50})
    for c in cats:
        print(f"  id={c['id']:4d}  count={c['count']:4d}  slug={c['slug']}")
except Exception as e:
    print(f"  Error: {e}")

print(f"\n{SEP}")
print("  Done. Use the output above to configure your import scripts.")
print(SEP)
