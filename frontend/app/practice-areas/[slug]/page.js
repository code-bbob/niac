import Link from 'next/link';
import Image from 'next/image';
import { fetchServices, fetchService } from '@/lib/api';
import { generateServiceSchema, generateBreadcrumbSchema, baseUrl } from '@/lib/seo';
import { notFound } from 'next/navigation';
import FadeIn from '../../components/FadeIn';
import ScrollFadeIn from '../../components/ScrollFadeIn';

// Generate static pages for all service at build time
export async function generateStaticParams() {
  const areas = await fetchServices();
  return areas.map((area) => ({
    slug: area.slug,
  }));
}

// Dynamic metadata for each service
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = await fetchService(slug);
  
  if (!area) {
    return {
      title: 'service Not Found',
    };
  }

  const plainDescription = area.description?.replace(/<[^>]*>/g, '').substring(0, 160) || '';

  return {
    title: `${area.name} - Legal Services`,
    description: plainDescription || `Expert ${area.name} legal services at Equity Law & Co. Get professional consultation and representation in Nepal.`,
    keywords: `${area.name}, legal services Nepal, ${area.name} lawyer, ${area.name} team, Equity Law`,
    openGraph: {
      title: `${area.name} | Equity Law & Co.`,
      description: plainDescription || `Expert ${area.name} legal services.`,
      url: `${baseUrl}/services/${area.slug}`,
      type: 'website',
      siteName: 'Equity Law & Co.',
      images: area.featured_image_url ? [{
        url: area.featured_image_url,
        width: 1200,
        height: 630,
        alt: area.name,
      }] : [{
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Equity Law & Co.',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${area.name} | Equity Law & Co.`,
      description: plainDescription || `Expert ${area.name} legal services.`,
      images: area.featured_image_url ? [area.featured_image_url] : [`${baseUrl}/images/og-image.jpg`],
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

  const ServiceSchema = generateServiceSchema(area);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'service', url: '/services' },
    { name: area.name, url: `/services/${area.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-amber-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        figure {
          margin: 1rem 0;
          max-width: 100%;
        }
        figure.image {
          display: inline-block;
          max-width: 100%;
        }
        @media (max-width: 768px) {
          figure.image-style-side,
          figure.image-style-align-left,
          figure.image-style-align-right {
            float: none;
            margin: 1rem 0 !important;
            width: 100%;
            max-width: 100%;
          }
        }
        figure.image-style-side {
          float: right;
          margin: 0 0 1rem 1.5rem;
          max-width: 40%;
        }
        figure.image-style-align-left {
          float: left;
          margin: 0 1.5rem 1rem 0;
          max-width: 40%;
        }
        figure.image-style-align-right {
          float: right;
          margin: 0 0 1rem 1.5rem;
          max-width: 40%;
        }
        figure.image-style-align-center {
          display: block;
          margin: 1.5rem auto;
          text-align: center;
          max-width: 100%;
        }
        figure.image-style-full {
          display: block;
          width: 100%;
          margin: 1.5rem 0;
          max-width: 100%;
        }
        figure img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          display: block;
          object-fit: cover;
        }
        figcaption {
          text-align: center;
          font-size: 0.875rem;
          color: #92400e;
          margin-top: 0.5rem;
        }
      `}</style>

      {/* Hero Section with Featured Image */}
        <div className="relative h-32 py-8 sm:py-16 md:h-64 bg-[url('/images/banner2.jpg')] bg-cover bg-center overflow-hidden">
 
            <div className="mx-auto px-4 sm:px-6 lg:px-44 w-full">
              <FadeIn delay={100} duration={700} slideDistance={30}>
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">service</h1>
              </FadeIn>
              <FadeIn delay={250} duration={700}>
                <p className="text-sm sm:text-lg md:text-xl  text-amber-100">Areas of Services</p>
              </FadeIn>
            </div>
          </div>


      {/* Main Content */}
      <article className={`mx-auto px-6 sm:px-6 lg:px-44 ${area.featured_image_url ? 'py-8 sm:py-12' : 'py-10 sm:py-16'}`}>
          <ScrollFadeIn>
            <header className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-900 mb-4">{area.name}</h1>
              <div className="flex items-center space-x-4 text-amber-800">
                <span className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-semibold">
                  service
                </span>
              </div>
          </header>
          </ScrollFadeIn>

        {/* Two Column Layout: Description + Images */}
        <ScrollFadeIn duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 overflow-hidden">
          {/* Main Description - 2 columns */}
          <div className="lg:col-span-2 overflow-hidden">
            <div className="prose prose-sm md:prose-lg max-w-none prose-img:rounded-lg prose-img:shadow-md overflow-hidden">
              <div
                className="text-amber-900 leading-relaxed text-sm md:text-lg break-words overflow-x-hidden"
                dangerouslySetInnerHTML={{
                  __html: area.description,
                }}
              />
            </div>
          </div>

          {/* Side Gallery */}
          {area.featured_image_url && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 lg:top-20">
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-6 rounded-lg border-2 border-amber-300">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">Key Information</h3>
                  <div className="relative w-full h-64 mb-4">
                    <Image
                      src={area.featured_image_url}
                      alt={area.name}
                      fill
                      className="object-cover rounded-lg shadow-md"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <ul className="space-y-3 text-sm text-amber-900">
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Expert legal consultation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Years of industry experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Personalized strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-800 mr-3 mt-1">✓</span>
                      <span>Proven track record</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        </ScrollFadeIn>

        {/* CTA Section */}
        <ScrollFadeIn duration={800}>
          <div className="bg-[url('/images/banner1.jpg')] bg-cover bg-center rounded-xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Discuss Your Case?</h2>
              <p className="text-base sm:text-lg text-amber-50 mb-6">
                Our experienced team specializes in {area.name.toLowerCase()} and is ready to help you achieve the best possible outcome.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/appointments" className="bg-amber-50 text-amber-900 hover:bg-white px-6 sm:px-8 py-3 rounded-lg font-bold transition-colors text-sm sm:text-base">
                  Schedule Consultation
                </Link>
                <a href="tel:+977-9841052926" className="bg-amber-600 text-amber-50 hover:bg-amber-700 px-6 sm:px-8 py-3 rounded-lg font-bold transition-colors text-sm sm:text-base">
                  Call (9841052926)
                </a>
              
              </div>
            </div>
          </div>
          </div>
        </ScrollFadeIn>

        {/* Why Choose Us Section */}
        <ScrollFadeIn duration={800}>
          <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 sm:mb-8">Why Choose Our {area.name} Team?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-100 p-4 sm:p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3">✓ Expertise</h3>
              <p className="text-amber-800">Deep knowledge and extensive experience in {area.name}</p>
            </div>
            <div className="bg-amber-100 p-4 sm:p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3">✓ Dedication</h3>
              <p className="text-amber-800">Committed to achieving the best results for our clients</p>
            </div>
            <div className="bg-amber-100 p-4 sm:p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3">✓ Innovation</h3>
              <p className="text-amber-800">Using cutting-edge strategies and legal approaches</p>
            </div>
            <div className="bg-amber-100 p-4 sm:p-6 rounded-lg border border-amber-300 hover:border-amber-700 hover:shadow-lg transition-all">
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3">✓ Results</h3>
              <p className="text-amber-800">Track record of successful cases and satisfied clients</p>
            </div>
          </div>
          </div>
        </ScrollFadeIn>

        {/* Image Gallery Section */}
        {area.gallery_images && area.gallery_images.length > 0 && (
          <ScrollFadeIn duration={800}>
            <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 sm:mb-8">Our Work & Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {area.gallery_images.map((image, idx) => {
                return (
                  <div key={image.id || idx} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <div className="relative w-full h-64">
                      <Image
                        src={image.image_url}
                        alt={image.title || `Gallery image ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    {image.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 w-full">
                          <h3 className="text-white font-bold">{image.title}</h3>
                          {image.description && (
                            <p className="text-amber-100 text-sm">{image.description}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            </div>
          </ScrollFadeIn>
        )}

        {/* Process Section */}
        <ScrollFadeIn duration={800}>
          <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 sm:mb-8">Our Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Consultation', 'Analysis', 'Strategy', 'Resolution'].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-amber-800 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-amber-900 mb-2">{step}</h3>
                <p className="text-sm text-amber-800">Professional {step.toLowerCase()} and planning</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-amber-800 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
          </div>
        </ScrollFadeIn>
      </article>

      {/* Contact Section */}
    </div>
  );
}
