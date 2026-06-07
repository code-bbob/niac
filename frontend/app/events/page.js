"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  Ticket,
  Users,
  Loader2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/events/`)
      .then((r) => r.json())
      .then((data) => {
        setEvents(data.results || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <ScrollReveal />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: "url('/images/possibility1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy" />
        <div className="absolute top-0 right-0 w-1/3 h-1 bg-[#9F8320] z-10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 text-center">
          <div className="reveal flex items-center justify-center gap-3 text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-6">
            <span className="h-px w-8 bg-[#9F8320]/40" />
            Upcoming & Past Events
            <span className="h-px w-8 bg-[#9F8320]/40" />
          </div>
          <h1 className="reveal font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
            Events at NIAC
          </h1>
          <p className="reveal text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover conferences, summits, and programs hosted by the Nepal International ADR Center.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 72" fill="none" className="w-full h-auto">
            <path d="M0 72V0C240 48 480 72 720 72C960 72 1200 48 1440 0V72H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/simple-dashed.png')" }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 text-[#9F8320] animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-stone-400 text-lg">No events found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, i) => (
                <div
                  key={event.slug}
                  className="reveal group bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#9F8320]/5 transition-all duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Link href={`/events/${event.slug}`} className="block">
                    <div className="relative h-52 overflow-hidden">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                          <span className="font-serif text-3xl text-white/20 font-bold">{event.title?.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block text-xs tracking-wider uppercase bg-[#9F8320]/90 text-white px-3 py-1.5 rounded-full font-medium">
                          {event.event_start_date && new Date(event.event_start_date) > new Date() ? "Upcoming" : "Past"}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-3">
                      {event.event_start_date && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(event.event_start_date).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <Link href={`/events/${event.slug}`}>
                      <h3 className="font-serif text-lg text-[#1e3a8a] font-semibold mb-2 leading-snug group-hover:text-[#9F8320] transition-colors">
                        {event.title}
                      </h3>
                    </Link>
                    {event.ticket_price && (
                      <div className="flex items-center gap-3 mt-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-700">
                          <Ticket className="w-4 h-4 text-[#9F8320]" />
                          ${event.ticket_price.toLocaleString()}
                        </span>
                        {event.early_bird_price && (
                          <span className="text-xs text-stone-400 line-through">
                            ${event.early_bird_price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                      <Link
                        href={`/events/${event.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9F8320] hover:underline underline-offset-4 transition-all"
                      >
                        View Details
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/events/${event.slug}/register`}
                        className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold bg-[#9F8320]/10 hover:bg-[#9F8320]/20 text-[#9F8320] px-4 py-2 rounded-lg transition-all"
                      >
                        Register
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
