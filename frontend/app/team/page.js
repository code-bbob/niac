import { fetchTeams } from '@/lib/api';
import { baseUrl } from '@/lib/seo';
import TeamCard from '../components/TeamCard';

export const metadata = {
  title: 'Our Team - NIAC Panelists & Mediators',
  description: 'Meet our distinguished panel of arbitrators, mediators, and ADR professionals at the Nepal International ADR Center.',
  keywords: 'NIAC panelists, arbitrators Nepal, mediators Nepal, ADR professionals, dispute resolution experts',
  openGraph: {
    title: 'Our Team | NIAC',
    description: 'Meet our distinguished panel of arbitrators, mediators, and ADR professionals.',
    url: `${baseUrl}/team`,
    type: 'website',
    siteName: 'NIAC - Nepal International ADR Center',
    images: [{
      url: `${baseUrl}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'NIAC Team',
    }],
  },
  alternates: {
    canonical: `${baseUrl}/team`,
  },
};

export default async function TeamPage() {
  const teams = await fetchTeams();
  console.log('Fetched teams:', teams);

  const categoryOrder = [
    'Patron in Chief',
    'The Founders',
    'Founders',
    'Executive Committe',
    'Executive Committee',
    'Advisory Board',
    'Panel of Arbitrators',
    'Panel of Mediators',
  ];

  const categoryMap = {};
  teams.forEach(team => {
    if (team.category) {
      const cats = team.category.split(',').map(c => c.trim()).filter(Boolean);
      cats.forEach(cat => {
        if (!categoryMap[cat]) categoryMap[cat] = [];
        categoryMap[cat].push(team);
      });
    }
  });

  const sortedCategories = Object.keys(categoryMap).sort((a, b) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center justify-center pt-[200px] pb-[120px]">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-50 "
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__ARamoasU8vudNnniF55FAu2RLVGMqLQCUDe4jA6rrEGgzcKngsu5STJOME5Zwb-45IjN4VFk9ZVS4nc0NUVjA3sli3TlVYQnP2y2dKwI0S8hsiFmNq3EA_0YEnbuNwRi-TysXryDANgKzQVrbrby9Z0AMGj6ZksI_ix6P9xjyw0Re7-7eF3ZCnvg29_kYqK8tG1bhmRrrNNd3DW5xWVSnhbXE6kvo6whxlMfP4JWMvT5u5oVBYSTu5p8KR00kny2z-zVgWW7WZz"
            alt="Legal library with leather-bound books"
          />
            <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(16, 28, 46, 0.85), rgba(16, 28, 46, 0.95))" }}
          />
        </div>
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h1 className="font-serif text-5xl leading-[1.2] font-semibold text-white mb-2 drop-shadow-sm">
            Our Team
          </h1>
          <p className="text-lg leading-[1.6] text-white/90 max-w-2xl mx-auto">
            The distinguished professionals behind our institutional excellence.
          </p>
        </div>
      </section>

      {/* Team by Category */}
      <section className="max-w-[1600px] mx-auto px-8 py-[120px]">
        {teams.length === 0 ? (
          <div className="text-center max-w-7xl mx-auto py-20">
            <div className="text-6xl mb-4">⚖</div>
            <h3 className="text-2xl font-serif text-primary mb-2">No Panelists Found</h3>
            <p className="text-on-surface-variant text-sm">
              Our panel information is being updated. Please check back soon.
            </p>
          </div>
        ) : (
          sortedCategories.map(category => (
            <div key={category} className="mb-16 last:mb-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-outline-variant pb-4">
                <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container">{category}</h2>
                <div className="w-24 h-0.5 bg-tertiary-container hidden md:block" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-items-center gap-6">
                {categoryMap[category].map((team, idx) => (
                  <div key={team.id} style={{transitionDelay: `${idx * 50}ms`}} className="animate-fade-in">
                    <TeamCard team={team} priority={idx < 4} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* The Secretariat */}
      {/* <section className="bg-surface-container-low py-[120px]">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col items-center mb-6">
            <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container mb-4">The Secretariat</h2>
            <div className="w-16 h-1 bg-tertiary-container" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border border-[#C8D0DC] group-hover:ring-2 ring-tertiary-container ring-offset-4 transition-all duration-400">
                <img
                  className="w-full h-full object-cover grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbPhEKkvWGOtTZcbekz9xqLs1VPgB7lmVtYFd9f2LVbHjjI1mDvrtsrUszp_XE7S6GieYqvfmOnXuD-eMbSVVBTb-xDEul5SaWTd5EeOuVZyS9LxZgm2MdgQIq55eTO5lVcrsdAFX53HYiwzo0Tm2QwPm21x1HhXYS1npcsitAc5_9EXske6GkVWOT-_dSqQVRG_IKZoqiQkO-vbDc0g_tyC02Ys3GtC2SQ92o_yWrCiDtlL5bNx3IBAGmOw5inTY1Sqwc34Z-toIU"
                  alt="Marcus Thorne"
                />
              </div>
              <h4 className="font-serif text-[20px] text-primary">Marcus Thorne</h4>
              <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">Registrar</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border border-[#C8D0DC] group-hover:ring-2 ring-tertiary-container ring-offset-4 transition-all duration-400">
                <img
                  className="w-full h-full object-cover grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIUxhbb1r2jxce784SPy6u9dLil3kRNF7TQY-YEg5zS4VDzkx9-WXrdhKMZpjCN_3J67gsIKknuUq1C2o-BEj1-NiTOV9O1n--JXXYv4ueeIL4wTzx0ym57MLJdfQZeS4vf8GmuqtUFMOW2RIV3-l0RnIBpaul9cWPTg43VmnqMEc26WlaVb-6axuyGEQItgEYtRjkyyIlNP8gdHZtl37rnCF9xLtRqw3usE2iNyPWS5k5WCsWLVx7A9ZDjNPYIDeCpdGi5-JvT4PM"
                  alt="Sophie Chen"
                />
              </div>
              <h4 className="font-serif text-[20px] text-primary">Sophie Chen</h4>
              <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">Senior Case Manager</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border border-[#C8D0DC] group-hover:ring-2 ring-tertiary-container ring-offset-4 transition-all duration-400">
                <img
                  className="w-full h-full object-cover grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBaUDPTTrzwOlm5u4jD5GPetxxYWUWowGKPB_LE2xGZ9ZxIKJ-BP7lmMammcXUfGTrkyBsfX2SQB1-7jG5Ehvc1zy6s1gRCW9kk44gE__Rt_XnalqDVwtXjAsYac_P5G8OucDYuUTauvJKfhvKT6OiBbY_VH2tZZTCR_w2hI3gMKaXQcSV0RZ5eXw95m0ZRBPyS8IOfRT390hpFGPVuIeV_P4G49YtHh-64l7TqApjH3pKOS-yLuBdpG9WRh7pWZw8Ey955rI2_G7N"
                  alt="David Okafor"
                />
              </div>
              <h4 className="font-serif text-[20px] text-primary">David Okafor</h4>
              <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">Legal Officer</p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border border-[#C8D0DC] group-hover:ring-2 ring-tertiary-container ring-offset-4 transition-all duration-400">
                <img
                  className="w-full h-full object-cover grayscale"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6dsUVOAm0CkcDRDnYaDT9AjnDzmm0Vee-T7w4VUpXGMgEkij9ucD0s3FH-k2-25DyRhWS9BxDjaNV9ax622k_MQZS7jZXA0ToYfUWAMYR_Xd3E5wtY08LqI2ePsAAgNDsezzwoZOszk1sbUJo8qnXK5lYpE6jeHFddSiWk_k-bKMJgPXIp1TlnTPS89E9N_l5_zZp7gAsNGusuxuYSJz1fsdsaaePjO5zMLy_1jG2nI8sj32ByaIjZ62DNo8MNbBYxayvBsdyB9BC"
                  alt="Amelie Roche"
                />
              </div>
              <h4 className="font-serif text-[20px] text-primary">Amelie Roche</h4>
              <p className="text-[10px] font-semibold tracking-[0.1em] text-on-surface-variant uppercase">Case Manager</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="max-w-[1280px] mx-auto px-8 py-[120px] text-center">
        <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary mb-6 italic">Commitment to Global Justice.</h2>
        <p className="text-base leading-[1.6] text-on-surface-variant max-w-xl mx-auto mb-6">
          Our team represents decades of combined expertise in international dispute resolution, ensuring the highest standards of neutrality and procedural integrity.
        </p>
        <a className="inline-block text-xs font-semibold tracking-[0.1em] text-tertiary border border-tertiary px-8 py-4 hover:bg-tertiary-fixed-dim transition-colors duration-300" href="/contact">
          Contact the Secretariat
        </a>
      </section>
    </div>
  );
}
