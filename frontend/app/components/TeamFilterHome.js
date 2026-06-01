'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function TeamFilterHome({ teams, Services }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL service');

  // Filter teams based on selected service
  const filteredTeams = selectedFilter === 'ALL service' 
    ? teams 
    : teams.filter(team => 
        team.specializations?.split(',').map(s => s.trim()).includes(selectedFilter)
      );

  return (
    <>
      {/* Filter Tabs */}
      {Services.length > 1 && (
        <div className="flex overflow-x-auto pb-2 sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {Services.slice(0, 6).map((area) => (
            <button
              key={area}
              onClick={() => setSelectedFilter(area)}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded font-medium text-xs sm:text-sm transition-all duration-300 ${
                selectedFilter === area
                  ? 'bg-amber-700 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              {area.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {filteredTeams.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredTeams.map((team, idx) => (
              <a
                key={team.id}
                href={`/team/${team.slug}`}
                className="group block bg-white rounded overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-[50vh] sm:h-[40vh] bg-gray-100 overflow-hidden">
                  {team.photo_url ? (
                    <Image 
                      src={team.photo_url} 
                      alt={team.full_name}
                      fill
                      className="object-cover object-[50%_10%] transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={idx < 4}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-8xl text-gray-300">👤</span>
                    </div>
                  )}
                  
                  {/* Overlay Label */}
                  <div className="absolute hover:backdrop-blur-sm text-center bottom-0 left-0 right-0 p-4 sm:p-6 bg-transparent bg-black/20 bg-opacity-80">
                    <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-1 sm:mb-2">
                      {team.job_title || 'Team at Law'}
                    </p>
                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">
                      {team.full_name}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/teams"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 hover:gap-3 transition-all group"
            >
              <span className="text-sm tracking-wide">VIEW ALL ATTORNEYS</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-700 text-lg">No teams found for this service.</p>
        </div>
      )}
    </>
  );
}
