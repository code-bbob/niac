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
  // { label: "Fee Calculator", href: "/fee-calculator" },
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


const serviceOrder = {
  Arbitrations: 1,
  Mediation: 2,
};

const serviceItems = [
  ...services
    .sort(
      (a, b) =>
        (serviceOrder[a.name] ?? 999) - (serviceOrder[b.name] ?? 999)
    )
    .map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  // {
  //   label: "Mediation Fee Calculation",
  //   href: "/fee-calculator",
  // },
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
          <nav className="hidden lg:flex items-center gap">
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

            {/* Social icons */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300">
  {/* Facebook */}
  <a
    href="https://www.facebook.com/niac.asia"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-[#1877F2] transition-colors p-1"
    aria-label="Facebook"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 320 512" 
      fill="currentColor"
    >
      <path d="M80 299.3V256H12v-54.7h68v-39.8c0-67.3 41.1-104 101.1-104 28.8 0 53.5 2.1 60.7 3v70.4h-41.7c-32.7 0-39 15.5-39 38.3V201h78l-10.2 54.7H161v192.3H80z"/>
    </svg>
  </a>

  {/* Twitter / X */}
  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-sky-500 transition-colors p-1"
    aria-label="Twitter"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 512 512" 
      fill="currentColor"
    >
      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-[#0077B5] transition-colors p-1"
    aria-label="LinkedIn"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="18" 
      height="18" 
      viewBox="0 0 448 512" 
      fill="currentColor"
    >
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 1 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
    </svg>
  </a>
</div>
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
          <div className="bg-white border-t border-gray-200 px-4 sm:px-10 py-6 sm:py-8 flex flex-col gap-2 shadow-2xl max-h-[calc(100vh-8rem)] overflow-y-auto">
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

            {/* Mobile social icons */}
            <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-200">
              <a
                href="https://www.facebook.com/people/Nepal-International-ADR-Center-NIAC/61572742353544/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://x.com/niac_nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
                aria-label="Twitter / X"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/nepal-international-adr-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
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
