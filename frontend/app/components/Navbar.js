'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar({ Services = [] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileAboutDropdownOpen, setIsMobileAboutDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-orange-100/90 backdrop-blur-md border-b border-amber-200">
      <div className="mx-auto px-4 sm:px-6 p-2 xl:py-0 lg:px-24">
        <div className="flex justify-between items-center sm:h-20">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="flex items-center space-x-4 group transition-all duration-300"
          >
            <div className="relative">
              <Image 
                src="/images/image.svg" 
                alt="Equity Law & Co Logo" 
                width={60} 
                height={60}
                className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col leading-snug">
              <span className="text-md sm:text-xl font-semibold text-slate-900 tracking-wide uppercase">Equity Law & Co.</span>
              <span className="text-xs text-slate-500 md:ml-2 tracking-[0.2em] uppercase">Teams at Law</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden 2xl:flex items-center space-x-1 text-slate-700">
            {/* Navigation Links */}
            <Link 
              href="/" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* About Dropdown */}
            <div className="relative px-2" ref={aboutDropdownRef}>
              <button
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900 flex items-center gap-2"
              >
                <span className="relative z-10">About</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-all duration-500 ${
                    isAboutDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-500 group-hover:text-slate-900'
                  }`} 
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
              </button>

              {isAboutDropdownOpen && (
                <div className="absolute top-full left-2 mt-4 w-56 bg-white rounded-xl shadow-xl py-2 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <Link
                    href="/about"
                    onClick={() => setIsAboutDropdownOpen(false)}
                    className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-slate-50"
                  >
                    Overview
                  </Link>
                  <Link
                    href="/team"
                    onClick={() => setIsAboutDropdownOpen(false)}
                    className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-slate-50"
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/apcam"
                    onClick={() => setIsAboutDropdownOpen(false)}
                    className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-slate-50"
                  >
                    APCAM
                  </Link>
                </div>
              )}
            </div>

            {/* service Dropdown */}
            <div className="relative px-2" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900 flex items-center gap-2"
              >
                <span className="relative z-10">service</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-all duration-500 ${
                    isDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-500 group-hover:text-slate-900'
                  }`} 
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-2 mt-4 w-72 bg-white rounded-xl shadow-xl py-2 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {Services.length === 0 ? (
                    <div className="px-6 py-4 text-slate-500 text-center text-sm">No service available</div>
                  ) : (
                    Services.map((area) => (
                      <Link
                        key={area.id}
                        href={`/services/${area.slug}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-slate-50"
                      >
                        {area.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <Link 
              href="/blogs" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">Insights</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link 
              href="/#contact" 
              className="relative group px-4 py-2 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:text-slate-900"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* CTA Button */}
            <Link href="/appointments" className="ml-6 pl-6 border-l border-slate-200">
              <button className="relative group px-6 py-4 bg-blue-500 rounded-md font-semibold text-xs tracking-[0.18em] uppercase text-white transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md bg-slate-900 hover:scale-105 hover:bg-slate-800">
                <span className="relative z-10">Book Appointments</span>
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="2xl:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-colors duration-300 p-2 text-slate-800 hover:text-slate-600"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="2xl:hidden pb-6 space-y-1 mt-4 border-t border-amber-200 bg-orange-100 animate-in slide-in-from-top-2 duration-200 pt-2">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              Home
            </Link>

            {/* Mobile About */}
            <button
              onClick={() => setIsMobileAboutDropdownOpen(!isMobileAboutDropdownOpen)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg flex items-center justify-between text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              <span>About</span>
              <ChevronDown
                className={`w-4 h-4 transition-all duration-500 ${
                  isMobileAboutDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-500'
                }`}
              />
            </button>

            {isMobileAboutDropdownOpen && (
              <div className="bg-white rounded-lg py-2 mx-3">
                <Link
                  href="/about"
                  onClick={() => { setIsMobileAboutDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-orange-100"
                >
                  Overview
                </Link>
                <Link
                  href="/team"
                  onClick={() => { setIsMobileAboutDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-orange-100"
                >
                  Our Team
                </Link>
                <Link
                  href="/apcam"
                  onClick={() => { setIsMobileAboutDropdownOpen(false); setIsMobileMenuOpen(false); }}
                  className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-orange-100"
                >
                  APCAM
                </Link>
              </div>
            )}

            {/* Mobile service */}
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg flex items-center justify-between text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              <span>service</span>
              <ChevronDown
                className={`w-4 h-4 transition-all duration-500 ${
                  isMobileDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-500'
                }`}
              />
            </button>

            {isMobileDropdownOpen && (
              <div className="bg-white rounded-lg py-2 mx-3 ">
                {Services.length === 0 ? (
                  <div className="px-6 py-4 text-slate-500 text-center text-sm">No service available</div>
                ) : (
                  Services.map((area) => (
                    <Link
                      key={area.id}
                      href={`/services/${area.slug}`}
                      onClick={() => {
                        setIsMobileDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-6 py-3 text-slate-700 hover:text-slate-900 text-sm font-medium transition-all duration-200 border-l-2 border-transparent hover:border-slate-900 hover:bg-orange-100"
                    >
                      {area.name}
                    </Link>
                  ))
                )}
              </div>
            )}

            <Link 
              href="/blogs" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              Insights
            </Link>

            <Link 
              href="/#contact" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block px-6 py-4 hover:bg-slate-50 text-slate-800 hover:text-slate-900 rounded-lg text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 border-l-2 border-transparent hover:border-slate-900"
            >
              Contact
            </Link>

            <Link href="/appointments" className="block px-3 mt-2">
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="w-full relative group px-6 py-4 rounded-lg font-semibold text-xs tracking-[0.18em] uppercase text-white transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md bg-slate-900 hover:bg-slate-800"
              >
                <span className="relative z-10">Get Consultation</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
