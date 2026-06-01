"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "#",
    dropdown: [
      { label: "Overview", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "KCMC", href: "/about/kcmc" },
      { label: "APCAM", href: "/apcam" },
    ],
  },
  { label: "Services", href: "#" },
  {
    label: "Panelists",
    href: "#",
    dropdown: [
      { label: "Mediation Panelist", href: "/mediation-panelist" },
      { label: "National Panelist", href: "/national-panelist" },
      { label: "International Panelist", href: "/international-panelist" },
    ],
  },
  { label: "Events", href: "#" },
  { label: "Blogs", href: "/blogs" },
  { label: "Fee Calculator", href: "/fee-calculator" },
  {
    label: "Rules",
    href: "#",
    dropdown: [
      { label: "NIAC Arbitration Rules (English)", href: "/pdfs/NIAC-Arbitration-Rules-2077-English-PDF.pdf", target: "_blank" },
      { label: "NIAC Arbitration Rules (Nepali)", href: "/pdfs/NIAC-Arbitration-Rules-2077-Nepali-PDF.pdf", target: "_blank" },
      { label: "NIAC's KCMC Mediation Rules", href: "/pdfs/KCMC-Mediation-Rules-2077-Nepali-PDF.pdf", target: "_blank" },
    ],
  },
];

function Dropdown({ link, scrolled, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onMouseEnter = () => setOpen(true);
    const onMouseLeave = () => setOpen(false);
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className={`relative flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium tracking-wide transition-all duration-300 ${
          active
            ? scrolled
              ? "text-tertiary"
              : "text-tertiary-fixed"
            : scrolled
              ? "text-secondary hover:text-tertiary"
              : "text-white hover:text-tertiary-fixed"
        }`}
      >
        <span className="font-serif ">{link.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute top-full left-0 min-w-[240px] bg-surface border border-outline-variant/30 shadow-2xl transition-all duration-300 rounded-sm py-2 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {link.dropdown.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.target}
            rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
            className={`block px-6 py-3.5 text-[13px] font-medium transition-all duration-200 ${
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "text-tertiary bg-surface-container-low"
                : "text-secondary hover:text-tertiary hover:bg-surface-container-low"
            }`}
          >
            <span className="font-serif">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function NiacHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/services/`)
      .then((res) => res.json())
      .then((data) => setServices(data.results || data))
      .catch(() => {});
  }, []);

  const serviceItems = services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();

  const isLinkActive = (link) => {
    if (link.dropdown && link.dropdown.length > 0) {
      return link.dropdown.some((item) =>
        pathname === item.href || pathname.startsWith(item.href + "/")
      );
    }
    if (link.label === "Services") {
      return pathname === "/services" || pathname.startsWith("/services/");
    }
    return pathname === link.href || pathname.startsWith(link.href + "/");
  };

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-primary-container flex items-center justify-center border-b border-white/5 px-4">
        <span className="text-[10px] sm:text-[12px] font-medium tracking-[0.1em] sm:tracking-[0.15em] uppercase text-white/90 truncate">
          Nepal International ADR Center &mdash; <span className="text-tertiary-fixed">International Dispute Resolution</span>
        </span>
      </div>

      <header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-surface/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] h-20"
            : "bg-transparent h-24"
        }`}
      >
        {/* Bottom accent line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-700 ${
            scrolled
              ? "bg-gradient-to-r from-transparent via-tertiary-container/30 to-transparent"
              : "bg-white/10"
          }`}
        />

        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-8 flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="group no-underline">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* <span
                className={`font-serif text-xl sm:text-3xl md:text-4xl tracking-tight transition-all duration-500 ${
                  scrolled
                    ? "text-primary scale-95"
                    : "text-white scale-100"
                }`}
              >
                NIAC
              </span> */}
              <Image
                src="/images/niac-logo.png"
                alt="NIAC Logo"
                width={64}
                height={64}
                className={`transition-all duration-500 
                  
                `}
              />
              <div
                className={`flex-col border-l pl-2 sm:pl-4 py-1 transition-all duration-500 ${
                  scrolled
                    ? "border-outline-variant/40"
                    : "border-white/20"
                }`}
              >
                <p className={`text-[9px] sm:text-[12px] font-bold tracking-[0.05em] sm:tracking-[0.1em] uppercase leading-tight ${
                  scrolled ? "text-primary" : "text-white"
                }`}>
                  NEPAL INTERNATIONAL
                </p>
                <span className={`text-[8px] sm:text-[11px] font-medium tracking-[0.08em] sm:tracking-[0.15em] uppercase leading-tight ${
                  scrolled ? "text-secondary" : "text-white/70"
                }`}>
                  ADR CENTER
                </span>
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) =>
              link.dropdown ? (
                <Dropdown key={link.label} link={link} scrolled={scrolled} active={isLinkActive(link)} />
              ) : link.label === "Services" ? (
                <ServicesDropdown key="Services" items={serviceItems} scrolled={scrolled} active={isLinkActive(link)} />
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-[14px] font-serif transition-all duration-300 ${
                    isLinkActive(link)
                      ? scrolled
                        ? "text-tertiary"
                        : "text-tertiary-fixed"
                      : scrolled
                        ? "text-secondary hover:text-tertiary"
                        : "text-white hover:text-tertiary-fixed"
                  }`}
                >
                  <span className={`font-serif ${isLinkActive(link) ? " font-bold" : ""}`}>{link.label}</span>
                  {isLinkActive(link) && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300 w-8 ${
                        scrolled ? "bg-tertiary-container" : "bg-tertiary-fixed"
                      }`}
                    />
                  )}
                </a>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              className={`p-2.5 transition-all duration-300 rounded-full ${
                scrolled
                  ? "text-on-surface-variant hover:text-tertiary hover:bg-tertiary-container/10"
                  : "text-white hover:text-tertiary-fixed hover:bg-white/10"
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/contact">
              <button
                className={`hidden md:inline-flex items-center justify-center min-w-[120px] border-2 px-7 py-3 text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-500 rounded-sm ${
                  scrolled
                    ? "border-primary text-primary hover:bg-primary hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-primary-container"
                }`}
              >
                Contact
              </button>
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 transition-colors ${
                scrolled ? "text-primary hover:text-tertiary" : "text-white hover:text-tertiary-fixed"
              }`}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-surface border-t border-outline-variant/30 px-4 sm:px-10 py-6 sm:py-8 flex flex-col gap-4 shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
            {navLinks.map((link) =>
              link.dropdown ? (
                <MobileDropdown key={link.label} link={link} active={isLinkActive(link)} />
              ) : link.label === "Services" ? (
                <MobileServicesDropdown key="Services" items={serviceItems} active={isLinkActive(link)} />
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`py-3 text-[14px] font-bold tracking-[0.1em] uppercase transition-colors ${
                    isLinkActive(link) ? "text-tertiary" : "text-secondary hover:text-tertiary"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
            <Link href="/contact" className="mt-4">
              <button className="w-full border-2 border-primary text-primary px-8 py-4 text-[13px] font-bold tracking-[0.15em] uppercase transition-all hover:bg-primary hover:text-white rounded-sm">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

function ServicesDropdown({ items, scrolled, active }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onMouseEnter = () => setOpen(true);
    const onMouseLeave = () => setOpen(false);
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className={`relative flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium transition-all duration-300 ${
          active
            ? scrolled
              ? "text-tertiary"
              : "text-tertiary-fixed"
            : scrolled
              ? "text-secondary hover:text-tertiary"
              : "text-white hover:text-tertiary-fixed"
        }`}
      >
        <span className="font-serif ">Services</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute top-full left-0 min-w-[280px] bg-surface border border-outline-variant/30 shadow-2xl transition-all duration-300 rounded-sm py-2 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {items.length === 0 ? (
          <div className="px-6 py-4 text-[13px] text-on-surface-variant font-medium font-serif">
            Loading Services...
          </div>
        ) : (
          items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-6 py-3.5 text-[13px] font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "text-tertiary bg-surface-container-low"
                  : "text-secondary hover:text-tertiary hover:bg-surface-container-low"
              }`}
            >
              <span className="font-serif">{item.label}</span>
            </a>
          ))
        )}
      </div>
    </div>
  );
}

function MobileServicesDropdown({ items, active }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-b border-outline-variant/10">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-4 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors ${
          active ? "text-tertiary" : "text-secondary"
        }`}
      >
        <span>Services</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-6 flex flex-col gap-2 border-l-2 border-primary/20 ml-1">
          {items.length === 0 ? (
            <span className="py-2 text-[12px] text-on-surface-variant font-serif">Loading...</span>
          ) : (
            items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                  pathname === item.href
                    ? "text-tertiary"
                    : "text-on-surface-variant/80 hover:text-tertiary"
                }`}
              >
                {item.label}
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function MobileDropdown({ link, active }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border-b border-outline-variant/10">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-4 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors ${
          active ? "text-tertiary" : "text-secondary"
        }`}
      >
        {link.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
          <div className="pl-6 flex flex-col gap-2 border-l-2 border-primary/20 ml-1">
            {link.dropdown.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                className={`py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-tertiary"
                    : "text-on-surface-variant/80 hover:text-tertiary"
                }`}
              >
                {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
