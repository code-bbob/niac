import Link from "next/link";
import { fetchBlogsPage } from "@/lib/api";
import { baseUrl } from "@/lib/seo";
import { Calendar, User, ChevronRight, ChevronLeft } from "lucide-react";

export const metadata = {
  title: "News & Insights",
  description: "Explore the latest news, articles, and insights from the Nepal International ADR Center on arbitration, mediation, and dispute resolution.",
  keywords: "NIAC news, ADR articles, arbitration insights, mediation Nepal, dispute resolution blog",
  openGraph: {
    title: "News & Insights | NIAC",
    description: "Explore the latest news and insights from the Nepal International ADR Center.",
    url: `${baseUrl}/blogs`,
    type: "website",
    siteName: "NIAC - Nepal International ADR Center",
    images: [{
      url: `${baseUrl}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: "NIAC - News & Insights",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Insights | NIAC",
    description: "Explore the latest news and insights from the Nepal International ADR Center.",
    images: [`${baseUrl}/images/og-image.jpg`],
  },
  alternates: {
    canonical: `${baseUrl}/blogs`,
  },
};

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      {currentPage > 1 && (
        <Link
          href={`/blogs?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-on-surface-variant border border-outline-variant hover:border-tertiary-container hover:text-tertiary transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      )}

      {start > 1 && (
        <>
          <Link
            href="/blogs"
            className="w-10 h-10 flex items-center justify-center text-sm font-medium text-on-surface-variant border border-outline-variant hover:border-tertiary-container hover:text-tertiary transition-all duration-300"
          >
            1
          </Link>
          {start > 2 && <span className="text-on-surface-variant">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? "/blogs" : `/blogs?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            page === currentPage
              ? "bg-tertiary-container text-white border border-tertiary-container"
              : "text-on-surface-variant border border-outline-variant hover:border-tertiary-container hover:text-tertiary"
          }`}
        >
          {page}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-on-surface-variant">...</span>}
          <Link
            href={`/blogs?page=${totalPages}`}
            className="w-10 h-10 flex items-center justify-center text-sm font-medium text-on-surface-variant border border-outline-variant hover:border-tertiary-container hover:text-tertiary transition-all duration-300"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={`/blogs?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-on-surface-variant border border-outline-variant hover:border-tertiary-container hover:text-tertiary transition-all duration-300"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

export default async function BlogsPage({ searchParams }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page) || 1;
  const { blogs, total, totalPages, currentPage: page } = await fetchBlogsPage(currentPage);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F1B4B] pt-[200px]">
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 pb-[50px]">
          <nav className="flex items-center gap-2 mb-4 text-white/60 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <Link href="/" className="text-white hover:text-tertiary-fixed transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <span className="text-tertiary-fixed">News & Insights</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white max-w-3xl mb-6 leading-tight">
            News & Insights
          </h1>
          <p className="text-base sm:text-lg text-white max-w-2xl leading-relaxed">
            Stay informed with the latest developments in arbitration, mediation, and alternative dispute resolution from NIAC and the global ADR community.
          </p>
        </div>
        <div className="absolute -right-1/4 -top-1/4 w-[600px] h-[600px] bg-[#755b00] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Blog Grid */}
      <section className="max-w-[1200px] mx-auto px-8 py-[50px]">
        {blogs.length === 0 ? (
          <div className="text-center max-w-7xl mx-auto py-20">
            <div className="text-6xl mb-4">&#128214;</div>
            <h3 className="text-2xl font-serif text-primary mb-2">No Articles Found</h3>
            <p className="text-on-surface-variant text-sm">
              Our insights and articles are being updated. Please check back soon.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-outline-variant pb-4">
              <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container">
                {total > 0 ? `Showing ${blogs.length} of ${total} Articles` : "All Articles"}
              </h2>
              <div className="w-24 h-0.5 bg-tertiary-container hidden md:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <article
                  key={blog.id}
                  className="group bg-white border border-outline-variant hover:shadow-lg transition-all duration-500 overflow-hidden"
                  style={{ borderTop: "2px solid #c9a84c", transitionDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-container focus-visible:ring-offset-2"
                  >
                    {/* Featured Image */}
                    {blog.featured_image ? (
                      <div className="relative h-52 w-full overflow-hidden bg-surface-container-high">
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {blog.category && (
                          <span className="absolute top-4 right-4 bg-tertiary-container text-white px-3 py-1 text-[10px] font-semibold tracking-[0.1em] uppercase">
                            {blog.category}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="relative h-52 w-full bg-surface-container-high flex items-center justify-center">
                        <span className="text-on-surface-variant text-[10px] font-semibold tracking-[0.2em] uppercase">NIAC</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl leading-[1.3] font-medium text-primary-container mb-3 line-clamp-2 group-hover:text-tertiary transition-colors duration-300">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-on-surface-variant mb-5 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-[11px] text-on-surface-variant border-t border-outline-variant pt-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="font-medium">{formatDate(blog.published_date)}</span>
                        </div>

                        <div className="flex items-center gap-1.5 min-w-0">
                          <User className="w-3.5 h-3.5 flex-shrink-0" />
                          {Array.isArray(blog.author) && blog.author.length > 0 ? (
                            <span className="truncate text-right">
                              {blog.author.map((author, idx) => (
                                <span key={author.id || idx}>
                                  {author.name}
                                  {idx < blog.author.length - 1 && ", "}
                                </span>
                              ))}
                            </span>
                          ) : (
                            <span>NIAC</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} />
          </>
        )}
      </section>
    </div>
  );
}
