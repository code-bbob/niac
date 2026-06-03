import Link from 'next/link';
import { fetchBlogs, fetchBlog } from '@/lib/api';
import { generateBlogSchema, generateBreadcrumbSchema, baseUrl } from '@/lib/seo';
import { Calendar, User, ChevronRight, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function getBlogAuthors(blog) {
  if (Array.isArray(blog.author)) {
    return blog.author;
  }
  if (blog.author) {
    return [{ name: blog.author, slug: null }];
  }
  return [];
}

function getAuthorNames(blog) {
  const authors = getBlogAuthors(blog);
  return authors.map((author) => author.name).filter(Boolean);
}

export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return { title: 'Blog Not Found' };
  }

  const authorNames = getAuthorNames(blog);

  return {
    title: blog.title,
    description: blog.excerpt || `Read ${blog.title} by ${authorNames.join(', ') || 'NIAC'} on the Nepal International ADR Center blog.`,
    keywords: `${blog.title}, ${blog.category || ''}, ADR, arbitration, mediation, NIAC, Nepal`,
    openGraph: {
      title: `${blog.title} | NIAC`,
      description: blog.excerpt || blog.title,
      url: `${baseUrl}/blogs/${blog.slug}`,
      type: 'article',
      siteName: 'NIAC - Nepal International ADR Center',
      publishedTime: blog.published_date,
      modifiedTime: blog.updated_date,
      authors: authorNames,
      images: blog.featured_image
        ? [{ url: blog.featured_image, width: 1200, height: 630, alt: blog.title }]
        : [{ url: `${baseUrl}/images/og-image.jpg`, width: 1200, height: 630, alt: 'NIAC' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | NIAC`,
      description: blog.excerpt || blog.title,
      images: blog.featured_image ? [blog.featured_image] : [`${baseUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/blogs/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const [blog, allBlogs] = await Promise.all([fetchBlog(slug), fetchBlogs()]);

  if (!blog) {
    notFound();
  }

  const authors = getBlogAuthors(blog);
  const authorNames = authors.map((a) => a.name).filter(Boolean);
  const relatedBlogs = allBlogs
    .filter((item) => item.slug !== blog.slug)
    .sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
    .slice(0, 3);

  const blogSchema = generateBlogSchema(blog);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'News & Insights', url: '/blogs' },
    { name: blog.title, url: `/blogs/${blog.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-white pt-[200px] pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-8 pt-8">
        <nav className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant">
          <Link href="/" className="hover:text-tertiary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blogs" className="hover:text-tertiary transition-colors">News & Insights</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-tertiary truncate max-w-[200px]">{blog.title}</span>
        </nav>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main content */}
          <div className="lg:col-span-8">
            <header className="mb-8 border border-outline-variant p-6 sm:p-8 bg-white">
              <div className="flex flex-wrap items-center gap-4 mb-5 text-[11px] font-semibold tracking-[0.05em] uppercase text-on-surface-variant">
                {blog.category && (
                  <span className="inline-flex items-center bg-tertiary-container text-white px-3 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
                    {blog.category}
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(blog.published_date)}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <User className="w-3.5 h-3.5" />
                  {authors.length > 0 ? (
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0">
                      {authors.map((author, index) => (
                        <span key={author.id || author.slug || index}>
                          {author.slug ? (
                            <Link href={`/team/${author.slug}`} className="font-medium text-primary-container hover:text-tertiary transition-colors">
                              {author.name}
                            </Link>
                          ) : (
                            <span className="font-medium text-primary-container">{author.name}</span>
                          )}
                          {index < authors.length - 1 && <span className="text-on-surface-variant">, </span>}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="font-medium text-primary-container">NIAC</span>
                  )}
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary-container mb-6 leading-tight">
                {blog.title}
              </h1>

              <p className="border-l-4 border-tertiary-container pl-5 text-base sm:text-lg leading-relaxed text-on-surface-variant italic">
                {blog.excerpt}
              </p>

              {blog.featured_image && (
                <div className="mt-8 overflow-hidden border border-outline-variant bg-surface-container-high">
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                </div>
              )}
            </header>

            <article className="border border-outline-variant bg-white p-6 sm:p-8 lg:p-10">
              <div
                className="text-on-surface leading-relaxed space-y-6 prose-headings:font-serif prose-headings:text-primary-container prose-headings:scroll-mt-24 prose-p:leading-8 prose-img:rounded-none prose-img:shadow-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <div className="border border-outline-variant bg-white p-6">
                <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant mb-5">
                  About the Author{authors.length > 1 ? 's' : ''}
                </h3>
                <div className="flex flex-col gap-4">
                  {authors.length > 0 ? (
                    authors.map((author, idx) => (
                      <div key={author.id || author.slug || idx} className="flex items-start gap-3 bg-surface-container-low p-4">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden bg-primary-container text-sm font-semibold text-white flex-shrink-0">
                          {author.name ? author.name.split(' ').map((n) => n[0]).slice(0, 2).join('') : 'N'}
                        </div>
                        <div className="min-w-0 flex-1">
                          {author.slug ? (
                            <Link href={`/team/${author.slug}`} className="block font-semibold text-primary-container hover:text-tertiary transition-colors text-sm">
                              {author.name}
                            </Link>
                          ) : (
                            <div className="font-semibold text-primary-container text-sm">{author.name}</div>
                          )}
                          <div className="text-[11px] text-on-surface-variant truncate">{author.title || 'Contributor'}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-3 bg-surface-container-low p-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-primary-container text-sm font-semibold text-white flex-shrink-0">
                        NI
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-primary-container text-sm">NIAC</div>
                        <div className="text-[11px] text-on-surface-variant">Editorial Team</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-primary-container p-6 text-white">
                <h4 className="font-serif text-xl mb-2">Need ADR Services?</h4>
                <p className="text-sm text-[#79849b] mb-5 leading-relaxed">
                  Contact our secretariat to learn how NIAC can assist with your dispute resolution needs.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-tertiary-container text-white px-6 py-3 text-[10px] font-semibold tracking-[0.15em] uppercase hover:brightness-110 transition-all duration-300"
                >
                  Contact Us
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* More Blogs */}
              <div className="border border-outline-variant bg-white p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-primary-container">More Articles</h3>
                  <Link href="/blogs" className="text-[11px] font-semibold tracking-[0.1em] uppercase text-tertiary hover:text-tertiary-container transition-colors">
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {relatedBlogs.length > 0 ? (
                    relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog.id}
                        href={`/blogs/${relatedBlog.slug}`}
                        className="group flex gap-3 border border-outline-variant p-3 transition-all hover:border-tertiary-container"
                      >
                        <div className="h-20 w-20 flex-none overflow-hidden bg-surface-container-high">
                          {relatedBlog.featured_image ? (
                            <img
                              src={relatedBlog.featured_image}
                              alt={relatedBlog.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant">
                              NIAC
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 text-[10px] font-semibold tracking-[0.1em] uppercase text-tertiary">
                            {relatedBlog.category || 'Article'}
                          </div>
                          <h4 className="line-clamp-2 text-sm font-medium leading-5 text-primary-container group-hover:text-tertiary transition-colors">
                            {relatedBlog.title}
                          </h4>
                          <p className="mt-1 text-[11px] text-on-surface-variant">{formatDate(relatedBlog.published_date)}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-on-surface-variant">More articles coming soon.</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
