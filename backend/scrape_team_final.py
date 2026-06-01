"""
Scrapes all team/panelist data from niac.asia and saves to team_data.json

Sources:
  - /our-team/         → staff cards → follows each /staff/ profile page
  - /roster-of-arbitrator/   → table (name, background, phone)
  - /roster-of-mediator/     → name list
  - /international-panelist/ → table (name only)

Run: python3 scrape_team_final.py
Output: team_data.json
Also saves: debug_<page>.html for manual inspection
"""

import requests
from bs4 import BeautifulSoup
import json
import re
import time

HEADERS = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"}
BASE = "https://niac.asia"


def get(url):
    r = requests.get(url, headers=HEADERS, timeout=20)
    r.raise_for_status()
    return BeautifulSoup(r.text, "lxml")


def clean(text):
    return re.sub(r"\s+", " ", (text or "")).strip()


def save_debug(soup, name):
    with open(f"debug_{name}.html", "w", encoding="utf-8") as f:
        f.write(str(soup))


# ── 1. Scrape /our-team/ → collect all staff profile URLs ────────────────

def scrape_our_team():
    print("\n── /our-team/ ──────────────────────────────")
    soup = get(f"{BASE}/our-team/")
    save_debug(soup, "our-team")

    members = []
    cards = soup.select(".staff_info")
    print(f"  Found {len(cards)} staff cards")

    for i, card in enumerate(cards):
        name_el = card.select_one("h4 a")
        title_el = card.select_one("p")
        profile_url = name_el["href"] if name_el and name_el.get("href") else ""

        name = clean(name_el.get_text()) if name_el else ""
        title = clean(title_el.get_text()) if title_el else ""

        if not name:
            continue

        print(f"  [{i+1}/{len(cards)}] {name} — {title}")
        member = {
            "full_name": name,
            "job_title": title,
            "category": "Our Team",
            "short_bio": "",
            "professional_background": "",
            "email": "",
            "phone": "",
            "specializations": "",
            "photo_url": "",
            "order": i,
            "profile_url": profile_url,
        }

        # Follow profile page for bio + photo
        if profile_url:
            time.sleep(0.4)
            member = scrape_staff_profile(member, profile_url)

        members.append(member)

    return members


def scrape_staff_profile(member, url):
    """Fetch individual /staff/<slug>/ page for photo + bio."""
    try:
        soup = get(url)
        slug = url.rstrip("/").split("/")[-1]
        save_debug(soup, f"staff-{slug}")

        # Photo — WP staff pages typically use featured image or .staff_image
        for img_sel in [".staff_image img", ".wp-post-image", ".stm_staff_single img",
                        "article img", ".entry-content img"]:
            img = soup.select_one(img_sel)
            if img and img.get("src"):
                src = img["src"]
                # Skip tiny icons/logos (usually < 50px referenced in src name)
                if "logo" not in src.lower() and "icon" not in src.lower():
                    member["photo_url"] = src
                    break

        # Bio — try common containers in order of specificity
        bio_text = ""
        for sel in [".stm_staff_single_description", ".staff_description",
                    ".wpb_text_column p", ".vc_column_text p",
                    ".entry-content p", "article p"]:
            paras = soup.select(sel)
            if paras:
                bio_text = " ".join(clean(p.get_text()) for p in paras if clean(p.get_text()))
                if len(bio_text) > 50:  # meaningful content
                    break

        if bio_text:
            member["short_bio"] = bio_text[:300]
            member["professional_background"] = bio_text

        # Email / phone from profile page
        page_text = soup.get_text()
        email_match = re.search(r"[\w.+-]+@[\w-]+\.\w+", page_text)
        if email_match and not member["email"]:
            member["email"] = email_match.group()

        phone_match = re.search(r"(\+977[\s-]?)?[9][0-9]{9}", page_text)
        if phone_match and not member["phone"]:
            member["phone"] = phone_match.group()

    except Exception as e:
        print(f"    ⚠ Profile fetch failed for {url}: {e}")

    return member


# ── 2. Scrape /roster-of-arbitrator/ → table ─────────────────────────────

def scrape_arbitrators():
    print("\n── /roster-of-arbitrator/ ──────────────────")
    soup = get(f"{BASE}/roster-of-arbitrator/")
    save_debug(soup, "arbitrators")

    members = []
    rows = soup.select("table tr")
    if not rows:
        # fallback: look for repeating divs with name + background text
        rows = soup.select(".wpb_wrapper tr, .vc_table tr")

    print(f"  Found {len(rows)} table rows")

    for i, row in enumerate(rows):
        cells = row.select("td")
        if len(cells) < 2:
            continue
        name = clean(cells[0].get_text())
        background = clean(cells[1].get_text()) if len(cells) > 1 else ""
        phone = clean(cells[2].get_text()) if len(cells) > 2 else ""

        # Skip header row
        if name.lower() in ("name", "s.n.", "#", "no.", ""):
            continue

        print(f"  {name} | {background}")
        members.append({
            "full_name": name,
            "job_title": background,
            "category": "National Panelist",
            "short_bio": background[:300],
            "professional_background": background,
            "email": "",
            "phone": phone if re.search(r"\d{7,}", phone) else "",
            "specializations": "Arbitration",
            "photo_url": "",
            "order": i,
            "profile_url": "",
        })

    return members


# ── 3. Scrape /roster-of-mediator/ → name list ───────────────────────────

def scrape_mediators():
    print("\n── /roster-of-mediator/ ────────────────────")
    soup = get(f"{BASE}/roster-of-mediator/")
    save_debug(soup, "mediators")

    members = []
    # Try table first, then list items, then plain paragraphs
    rows = soup.select("table tr")
    names_found = []

    if rows:
        for row in rows:
            cells = row.select("td")
            name = clean(cells[0].get_text()) if cells else ""
            if name and name.lower() not in ("name", ""):
                names_found.append(name)
    else:
        # Plain list — grab all short text nodes that look like names
        wrapper = soup.select_one(".wpb_wrapper, .entry-content, main")
        if wrapper:
            for el in wrapper.select("p, li"):
                text = clean(el.get_text())
                # Name heuristic: 2-5 words, contains title prefix or looks like a name
                if 2 <= len(text.split()) <= 7 and not text.startswith(("Contact", "How", "Looking")):
                    names_found.append(text)

    print(f"  Found {len(names_found)} mediators")
    for i, name in enumerate(names_found):
        members.append({
            "full_name": name,
            "job_title": "",
            "category": "Mediation Panelist",
            "short_bio": "",
            "professional_background": "",
            "email": "",
            "phone": "",
            "specializations": "Mediation",
            "photo_url": "",
            "order": i,
            "profile_url": "",
        })

    return members


# ── 4. Scrape /international-panelist/ → table ───────────────────────────

def scrape_international():
    print("\n── /international-panelist/ ────────────────")
    soup = get(f"{BASE}/international-panelist/")
    save_debug(soup, "international")

    members = []
    rows = soup.select("table tr")
    print(f"  Found {len(rows)} table rows")

    for i, row in enumerate(rows):
        cells = row.select("td")
        if not cells:
            continue
        name = clean(cells[0].get_text())
        background = clean(cells[1].get_text()) if len(cells) > 1 else ""
        if not name or name.lower() in ("name", ""):
            continue
        # Skip "N/A" background
        background = "" if background.upper() == "N/A" else background

        print(f"  {name}")
        members.append({
            "full_name": name,
            "job_title": background,
            "category": "International Panelist",
            "short_bio": background[:300] if background else "",
            "professional_background": background,
            "email": "",
            "phone": "",
            "specializations": "Arbitration, Mediation",
            "photo_url": "",
            "order": i,
            "profile_url": "",
        })

    return members


# ── Main ──────────────────────────────────────────────────────────────────

all_members = []
seen = set()

for scrape_fn in [scrape_our_team, scrape_arbitrators, scrape_mediators, scrape_international]:
    batch = scrape_fn()
    for m in batch:
        key = m["full_name"].lower().strip()
        if key and key not in seen:
            seen.add(key)
            all_members.append(m)
        else:
            # Already exists from our-team — just add category/specialization
            for existing in all_members:
                if existing["full_name"].lower().strip() == key:
                    # Append new category
                    cats = existing["category"].split(", ")
                    if m["category"] not in cats:
                        existing["category"] = ", ".join(cats + [m["category"]])
                    # Merge specializations
                    if m.get("specializations") and m["specializations"] not in existing.get("specializations",""):
                        existing["specializations"] = ", ".join(filter(None, [existing.get("specializations",""), m["specializations"]]))
                    if not existing["phone"] and m.get("phone"):
                        existing["phone"] = m["phone"]
                    break

with open("team_data.json", "w", encoding="utf-8") as f:
    json.dump(all_members, f, indent=2, ensure_ascii=False)

print(f"\n✓ Saved {len(all_members)} unique members to team_data.json")
print("  Review the file then run: python manage.py import_teams_from_json")
