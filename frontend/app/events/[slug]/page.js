"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ChevronRight,
  ArrowUpRight,
  Ticket,
  Clock,
  Loader2,
  ArrowLeft,
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

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/events/${slug}/`)
      .then((r) => {
        if (!r.ok) throw new Error("Event not found");
        return r.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-[#9F8320] animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <section className="min-h-screen pt-40 pb-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center">
          <p className="text-stone-500 text-lg mb-6">{error || "Event not found."}</p>
          <Link href="/events" className="inline-flex items-center gap-2 text-[#9F8320] font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>
      </section>
    );
  }

  const isUpcoming = event.event_start_date && new Date(event.event_start_date) > new Date();

  return (
    <>
      <ScrollReveal />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          {event.image_url ? (
            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy via-navy-light to-navy" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/simple-dashed.png')" }}
          />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-1 bg-[#9F8320] z-10" />
        <div className="relative z-10 w-full pb-16 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <Link
              href="/events"
              className="reveal inline-flex items-center gap-2 text-white/50 hover:text-[#9F8320] text-sm transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Events
            </Link>
            <div className="max-w-4xl">
              <div className="reveal flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-4">
                <span className="h-px w-8 bg-[#9F8320]/40" />
                {isUpcoming ? "Upcoming Event" : "Past Event"}
              </div>
              <h1 className="reveal font-serif text-4xl sm:text-5xl md:text-7xl text-white font-bold leading-tight mb-6">
                {event.title}
              </h1>
              <div className="reveal flex flex-wrap items-center gap-4 mt-6">
                {event.event_start_date && (
                  <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 px-5 py-2.5 rounded-full text-sm text-white/80">
                    <Calendar className="w-4 h-4 text-[#9F8320]" />
                    {new Date(event.event_start_date).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                    {event.event_end_date && ` — ${new Date(event.event_end_date).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}`}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 px-5 py-2.5 rounded-full text-sm text-white/80">
                  <MapPin className="w-4 h-4 text-[#9F8320]" />
                  Kathmandu, Nepal
                </span>
              </div>
              {event.ticket_price && (
                <div className="reveal mt-8 inline-flex items-center gap-4 bg-white/[0.06] border border-white/10 px-6 py-4 rounded-xl">
                  <Ticket className="w-5 h-5 text-[#9F8320]" />
                  <div>
                    <span className="text-white/50 text-xs tracking-wider uppercase">Ticket Price</span>
                    <p className="text-white font-bold text-xl">${event.ticket_price.toLocaleString()}</p>
                  </div>
                  {event.early_bird_price && (
                    <div className="pl-5 ml-5 border-l border-white/10">
                      <span className="text-white/50 text-xs tracking-wider uppercase">Early Bird</span>
                      <p className="text-[#9F8320] font-bold text-xl">${event.early_bird_price.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="reveal flex flex-wrap gap-4 mt-10">
                <Link
                  href={`/events/${event.slug}/register`}
                  className="group inline-flex items-center gap-3 bg-[#9F8320] hover:bg-[#9F8320]/90 text-white font-semibold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-500 shadow-lg shadow-[#9F8320]/20 rounded-lg"
                >
                  Register Now
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 72" fill="none" className="w-full h-auto">
            <path d="M0 72V0C240 48 480 72 720 72C960 72 1200 48 1440 0V72H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/simple-dashed.png')" }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="reveal prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="reveal bg-stone-50 border border-stone-200 rounded-xl p-6">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-4">Event Details</h3>
                <ul className="space-y-3">
                  {event.event_start_date && (
                    <li className="flex items-start gap-3 text-sm text-stone-600">
                      <Calendar className="w-4 h-4 text-[#9F8320] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-xs text-stone-400 uppercase tracking-wider">Date</span>
                        {new Date(event.event_start_date).toLocaleDateString("en-US", {
                          weekday: "long", month: "long", day: "numeric", year: "numeric",
                        })}
                        {event.event_end_date && (
                          <> — {new Date(event.event_end_date).toLocaleDateString("en-US", {
                            weekday: "long", month: "long", day: "numeric", year: "numeric",
                          })}</>
                        )}
                      </div>
                    </li>
                  )}
                  <li className="flex items-start gap-3 text-sm text-stone-600">
                    <MapPin className="w-4 h-4 text-[#9F8320] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="block text-xs text-stone-400 uppercase tracking-wider">Location</span>
                      Kathmandu, Nepal
                    </div>
                  </li>
                  {event.ticket_price && (
                    <li className="flex items-start gap-3 text-sm text-stone-600">
                      <Ticket className="w-4 h-4 text-[#9F8320] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-xs text-stone-400 uppercase tracking-wider">Price</span>
                        <span className="font-semibold">${event.ticket_price.toLocaleString()}</span>
                        {event.early_bird_price && (
                          <span className="ml-2 text-[#9F8320] font-medium">Early Bird: ${event.early_bird_price.toLocaleString()}</span>
                        )}
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="reveal bg-[#9F8320]/5 border border-[#9F8320]/20 rounded-xl p-6">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-2">Register Now</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  Secure your place at this event. Early registration recommended due to limited seating.
                </p>
                <Link
                  href={`/events/${event.slug}/register`}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#9F8320] hover:bg-[#9F8320]/90 text-white font-semibold px-6 py-3 text-sm tracking-wider uppercase transition-all duration-500 rounded-lg shadow-lg shadow-[#9F8320]/20"
                >
                  Register Now
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="reveal bg-stone-50 border border-stone-200 rounded-xl p-6">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-3">Need Help?</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  Have questions about this event? Get in touch with our team.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#9F8320] text-sm font-semibold hover:underline underline-offset-4"
                >
                  Contact Us
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
