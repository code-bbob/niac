"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";

export default function Hero() {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const isReady = imagesLoaded >= 2;

  return (
    <section className="relative h-[90svh] md:h-[95svh] flex flex-col justify-end overflow-hidden">
      {/* Loading Screen — shown until both images are loaded */}
      <div
        className={`fixed h-screen top-0 inset-0 z-50 bg-amber-50 flex flex-col items-center justify-center transition-opacity duration-700 ${
          isReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src="/images/image.svg"
          alt="Equity Law & Co Logo"
          width={100}
          height={100}
          priority
          className="animate-pulse"
        />
      </div>

      {/* Background Image — using Next.js Image with priority for instant load */}
      <div className="absolute inset-0 z-0">
        {/* Mobile image */}
        <Image
          src="/images/mobile3.jpg"
          alt="Equity Law & Co. teams"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] md:hidden"
          onLoad={() => setImagesLoaded((c) => c + 1)}
        />
        {/* Desktop image */}
        <Image
          src="/images/equitycover.jpg"
          alt="Equity Law & Co. teams"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] hidden md:block"
          onLoad={() => setImagesLoaded((c) => c + 1)}
        />
        <div className="absolute inset-0 md:hidden bg-slate-300/100 mix-blend-multiply"></div>

        {/* Gradient overlay — stronger at bottom where text sits */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
      </div>

      {/* Content — pinned to bottom with percentage-based spacing */}
      <div
        className="relative z-10 w-full text-center px-[5%] pb-[10vh] md:pb-[8%]"
      >
        <div className="max-w-4xl mx-auto">
          {/* Refined Badge */}
          <FadeIn delay={150} duration={800} slideDistance={40} scaleFrom={0.85}>
            <div className="mb-[2vh] md:mb-[2vh] inline-block hover-glow">
              <span className="text-[clamp(0.625rem,1.2vw,0.75rem)]  font-semibold text-amber-400 tracking-[0.15em] uppercase bg-black/30 py-[0.5em] px-[1em] rounded-lg backdrop-blur-md border border-amber-500/30 transition-all duration-300">
                Excellence in Legal Services
              </span>
            </div>
          </FadeIn>

          {/* Professional Headline — fluid font size */}
          <FadeIn delay={350} duration={1000} slideDistance={60} scaleFrom={0.88}>
            <div className="text-[clamp(1.75rem,5vw,3.75rem)] font-serif font-bold mb-[1.5vh] leading-[1.15] text-white tracking-tight drop-shadow-lg">
              Your Trusted Legal <span className="text-amber-400 inline-block hover-scale">Partner</span>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={550} duration={900}>
            <p className="text-[clamp(0.8rem,1.8vw,1.125rem)] text-white/90 mb-[1.5vh] md:mb-[3vh] max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md">
              Practical, reliable, and result-oriented legal solutions founded on
              the principles of fairness, diligence, responsiveness, and equity.
            </p>
          </FadeIn>

          {/* CTA Buttons — percentage-based max-widths */}
          <FadeIn delay={750} duration={900} scaleFrom={0.9}>
            <div className="flex flex-col sm:flex-row gap-[1.5vh] sm:gap-[2%] justify-center items-center max-w-[90%] sm:max-w-[70%] md:max-w-[60%] mx-auto">
              <Link href="/appointments" className="w-full sm:w-1/2">
                <button className="w-full py-[1.4vh] rounded-lg font-semibold text-[clamp(0.8rem,1.5vw,1rem)] text-white bg-amber-600 hover:bg-amber-700 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 backdrop-blur-sm">
                  Schedule Consultation
                </button>
              </Link>
              <Link href="/about" className="w-full sm:w-1/2">
                <button className="w-full py-[1.4vh] rounded-lg font-semibold text-[clamp(0.8rem,1.5vw,1rem)] text-white border border-white/40 hover:border-amber-400/60 hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hidden sm:flex absolute left-1/2 -translate-x-1/2 opacity-70 hover:opacity-100 transition-opacity flex-col items-center gap-[0.5vh] cursor-pointer"
        style={{ bottom: '2.5%' }}
      >
        <span className="text-[clamp(0.55rem,0.9vw,0.7rem)] text-amber-200 font-semibold tracking-widest uppercase">
          Scroll to explore
        </span>
        <svg
          className="w-[1.2vw] min-w-4 h-[1.2vw] min-h-4 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
