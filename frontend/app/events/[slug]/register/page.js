"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  CheckCircle,
  Loader2,
  Ticket,
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

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
  "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
  "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe",
];

export default function EventRegistrationPage() {
  const params = useParams();
  const slug = params.slug;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    spaces: 1,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    company: "",
    comment: "",
    reference_code: "",
  });

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
      .catch(() => {
        setError("Failed to load event details.");
        setLoading(false);
      });
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/event-bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, event: event.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Submission failed. Please try again.");
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[#9F8320] animate-spin" />
          <p className="text-stone-500 text-sm font-medium">Loading registration...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <>
        <ScrollReveal />
        <section className="min-h-screen bg-white pt-36 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/simple-dashed.png')" }}
          />
          <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-8 text-center">
            <div className="reveal w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="reveal font-serif text-4xl md:text-5xl text-[#1e3a8a] font-bold mb-4">
              Registration Submitted!
            </h1>
            <p className="reveal text-stone-500 text-lg mb-8 max-w-lg mx-auto">
              Thank you for registering for the <strong>{event?.title}</strong>. Your registration has been received.
            </p>
            <div className="reveal bg-amber-50/60 border border-amber-200/60 rounded-xl p-6 mb-10 text-left">
              <h3 className="font-serif text-[#1e3a8a] font-semibold mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#9F8320] flex-shrink-0" />
                  Please transfer the ticket amount to the bank account provided below.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#9F8320] flex-shrink-0" />
                  Include your reference code in the wire transfer for easy identification.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#9F8320] flex-shrink-0" />
                  Our team will verify your payment and confirm your registration within 24–48 hours.
                </li>
              </ul>
            </div>
            <div className="reveal flex flex-wrap justify-center gap-4">
              <Link
                href={`/events/${slug}`}
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-500 rounded-lg"
              >
                Back to Event
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-[#9F8320] hover:bg-[#9F8320]/90 text-white font-semibold px-8 py-4 text-sm tracking-wider uppercase transition-all duration-500 rounded-lg"
              >
                All Events
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <ScrollReveal />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: "url('/images/possibility1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
        <div className="absolute top-0 right-0 w-1/3 h-1 bg-[#9F8320] z-10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
          <Link
            href={`/events/${slug}`}
            className="reveal inline-flex items-center gap-2 text-white/60 hover:text-[#9F8320] text-sm transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Event
          </Link>
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#9F8320]/70 font-medium mb-4">
              <span className="h-px w-8 bg-[#9F8320]/40" />
              Event Registration
            </div>
            <h1 className="reveal font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
              {event?.title}
            </h1>
            <div className="reveal flex flex-wrap items-center gap-4 mt-6">
              {event?.event_start_date && (
                <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 px-5 py-2.5 rounded-full text-sm text-white/80">
                  <Calendar className="w-4 h-4 text-[#9F8320]" />
                  {new Date(event.event_start_date).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}
                  {event?.event_end_date && ` — ${new Date(event.event_end_date).toLocaleDateString("en-US", {
                    month: "long", day: "numeric", year: "numeric",
                  })}`}
                </span>
              )}
              <span className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/15 px-5 py-2.5 rounded-full text-sm text-white/80">
                <MapPin className="w-4 h-4 text-[#9F8320]" />
                Kathmandu, Nepal
              </span>
            </div>
            {event?.ticket_price && (
              <div className="reveal mt-6 inline-flex items-center gap-3 bg-[#9F8320]/15 border border-[#9F8320]/30 px-6 py-3 rounded-xl">
                <Ticket className="w-5 h-5 text-[#9F8320]" />
                <div>
                  <span className="text-white/60 text-xs tracking-wider uppercase">Ticket Price</span>
                  <p className="text-white font-semibold text-lg">${event.ticket_price.toLocaleString()}</p>
                </div>
                {event?.early_bird_price && (
                  <div className="pl-4 ml-4 border-l border-white/20">
                    <span className="text-white/60 text-xs tracking-wider uppercase">Early Bird</span>
                    <p className="text-[#9F8320] font-semibold text-lg">${event.early_bird_price.toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 72" fill="none" className="w-full h-auto">
            <path d="M0 72V0C240 48 480 72 720 72C960 72 1200 48 1440 0V72H0Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/simple-dashed.png')" }}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="reveal">
                <h2 className="font-serif text-2xl text-[#1e3a8a] font-semibold mb-4">
                  Why Register?
                </h2>
                <ul className="space-y-4">
                  {[
                    { icon: Users, text: "Network with global ADR professionals" },
                    { icon: Calendar, text: "Keynote sessions, panels & workshops" },
                    { icon: MapPin, text: "Experience the rich culture of Nepal" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3 text-stone-600 text-sm">
                        <div className="w-8 h-8 bg-[#9F8320]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-[#9F8320]" />
                        </div>
                        {item.text}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="reveal bg-stone-50 border border-stone-200 rounded-xl p-6">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-3">Need Help?</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  For inquiries about registration, sponsorship, or the event program, please contact us.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#9F8320] text-sm font-semibold hover:underline underline-offset-4"
                >
                  Contact Us
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="reveal bg-[#9F8320]/5 border border-[#9F8320]/20 rounded-xl p-6">
                <h3 className="font-serif text-[#1e3a8a] font-semibold mb-2">Payment Info</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-3">
                  Please wire the ticket amount to the bank account below and include your reference code in the transfer.
                </p>
                {event?.bank_number && (
                  <div className="text-sm space-y-1">
                    <p className="text-stone-700"><span className="font-semibold">Bank Account:</span> {event.bank_number}</p>
                    {event?.swift_code && (
                      <p className="text-stone-700"><span className="font-semibold">SWIFT Code:</span> {event.swift_code}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="reveal bg-white border-t-4 border-[#9F8320] shadow-sm rounded-xl p-8 md:p-10">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-100">
                  <div>
                    <h2 className="font-serif text-2xl text-[#1e3a8a] font-semibold">
                      Registration Form
                    </h2>
                    <p className="text-stone-400 text-sm mt-1">Fill in your details to secure your place</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-lg">
                    <Users className="w-4 h-4 text-[#9F8320]" />
                    <span className="text-sm font-semibold text-stone-700">{form.spaces || 1}</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Spaces */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Number of Spaces <span className="text-red-400">*</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, spaces: Math.max(1, p.spaces - 1) }))}
                        className="w-10 h-10 border border-stone-300 rounded-lg flex items-center justify-center text-stone-600 hover:border-[#9F8320] hover:text-[#9F8320] transition-all"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-lg text-stone-800">{form.spaces}</span>
                      <button
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, spaces: Math.min(20, p.spaces + 1) }))}
                        className="w-10 h-10 border border-stone-300 rounded-lg flex items-center justify-center text-stone-600 hover:border-[#9F8320] hover:text-[#9F8320] transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. John Doe"
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+977 1234567890"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Law Firm, Institution, etc."
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="Street address, P.O. Box"
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                    />
                  </div>

                  {/* City + State + ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        City <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="Kathmandu"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="Bagmati"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-2">
                        ZIP Code <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="zip_code"
                        value={form.zip_code}
                        onChange={handleChange}
                        required
                        placeholder="44600"
                        className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Country <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 text-sm transition-all appearance-none"
                      style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2375777d' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                      }}
                    >
                      <option value="">Select your country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Reference Code */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Payment Reference Code
                    </label>
                    <input
                      type="text"
                      name="reference_code"
                      value={form.reference_code}
                      onChange={handleChange}
                      placeholder="Enter your wire transfer reference (optional)"
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all"
                    />
                    <p className="text-xs text-stone-400 mt-1.5">
                      If you have already transferred the amount, enter the reference code from your bank transfer.
                    </p>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-stone-800 mb-2">
                      Special Requests / Comments
                    </label>
                    <textarea
                      name="comment"
                      value={form.comment}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Dietary requirements, accessibility needs, or any questions..."
                      className="w-full px-4 py-3.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9F8320]/40 focus:border-[#9F8320] bg-white text-stone-900 placeholder-stone-400 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#9F8320] hover:bg-[#9F8320]/90 disabled:bg-stone-400 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 text-sm tracking-wider uppercase shadow-lg shadow-[#9F8320]/20"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Register Now
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-stone-400 mt-4">
                      By submitting, you agree to our terms and conditions. We will handle your data in accordance with our privacy policy.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
