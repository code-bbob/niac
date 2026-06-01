// Server-side API utility for static generation and ISR
import { cacheTeamImages, cacheBlogImages, cacheServiceImages } from './image-cache';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchTeams() {
  try {
    const res = await fetch(`${BASE_URL}/team/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch teams:', res.status);
      return [];
    }

    const data = await res.json();
    const teams = data.results || data;
    // Download and cache all team images at build ti
    return Promise.all(teams.map(cacheTeamImages));
  } catch (error) {
    console.warn('Error fetching teams from API:', error instanceof Error ? error.message : error);
    return [];
  }
}

export async function fetchTeam(slug) {
  try {
    const res = await fetch(`${BASE_URL}/team/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const team = await res.json();
    return cacheTeamImages(team);
  } catch (error) {
    console.warn('Error fetching team:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/blogs/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch blogs:', res.status);
      return [];
    }

    const data = await res.json();
    const blogs = data.results || data;
    // Download and cache all blog images at build time
    return Promise.all(blogs.map(cacheBlogImages));
  } catch (error) {
    console.warn('Error fetching blogs from API:', error instanceof Error ? error.message : error);
    return [];
  }
}

export async function fetchBlogsPage(page = 1) {
  try {
    const res = await fetch(`${BASE_URL}/blogs/?page=${page}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch blogs page:', res.status);
      return { blogs: [], total: 0, totalPages: 0, currentPage: page };
    }

    const data = await res.json();
    const blogs = await Promise.all((data.results || []).map(cacheBlogImages));
    return {
      blogs,
      total: data.count || 0,
      totalPages: data.count ? Math.ceil(data.count / 10) : 0,
      currentPage: page,
    };
  } catch (error) {
    console.warn('Error fetching blogs page from API:', error instanceof Error ? error.message : error);
    return { blogs: [], total: 0, totalPages: 0, currentPage: page };
  }
}

export async function fetchBlog(slug) {
  try {
    console.log("API BASE_URL:", BASE_URL);

    const res = await fetch(`${BASE_URL}/blogs/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const blog = await res.json();
    return cacheBlogImages(blog);
  } catch (error) {
    console.warn('Error fetching blog:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${BASE_URL}/services/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch service:', res.status);
      return [];
    }

    const data = await res.json();
    const areas = data.results || data;
    // Download and cache all service images at build time
    return Promise.all(areas.map(cacheServiceImages));
  } catch (error) {
    console.warn('Error fetching service from API:', error instanceof Error ? error.message : error);
    return [];
  }
}

export async function fetchService(slug) {
  try {
    const res = await fetch(`${BASE_URL}/services/${slug}/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const area = await res.json();
    return cacheServiceImages(area);
  } catch (error) {
    console.warn('Error fetching service:', error instanceof Error ? error.message : error);
    return null;
  }
}
