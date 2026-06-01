"use client";

import { useState } from "react";

const navLinks = [
  { label: "Home", href: "https://niac.asia/", active: true },
  { label: "About", href: "https://niac.asia/company-overview/" },
  { label: "Services", href: "https://niac.asia/services-grid/" },
  { label: "Panelists", href: "#" },
  { label: "Rules", href: "#" },
  { label: "Events", href: "https://niac.asia/category/events/" },
  { label: "Blog", href: "https://niac.asia/blog/" },
  { label: "Contact", href: "https://niac.asia/contact-us/" },
];

const services = [
  { title: "Mediation", desc: "Facilitating negotiated agreements through neutral third-party guidance.", img: "https://niac.asia/wp-content/uploads/2020/10/Palo-Alto-Mediator-Jeffrey-C-Miller-255x182.jpg", href: "https://niac.asia/service/mediation/" },
  { title: "Arbitration", desc: "Binding resolution of disputes through impartial arbitral proceedings.", img: "https://niac.asia/wp-content/uploads/2020/10/Arbitration-255x182.jpg", href: "https://niac.asia/service/arbitration/" },
  { title: "Med-Arb / Arb-Med", desc: "Hybrid processes combining the best of both resolution methods.", img: "https://niac.asia/wp-content/uploads/2020/10/arb-med-255x182.jpg", href: "https://niac.asia/service/med-arb-arb-med/" },
  { title: "Adjudication", desc: "Expert determination of disputes by a specialist adjudicator.", img: "https://niac.asia/wp-content/uploads/2020/10/adjudication-255x182.jpg", href: "https://niac.asia/service/adjudication/" },
];

const features = [
  {
    title: "Accessibility",
    body: "NIAC has a dynamic secretariat in Kathmandu, Nepal accessible to domestic and international clientele. We also provide services across eight countries in the Asia Pacific region.",
  },
  {
    title: "Credibility",
    body: "Our international roster of neutrals has passed rigorous accreditation processes, selected for their impartiality and competence.",
  },
  {
    title: "Expertise",
    body: "Our team comprises ADR experts with decades of experience delivering tailor-made services with meticulous understanding of resolution practices.",
  },
];

const newsItems = [
  { title: "Swiss Arbitration Summit 2025", img: "https://niac.asia/wp-content/uploads/2025/01/Summit-Media-Partner-2025-NIAC-1-350x250.png", href: "https://niac.asia/2025/01/06/niac-as-a-partner-in-swiss-arbitration-summit-2025/", date: "January 6, 2025" },
  { title: "Kathmandu Declaration 2024", img: "https://niac.asia/wp-content/uploads/2025/01/IMG_20250106_161637-350x250.jpg", href: "https://niac.asia/2025/01/06/kathmandu-declaration-2024/", date: "January 6, 2025" },
  { title: "NIAC signs MOU with Pinsent Masons", img: "https://niac.asia/wp-content/uploads/2021/07/IMG_7716-350x250.jpg", href: "https://niac.asia/2021/07/07/nepal-international-adr-center-niac-signs-mou-with-pinsent-masons/", date: "July 7, 2021" },
  { title: "NIAC signs MoU with Beijing Zhizhong", img: "https://niac.asia/wp-content/uploads/2021/02/preview1-350x250.png", href: "https://niac.asia/2021/02/05/niac-signs-mou-with-beijing-zhizhong-2/", date: "February 5, 2021" },
  { title: "Asia ADR Summit 2026", img: "https://niac.asia/wp-content/uploads/2026/03/Asia-ADR-Summit-2026-350x250.webp", href: "https://niac.asia/2026/03/17/asia-adr-summit-2026-2nd-nepal-adr-week/", date: "March 17, 2026" },
  { title: "Nepal ADR Week 2024", img: "https://niac.asia/wp-content/uploads/2024/05/Gemini_Generated_Image_-NEW-1-350x250.jpg", href: "https://niac.asia/2025/01/12/nepal-adr-week-2024/", date: "January 12, 2025" },
];

/* ───── Icons ───── */

function IconAccess() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}
function IconShield() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function IconStar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  );
}

/* ───── Header ───── */

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center justify-between h-[72px]">
          <a href="https://niac.asia/" className="flex items-center gap-3 no-underline">
            <img
              src="https://niac.asia/wp-content/uploads/2019/09/logo-niac.png"
              alt="NIAC"
              width={110}
              className="h-auto brightness-0 invert opacity-90"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={`relative text-[13px] tracking-[1.2px] uppercase no-underline transition-colors ${
                  link.active ? "text-gold" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {link.active && <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full" />}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? <><path d="M18 6L6 18M6 6l12 12" /></> : <><path d="M4 6h16M4 12h16M4 18h16" /></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-light border-t border-white/10">
          <div className="mx-auto max-w-[1200px] px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className={`py-2 text-sm tracking-wider uppercase no-underline ${link.active ? "text-gold" : "text-white/70"}`}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ───── Hero ───── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://niac.asia/wp-content/uploads/2024/05/Gemini_Generated_Image_1sxz6r1sxz6r1sxz.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/40" />
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <span className="inline-block text-gold text-sm tracking-[5px] uppercase mb-8 font-sans">
            Nepal International ADR Center
          </span>
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-medium max-w-4xl">
            Accessible &amp; Credible<br />
            <span className="text-gold">Arbitration &amp; Mediation</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mt-8 leading-relaxed font-light">
            Premier dispute resolution forum serving the Asia-Pacific region with
            integrity, expertise, and cultural insight.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a
              href="https://niac.asia/contact-us/"
              className="inline-flex items-center gap-3 bg-gold text-navy font-semibold text-sm tracking-[1.5px] uppercase px-8 py-4 no-underline hover:bg-white transition-colors"
            >
              Get in Touch <ArrowRight />
            </a>
            <a
              href="https://niac.asia/company-overview/"
              className="inline-flex items-center border border-white/30 text-white text-sm tracking-[1.5px] uppercase px-8 py-4 no-underline hover:bg-white/10 transition-colors"
            >
              About NIAC
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── CTA ───── */

function CtaBanner() {
  return (
    <section className="bg-navy relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-8 text-gold/30">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/>
        </svg>
        <h2 className="font-serif text-white text-2xl md:text-3xl leading-snug font-medium">
          &ldquo;Accessible and Credible Arbitration and Mediation forum in the Asia-Pacific region&rdquo;
        </h2>
        <p className="text-gold/80 text-sm tracking-[3px] uppercase mt-6 mb-10 font-sans">
          Looking for a Credible ADR Service Provider?
        </p>
        <a
          href="https://niac.asia/contact-us/"
          className="inline-flex items-center gap-3 bg-gold text-navy font-semibold text-sm tracking-[1.5px] uppercase px-8 py-4 no-underline hover:bg-white transition-colors"
        >
          Get In Touch <ArrowRight />
        </a>
      </div>
    </section>
  );
}

/* ───── Services ───── */

function Services() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-sm tracking-[5px] uppercase font-sans">What We Do</span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mt-4 mb-6 leading-tight">Our Services</h2>
          <div className="w-12 h-[2px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <a
              key={i}
              href={s.href}
              className="group block bg-white no-underline shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img src={s.img} alt={s.title} width={255} height={182} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-500" />
              </div>
              <div className="p-7">
                <h3 className="font-serif text-xl text-navy mb-3 group-hover:text-gold transition-colors duration-300">{s.title}</h3>
                <p className="text-[#777] text-sm leading-relaxed mb-5">{s.desc}</p>
                <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[2px] uppercase font-medium">
                  Read More
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight />
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Bulletin ───── */

function Bulletin() {
  return (
    <section className="py-28 bg-cream">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[5px] uppercase font-sans">Publications</span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mt-4 mb-6 leading-tight">NIAC Bulletin</h2>
          <div className="w-12 h-[2px] bg-gold mx-auto" />
        </div>
        <div className="flex justify-center">
          <div className="relative shadow-2xl">
            <img
              src="https://niac.asia/wp-content/uploads/2026/03/Gemini_Generated_Image_55id3u55id3u55id-424x600.png"
              alt="NIAC Bulletin"
              width={340}
              height={480}
              className="h-auto max-w-full block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Why Choose Us ───── */

const featureIcons = [<IconAccess key={0} />, <IconShield key={1} />, <IconStar key={2} />];

function WhyChooseUs() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-sm tracking-[5px] uppercase font-sans">Why NIAC</span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mt-4 mb-6 leading-tight">Why Choose Us</h2>
          <div className="w-12 h-[2px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-gold/40 flex items-center justify-center text-gold">
                {featureIcons[i]}
              </div>
              <h3 className="font-serif text-2xl text-navy mb-4">{item.title}</h3>
              <p className="text-[#777] text-sm leading-relaxed max-w-xs mx-auto">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Latest News ───── */

function LatestNews() {
  return (
    <section className="py-28 bg-cream">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-20">
          <span className="text-gold text-sm tracking-[5px] uppercase font-sans">Updates</span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mt-4 mb-6 leading-tight">Latest News</h2>
          <div className="w-12 h-[2px] bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="group block bg-white no-underline shadow-sm hover:shadow-lg transition-shadow duration-500"
            >
              <div className="relative overflow-hidden">
                <img src={item.img} alt={item.title} width={350} height={233} className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <span className="text-gold text-[11px] tracking-[2px] uppercase font-medium">{item.date}</span>
                <h3 className="font-serif text-lg text-navy mt-3 leading-snug group-hover:text-gold transition-colors duration-300">{item.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Quote ───── */

function QuoteSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://niac.asia/wp-content/uploads/2015/12/placeholder.gif?id=1511')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/85" />
      <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-10 text-gold/20">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z"/>
        </svg>
        <blockquote className="font-serif text-white/90 text-xl md:text-2xl leading-relaxed font-light">
          &ldquo;Discourage litigation. Persuade your neighbours to compromise whenever you can. Point out to them how the nominal winner is often the real loser &ndash; in fees, and expenses, and waste of time. As a peace-maker, the lawyer has a superior opportunity of being a good man. There will still be business enough.&rdquo;
        </blockquote>
        <div className="mt-10 pt-8 border-t border-white/10 inline-block px-16">
          <cite className="text-gold not-italic text-sm tracking-[3px] uppercase">&mdash; Abraham Lincoln</cite>
        </div>
      </div>
    </section>
  );
}

/* ───── APCAM ───── */

function ApcamSection() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-[5px] uppercase font-sans">Our Network</span>
          <h2 className="font-serif text-4xl md:text-5xl text-navy mt-4 mb-6 leading-tight">APCAM</h2>
          <div className="w-12 h-[2px] bg-gold mx-auto" />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-14">
          <div className="flex-shrink-0">
            <img
              src="https://niac.asia/wp-content/uploads/2021/01/niac8-150x150.png"
              alt="APCAM"
              width={140}
              height={140}
              className="shadow-lg"
            />
          </div>
          <div>
            <p className="text-[#666] leading-relaxed mb-8">
              <span className="font-semibold text-navy">APCAM</span> (Asia Pacific Centre for Arbitration &amp; Mediation) is an international ADR center formed jointly by about ten arbitration and mediation centers from the Asia-Pacific countries, which host APCAM centers in their respective countries. APCAM caters to the requirement of international and cross-border business disputes, and help the business community to resolve their international commercial and business disputes by mediation or arbitration under a single set of Mediation and Arbitration Rules and with a uniform fee structure in all the member countries to minimize the hassle of adhering to different laws or fees of different institutions.
            </p>
            <a
              href="https://niac.asia/apcam/"
              className="inline-flex items-center gap-3 bg-navy text-white text-xs tracking-[2px] uppercase px-7 py-3 no-underline hover:bg-navy-light transition-colors font-medium"
            >
              Learn More <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Footer ───── */

function Footer() {
  return (
    <footer className="bg-navy text-white/50 text-sm">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <img src="https://niac.asia/wp-content/uploads/2019/09/logo-niac.png" alt="NIAC" width={100} className="h-auto brightness-0 invert opacity-80 mb-5" />
            <p className="leading-relaxed text-white/40 max-w-sm">
              Nepal International ADR Center — your trusted partner in arbitration, mediation, and dispute resolution across the Asia-Pacific region.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-white/80 font-semibold tracking-[2px] uppercase text-xs mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Services", "Panelists", "Rules", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/40 hover:text-gold transition-colors no-underline text-sm">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="text-white/80 font-semibold tracking-[2px] uppercase text-xs mb-6">Connect</h4>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/niac.asia" target="_blank" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://twitter.com/adr_nepal" target="_blank" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/nepal-international-adr-center/" target="_blank" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-white/30 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} NIAC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ───── Page ───── */

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <CtaBanner />
      <Services />
      <Bulletin />
      <WhyChooseUs />
      <LatestNews />
      <QuoteSection />
      <ApcamSection />
      <Footer />
    </>
  );
}
