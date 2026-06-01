import { fetchServices, fetchService } from '@/lib/api';
import { generateServiceSchema, generateBreadcrumbSchema, baseUrl } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';

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
    title: `${area.name} - NIAC Services`,
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
        .service-content figure { margin: 1.5rem 0; max-width: 100%; }
        .service-content figure.image-style-side { float: right; margin: 0 0 1rem 1.5rem; max-width: 40%; }
        .service-content figure.image-style-align-left { float: left; margin: 0 1.5rem 1rem 0; max-width: 40%; }
        .service-content figure.image-style-align-right { float: right; margin: 0 0 1rem 1.5rem; max-width: 40%; }
        .service-content figure.image-style-align-center { display: block; margin: 1.5rem auto; text-align: center; }
        .service-content img { max-width: 100%; height: auto; border-radius: 0.5rem; }
        .service-content figcaption { text-align: center; font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem; }
        .service-content a { color: #9f8320; text-decoration: underline; }
        @media (max-width: 768px) {
          .service-content figure.image-style-side,
          .service-content figure.image-style-align-left,
          .service-content figure.image-style-align-right { float: none; margin: 1rem 0; max-width: 100%; }
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-container pt-[200px] pb-[120px]">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: area.featured_image_url
                ? `url('${area.featured_image_url}')`
                : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkhaHZh4zXeTLzrXvrkuN-R1ThgwMOwIs3K4JeA-f5Bgecemn1_zh4pwYETiJsK3fTcXiwEbgbPg1E0QXRrfjXZzueu9fbtc8_NVxqMbdt5BBSaZ_pY4xj-mCA2_eZHLI2L1lTOWSOLEQnksSAWPT_cD1JxhH4_ChrSPomNrewPTLfLovb3wU1PVKq3KfMBIhOk8Ker6qOAKW9e0ku1bUxh_zbKjg3RxNGCVf7dqeiQM_zhY5730AVPK90zRIjfGxdtIT8oKjkfPN8')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(16, 28, 46, 0.85), rgba(16, 28, 46, 0.95))" }}
          />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-8 w-full">
          <nav className="flex items-center gap-2 mb-4 text-white/60 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <Link href="/" className="text-white hover:text-tertiary-fixed transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <Link href="/services" className="text-white hover:text-tertiary-fixed transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <span className="text-tertiary-fixed">{area.name}</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl text-white max-w-3xl mb-6">
            {area.name}
          </h1>
          <p className="text-white text-base sm:text-lg max-w-xl">
            Professional dispute resolution services at the Nepal International ADR Center.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1600px] mx-auto px-8 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-8">Overview</h2>
            <div className="service-content text-base leading-relaxed text-on-surface-variant space-y-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: area.description,
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-surface-container-low border border-outline-variant p-8">
              {area.featured_image_url && (
                <div className="relative w-full h-48 mb-6 overflow-hidden">
                  <Image
                    src={area.featured_image_url}
                    alt={area.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              )}
              <h3 className="font-serif text-xl text-primary mb-4">Key Highlights</h3>
              <ul className="space-y-3">
                {[
                  'Expert panel of arbitrators and mediators',
                  'Institutional rules and procedures',
                  'Confidential and impartial process',
                  'Cost-effective dispute resolution',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="text-tertiary w-4 h-4 mt-0.5 shrink-0" />
                    <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-tertiary-container text-on-tertiary-fixed px-6 py-3 text-[11px] font-semibold tracking-[0.1em] uppercase hover:brightness-110 transition-all"
              >
                Inquire Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {area.gallery_images && area.gallery_images.length > 0 && (
        <section className="bg-surface-container-low py-[120px]">
          <div className="max-w-[1600px] mx-auto px-8">
            <div className="flex flex-col items-center mb-16">
              <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container mb-4">Gallery</h2>
              <div className="w-16 h-1 bg-tertiary-container" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {area.gallery_images.map((image, idx) => (
                <div key={image.id || idx} className="group relative overflow-hidden bg-white border border-outline-variant">
                  <div className="relative w-full h-64">
                    <Image
                      src={image.image_url}
                      alt={image.title || `Gallery ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {image.title && (
                    <div className="p-4 border-t border-outline-variant">
                      <h3 className="font-serif text-base text-primary">{image.title}</h3>
                      {image.description && (
                        <p className="text-xs text-on-surface-variant mt-1">{image.description}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary-container py-[120px] text-white text-center">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">Need {area.name} Services?</h2>
            <p className="text-white text-base sm:text-lg leading-relaxed mb-8">
              Our experienced team is ready to assist you with professional dispute resolution services.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-tertiary-container text-on-tertiary-fixed px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase hover:brightness-110 transition-all"
              >
                Submit an Inquiry
              </Link>
              <Link
                href="/appointments"
                className="border border-tertiary-container text-tertiary-container px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-tertiary-container/10 transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
