import { fetchTeams } from '@/lib/api';
import { baseUrl } from '@/lib/seo';
import PanelistTable from '../components/PanelistTable';

export const metadata = {
  title: 'International Panelist - NIAC',
  description: 'Discover our international panel of arbitrators and ADR experts serving the global dispute resolution community.',
  keywords: 'NIAC international panelists, international arbitrators, global ADR, cross-border dispute resolution',
  openGraph: {
    title: 'International Panelist | NIAC',
    description: 'Discover our international panel of arbitrators and ADR experts.',
    url: `${baseUrl}/international-panelist`,
    type: 'website',
    siteName: 'NIAC - Nepal International ADR Center',
    images: [{
      url: `${baseUrl}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'NIAC International Panelists',
    }],
  },
  alternates: {
    canonical: `${baseUrl}/international-panelist`,
  },
};

export default async function InternationalPanelistPage() {
  const teams = await fetchTeams();
  const panelists = teams.filter(t =>
    t.panelist?.split(',').map(s => s.trim()).includes('International Panelist')
  );

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#9F8320] overflow-hidden flex items-center justify-center pt-[150px] pb-[50px]">
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h1 className="font-serif text-5xl leading-[1.2] font-semibold text-white mb-2 drop-shadow-sm">
            International Panelist
          </h1>
          <p className="text-lg leading-[1.6] text-white/90 max-w-2xl mx-auto">
            Globally renowned arbitrators and ADR professionals serving cross-border dispute resolution.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="max-w-[1200px] mx-auto px-8 py-[120px]">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-4">
            <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container">
              International Panel of Arbitrators
            </h2>
            <div className="w-24 h-0.5 bg-tertiary-container hidden md:block" />
          </div>
        </div>
        <div className="border border-outline-variant/60 rounded-sm overflow-hidden">
          <PanelistTable panelists={panelists} />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-8 pb-[120px]">
        <div className="bg-[#9F8320] text-white px-10 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-[28px] mb-2">Global Dispute Resolution</h2>
            <p className="text-sm text-white/70 max-w-xl">
              Contact the NIAC Secretariat to appoint an international arbitrator or learn about cross-border ADR services.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center border border-white/40 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-primary-container transition-all"
            >
              Contact Secretariat
            </a>
            <a
              href="/services/arbitration"
              className="inline-flex items-center justify-center bg-tertiary-fixed text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 text-primary-container hover:bg-tertiary-fixed-dim transition-all"
            >
              Arbitration Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
