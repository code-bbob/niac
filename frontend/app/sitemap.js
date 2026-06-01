import { fetchTeams, fetchBlogs, fetchServices } from '@/lib/api';
import { baseUrl } from '@/lib/seo';

export default async function sitemap() {
  const teams = await fetchTeams();
  const blogs = await fetchBlogs();
  const Services = await fetchServices();

  const baseUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/appointments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const teamUrls = (teams || []).map((team) => ({
    url: `${baseUrl}/teams/${team.slug}`,
    lastModified: team.updated_at || new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogUrls = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updated_at || new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const ServiceUrls = (Services || []).map((area) => ({
    url: `${baseUrl}/services/${area.slug}`,
    lastModified: area.updated_at || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...baseUrls, ...teamUrls, ...blogUrls, ...ServiceUrls];
}
