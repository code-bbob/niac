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
      {
        label: "Arbitration Panelist",
        href: "#",
        submenu: [
          { label: "National Panelist", href: "/national-panelist" },
          { label: "International Panelist", href: "/international-panelist" },
        ],
      },
      { label: "Mediation Panelist", href: "/mediation-panelist" },
    ],
  },
  { label: "Events", href: "/events" },
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
  {label: "Contact", href: "/contact" },
];

function Dropdown({ link, active }) {
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
        className={`relative flex items-center gap-1.5 px-4 py-2 text-md font-bold tracking-wide transition-all duration-300 ${
          active ? "text-black font-bold" : "text-gray-700 hover:text-black"
        }`}
      >
        <span className="font-serif">{link.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute top-full left-0 min-w-[240px] bg-white border border-gray-200 shadow-2xl transition-all duration-300 rounded-sm py-2 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {link.dropdown.map((item) =>
          item.submenu ? (
            <SubDropdown key={item.label} item={item} />
          ) : (
            <a
              key={item.label}
              href={item.href}
              target={item.target}
              rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              className={`block px-6 py-3.5 text-[13px] font-medium transition-all duration-200 ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-black bg-gray-100 font-bold"
                  : "text-gray-700 hover:text-black hover:bg-gray-50"
              }`}
            >
              <span className="font-serif">{item.label}</span>
            </a>
          )
        )}
      </div>
    </div>
  );
}

function SubDropdown({ item }) {
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
      <div
        className={`flex items-center justify-between px-6 py-3.5 text-[13px] font-medium transition-all duration-200 cursor-pointer ${
          pathname === item.href || pathname.startsWith(item.href + "/")
            ? "text-black bg-gray-100 font-bold"
            : "text-gray-700 hover:text-black hover:bg-gray-50"
        }`}
      >
        <span className="font-serif">{item.label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>
      <div
        className={`absolute left-full top-0 min-w-[220px] bg-white border border-gray-200 shadow-2xl transition-all duration-300 rounded-sm py-2 ${
          open ? "opacity-100 visible translate-x-0" : "opacity-0 invisible -translate-x-2"
        }`}
      >
        {item.submenu.map((sub) => (
          <a
            key={sub.label}
            href={sub.href}
            target={sub.target}
            rel={sub.target === "_blank" ? "noopener noreferrer" : undefined}
            className={`block px-6 py-3.5 text-[13px] font-medium transition-all duration-200 ${
              pathname === sub.href || pathname.startsWith(sub.href + "/")
                ? "text-black bg-gray-100 font-bold"
                : "text-gray-700 hover:text-black hover:bg-gray-50"
            }`}
          >
            <span className="font-serif">{sub.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function NiacHeader() {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/services/`)
      .then((res) => res.json())
      .then((data) => setServices(data.results || data))
      .catch(() => {});
  }, []);
const serviceItems = [
  ...services.map((s) => ({
    label: s.name,
    href: `/services/${s.slug}`,
  })),
  {
    label: 'Mediation Fee Calculation',
    href: '/fee-calculator',
  },
];

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
      {/* <div className="fixed top-0 left-0 right-0 z-[60] h-8 bg-white flex items-center justify-center border-b border-gray-200 px-4">
        <span className="text-[10px] sm:text-[12px] font-medium tracking-[0.1em] sm:tracking-[0.15em] uppercase text-black/70 truncate">
          Nepal International ADR Center &mdash; <span className="text-gray-700">International Dispute Resolution</span>
        </span>
      </div> */}

      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.03)] h-30"
      >
        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"
        />

        <div className=" px-4 sm:px-8 lg:px-8 max-w-[1300px] mx-auto flex items-center justify-between h-full">
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
                width={128}
                height={128}
                className={`transition-all duration-500 
                  
                `}
              />

              {/* <div
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
              </div> */}
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-3">
            {navLinks.map((link) =>
              link.dropdown ? (
                <Dropdown key={link.label} link={link} active={isLinkActive(link)} />
              ) : link.label === "Services" ? (
                <ServicesDropdown key="Services" items={serviceItems} active={isLinkActive(link)} />
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-md font-bold font-serif transition-all duration-300"
                >
                  <span className={`font-serif ${isLinkActive(link) ? "text-black font-bold" : "text-gray-700"}`}>{link.label}</span>
                  {isLinkActive(link) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full w-8 bg-black" />
                  )}
                </a>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
         
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8 font-bold" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-gray-200 px-4 sm:px-10 py-6 sm:py-8 flex flex-col gap-4 shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
            {navLinks.map((link) =>
              link.dropdown ? (
                <MobileDropdown key={link.label} link={link} active={isLinkActive(link)} />
              ) : link.label === "Services" ? (
                <MobileServicesDropdown key="Services" items={serviceItems} active={isLinkActive(link)} />
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`py-3 text-[13px] font-bold uppercase transition-colors ${
                    isLinkActive(link) ? "text-black" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
            
          </div>
        </div>
      </header>
    </>
  );
}

function ServicesDropdown({ items, active }) {
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
        className={`relative flex items-center gap-1.5 px-4 py-2 text-md font-bold transition-all duration-300 ${
          active ? "text-black font-bold" : "text-gray-700 hover:text-black"
        }`}
      >
        <span className="font-serif">Services</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute top-full left-0 min-w-[280px] bg-white border border-gray-200 shadow-2xl transition-all duration-300 rounded-sm py-2 ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
      >
        {items.length === 0 ? (
          <div className="px-6 py-4 text-[13px] text-gray-500 font-medium font-serif">
            Loading Services...
          </div>
        ) : (
          items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`block px-6 py-3.5 text-[13px] font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "text-black bg-gray-100 font-bold"
                  : "text-gray-700 hover:text-black hover:bg-gray-50"
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
    <div className="border-b border-gray-200">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between w-full py-4 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors ${
            active ? "text-black" : "text-gray-700"
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
          <div className="pl-6 flex flex-col gap-2 border-l-2 border-gray-300 ml-1">
            {items.length === 0 ? (
              <span className="py-2 text-[12px] text-gray-500 font-serif">Loading...</span>
            ) : (
              items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                    pathname === item.href
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
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
    <div className="border-b border-gray-200">
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center justify-between w-full py-4 text-[13px] font-bold tracking-[0.1em] uppercase transition-colors ${
            active ? "text-black" : "text-gray-700"
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
          <div className="pl-6 flex flex-col gap-2 border-l-2 border-gray-300 ml-1">
            {link.dropdown.map((item) =>
              item.submenu ? (
                <MobileSubDropdown key={item.label} item={item} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  className={`py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors ${
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.label}
                </a>
              )
            )}
        </div>
      </div>
    </div>
  );
}

function MobileSubDropdown({ item }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full py-3 text-[12px] font-semibold tracking-[0.1em] uppercase transition-colors ${
          open ? "text-black" : "text-gray-500"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[300px] opacity-100 mb-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 flex flex-col gap-1 border-l-2 border-gray-200 ml-2">
          {item.submenu.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              target={sub.target}
              rel={sub.target === "_blank" ? "noopener noreferrer" : undefined}
              className={`py-2.5 text-[11px] font-medium tracking-[0.08em] uppercase transition-colors ${
                pathname === sub.href || pathname.startsWith(sub.href + "/")
                  ? "text-black"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {sub.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
