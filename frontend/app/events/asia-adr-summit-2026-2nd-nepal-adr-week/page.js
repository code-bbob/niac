"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Globe,
  Scale,
  Leaf,
  Landmark,
  Lightbulb,
  Building2,
  HeartHandshake,
  Quote,
  School,
  Verified,
  Mountain,
  Users,
  ChevronLeft,
  Sun,
  TreePine,
  Sailboat,
  Plane,
} from "lucide-react";
import Image from "next/image";

/* ── Scroll Reveal Observer ─────────────────────────────────────────────── */

function ScrollReveal() {
  useEffect(() => {
    const els = () => document.querySelectorAll(".reveal");
    const cb = (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    const obs = new IntersectionObserver(cb, { threshold: 0.08 });
    const scan = () => els().forEach((el) => obs.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      obs.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}


function Banner() {
  return (
   <div className="text-center bg-[#9F8320] mt-8 py-4">
          {/* <p className="reveal text-stone-600 text-lg font-light italic max-w-2xl mx-auto leading-relaxed">
            Join us in Nepal, where professional excellence meets the spirit of
            wonders of Nepal.
          </p> */}
          <p className="reveal font-serif text-xl md:text-4xl text-white font-bold mt-6">
            Nepal is <span className="text-[#1e3a8a]">calling</span> !
          </p>
          <p className="reveal text-stone-500 text-white text-xl mt-2">
            Join NIAC and AIADR for the Asia ADR Summit and Nepal ADR Week 2026.
          </p>
        </div>
  );}

/* ── Counter ────────────────────────────────────────────────────────────── */

function Counter({ end, label, suffix }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const steps = 60;
          const inc = end / steps;
          let cur = 0;
          const t = setInterval(() => {
            cur += inc;
            if (cur >= end) {
              setV(end);
              clearInterval(t);
            } else setV(Math.floor(cur));
          }, 2000 / steps);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-4xl md:text-5xl text-[#9F8320] font-bold tracking-tight">
        {v}
        {suffix || "+"}
      </div>
      <div className="text-xs text-stone-400 mt-2 font-medium tracking-[0.15em] uppercase">
        {label}
      </div>
    </div>
  );
}

/* ── Section Decorator ──────────────────────────────────────────────────── */

function SectionHeading({ children, subtitle }) {
  return (
    <div className="text-center mb-6">
      {/* <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1e3a8a] mb-4 tracking-tight leading-tight border-b-8 border-[#9F8320] py-3  inline-block ">
        {children}
      </h2> */}
      <h2 className="relative font-serif text-3xl md:text-4xl lg:text-5xl text-[#1e3a8a] mb-4 pb-4 tracking-tight leading-tight inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-2 after:w-12 after:bg-[#9F8320] after:rounded-full">
        {children}
      </h2>
      {subtitle && (
        <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-3 mt-8">
        <span className="h-px w-6 bg-[#9F8320]/40" />
        <span className="h-2 w-2 rotate-45 border border-[#9F8320]/60" />
        <span className="h-px w-6 bg-[#9F8320]/40" />
      </div>
    </div>
  );
}

/* ── Section Divider ────────────────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div
      className="h-[3px] w-full"
      style={{
        background:
          "repeating-linear-gradient(90deg, #c9a961, #c9a961 8px, #0a1628 8px, #0a1628 16px)",
        opacity: 0.15,
      }}
    />
  );
}

/* ── Hero ───────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-blue-900">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/possibility3.jpg"
          alt="Nepal Himalayas"
          className="w-full h-full object-top object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,22,40,0.5), rgba(10,22,40,0.2))",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
          }}
        />
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-1 bg-[#9F8320] z-10" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 w-full py-32 md:py-40">
        <div className="max-w-3xl">
          {/* <div className="reveal flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-[#9F8320] font-medium mb-6"> */}
          {/*   <span className="h-px w-8 bg-[#9F8320]/50" /> */}
          {/*   A Warm Invitation from the Heart of the Himalayas */}
          {/* </div> */}

          <p className="reveal font-serif text-5xl sm:text-6xl md:text-[100px] leading-[1.05] tracking-tight text-white font-bold mb-4">
            Asia ADR Summit 2026
          </p>

          <div className="reveal font-serif text-xl md:text-6xl text-[#9F8320] font-semibold italic border-t border-b border-[#9F8320]/30 py-3 inline-block">
            &amp; 2nd Nepal ADR Week
          </div>

          {/* <p className="reveal font-serif text-2xl md:text-3xl text-white font-bold mt-8"> */}
          {/*   Nepal is <span className="text-[#9F8320]">calling</span> ! */}
          {/* </p> */}

          <p className="reveal text-base md:text-lg text-white/70 max-w-xl font-light leading-relaxed mt-4">
            Join NIAC and AIADR for the Asia ADR Summit and Nepal ADR Week 2026.
          </p>

          {/* <p className="reveal text-base md:text-lg text-white/50 max-w-xl font-light italic mt-2"> */}
          {/*   &ldquo;Reaching the Pinnacle of ADR in a Changing World&rdquo; */}
          {/* </p> */}

          <div className="reveal flex flex-wrap items-center gap-4 mt-10">
            {/* <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-full text-sm text-white"> */}
            {/*   <Calendar className="w-4 h-4 text-[#9F8320]" />4 – 6 December 2026 */}
            {/* </span> */}
            <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 px-8 py-4 rounded-full text-xl font-extrabold text-white/85">
              <Calendar className="w-4 h-4 text-[#c9a227] font-extrabold" />4 –
              6 December 2026
            </span>
            <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/20 px-8 py-4  rounded-3xl text-xl font-extrabold text-white">
              <MapPin className="w-4 h-4 text-[#9F8320]" />
              Kathmandu, Nepal
            </span>
          </div>

          <div className="reveal flex flex-wrap gap-4 mt-12">
            <Link
              href="/events/asia-adr-summit-2026-2nd-nepal-adr-week/register"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#9F8320] hover:bg-[#9F8320]/90 text-white font-semibold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-500 shadow-lg shadow-[#9F8320]/20 rounded-lg"
            >
              Register Now
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
             <Link
              href="/events/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#10245f] hover:bg-[#10245f]/90 text-white font-semibold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-500 shadow-lg shadow-[#9F8320]/20 rounded-lg"
            >
              Other Events
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 leading-none">
        <svg viewBox="0 0 1440 72" fill="none" className="w-full h-auto">
          <path
            d="M0 72V0C240 48 480 72 720 72C960 72 1200 48 1440 0V72H0Z"
            fill="#10245f"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
    </section>
  );
}

/* ── Stats ───────────────────────────────────────────────────────────────── */

function Stats() {
  return (
    <section className="bg-[#10245f] py-14 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Counter end={30} label="Expert Speakers" />
          <Counter end={15} label="Countries" />
          <Counter end={3} label="Conference Days" />
          <Counter end={200} label="Delegates" />
        </div>
      </div>
    </section>
  );
}

/* ── A Warm Invitation ──────────────────────────────────────────────────── */

function Invitation() {
  const cards = [
    {
      icon: Mountain,
      title: "A Sanctuary for Reflection and Harmony",
      desc: "Nepal is a land where nature and spirituality walk hand-in-hand. As home to the majestic Himalayas—the 'Third Pole' that sustains our world's climate—our country provides a serene sanctuary for the thoughtful reflection required in dispute resolution. From the sacred echoes of Pashupatinath to the tranquil birthplace of Lord Buddha in Lumbini, Nepal offers a unique space for both inner peace and professional clarity. Let the UNESCO World Heritage sites of the Kathmandu Valley and the breathtaking vistas of Pokhara inspire the balance necessary for fair and just ADR.",
    },
    {
      icon: Users,
      title: "Growing Together through Shared Expertise",
      desc: "This summit is a vibrant tapestry of knowledge, bringing together a diverse assembly of legal professionals, judges, engineers, management experts, arbitrators, and scholars. Beyond formal sessions, we foster genuine human connections and cross-cultural collaboration. As a global 'melting pot,' this event provides a premier platform to formalize MoUs and build strategic alliances in an atmosphere of deep mutual respect.",
    },
    {
      icon: Globe,
      title: "A Gateway to Opportunity and Service",
      desc: "As ADR professionals, we serve as the architects of trust and legal certainty that drive global progress. Nepal is currently blossoming with opportunities in hydropower, tourism, agro-farming, and infrastructure. By joining us, you help strengthen the foundation for Foreign Direct Investment (FDI) and contribute to the legal and economic prosperity of the region.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-gray-100 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
        <SectionHeading subtitle="It is with great humility and immense joy, the Nepal International ADR Center (NIAC) and the Asian Institute of Alternative Dispute Resolution (AIADR) extend a cordial invitation to our esteemed friends and colleagues in the global legal and ADR community. We invite you to join us in Kathmandu, where the earth meets the sky, to share our collective wisdom and reach the pinnacle of professional excellence.">
          A Warm Invitation from the Heart of the Himalayas
        </SectionHeading>

        <div className="text-center mb-16">
          <p className="reveal font-serif text-2xl md:text-3xl text-[#9F8320] font-semibold italic">
            Why Join Us in Nepal?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="reveal bg-white p-8 border-t-4 border-[#9F8320] shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 rounded-lg"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6 text-[#9F8320]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#1e3a8a] mb-4 font-semibold">
                  {card.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        <Banner />
      </div>
    </section>
  );
}

/* ── Nepal ADR Week 2026 ────────────────────────────────────────────────── */

function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 ">
        <SectionHeading subtitle="The Asian Institute of Alternative Dispute Resolution (AIADR) and the Nepal International ADR Centre (NIAC) are pleased to announce the Asia ADR Summit 2026 and the 2nd Nepal ADR Week, a landmark international event dedicated to advancing the field of Alternative Dispute Resolution (ADR).">
          Nepal ADR Week 2026
        </SectionHeading>

        <div className="grid grid-cols-1 mt-16 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <div className="space-y-6">
            <p className="reveal text-stone-600 leading-relaxed text-base lg:text-lg">
              The summit will take place from <strong>4–6 December 2026</strong>{" "}
              in <strong>Kathmandu, Nepal</strong>, under the theme{" "}
              <strong className="text-[#1e3a8a]">
                &ldquo;Reaching the Pinnacle of ADR in a Changing World.&rdquo;
              </strong>
            </p>
            <p className="reveal text-stone-600 leading-relaxed text-base lg:text-lg">
              This prestigious gathering aims to bring together leading ADR
              practitioners, academics, policymakers, and industry experts from
              across Asia and beyond to exchange ideas, discuss emerging trends,
              and explore innovative approaches to dispute resolution in a
              rapidly evolving global landscape.
            </p>
          </div>

          <div className="reveal">
            <div className="relative group">
              <div className="absolute -inset-3 bg-[#1e3a8a]/200 rounded-xl group-hover:scale-105 transition-transform duration-500" />
              <div className="relative bg-white p-8 md:p-10 border border-stone-200 rounded-xl">
                <Quote className="w-8 h-8 text-[#9F8320]/30 mb-4" />
                <h3 className="font-serif text-2xl text-[#1e3a8a] mb-4 font-semibold leading-snug">
                  A Platform for Collaboration
                  <br />
                  <span className="text-[#9F8320]">and Innovation</span>
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm mb-6">
                  As dispute resolution mechanisms continue to evolve in
                  response to technological advancement, globalization, and
                  societal changes, the Asia ADR Summit will serve as a vital
                  platform for meaningful dialogue and professional
                  collaboration.
                </p>
                <div className="bg-stone-50 p-5 rounded-lg">
                  <p className="text-navy font-semibold text-sm mb-3">
                    Participants will:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Engage in high-level discussions and panel sessions",
                      "Strengthen regional and international networking",
                      "Share best practices in arbitration, mediation, and other ADR mechanisms",
                      "Explore future directions for ADR development",
                    ].map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-stone-500 text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#9F8320] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="text-center mt-16">
          <p className="reveal font-serif text-xl md:text-2xl text-[#9F8320] font-bold">
            Nepal is <span className="text-[#1e3a8a]">calling</span> !
          </p>
          <p className="reveal text-stone-500 text-base mt-2">
            Join NIAC and AIADR for the Asia ADR Summit and Nepal ADR Week 2026.
          </p>
        </div> */}
        <Banner />
      </div>
    </section>
  );
}

/* ── Summit 2025 Highlights Carousel ────────────────────────────────────── */

function Summit2025Carousel() {
  const images = [
    "/images/adr-2025-1.webp",
    "/images/adr-2025-2.webp",
    "/images/past-events-2024.jpeg",
    "/images/past-events-2024-2.jpeg",
    "/images/past-events-2024-3.jpeg",
    "/images/past-events-2024-4.jpeg",
    "/images/adr-2025-3.webp",
    "/images/adr-2025-4.webp",
    "/images/adr-2025-5.webp",
  ];

  const [current, setCurrent] = useState(0);
  const len = images.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % len), 4000);
    return () => clearInterval(t);
  }, [len]);

  const prev = () => setCurrent((c) => (c - 1 + len) % len);
  const next = () => setCurrent((c) => (c + 1) % len);

  return (
    <section className="py-12 bg-amber-50/60 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
        <SectionHeading subtitle="Relive the moments from the past ADR Summits.">
          Past Summit Highlights
        </SectionHeading>

        <div className="relative max-w-7xl mx-auto">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden rounded-xl border border-stone-200 shadow-lg">
            {images.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "scale(1)" : "scale(1.05)",
                }}
              >
                <img
                  src={src}
                  alt={`Summit 2025 - Image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-20"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-20"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-[#9F8320] w-8"
                    : "bg-stone-300 w-2 hover:bg-stone-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Nepal Gallery ───────────────────────────────────────────────────────── */

function NepalGallery() {
  const images = [
    {
      url: "/images/possibility1.jpg",
      caption: "The Himalayan Range",
      credit: "Peace & Majesty",
    },
    {
      url: "/images/possibility3.jpg",
      caption: "Lumbini — Birthplace of Buddha",
      credit: "Sacred Garden of Peace",
    },
    {
      url: "/images/possibility2.jpg",
      caption: "Kathmandu Valley",
      credit: "Where Tradition Meets Progress",
    },
  ];

  return (
    <section className="py-12 md:pb-24 bg-stone-50/60">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <SectionHeading subtitle="Nepal — a land of peace, natural beauty, and cultural richness, hosting the world for the Asia ADR Summit 2026.">
          Welcome to Nepal
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden rounded-lg border border-stone-200"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-serif text-lg font-semibold">
                  {img.caption}
                </p>
                <p className="text-white/70 text-xs mt-1 tracking-wide">
                  {img.credit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Explore Nepal ─────────────────────────────────────────────────────────── */

function ExploreNepal() {
  const categories = [
    {
      title: "Short Trips Near Kathmandu",
      duration: "1\u20132 Days",
      cards: [
        { icon: Mountain, title: "Chandragiri Hills", desc: "Take a scenic cable car ride just outside Kathmandu to get panoramic views of the Himalayan range and walk through lush, forested walking trails." },
        { icon: Sun, title: "Nagarkot Sunrise", desc: "Travel to this famous hilltop village for an overnight stay to witness the sun rising over Mount Everest and the surrounding snow-capped peaks." },
        { icon: TreePine, title: "Shivapuri Nagarjun National Park", desc: "Embark on a day hike through peaceful subtropical forests, hidden waterfalls, and active monasteries right on the northern edge of the valley." },
      ],
    },
    {
      title: "Multi-Day Post-Summit Adventures",
      duration: "3\u20135 Days",
      cards: [
        { icon: Sailboat, title: "Pokhara Lakeside", desc: "Take a short 25-minute flight to Nepal\u2019s tourism capital to relax by Phewa Lake and see the iconic, mirror-like reflection of Mount Machhapuchhre (Fishtail)." },
        { icon: TreePine, title: "Chitwan National Park", desc: "Travel south to the tropical lowlands to experience a jungle safari, where you can spot endangered one-horned rhinos, Royal Bengal tigers, and exotic bird species." },
        { icon: Mountain, title: "Dhulikhel Panorama", desc: "Visit this ancient Newari town to enjoy unobstructed views of the high Himalayas, terraced fields, and traditional rural mountain life." },
      ],
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
        <SectionHeading subtitle="Here are the best ways to see and feel the natural beauty of Nepal during your trip.">
          Explore the Wonders of Nepal
        </SectionHeading>

        <p className="reveal text-stone-600 text-center text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-16">
          To fully experience the breathtaking landscapes and deep serenity of
          Nepal while attending the Asia ADR Summit and Nepal ADR Week 2026, you
          can easily blend professional networking with world-class nature
          excursions.
        </p>

        {categories.map((cat, ci) => (
          <div key={ci} className="mb-16 last:mb-0">
            <div className="reveal text-center mb-10">
              <span className="inline-block text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-2">
                {cat.duration}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#1e3a8a] font-semibold">
                {cat.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="reveal bg-white p-8 border-t-4 border-[#9F8320] shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 rounded-lg"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6 text-[#9F8320]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-xl text-[#1e3a8a] mb-4 font-semibold">
                      {card.title}
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="reveal">
          <div className="text-center mb-10">
            <span className="inline-block text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-2">
              1 Hour
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-[#1e3a8a] font-semibold">
              Flight Excursions
            </h3>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 border-t-4 border-[#9F8320] shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 rounded-lg text-center">
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6 text-[#9F8320] mx-auto">
                <Plane className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl text-[#1e3a8a] mb-4 font-semibold">
                Everest Mountain Flight
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Take an early morning scenic flight from Kathmandu&apos;s airport
                to fly directly past Mount Everest and the highest peaks on Earth
                if your schedule is tight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Why NIAC ────────────────────────────────────────────────────────────── */

function WhyNiac() {
  const cards = [
    {
      icon: School,
      title: "Fostering Expertise",
      desc: "Specialized workshops and continuous professional development tailored for the modern legal landscape in South Asia.",
    },
    {
      icon: Verified,
      title: "Driving Quality",
      desc: "Global partnerships and adherence to international standards as a founding member of the APCAM.",
    },
    {
      icon: Mountain,
      title: "Hospitality & Tours",
      desc: "Unique experiential learning through curated Himalayan tours, blending professional development with cultural immersion.",
    },
  ];

  return (
    <section className="py-12 bg-[#9F8320]/20 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
        <SectionHeading subtitle="NIAC is more than an institution; it is a gateway to excellence in dispute resolution within the Himalayan region.">
          Why Partner with NIAC?
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="reveal bg-white p-8 border-t-4 border-[#9F8320] shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 rounded-lg"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6 text-[#9F8320]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-[#1e3a8a] mb-4 font-semibold">
                  {card.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 relative rounded-xl overflow-hidden h-[350px]">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80"
            alt="Lumbini"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent flex items-center px-12">
            <div className="max-w-md text-white">
              <h4 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                A Founding Voice
              </h4>
              <p className="opacity-90 text-base leading-relaxed">
                Proud founding member of the Asia Pacific Centre for Arbitration
                &amp; Mediation (APCAM), bringing Nepal to the forefront of
                regional dispute resolution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Organizers ──────────────────────────────────────────────────────────── */

function Organizers() {
  const orgs = [
    {
      abbr: "AIADR",
      logo: "/images/aiadr-logo.webp",
      name: "AIADR",
      sub: "Asian Institute of Alternative Dispute Resolution",
      text: [
        "The Asian Institute of Alternative Dispute Resolution (AIADR) is a not-for-profit, member-based institution dedicated to advancing Alternative Dispute Resolution (ADR) across Asia, Africa, and emerging global regions. Established in April 2018, AIADR was launched by His Excellency Prof. Dr. Kennedy Gastorn, former Secretary General of AALCO, and Datuk Professor Sundra Rajoo, President of the AIADR Council.",
        "AIADR promotes the wider adoption of ADR through education, capacity building, professional development, and international cooperation. As an inclusive think-tank and professional platform, the Institute supports best practices in dispute resolution, strengthens access to justice, and contributes to economic growth by helping businesses, investors, and stakeholders manage conflicts effectively.",
        "With a particular focus on emerging economies, AIADR bridges regional gaps by fostering training, collaboration, and networking opportunities. Its work is guided by a culturally sensitive and internationally oriented approach to dispute resolution, supporting cross-border commerce, investment, and major development initiatives.",
        "Through its programmes and partnerships, AIADR continues to strengthen ADR frameworks and promote practical, innovative solutions for the resolution of disputes worldwide.",
      ],
      height: 400,
      width: 400,
    },
    {
      abbr: "NIAC",
      name: "NIAC",
      logo: "/images/niac-logo.png",
      sub: "Nepal International ADR Center",
      text: [
        "Nepal International ADR Center (NIAC) is a leading ADR institution committed for accessible and credible dispute resolution service in Nepal. It is also a founding member of the Asia Pacific Center for Arbitration and Mediation (APCAM). NIAC is comprised of a diverse group of experts including jurists, lawyers, management experts, engineers, charter accountants, arbitrators, mediators and academicians.It vibrantly works for domestic and international dispute resolution through arbitration and other forms of ADR.",
        "Our key focus area:",
        "• Fostering Expertise: We design and host inclusive training programs, specialized workshops, and national and international conferences to build local capacity and elevate ADR expertise across the region.",
        "• Driving Quality & Collaboration: We facilitate meaningful partnerships and dialogue among ADR institutions, professionals, and scholars, leveraging collective wisdom to drive innovation and ensure premium service quality.",
        "• Hospitality & Experiential Learning: We host uniquely tailored arbitration tours, inviting international peers to experience professional development alongside Nepal's profound natural beauty and rich cultural heritage.",
      ],
      height: 200,
      width: 200,
    },
  ];

  return (
    <section className="py-12 bg-stone-50/60 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <SectionHeading subtitle="Two leading institutions joining forces to advance the future of dispute resolution in Asia and beyond.">
          Organizers
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {orgs.map((org, i) => (
            <div
              key={org.name}
              className="reveal bg-white p-8 border-t-4 border-[#9F8320] shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 rounded-lg"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex justify-center items-center h-[180px]">
                <Image
                  src={org.logo}
                  width={org.width}
                  height={org.height}
                  className="p-4"
                  alt={org.name}
                />
              </div>
              {org.text.map((p, j) => (
                <p
                  key={j}
                  className="text-stone-500 text-sm leading-relaxed mb-2 last:mb-0"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Theme ───────────────────────────────────────────────────────────────── */

function Theme() {
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: "url('images/possibility1.jpg')",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.08] pointer-events-none">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, #c9a961 0%, transparent 90%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-8 text-center">
        <div className="reveal text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-6">
          This Year&apos;s Theme
        </div>
        <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-8">
          &ldquo;Reaching the Pinnacle of ADR
          <br />
          <span className="text-[#9F8320]">in a Changing World&rdquo;</span>
        </h2>
        <div className="reveal flex items-center justify-center gap-3 mb-10">
          <span className="h-px w-6 bg-[#9F8320]/40" />
          <span className="h-2 w-2 rotate-45 border border-[#9F8320]/60" />
          <span className="h-px w-6 bg-[#9F8320]/40" />
        </div>
        <p className="reveal text-white/70 leading-relaxed text-base lg:text-lg max-w-3xl mx-auto">
          Drawing together leading practitioners, institutions, policymakers,
          academics, and industry stakeholders, the Asia ADR Summit 2026 will
          explore how arbitration, mediation, and emerging ADR processes can
          continue to deliver legitimacy, efficiency, and access to justice in
          an increasingly complex international landscape.
        </p>
      </div>
    </section>
  );
}

/* ── Topics ──────────────────────────────────────────────────────────────── */

function Topics() {
  const items = [
    {
      icon: Globe,
      title: "ADR in an Era of Global Uncertainty",
      desc: "Exploring how dispute resolution adapts to geopolitical shifts and economic volatility.",
    },
    {
      icon: Sparkles,
      title: "The Future of Arbitration, Mediation, and AI",
      desc: "Examining the intersection of technology and traditional dispute resolution mechanisms.",
    },
    {
      icon: Leaf,
      title: "Climate Justice and Environmental Disputes",
      desc: "Addressing the growing need for specialized frameworks in environmental conflict resolution.",
    },
    {
      icon: HeartHandshake,
      title: "Women Shaping the Future of ADR",
      desc: "Celebrating and advancing the role of women leaders in the dispute resolution field.",
    },
    {
      icon: Scale,
      title: "Expert Evidence in International Arbitration",
      desc: "Best practices for managing complex technical and scientific evidence in cross-border cases.",
    },
    {
      icon: Building2,
      title: "Energy Transition and Global Market Disputes",
      desc: "Navigating conflicts arising from the shift to sustainable energy and evolving markets.",
    },
    {
      icon: Lightbulb,
      title: "The Rise of Mediation in Commercial Disputes",
      desc: "Understanding the growing preference for mediation as a primary dispute resolution tool.",
    },
    {
      icon: Landmark,
      title: "The Future of ADR Institutions in Asia and Beyond",
      desc: "Charting the strategic direction for institutions serving evolving global needs.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <SectionHeading subtitle="Eight pivotal streams shaping the discourse on the future of dispute resolution.">
          Key Topics Covered
        </SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="reveal group bg-white border border-stone-200 hover:border-[#9F8320]/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#9F8320]/5 rounded-lg"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="w-11 h-11 bg-[#9F8320]/10 group-hover:bg-[#9F8320]/20 flex items-center justify-center mb-5 transition-all duration-500 rounded-lg">
                  <Icon className="w-5 h-5 text-[#9F8320]" />
                </div>
                <h3 className="font-serif text-base text-navy font-semibold mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Venue ───────────────────────────────────────────────────────────────── */

function Venue() {
  const slides = ["/images/hotel1.jpg", "/images/hotel2.jpg", "/images/hotel3.jpg"];

  const [current, setCurrent] = useState(0);
  const len = slides.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % len), 5000);
    return () => clearInterval(t);
  }, [len]);

  return (
    <section className="py-12 bg-amber-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 text-center">
        <MapPin
          className="inline-block text-[#9F8320] text-5xl mb-6"
          size={48}
        />
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1e3a8a] font-bold mb-2">
          The Official Venue
        </h2>
        <p className="font-serif text-2xl md:text-3xl text-[#9F8320] mb-8">
          Hotel View Bhrikuti, Kathmandu, Nepal
        </p>
        <div className="inline-flex items-center gap-2 text-white/60 hover:text-[#9F8320] cursor-pointer transition-colors group">
          <MapPin className="w-4 h-4" />
          <span className="text-sm tracking-wide underline underline-offset-4 group-hover:no-underline transition-all">
            View on Google Maps
          </span>
        </div>

        <div className="mt-12 max-w-7xl mx-auto relative w-full h-[600px] md:h-[600px] overflow-hidden rounded-xl border border-white/10">
          {slides.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-1000 ease-out"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? "scale(1)" : "scale(1.08)",
              }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-700 ${
                  i === current
                    ? "bg-[#9F8320] w-8"
                    : "bg-white/30 w-1.5 hover:bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Looking Ahead ──────────────────────────────────────────────────────── */

function LookingAhead() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #c9a961 0%, transparent 60%), radial-gradient(circle at 70% 60%, #c9a961 0%, transparent 40%)",
          }}
        />
      </div>
      <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-8 text-center">
        <SectionHeading subtitle="The Asia ADR Summit 2026 and 2nd Nepal ADR Week promise to be an important milestone in strengthening ADR cooperation and knowledge exchange throughout the region.">
          Looking Ahead to December 2026
        </SectionHeading>

        <div className="reveal max-w-2xl mx-auto space-y-8">
          <div className="bg-stone-50 p-8 rounded-xl border border-stone-200">
            <h3 className="font-serif text-xl text-[#1e3a8a] font-semibold mb-4">
              Invitation to the Global ADR Community
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">
              The organizers warmly invite international and regional
              practitioners, legal professionals, scholars, and industry
              stakeholders to participate in this significant event.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Participants will gain valuable insights, connect with peers, and
              contribute to discussions shaping the future of dispute resolution
              in Asia and beyond.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <p className="reveal font-serif text-2xl md:text-3xl text-[#9F8320] font-bold">
            Nepal is <span className="text-[#1e3a8a]">calling</span> !
          </p>
          <p className="reveal text-stone-500 text-base mt-2">
            Join NIAC and AIADR for the Asia ADR Summit and Nepal ADR Week 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────────────── */

function Cta() {
  return (
    <section className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/simple-dashed.png')",
        }}
      />
      <div className="relative z-10 max-w-[800px] mx-auto px-4 sm:px-8 text-center">
        <div className="reveal flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-6">
          <span className="h-px w-8 bg-[#9F8320]/40" />
          Join Us
          <span className="h-px w-8 bg-[#9F8320]/40" />
        </div>

        <h2 className="reveal font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-6">
          Secure Your Place at the Asia ADR Summit 2026
        </h2>

        <p className="reveal text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Early registration is recommended due to limited seating. Register
          your interest to receive updates.
        </p>

        <div className="reveal flex flex-wrap justify-center gap-4">
          <Link
            href="/events/asia-adr-summit-2026-2nd-nepal-adr-week/register"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#9F8320] hover:bg-[#9F8320]/90 text-white font-semibold px-10 py-5 text-sm tracking-wider uppercase transition-all duration-500 shadow-lg shadow-[#9F8320]/20 rounded-lg"
          >
            Register Now
            <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function EventsPage() {
  return (
    <>
      <ScrollReveal />
      <Hero />
      <Stats />
      <SectionDivider />
      <Invitation />
      <SectionDivider />
      <Summit2025Carousel />
      <About />
      <SectionDivider />
      <NepalGallery />
      <ExploreNepal />
      <WhyNiac />
      <SectionDivider />
      <Organizers />
      <Theme />
      <SectionDivider />
      <Topics />
      <SectionDivider />
      <Venue />
      <LookingAhead />
      <Cta />
    </>
  );
}
