import { fetchTeams } from '@/lib/api';
import { baseUrl } from '@/lib/seo';
import PanelistTable from '../components/PanelistTable';

export const metadata = {
  title: 'National Panelist - NIAC',
  description: 'Meet our esteemed national panel of arbitrators and ADR professionals at the Nepal International ADR Center.',
  keywords: 'NIAC national panelists, arbitrators Nepal, ADR Nepal, dispute resolution experts',
  openGraph: {
    title: 'National Panelist | NIAC',
    description: 'Meet our esteemed national panel of arbitrators and ADR professionals.',
    url: `${baseUrl}/national-panelist`,
    type: 'website',
    siteName: 'NIAC - Nepal International ADR Center',
    images: [{
      url: `${baseUrl}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'NIAC National Panelists',
    }],
  },
  alternates: {
    canonical: `${baseUrl}/national-panelist`,
  },
};

export default async function NationalPanelistPage() {
  const teams = await fetchTeams();
  const panelists = teams.filter(t =>
    t.panelist?.split(',').map(s => s.trim()).includes('National Panelist')
  );
  console.log('Fetched panelists:', teams);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center justify-center pt-[200px] pb-[120px]">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__ARamoasU8vudNnniF55FAu2RLVGMqLQCUDe4jA6rrEGgzcKngsu5STJOME5Zwb-45IjN4VFk9ZVS4nc0NUVjA3sli3TlVYQnP2y2dKwI0S8hsiFmNq3EA_0YEnbuNwRi-TysXryDANgKzQVrbrby9Z0AMGj6ZksI_ix6P9xjyw0Re7-7eF3ZCnvg29_kYqK8tG1bhmRrrNNd3DW5xWVSnhbXE6kvo6whxlMfP4JWMvT5u5oVBYSTu5p8KR00kny2z-zVgWW7WZz"
            alt="NIAC national panelists hero"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(rgba(16, 28, 46, 0.85), rgba(16, 28, 46, 0.95))' }}
          />
        </div>
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h1 className="font-serif text-5xl leading-[1.2] font-semibold text-white mb-2 drop-shadow-sm">
            National Panelist
          </h1>
          <p className="text-lg leading-[1.6] text-white/90 max-w-2xl mx-auto">
            Nepal&rsquo;s foremost arbitrators and ADR professionals dedicated to upholding justice.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="max-w-[1600px] mx-auto px-8 py-[120px]">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-4">
            <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container">
              Roster of Arbitrators
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
        <div className="bg-primary-container text-white px-10 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-[28px] mb-2">Looking for an Arbitrator?</h2>
            <p className="text-sm text-white/70 max-w-xl">
              Contact the NIAC Secretariat to appoint an arbitrator or learn more about our arbitration services.
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
