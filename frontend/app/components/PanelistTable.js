import Link from 'next/link';

export default function PanelistTable({ panelists }) {
  if (!panelists || panelists.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-serif text-primary mb-2">No Panelists Found</h3>
        <p className="text-on-surface-variant text-sm">
          Our panel information is being updated. Please check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary-container">
            <th className="text-left px-6 py-4 text-xs font-semibold tracking-[0.15em] uppercase text-white">Name</th>
            <th className="text-left px-6 py-4 text-xs font-semibold tracking-[0.15em] uppercase text-white">Professional Background</th>
            <th className="text-left px-6 py-4 text-xs font-semibold tracking-[0.15em] uppercase text-white">Email</th>
            <th className="text-left px-6 py-4 text-xs font-semibold tracking-[0.15em] uppercase text-white">Mobile</th>
            <th className="text-left px-6 py-4 text-xs font-semibold tracking-[0.15em] uppercase text-white">CV</th>
          </tr>
        </thead>
        <tbody>
          {panelists.map((p, idx) => (
            <tr
              key={p.id || idx}
              className={`border-b border-outline-variant/40 transition-colors hover:bg-surface-container-low ${
                idx % 2 === 0 ? 'bg-white' : 'bg-surface-container-lowest'
              }`}
            >
              <td className="px-6 py-4">
                <Link
                  href={`/team/${p.slug}`}
                  className="font-serif text-base text-primary hover:text-tertiary transition-colors"
                >
                  {p.full_name}
                </Link>
              </td>
              <td className="px-6 py-4 text-sm text-on-surface-variant">
                {p.professional_background || p.job_title || '-'}
              </td>
              <td className="px-6 py-4">
                {p.email ? (
                  <a
                    href={`mailto:${p.email}`}
                    className="text-sm text-tertiary hover:text-tertiary-container transition-colors"
                  >
                    {p.email}
                  </a>
                ) : (
                  <span className="text-sm text-on-surface-variant/50">-</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-on-surface-variant">{p.phone || '-'}</td>
              <td className="px-6 py-4">
                <a
                  href={p.cv_url || `/team/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] uppercase text-tertiary hover:text-tertiary-container transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
