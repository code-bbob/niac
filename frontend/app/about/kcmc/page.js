"use client";

import { useEffect } from "react";
import {
  ChevronRight,
  Scale,
  Shield,
  Handshake,
  BookOpen,
  Users,
  Building,
} from "lucide-react";

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
      { threshold: 0.1 },
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}

const kcmcServices = [
  {
    icon: Scale,
    title: "Mediation",
    desc: "Facilitated negotiation through trained mediators to resolve disputes amicably without litigation.",
  },
  {
    icon: Handshake,
    title: "Conciliation",
    desc: "A structured process where a conciliator assists parties in reaching a mutually acceptable settlement.",
  },
  {
    icon: BookOpen,
    title: "Training & Certification",
    desc: "Comprehensive mediator training programs accredited by international ADR bodies.",
  },
  {
    icon: Users,
    title: "Panel of Neutrals",
    desc: "A diverse roster of certified mediators and conciliators with expertise across various sectors.",
  },
];

export default function KCMCPage() {
  return (
    <>
      <RevealObserver />

      {/* Hero */}
      <section className="relative bg-[#9F8320] overflow-hidden pt-[150px] pb-[50px]">
        <div className="absolute inset-0 z-0"></div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full">
          <nav className="flex items-center gap-2 mb-4 text-white/80 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <span className="text-white">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <span className="text-tertiary-fixed">KCMC</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl text-white max-w-2xl mb-6">
            Kathmandu Center for Mediation &amp; Conciliation
          </h1>
          <p className="text-white text-base sm:text-lg max-w-xl">
            Promoting amicable dispute resolution through professional mediation
            and conciliation services.
          </p>
        </div>
      </section>

      {/* About KCMC */}
      <section className="max-w-[1280px] mx-auto px-8 py-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 class="relative text-blue-900 inline-block after:content-[''] mb-8 after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-2 after:bg-[#b08d2a] after:rounded-full">
              About KCMC
            </h2>
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-on-surface-variant">
              <p>
                Cutthroat competition among businesses has led to number of
                rising disputes which get settled on a regular basis through
                methods of dispute resolution which create a situation of
                win-lose for the parties.
                <br />
                <br />
                One business losing and another winning is not the ideal
                scenario for the growth of the GDP of the country. Country needs
                well-functioning and thriving businesses that continue to
                operate despite regular occurrences of disputes.
                <br />
                <br />
                Mediation can provide that balanced access to justice chosen by
                the party. Rules, Venue, Process and even the conclusion is
                chosen by the party in Mediation.
                <br />
                <br />
                Through KCMC, NIAC wishes to provide a proper avenue for
                successful dispute resolutions via Mediation in Nepal. KCMC aims
                to promote and institutionalize the prevalent mediation
                practices.
                <br />
                <br />
                Cases that require mediation facilities for dispute resolution
                will be referred to KCMC and will be resolved using KCMC
                Mediation Rules 2077. The procedural rules of the institution
                have been drafted using expertise of the NIAC team of members.
                <br />
                <br />
                That is why, we encourage you to opt for Mediation or hybrid
                methods like Med-Arb and Arb-Med to settle your disputes.
                <br />
                <br />
                For domestic disputes, KCMC Mediation Rules will be followed.
                Mediators from NIAC roster will be selected. While for
                International Mediation requirements, APCAM Mediation Rules will
                be followed. <br />
              </p>
            </div>
          </div>
          <div className="md:col-span-5 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <div className="bg-surface-container-low p-8 border-l-4 border-tertiary-container">
              <Building className="text-tertiary w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-primary mb-3">
                Our Commitment
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                KCMC is dedicated to providing accessible, impartial, and
                professional mediation services that empower parties to reach
                mutually beneficial resolutions. We believe that most disputes
                can be resolved more effectively through dialogue than through
                litigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface-container-highest py-[120px]">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-tertiary-container mx-auto mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kcmcServices.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-white p-8 border border-outline-variant border-t-[3px] border-t-tertiary-container fade-up opacity-0 translate-y-10 transition-all duration-700 hover:shadow-lg transition-all"
                >
                  <Icon className="text-tertiary-container w-8 h-8 mb-4" />
                  <h3 className="font-serif text-lg text-primary mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Mediation */}
      <section className="max-w-[1280px] mx-auto px-8 py-[120px]">
        <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-4">
          Why Choose Mediation?
        </h2>
        <div className="w-24 h-1 bg-tertiary-container mx-auto mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-up opacity-0 translate-y-10 transition-all duration-700">
          {[
            {
              title: "Cost Effective",
              desc: "Mediation typically costs a fraction of litigation or arbitration, saving parties significant time and resources.",
            },
            {
              title: "Confidential",
              desc: "All mediation proceedings are strictly confidential, protecting sensitive business information and reputations.",
            },
            {
              title: "Preserves Relationships",
              desc: "Unlike adversarial processes, mediation fosters collaboration and helps maintain business and personal relationships.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center p-8">
              <h3 className="font-serif text-xl text-primary mb-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
    </>
  );
}
