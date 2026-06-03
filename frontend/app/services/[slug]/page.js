import { fetchServices, fetchService } from '@/lib/api';
import { generateServiceSchema, generateBreadcrumbSchema, baseUrl } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, FileText, Phone } from 'lucide-react';

export async function generateStaticParams() {
  const areas = await fetchServices();
  return areas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = await fetchService(slug);

  if (!area) {
    return { title: 'Service Not Found' };
  }

  const plainDescription = area.description?.replace(/<[^>]*>/g, '').substring(0, 160) || '';

  return {
    title: `${area.name} – NIAC`,
    description: plainDescription || `${area.name} services at the Nepal International ADR Center.`,
    openGraph: {
      title: `${area.name} | NIAC`,
      description: plainDescription || `${area.name} services.`,
      url: `${baseUrl}/services/${area.slug}`,
      type: 'website',
      siteName: 'NIAC - Nepal International ADR Center',
      images: area.featured_image_url ? [{
        url: area.featured_image_url,
        width: 1200,
        height: 630,
        alt: area.name,
      }] : [{
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'NIAC',
      }],
    },
    alternates: {
      canonical: `${baseUrl}/services/${area.slug}`,
    },
  };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const area = await fetchService(slug);

  if (!area) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(area);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Consulting', url: '/services' },
    { name: area.name, url: `/services/${area.slug}` },
  ]);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        .service-content blockquote {
          border-left: 4px solid #9f8320;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: #f9f9f9;
          font-style: italic;
          color: #444;
          border-radius: 0 0.5rem 0.5rem 0;
        }
      `}</style>

      {/* Main Content */}
      <section className="max-w-[1200px] mx-auto py-16">
        <div className="max-w-[1200px] mt-20 mx-auto py-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="text-gray-500 hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary font-bold">{area.name}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-13 gap-12">
          {/* Left Column - 9/12 */}
          <div className="lg:col-span-9">
            {area.featured_image_url && (
              <div className="mb-10 overflow-hidden">
                <Image
                  src={area.featured_image_url}
                  alt={area.name}
                  width={1000}
                  height={550}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 75vw"
                />
              </div>
            )}

              <h2 class="relative text-blue-900 inline-block after:content-[''] mb-8 after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-2 after:bg-[#b08d2a] after:rounded-full">
              {area.name}
              </h2>
            <div className="service-content text-black leading-relaxed text-[#555] space-y-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: area.description,
                }}
              />
            </div>
          </div>

          {/* Right Sidebar - 3/12, hidden on mobile */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="space-y-8">
              {/* Company Presentation Button */}
              <div>
                <Link
                  href="/pdfs/company-presentation.pdf"
                  className="flex items-center gap-4 w-full bg-blue-900 text-white px-6 py-5 text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-primary/90 transition-all rounded-sm"
                >
                  <FileText className="w-6 h-6 shrink-0" />
                  <span>Company presentation</span>
                </Link>
              </div>

              {/* How can we help you? */}
              <div className="bg-[#9F8320] p-8">
                <h3 className="text-base font-bold  mb-4">
                  How can we help you?
                </h3>
                <p className="text-sm leading-relaxed  mb-6">
                  Contact us at the NIAC office nearest to you or submit an inquiry online.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 text-[12px] font-semibold tracking-[0.05em] uppercase hover:bg-primary hover:text-white transition-all rounded-sm border border-gray-200"
                >
                  <Phone className="w-4 h-4" />
                  contacts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#f5f5f5]">
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-xl font-bold text-[#222]">
              Looking for a Best in Class ADR Consultants?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-primary/90 transition-all rounded-sm"
            >
              get a quote <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
