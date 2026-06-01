// SEO Utilities for structured data and metadata

export const baseUrl = 'https://www.equitylawandco.com';

export const siteMetadata = {
  title: 'Equity Law & Co.',
  titleTemplate: '%s | Equity Law & Co.',
  description: 'Equity Law & Co. is a full-service law firm in Kathmandu, Nepal providing practical, reliable, and result-oriented legal solutions in Intellectual Property, Real Estate, Arbitration, Corporate Law, and more.',
  keywords: 'law firm Nepal, legal services Kathmandu, teams Nepal, corporate law, intellectual property law, real estate law, arbitration, Equity Law, equity law and co, equity law chamber',
  ogImage: `${baseUrl}/images/og-image.jpg`,
};

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Equity Law & Co.',
    alternateName: 'Equity Law Chamber',
    description: 'A full-service law firm in Nepal dedicated to delivering practical, reliable, and result-oriented legal solutions rooted in fairness and equity. Established in 2014 A.D., restructured in 2025 A.D.',
    url: baseUrl,
    logo: `${baseUrl}/images/image.svg`,
    image: `${baseUrl}/images/og-image.jpg`,
    sameAs: [
      'https://www.facebook.com/equitylawandco',
      'https://www.linkedin.com/company/equitylawandco',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Thapagaun',
      addressLocality: 'Kathmandu',
      addressRegion: 'Bagmati',
      postalCode: '44600',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.6933',
      longitude: '85.3486',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-9841052926',
      contactType: 'Legal Services',
      availableLanguage: ['English', 'Nepali'],
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nepal',
    },
    priceRange: '$$',
    foundingDate: '2014',
    knowsAbout: [
      'Intellectual Property Law',
      'Real Estate Law',
      'Arbitration',
      'Corporate Law',
      'Family Law',
      'Foreign Direct Investment',
    ],
    openingHours: 'Mo-Fr 09:00-18:00',
  };
}

export function generateTeamSchema(team) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: team.full_name,
    jobTitle: team.job_title || 'Team at Law',
    image: team.photo_url,
    description: team.short_bio || team.professional_background || `${team.full_name} is an team at Equity Law & Co.`,
    url: `${baseUrl}/teams/${team.slug}`,
    knowsAbout: team.specializations?.split(',').map(s => s.trim()) || [],
    worksFor: {
      '@type': 'LegalService',
      name: 'Equity Law & Co.',
      url: baseUrl,
    },
    workLocation: {
      '@type': 'Place',
      name: 'Equity Law & Co.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
    },
    ...(team.email && { email: team.email }),
    ...(team.phone && { telephone: team.phone }),
  };
}

export function generateBlogSchema(blog) {
  const authorNames = Array.isArray(blog.author)
    ? blog.author.map((author) => author.name).filter(Boolean)
    : blog.author
      ? [blog.author]
      : [];

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.featured_image,
    datePublished: blog.published_date || blog.created_at,
    dateModified: blog.updated_date || blog.published_date || blog.created_at,
    author: authorNames.length > 0
      ? authorNames.map((name) => ({
        '@type': 'Person',
        name,
      }))
      : {
        '@type': 'Person',
        name: 'Equity Law & Co.',
      },
    publisher: {
      '@type': 'Organization',
      name: 'Equity Law & Co.',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/image.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blogs/${blog.slug}`,
    },
    url: `${baseUrl}/blogs/${blog.slug}`,
  };
}

export function generateServiceSchema(area) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: area.name,
    description: area.description?.replace(/<[^>]*>/g, '').substring(0, 300) || `${area.name} legal services at Equity Law & Co.`,
    provider: {
      '@type': 'LegalService',
      name: 'Equity Law & Co.',
      url: baseUrl,
    },
    url: `${baseUrl}/services/${area.slug}`,
    areaServed: {
      '@type': 'Country',
      name: 'Nepal',
    },
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url === '/' ? baseUrl : `${baseUrl}${item.url}`,
    })),
  };
}
