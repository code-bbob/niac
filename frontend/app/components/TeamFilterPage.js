'use client';

import { useState } from 'react';
import TeamCard from './TeamCard';

export default function TeamFilterPage({ teams, Services }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL service');

  const filteredTeams = selectedFilter === 'ALL service' 
    ? teams 
    : teams.filter(team => 
        team.specializations?.split(',').map(s => s.trim()).includes(selectedFilter)
      );

  return (
    <>
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-outline-variant pb-4">
        <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container">Our Panelists</h2>
        <div className="w-24 h-0.5 bg-tertiary-container hidden md:block" />
      </div>

      {/* Filter Tabs */}
      {Services.length > 1 && (
        <div className="flex overflow-x-auto pb-2 sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {Services.slice(0, 8).map((area) => (
            <button
              key={area}
              onClick={() => setSelectedFilter(area)}
              className={`flex-shrink-0 px-5 py-2.5 text-[10px] font-semibold tracking-[0.12em] uppercase transition-all duration-300 ${
                selectedFilter === area
                  ? 'bg-tertiary-container text-white shadow-md'
                  : 'bg-white text-secondary border border-outline-variant hover:border-tertiary-container/50 hover:text-tertiary'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      )}

      {/* Teams Grid */}
      {filteredTeams.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeams.map((team, idx) => (
            <div key={team.id} style={{transitionDelay: `${idx * 50}ms`}} className="animate-fade-in">
              <TeamCard team={team} priority={idx < 8} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {teams.length > 0 && filteredTeams.length === 0 && (
        <div className="text-center py-20">
          <p className="text-on-surface-variant text-base">No panelists found for <span className="font-semibold text-primary">{selectedFilter}</span>.</p>
        </div>
      )}
    </>
  );
}
