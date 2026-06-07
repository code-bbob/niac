"use client";

import { useEffect } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";

const memberRows = [
  [
    {
      name: "IAIC India",
      url: "https://www.arbitrationindia.com/",
      img: "/images/apcam/niac2.png",
    },
    {
      name: "ADR Centre Australia",
      url: "http://adrcentre.com.au/",
      img: "/images/apcam/niac4.png",
    },
    {
      name: "THAC Thailand",
      url: "https://thac.or.th/",
      img: "/images/apcam/niac5.png",
    },
    {
      name: "PMN Indonesia",
      url: "https://www.pmn.or.id/en/about-us/",
      img: "/images/apcam/niac7.png",
    },
  ],
  [
    {
      name: "MMC Malaysia",
      url: "https://www.malaysianmediationcentre.org/",
      img: "/images/apcam/niac6.png",
    },
    {
      name: "IDRRMI / HKIMC Hong Kong",
      url: "https://idrrmi.org/hkimc/",
      img: "/images/apcam/niac3.png",
    },
    {
      name: "HKIArb Hong Kong",
      url: "http://www.hkiarb.org.hk/en/index.php",
      img: "/images/apcam/niac1.png",
    },
    {
      name: "NIAC (APCAM Host) Nepal",
      url: "http://www.hkiarb.org.hk/en/index.php",
      img: "/images/apcam/niac0-e1726037950121.png",
    },
  ],
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

export default function ApcamPage() {
  return (
    <div className="bg-white">
      <RevealObserver />

      {/* Hero */}
      <section className="relative bg-[#9F8320] overflow-hidden pt-[150px] pb-[50px]">
   
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 w-full">
          <nav className="flex items-center gap-2 mb-4 text-white/60 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <span className="text-white">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <span className="text-tertiary-fixed">APCAM</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl text-white max-w-2xl mb-6">
            Asia Pacific Centre for Arbitration &amp; Mediation
          </h1>
          <p className="text-white text-base sm:text-lg max-w-xl">
            A transnational alliance of leading ADR institutions across the Asia-Pacific region.
          </p>
        </div>
      </section>

      {/* About APCAM */}
      <section className="max-w-[1200px] mx-auto px-8 py-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <a href="https://apcam.asia/" target="_blank" rel="noopener noreferrer">
              <img
                src="/images/apcam/niac8.png"
                alt="APCAM - Asia Pacific Centre for Arbitration & Mediation"
                className="w-full max-w-[300px] border border-outline-variant"
              />
            </a>
          </div>
          <div className="md:col-span-8 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-6">About APCAM</h2>
            <div className="space-y-6 text-base leading-relaxed text-on-surface-variant">
              <p>
                APCAM (Asia Pacific Centre for Arbitration &amp; Mediation) is an international ADR center formed jointly by about ten arbitration and mediation centers from the Asia-Pacific countries, which host APCAM centers in their respective countries.
              </p>
              <p>
                APCAM caters to the requirement of international and cross-border business disputes, and helps the business community to resolve their international commercial and business disputes by mediation or arbitration under a single set of Mediation and Arbitration Rules and with a uniform fee structure in all the member countries to minimize the hassle of adhering to different laws or fees of different institutions.
              </p>
              <p>
                APCAM also impanels a common panel of international mediators and arbitrators, with a uniform accreditation system from all the countries, which would help the parties to experience uniform high-standard practice, bringing credibility and professionalism of mediators and arbitrators. Setting the world of dispute resolution on a different path!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Constituent Members */}
      <section className="bg-surface-container-low py-[120px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col items-center mb-16">
            <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container mb-4">Constituent Members</h2>
            <div className="w-16 h-1 bg-tertiary-container" />
          </div>

          {memberRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 last:mb-0 fade-up opacity-0 translate-y-10 transition-all duration-700"
            >
              {row.map((member) => (
                <a
                  key={member.name}
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center bg-white p-6 border border-outline-variant hover:border-tertiary-container transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-32 h-32 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-tertiary mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-primary-container py-[120px] text-white text-center">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-2xl mx-auto fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">Transnational Collaboration</h2>
            <p className="text-white text-base sm:text-lg leading-relaxed mb-8">
              APCAM represents a unified approach to cross-border dispute resolution, bringing together expertise from across the Asia-Pacific region.
            </p>
            <a
              href="/contact"
              className="inline-block bg-tertiary-container text-on-tertiary-fixed px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase hover:brightness-110 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}
