"""
WordPress REST API client.
Handles pagination, optional authentication, and media download.
"""

import requests
import os
import mimetypes
from io import BytesIO
from urllib.parse import urlparse
from django.core.files.base import ContentFile

WP_BASE = "https://niac.asia/wp-json/wp/v2"  # ← change if needed

# Optional: fill in to also fetch drafts/private posts
WP_USER = ""
WP_APP_PASSWORD = ""  # Generate in WP Admin → Users → Application Passwords

_auth = (WP_USER, WP_APP_PASSWORD) if WP_USER else None


def _get(endpoint, params=None):
    """Single page GET."""
    url = f"{WP_BASE}/{endpoint}"
    r = requests.get(url, params=params, auth=_auth, timeout=30)
    r.raise_for_status()
    return r.json(), int(r.headers.get("X-WP-TotalPages", 1))


def fetch_all(endpoint, extra_params=None):
    """Auto-paginate through all pages and return combined list."""
    params = {"per_page": 100, **(extra_params or {})}
    page = 1
    results = []
    while True:
        params["page"] = page
        data, total_pages = _get(endpoint, params)
        results.extend(data)
        print(f"  [{endpoint}] page {page}/{total_pages} — {len(data)} items")
        if page >= total_pages:
            break
        page += 1
    return results


# def download_image(url, filename_hint=None):
#     """
#     Download a remote image and return a Django ContentFile.
#     Returns (ContentFile, filename) or (None, None) on failure.
#     """
#     if not url:
#         return None, None
#     try:
#         r = requests.get(url, timeout=30, headers={
#             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
#             "Referer": "https://niac.asia/",
#             "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
#         })
#         r.raise_for_status()
#         content_type = r.headers.get("Content-Type", "image/jpeg")
#         ext = mimetypes.guess_extension(content_type.split(";")[0].strip()) or ".jpg"
#         ext = ext.replace(".jpe", ".jpg")  # normalise
#         if not filename_hint:
#             filename_hint = urlparse(url).path.split("/")[-1]
#         if not filename_hint.endswith(ext):
#             filename_hint = f"{filename_hint}{ext}"
#         return ContentFile(r.content), filename_hint
#     except Exception as e:
#         print(f"    ⚠ Could not download {url}: {e}")
#         return None, None
#

def download_image(url, filename_hint=None):
    if not url:
        return None, None

    try:
        from curl_cffi import requests as cf_requests

        r = cf_requests.get(
            url,
            impersonate="chrome124",
            timeout=30,
            allow_redirects=True,
            headers={
                "Referer": "https://niac.asia/",
                "User-Agent": (
                    "Mozilla/5.0 (X11; Linux x86_64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/124.0.0.0 Safari/537.36"
                ),
            },
        )

        r.raise_for_status()

        content_type = r.headers.get("Content-Type", "").lower()

        # DEBUG
        print("URL:", url)
        print("Final URL:", r.url)
        print("Content-Type:", content_type)

        # Reject HTML responses
        if "text/html" in content_type:
            print(f"    ⚠ Server returned HTML instead of image: {url}")
            return None, None

        # Ensure it's actually an image
        if not content_type.startswith("image/"):
            print(f"    ⚠ Not an image response: {content_type}")
            return None, None

        ext = (
            mimetypes.guess_extension(content_type.split(";")[0].strip())
            or ".jpg"
        )

        ext = ext.replace(".jpe", ".jpg")

        if not filename_hint:
            filename_hint = urlparse(str(r.url)).path.split("/")[-1] or "image"

        # Remove existing extension if needed
        filename_hint = filename_hint.split("?")[0]

        if not filename_hint.lower().endswith(ext):
            filename_hint = f"{filename_hint}{ext}"

        return ContentFile(r.content), filename_hint

    except Exception as e:
        print(f"    ⚠ Could not download {url}: {e}")
        return None, None

def get_rendered(field):
    """WP returns text fields as {'rendered': '...', 'raw': '...'}. Unwrap safely."""
    if isinstance(field, dict):
        return field.get("rendered", "")
    return field or ""
