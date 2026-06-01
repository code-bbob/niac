'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function ServicesShowMore({ Services }) {
  const [showMore, setShowMore] = useState(false);
  
  const initialDisplay = 6;
  const displayedAreas = showMore ? Services : Services.slice(0, initialDisplay);

  // Helper function to strip HTML and truncate description
  const getPlainTextDescription = (htmlDescription, maxLength = 150) => {
    if (!htmlDescription) return 'Expert legal services tailored to your needs.';
    
    // Strip HTML tags
    const plainText = htmlDescription.replace(/<[^>]*>/g, '');
    
    // Truncate to maxLength and add ellipsis if needed
    if (plainText.length > maxLength) {
      return plainText.substring(0, maxLength).trim() + '...';
    }
    
    return plainText;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedAreas.map((area) => (
          <Link key={area.id} href={`/services/${area.slug}`}>
            <div className="group bg-white hover:bg-gradient-to-br hover:from-amber-50/40 hover:to-white rounded-xl p-5 sm:p-8 transition-all duration-500 cursor-pointer border border-slate-100 hover:border-amber-200/50 h-full flex flex-col relative overflow-hidden">
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 group-hover:from-amber-600 group-hover:to-amber-700 transition-all duration-500 flex items-center justify-center shadow-sm group-hover:shadow-md">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-700 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-3 sm:mb-4 leading-tight group-hover:text-amber-800 transition-colors duration-300">
                {area.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6 flex-grow">
                {getPlainTextDescription(area.description)}
              </p>
              
              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm group-hover:text-amber-800 group-hover:gap-3 transition-all duration-300">
                <span className="tracking-wide">LEARN MORE</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Button */}
      {Services.length > initialDisplay && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group flex items-center gap-3 px-10 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all duration-300"
          >
            <span>{showMore ? 'Show Less' : `View ${Services.length - initialDisplay} More Services`}</span>
            <ChevronDown size={20} className={`transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* Mobile View All Services Link */}
      <div className="lg:hidden text-center mt-10">
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 hover:gap-3 transition-all"
        >
          <span className="text-sm tracking-wide">VIEW ALL SERVICES</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </>
  );
}
