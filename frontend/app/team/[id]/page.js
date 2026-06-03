import { fetchTeams, fetchTeam } from '@/lib/api';
import { generateTeamSchema, generateBreadcrumbSchema, baseUrl } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// Generate static pages for all teams at build time
export async function generateStaticParams() {
  const teams = await fetchTeams();
  return teams.map((team) => ({
    id: team.slug,
  }));
}

// Dynamic metadata for each team
export async function generateMetadata({ params }) {
  const { id } = await params;
  const team = await fetchTeam(id);

  if (!team) {
    return {
      title: 'Team Not Found',
    };
  }

  const description =
    team.short_bio ||
    team.professional_background?.substring(0, 160) ||
    `${team.full_name} serves on the NIAC panel of neutrals in Nepal.`;

  return {
    title: `${team.full_name}${team.job_title ? ` - ${team.job_title}` : ''}`,
    description,
    keywords: `${team.full_name}, ${team.job_title || 'panelist'}, NIAC, ADR Nepal, ${team.specializations || ''}`,
    openGraph: {
      title: `${team.full_name}${team.job_title ? ` - ${team.job_title}` : ''} | NIAC`,
      description,
      url: `${baseUrl}/team/${team.slug}`,
      type: 'profile',
      siteName: 'NIAC - Nepal International ADR Center',
      images: team.photo_url
        ? [{
          url: team.photo_url,
          width: 1200,
          height: 630,
          alt: team.full_name,
        }]
        : [{
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'NIAC',
        }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${team.full_name}${team.job_title ? ` - ${team.job_title}` : ''} | NIAC`,
      description,
      images: team.photo_url ? [team.photo_url] : [`${baseUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/team/${team.slug}`,
    },
  };
}

export default async function TeamDetailsPage({ params }) {
  const { id } = await params;
  const team = await fetchTeam(id);

  if (!team) {
    notFound();
  }

  const teamSchema = generateTeamSchema(team);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Team', url: '/team' },
    { name: team.full_name, url: `/team/${team.slug}` },
  ]);

  const specializations = (team.specializations || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-[160px] pb-[90px]">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__ARamoasU8vudNnniF55FAu2RLVGMqLQCUDe4jA6rrEGgzcKngsu5STJOME5Zwb-45IjN4VFk9ZVS4nc0NUVjA3sli3TlVYQnP2y2dKwI0S8hsiFmNq3EA_0YEnbuNwRi-TysXryDANgKzQVrbrby9Z0AMGj6ZksI_ix6P9xjyw0Re7-7eF3ZCnvg29_kYqK8tG1bhmRrrNNd3DW5xWVSnhbXE6kvo6whxlMfP4JWMvT5u5oVBYSTu5p8KR00kny2z-zVgWW7WZz"
            alt="NIAC panelist profile hero"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(rgba(16, 28, 46, 0.9), rgba(16, 28, 46, 0.98))' }}
          />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-8">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/70 mb-6">
            <Link href="/" className="hover:text-tertiary-fixed transition-colors">Home</Link>
            <span>•</span>
            <Link href="/team" className="hover:text-tertiary-fixed transition-colors">Team</Link>
            <span>•</span>
            <span className="text-white">{team.full_name}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3 leading-tight">
            {team.full_name}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {team.job_title || 'NIAC Panelist'}
          </p>
        </div>
      </section>

      {/* Profile */}
      <section className="max-w-[1200px] mx-auto px-8 py-[90px]">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 items-start">
          <div className="bg-surface-container-lowest border border-outline-variant/70 p-6">
            <div className="relative w-full aspect-[5/4] overflow-hidden">
              {team.photo_url ? (
                <Image
                  src={team.photo_url}
                  alt={team.full_name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-container-high">
                  <span className="text-7xl text-on-surface-variant/40">{team.full_name?.charAt(0) || '?'}</span>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="inline-flex items-center gap-2 bg-tertiary-fixed/20 border border-tertiary-fixed/40 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-tertiary-container rounded-full" />
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-tertiary">
                  {team.category || 'Panel of Neutrals'}
                </span>
              </div>

              {team.short_bio && (
                <p className="text-sm leading-relaxed text-on-surface-variant italic">
                  &ldquo;{team.short_bio}&rdquo;
                </p>
              )}

              <div className="space-y-3">
                {team.phone && (
                  <a
                    href={`tel:${team.phone}`}
                    className="flex items-center justify-between border border-outline-variant/60 px-4 py-3 text-sm text-secondary hover:border-tertiary-container hover:text-tertiary transition-all"
                  >
                    <span>Phone</span>
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase">{team.phone}</span>
                  </a>
                )}
                {team.email && (
                  <a
                    href={`mailto:${team.email}`}
                    className="flex items-center justify-between border border-outline-variant/60 px-4 py-3 text-sm text-secondary hover:border-tertiary-container hover:text-tertiary transition-all"
                  >
                    <span>Email</span>
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase">{team.email}</span>
                  </a>
                )}
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center w-full bg-primary-container text-white text-xs font-semibold tracking-[0.2em] uppercase py-4 hover:bg-primary transition-all"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="border-b border-outline-variant/60 pb-6 mb-8">
              <h2 className="font-serif text-[32px] text-primary mb-3">
                {team.job_title || 'NIAC Panelist'}
              </h2>
              <p className="text-base text-on-surface-variant leading-relaxed max-w-2xl">
                {team.short_bio || 'Dedicated to fair, efficient, and principled dispute resolution across Nepal and beyond.'}
              </p>
            </div>

            {specializations.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-tertiary mb-4">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {specializations.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase border border-outline-variant/60 text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {team.about && (
              <div className="bg-surface-container-low border border-outline-variant/40 p-8">
                <h3 className="font-serif text-[28px] text-primary mb-6">About</h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {team.about}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-8 pb-[120px]">
        <div className="bg-primary-container text-white px-10 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-[28px] mb-2">Connect with NIAC</h2>
            <p className="text-sm text-white/70 max-w-xl">
              Reach out to the Secretariat for appointments, arbitration filings, or mediated consultations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/40 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-primary-container transition-all"
            >
              Contact Secretariat
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center bg-tertiary-fixed text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 text-primary-container hover:bg-tertiary-fixed-dim transition-all"
            >
              View Full Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
