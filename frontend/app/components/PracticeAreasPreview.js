import Link from 'next/link';
import { fetchServices } from '@/lib/api';
import ServicesShowMore from './ServicesShowMore';
import ScrollFadeIn from './ScrollFadeIn';

export default async function ServicesPreview() {
  const Services = await fetchServices();

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-amber-50">
      <div className="mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <ScrollFadeIn>
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold text-amber-700 tracking-[0.2em] uppercase">Our Expertise</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-4 mb-5 leading-tight">
                  Comprehensive Legal Representation <br className="hidden sm:block" />for Modern Challenges
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  We provide sophisticated legal solutions tailored to your unique needs, combining decades of experience with innovative approaches to deliver exceptional results.
                </p>
              </div>
              {Services.length > 0 && (
                <Link 
                  href="/services" 
                  className="hidden lg:flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all group whitespace-nowrap ml-8"
                >
                  <span className="text-sm tracking-wide">VIEW ALL SERVICES</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </ScrollFadeIn>

        {Services.length > 0 && (
          <ServicesShowMore Services={Services} />
        )}
      </div>
    </section>
  );
}
