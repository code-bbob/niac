import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), 'public', 'cached-images');

/**
 * Downloads an image from a remote URL and saves it to public/cached-images/
 * Returns the local path (e.g., /cached-images/abc123.jpg) that can be used in <img> tags.
 * If the image is already cached, returns the cached path immediately.
 */
export async function cacheImage(remoteUrl) {
  if (!remoteUrl) return null;

  try {
    // Create a deterministic filename from the URL
    const hash = crypto.createHash('md5').update(remoteUrl).digest('hex');
    const ext = getExtension(remoteUrl);
    const filename = `${hash}${ext}`;
    const localPath = path.join(CACHE_DIR, filename);
    const publicPath = `/cached-images/${filename}`;

    // Check if already cached
    try {
      await fs.access(localPath);
      return publicPath; // Already cached
    } catch {
      // Not cached yet, download it
    }

    // Ensure cache directory exists
    await fs.mkdir(CACHE_DIR, { recursive: true });

    // Download the image
    const response = await fetch(remoteUrl);
    if (!response.ok) {
      console.warn(`Failed to download image: ${remoteUrl} (${response.status})`);
      return remoteUrl; // Fallback to original URL
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(localPath, buffer);

    return publicPath;
  } catch (error) {
    console.warn(`Error caching image ${remoteUrl}:`, error instanceof Error ? error.message : error);
    return remoteUrl; // Fallback to original URL
  }
}

/**
 * Process all image URLs in an team object, downloading and caching them.
 * Returns a new team object with local image URLs.
 */
export async function cacheTeamImages(team) {
  if (!team) return team;

  const cached = { ...team };
  if (cached.photo_url) {
    cached.photo_url = await cacheImage(cached.photo_url);
  }
  return cached;
}

/**
 * Process all image URLs in a blog object, downloading and caching them.
 * Returns a new blog object with local image URLs.
 */
export async function cacheBlogImages(blog) {
  if (!blog) return blog;

  const cached = { ...blog };
  if (cached.featured_image) {
    cached.featured_image = await cacheImage(cached.featured_image);
  }
  // Also rewrite image URLs inside the HTML content
  if (cached.content) {
    cached.content = await rewriteHtmlImages(cached.content);
  }
  return cached;
}

/**
 * Process all image URLs in a service object, downloading and caching them.
 * Returns a new service object with local image URLs.
 */
export async function cacheServiceImages(area) {
  if (!area) return area;

  const cached = { ...area };
  if (cached.featured_image_url) {
    cached.featured_image_url = await cacheImage(
      cached.featured_image_url.startsWith('http')
        ? cached.featured_image_url
        : `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'}${cached.featured_image_url}`
    );
  }
  // Cache gallery images
  if (cached.gallery_images && cached.gallery_images.length > 0) {
    cached.gallery_images = await Promise.all(
      cached.gallery_images.map(async (img) => {
        const newImg = { ...img };
        if (newImg.image_url) {
          let imageUrl = newImg.image_url;
          if (!imageUrl.startsWith('http')) {
            const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
            imageUrl = `${apiBase}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
          }
          newImg.image_url = await cacheImage(imageUrl);
        }
        return newImg;
      })
    );
  }
  // Rewrite images inside the HTML description
  if (cached.description) {
    cached.description = await rewriteHtmlImages(cached.description);
  }
  return cached;
}

/**
 * Find all image URLs in HTML content, download them, and replace with local paths.
 */
async function rewriteHtmlImages(html) {
  if (!html) return html;

  // Match src="..." in img tags
  const imgRegex = /src=["'](https?:\/\/[^"']+)["']/g;
  const matches = [...html.matchAll(imgRegex)];

  let result = html;
  for (const match of matches) {
    const originalUrl = match[1];
    const localPath = await cacheImage(originalUrl);
    if (localPath && localPath !== originalUrl) {
      result = result.replace(originalUrl, localPath);
    }
  }

  return result;
}

/**
 * Extract file extension from a URL.
 */
function getExtension(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname);
    if (ext && ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.ico'].includes(ext.toLowerCase())) {
      return ext.toLowerCase();
    }
  } catch {}
  return '.jpg'; // Default
}
