'use client';

import Link from 'next/link';

export default function TeamCard({ team, priority = false }) {
  const { slug, full_name, job_title, photo_url } = team;

  return (
    <Link href={`/team/${slug}`}>
      <div className="group bg-surface-container-lowest border border-outline-variant border-t-2 border-t-tertiary-container p-8 transition-all duration-500 hover:-translate-y-2">
        <div className="aspect-[7/6] mb-6 overflow-hidden  transition-all duration-700">
          {photo_url ? (
            <img
              src={photo_url}
              alt={full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
              <span className="text-4xl text-on-surface-variant/30">{full_name?.charAt(0) || '?'}</span>
            </div>
          )}
        </div>
        <h3 className="font-serif text-2xl text-primary mb-1">{full_name}</h3>
        <p className="text-xs font-semibold tracking-widest text-tertiary uppercase leading-none">{job_title || 'Panelist'}</p>
      </div>
    </Link>
  );
}
