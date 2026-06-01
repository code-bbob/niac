"use client";

import { useEffect } from "react";
import {
  ChevronRight, Quote, CheckCircle, BadgeCheck, Eye, Target,
  Award, Shield, Users, Scale, Handshake, Heart, Gavel, ArrowRight
} from "lucide-react";

const values = [
  { icon: Award, label: "Quality" },
  { icon: Shield, label: "Integrity" },
  { icon: Users, label: "Diversity" },
  { icon: Eye, label: "Transparency" },
  { icon: Scale, label: "Accountability" },
  { icon: Handshake, label: "Engagement" },
  { icon: Heart, label: "Mutual Respect" },
];

const legalFrameworks = [
  "UNCITRAL Model Law",
  "New York Convention 1958",
  "Arbitration Act 1999 (Nepal)",
  "Mediation Act 2011 (Nepal)",
];

const objectives = [
  "Administering domestic and international arbitration and mediation cases with absolute neutrality.",
  "Developing institutional rules and standards for ethical ADR practice.",
  "Maintaining a diverse and highly qualified panel of ADR professionals.",
  "Providing specialized training and certification for future arbitrators and mediators.",
  "Engaging in international research to advance ADR methodologies.",
  "Collaborating with global institutions to facilitate cross-border dispute resolution.",
];

function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      <RevealObserver />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-container pt-[200px] pb-[120px]">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkhaHZh4zXeTLzrXvrkuN-R1ThgwMOwIs3K4JeA-f5Bgecemn1_zh4pwYETiJsK3fTcXiwEbgbPg1E0QXRrfjXZzueu9fbtc8_NVxqMbdt5BBSaZ_pY4xj-mCA2_eZHLI2L1lTOWSOLEQnksSAWPT_cD1JxhH4_ChrSPomNrewPTLfLovb3wU1PVKq3KfMBIhOk8Ker6qOAKW9e0ku1bUxh_zbKjg3RxNGCVf7dqeiQM_zhY5730AVPK90zRIjfGxdtIT8oKjkfPN8')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(16, 28, 46, 0.85), rgba(16, 28, 46, 0.95))" }}
          />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-8 w-full">
          <nav className="flex items-center gap-2 mb-4 text-white/60 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <span className="text-white">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <span className="text-tertiary-fixed">Company Profile</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl text-white max-w-2xl mb-6">
            Institutional Excellence in Dispute Resolution
          </h1>
          <p className="text-white text-base sm:text-lg max-w-xl">
            The Nepal International ADR Center (NIAC) serves as the premiere neutral venue for domestic and international arbitration and mediation.
          </p>
        </div>
      </section>

      {/* Institutional Overview */}
      <section className="max-w-[1600px] text-black mx-auto px-8 py-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="font-serif text-3xl sm:text-4xl  mb-6">Institutional Overview</h2>
            <div className="space-y-6 text-xl leading-relaxed ">
              <p>
                Established in 2013, the Nepal International ADR Center (NIAC) underwent a significant restructuring in 2020, emerging as a specialized non-profit organization dedicated to fostering a culture of amicable dispute resolution.
              </p>
              <p>
                NIAC operates with a multidisciplinary base of experts, including seasoned jurists, senior advocates, engineers, and industry leaders. Our mandate is wide-reaching, covering both domestic disputes within Nepal and high-stakes international commercial arbitration across the South Asia region.
              </p>
              <p>
                As a leading neutral institution, we provide the administrative framework and physical facilities necessary for legal proceedings that demand the highest levels of confidentiality, impartiality, and professional rigor.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 bg-surface-container-low p-8 border-l-4 border-tertiary-container self-start fade-up opacity-0 translate-y-10 transition-all duration-700">
            <Quote className="text-tertiary w-8 h-8 mb-4" />
            <blockquote className="font-serif text-xl sm:text-2xl text-primary italic mb-4 leading-relaxed">
              &ldquo;The notion that ordinary people want black-robed judges, well-dressed lawyers, and fine-panelled courtrooms as the setting to resolve their disputes is not correct. People with problems, like people with pains, want relief, and they want it as quickly and inexpensively as possible.&rdquo;
            </blockquote>
            <cite className="text-[11px] font-semibold tracking-[0.1em] text-on-surface-variant not-italic block">
              &mdash; Former US Chief Justice Warren E. Burger
            </cite>
          </div>
        </div>
      </section>

      {/* Transnational Reach & APCAM */}
      <section className="bg-surface-container-highest py-[120px]">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 fade-up opacity-0 translate-y-10 transition-all duration-700">
              <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-6">Transnational Reach &amp; APCAM</h2>
              <p className="text-sm sm:text-base leading-relaxed text-on-surface-variant mb-6">
                On August 6, 2020, NIAC joined forces with leading ADR institutions across the region to found the <strong>Asia Pacific Centre for Arbitration and Mediation (APCAM)</strong>.
              </p>
              <ul className="space-y-4">
                {[
                  "A single set of unified APCAM Rules for seamless cross-border resolution.",
                  "Standardized services across all member nations including India, Malaysia, and Hong Kong.",
                  "Access to an elite panel of international arbitrators and mediators.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="text-tertiary w-5 h-5 mt-0.5 shrink-0" />
                    <span className="text-sm sm:text-base text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 fade-up opacity-0 translate-y-10 transition-all duration-700">
              <div className="aspect-video bg-surface shadow-sm border-t-2 border-tertiary-container p-2">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMxH0LEK3fbg8uUO_-wSrFE3U9JZ5hTjZlLc9UK4q5OZS3CuFj_c0BQHpd3DrAQAEYyHn3QuNyE-CEFjglBV80aW3QuZhvNE-0XmApjrlF8c3860NvWHFu-Q_AjiQHem1Mjgf6jNSy1YY0XYG7RlRG16NpO-rEzCssRw9Mh1EQccaN7m4TMkBFbz9ePpwJ80CaNosEOHvl7cMKiZcBQSmSS3exfsd_lG9PhRBlzmPY12pDbjuwYmr1h9s2llL1c0f5JD2dQexOToni"
                  alt="Asia Pacific Map with connectivity lines"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Legal Framework */}
      <section className="max-w-[1600px] mx-auto text-black px-8 py-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="font-serif text-3xl sm:text-4xl mb-6">Strategic Legal Framework</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-6">
              Situated strategically between the two global economies of India and China, Nepal offers a unique neutral ground for international commercial disputes. Our legal framework is aligned with global standards:
            </p>
            <div className="space-y-4">
              {legalFrameworks.map((item) => (
                <div key={item} className="py-4 border-b border-outline-variant flex justify-between items-center">
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase ">{item}</span>
                  <BadgeCheck className="text-tertiary w-5 h-5 shrink-0" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center fade-up opacity-0 translate-y-10 transition-all duration-700">
            <div className="bg-primary-container p-8 text-white">
              <h3 className="font-serif text-xl sm:text-2xl mb-4">A Neutral Venue</h3>
              <p className="text-white text-sm sm:text-base leading-relaxed mb-6">
                Nepal&apos;s identity as a peace-loving nation, home to Mt. Everest and the birthplace of Lord Buddha in Lumbini, provides a serene and neutral backdrop for resolving complex disputes.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <img
                  className="h-24 w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVl9gRoNdbQFQi_d40A6nqU66KAgS0fYhz0D13h8pYSBpwRrfA7co5Sci_UxAxUstXt6OXWxSHygW4m1E84q5muFPsTPM-4iFEz-nL5LSzetisi2yXjfWITh4bTxyCGq1A8j3DB4Vl1qfcS5FqmV6nKwZEtJTgZgLbPn9TMXdAPZ16WEWZ3n10Mync41aB0Lm4--peDGgME0gdMhyKTIEMCwi__Tvsj8pWkl1FW0toYmOVZ5H4nD4xDHoaXs_6mdADfhyWjpl-fdk2"
                  alt="Mountain Peak"
                />
                <img
                  className="h-24 w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA0D22VZVGw72AQR3o-exokoxwskXHfsH2jp7cwMmAyZCJMIF6-4AtYPhqK8a4vHOoein5VrtlfGLUSZzfhT3AcLo6xX6ovg24Up4jnY3gin9vpVcgriie7Vcyw6UvP2ZFJSkUaqJJQvsUkxwhh3AIDzFcMqm7RqZ397PsG6fx8FjK5i0P9_qrrI4zY7Ffff77Cdi5LxiITrpEADyO4fH3CyF9CV_z9qdJ6yO_IQJtXoMdWjH2oyuHYX6YBdmvAZYTl5dXssh-X4Dq"
                  alt="Temple Architecture"
                />
                <img
                  className="h-24 w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTR75x1d5YhQabHbDcvnqvvZj8VZ9nCZ2F6fwbTD3AQqrVCAmJvgejIn-wZ_OGGGagY98O5pLFQgodc_AuY6WqhTUWLJwkiSqg3NW1Iwya0mWDoCah9wzemck15BPAlZ9fFQIo_uKha-B3z3IcYykeEbmTAfwRVNpiz6ZRDmppergF3iQkoe0Dp0JiOmmOUPl4KC08yrnPdPtYdq_boQz2mMdaBuS_DFMrK5Jw0DxIoshSSni-GCLlLGeTTC8nQvlCFZ2KapB0SBXO"
                  alt="Peaceful Temple"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Objectives */}
      <section className="bg-surface py-[120px]">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 border border-outline-variant border-t-2 border-t-tertiary-container fade-up opacity-0 translate-y-10 transition-all duration-700">
              <Eye className="text-tertiary w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-primary mb-4">Our Vision</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant italic">
                &ldquo;To develop NIAC as a center of excellence in providing ADR services and promoting a culture of amicable dispute resolution.&rdquo;
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 border border-outline-variant border-t-2 border-t-tertiary-container md:col-span-2 fade-up opacity-0 translate-y-10 transition-all duration-700">
              <Target className="text-tertiary w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-primary mb-4">Our Mission</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                &ldquo;To ensure accessibility to quality ADR services through professional excellence, institutional integrity, and transnational collaboration, ensuring that justice is neither painful nor prohibitively expensive for commercial entities.&rdquo;
              </p>
            </div>

            {/* Objectives */}
            <div className="bg-primary-container p-8 text-white md:col-span-3 fade-up opacity-0 translate-y-10 transition-all duration-700">
              <h3 className="font-serif text-xl sm:text-2xl mb-8 text-center">Center Objectives</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {objectives.map((obj, i) => (
                  <div key={i} className="space-y-2">
                    <span className="text-tertiary-fixed font-bold text-xl block">{(i + 1).toString().padStart(2, "0")}</span>
                    <p className="text-white text-sm leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



 {/* Contact CTA */}
      <section className="bg-primary-container py-[120px] text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 flex items-center pointer-events-none">
          <Gavel className="w-64 h-64" />
        </div>
        <div className="max-w-[1600px] mx-auto px-8 relative z-10">
          <div className="max-w-2xl text-center mx-auto fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">How can we help you?</h2>
            <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
              Whether you are looking to initiate a case, seeking professional panel information, or interested in our institutional rules, our secretariat is ready to assist you.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <button className="bg-tertiary-container text-on-tertiary-fixed px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase font-bold transition-all hover:brightness-110">
                Submit an Inquiry
              </button>
              <button className="border border-tertiary-container text-tertiary-container px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase font-bold hover:bg-tertiary-container/10 transition-all">
                Find Nearest Office
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className=" bg-surface px-8 py-[120px]">
        <h2 className="font-serif text-3xl sm:text-4xl text-black text-center mb-16">Core Institutional Values</h2>
        <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-center fade-up opacity-0 translate-y-10 transition-all duration-700">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.label} className="group">
                <div className="w-16 h-16 bg-surface-container-low border border-outline-variant flex items-center justify-center mx-auto mb-4 group-hover:bg-tertiary-container transition-colors duration-400">
                  <Icon className="text-primary w-6 h-6 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[11px] font-semibold text-black tracking-[0.1em] uppercase">{v.label}</span>
              </div>
            );
          })}
        </div>
      </section>

     
    </div>
  );
}
