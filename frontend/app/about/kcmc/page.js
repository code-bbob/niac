"use client";

import { useEffect } from "react";
import { ChevronRight, Scale, Shield, Handshake, BookOpen, Users, Building } from "lucide-react";

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

const kcmcServices = [
  { icon: Scale, title: "Mediation", desc: "Facilitated negotiation through trained mediators to resolve disputes amicably without litigation." },
  { icon: Handshake, title: "Conciliation", desc: "A structured process where a conciliator assists parties in reaching a mutually acceptable settlement." },
  { icon: BookOpen, title: "Training & Certification", desc: "Comprehensive mediator training programs accredited by international ADR bodies." },
  { icon: Users, title: "Panel of Neutrals", desc: "A diverse roster of certified mediators and conciliators with expertise across various sectors." },
];

export default function KCMCPage() {
  return (
    <>
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
            Promoting amicable dispute resolution through professional mediation and conciliation services.
          </p>
        </div>
      </section>

      {/* About KCMC */}
      <section className="max-w-[1280px] mx-auto px-8 py-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-6">About KCMC</h2>
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-on-surface-variant">
              <p>
                The Kathmandu Center for Mediation and Conciliation (KCMC) operates under the umbrella of NIAC, dedicated exclusively to the amicable resolution of disputes through mediation, conciliation, and other facilitative processes.
              </p>
              <p>
                Established to address the growing need for efficient and cost-effective dispute resolution mechanisms, KCMC brings together a panel of certified mediators and conciliators trained in international best practices. Our center provides a neutral, confidential, and supportive environment for parties to resolve their differences constructively.
              </p>
              <p>
                KCMC is committed to promoting a culture of dialogue and mutual understanding in Nepal and the broader South Asian region, reducing the burden on traditional court systems while preserving business and personal relationships.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <div className="bg-surface-container-low p-8 border-l-4 border-tertiary-container">
              <Building className="text-tertiary w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-primary mb-3">Our Commitment</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                KCMC is dedicated to providing accessible, impartial, and professional mediation services that empower parties to reach mutually beneficial resolutions. We believe that most disputes can be resolved more effectively through dialogue than through litigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface-container-highest py-[120px]">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-4">Our Services</h2>
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
                  <h3 className="font-serif text-lg text-primary mb-3">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Mediation */}
      <section className="max-w-[1280px] mx-auto px-8 py-[120px]">
        <h2 className="font-serif text-3xl sm:text-4xl text-primary text-center mb-4">Why Choose Mediation?</h2>
        <div className="w-24 h-1 bg-tertiary-container mx-auto mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-up opacity-0 translate-y-10 transition-all duration-700">
          {[
            { title: "Cost Effective", desc: "Mediation typically costs a fraction of litigation or arbitration, saving parties significant time and resources." },
            { title: "Confidential", desc: "All mediation proceedings are strictly confidential, protecting sensitive business information and reputations." },
            { title: "Preserves Relationships", desc: "Unlike adversarial processes, mediation fosters collaboration and helps maintain business and personal relationships." },
          ].map((item) => (
            <div key={item.title} className="text-center p-8">
              <h3 className="font-serif text-xl text-primary mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary-container py-[120px] text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 flex items-center pointer-events-none">
          <Handshake className="w-64 h-64" />
        </div>
        <div className="max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="max-w-2xl fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">Start a Mediation</h2>
            <p className="text-white text-base sm:text-lg leading-relaxed mb-6">
              Contact our mediation secretariat to learn more about our process, fees, and how we can help resolve your dispute amicably.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-tertiary-container text-on-tertiary-fixed px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase font-bold transition-all hover:brightness-110">
                Submit a Case
              </button>
              <button className="border border-tertiary-container text-tertiary-container px-10 py-4 text-[11px] font-semibold tracking-[0.1em] uppercase font-bold hover:bg-tertiary-container/10 transition-all">
                Find a Mediator
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
