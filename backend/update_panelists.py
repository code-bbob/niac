"""
Django management command to update professional_background for National Panelists.

Usage:
    python manage.py shell < update_panelist_backgrounds.py
OR place in yourapp/management/commands/update_panelist_backgrounds.py and run:
    python manage.py update_panelist_backgrounds
"""

# Run this via: python manage.py shell < update_panelist_backgrounds.py
# OR paste into the Django shell directly.

import os
import django

# --- Data from https://niac.asia/roster-of-arbitrator/ ---
PANELIST_DATA = [
    {"full_name": "Dr. Mukti Ram Rijal",        "professional_background": "Advocate/Legal Counsel/Researcher"},
    {"full_name": "Mr. Keshari Raj Pandit",      "professional_background": "Former Chief Judge, HC, Nepal"},
    {"full_name": "Mr. Binod Prasad Sharma",     "professional_background": "Former Judge, SC, Nepal"},
    {"full_name": "Prof. Dr. Rishikesh Wagle",   "professional_background": "Dean, KUSOL, Nepal"},
    {"full_name": "Dr. Rajendra Giri",           "professional_background": "Management Expert, Nepal"},
    {"full_name": "Mrs. Suneeta Regmi Pokhrel",  "professional_background": "Senior Advocate, ADR Trainer"},
    {"full_name": "Mr. Madan Kumar Dangol",      "professional_background": "Advocate, Legal Counsel"},
    {"full_name": "Dr. Kumar Sharma Acharya",    "professional_background": "Senior Advocate, ARD Trainer"},
    {"full_name": "Mr. Kishore Kumar Jha",       "professional_background": "Engineer/Consultant"},
    {"full_name": "Mr. Thakur Prasad Adhikari",  "professional_background": "Financial Expert, CA"},
    {"full_name": "Mr. Keshab Prasad Dahal",     "professional_background": "Advocate, Legal Counsel"},
    {"full_name": "Mr. Dilli Ram Shrestha",      "professional_background": "Advocate, Corporate Consultant"},
    {"full_name": "Mr. Matrika Prasad Niraula",  "professional_background": "Senior Advocate, ADR Property & Corporate Law Expert"},
    {"full_name": "Mr. Chandeshwor Shrestha",    "professional_background": "Senior Advocate, Corporate Law Expert"},
    {"full_name": "Mr. Nanda Ram Bhandari",      "professional_background": "Advocate, ADR Consultant"},
    {"full_name": "Dr. Yog Upadhya",             "professional_background": "Construction Law Expert"},
    {"full_name": "Mr. Janak Baral",             "professional_background": "Finance Expert, CA"},
    {"full_name": "Dr. Rajendra Ghimire",        "professional_background": "Advocate, Corporate/Property Law Expert"},
    {"full_name": "Mr. Shuvan Acharya",          "professional_background": "Advocate, Corporate/Property Law Expert"},
    {"full_name": "Mr. Anil Kumar Shrestha",     "professional_background": "Advocate, Corporate/Property Law Expert"},
    {"full_name": "Ms. Kabita Silwal",           "professional_background": "Advocate, Legal Training Expert"},
    {"full_name": "Mr. Nabin Bhandari",          "professional_background": "Advocate, Corporate/Property Law Expert"},
    {"full_name": "Mr. Sushil Thapa",            "professional_background": "Engineer, Engineering Counsel"},
    {"full_name": "Dr. Kishor Uprety",           "professional_background": "Independent Consultant and Legal Advisor"},
    {"full_name": "Dr. Resham Raj Regmi",        "professional_background": "Senior Advocate and Arbitration Counsel"},
    {"full_name": "Mr. Nurahari Khatiwada",      "professional_background": "Advocate/Legal Counsel"},
    {"full_name": "Mr. Maheswor Ghimire",        "professional_background": "Retired Superintendent Engineer"},
    {"full_name": "Mr. Yubraj Subedi",           "professional_background": "Former Judge"},
    {"full_name": "Mr. Suresh Kumar Paudel",     "professional_background": "Senior Advocate"},
]

# --- Update logic ---
from pages.models import Team  # <-- Replace 'yourapp' with your actual app name

updated = []
not_found = []

for entry in PANELIST_DATA:
    # Try exact match first, then case-insensitive
    qs = Team.objects.filter(full_name__iexact=entry["full_name"])
    if qs.exists():
        count = qs.update(professional_background=entry["professional_background"])
        updated.append(f"  ✓ {entry['full_name']} ({count} record{'s' if count > 1 else ''})")
    else:
        not_found.append(f"  ✗ {entry['full_name']}")

print(f"\n{'='*60}")
print(f"Updated ({len(updated)}):")
print('\n'.join(updated) or "  None")

print(f"\nNot found ({len(not_found)}):")
print('\n'.join(not_found) or "  None")
print('='*60)
