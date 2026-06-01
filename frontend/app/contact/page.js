"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}

function CtaMouseFollow() {
  useEffect(() => {
    const cta = document.querySelector("section.cta-section");
    if (!cta) return;
    const onMove = (e) => {
      const { left, top, width, height } = cta.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      cta.style.setProperty("--mouse-x", `${x}%`);
      cta.style.setProperty("--mouse-y", `${y}%`);
    };
    cta.addEventListener("mousemove", onMove);
    return () => cta.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900">
      <RevealObserver />
      <CtaMouseFollow />

      {/* Hero */}
      <section className="relative overflow-hidden px-8 bg-[#101c2e] pt-[200px] pb-[120px]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }}
        />
        <div className="max-w-[1600px] px-8 mx-auto relative z-10">
          <nav className="flex items-center gap-2 mb-4 text-white/60 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <span className="text-white">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <span className="text-[#bbc7df]">Contact</span>
          </nav>
          <div className="reveal">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-4 block">
              Institutional Trust
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 max-w-3xl leading-tight">
              Contact NIAC
            </h1>
            <p className="text-base sm:text-lg text-[#79849b] max-w-2xl leading-relaxed">
              Accessible and credible ADR services for modern dispute resolution. We provide a dignified environment for high-stakes mediation and international arbitration.
            </p>
          </div>
        </div>
        <div className="absolute -right-1/4 -top-1/4 w-[600px] h-[600px] bg-[#755b00] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Contact Info & Form */}
      <section className="py-[120px] px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info */}
          <div className="md:col-span-5 space-y-6 reveal">
            <div className="bg-white border border-[#c5c6cd] p-8 shadow-sm"
              style={{ borderTop: "2px solid #c9a84c" }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-8">Kathmandu Office</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="text-[#c9a84c] w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] mb-1">HEADQUARTERS</h3>
                    <p className="text-sm text-gray-900 leading-relaxed">House no. 163, Pragati Marg,<br />Hanumansthan, Anamnagar,<br />Kathmandu-29, Nepal</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-[#c9a84c] w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] mb-1">TELEPHONE</h3>
                    <p className="text-sm text-gray-900 leading-relaxed">+977 01 5705609</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-[#c9a84c] w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] mb-1">ELECTRONIC MAIL</h3>
                    <p className="text-sm text-gray-900 leading-relaxed">niacadrweek@gmail.com</p>
                    <p className="text-sm text-gray-900 leading-relaxed">adrcenter@niac.asia</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-[#c5c6cd]">
                <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] mb-4">LOCATION DATA</h3>
                <div className="relative aspect-video w-full overflow-hidden bg-[#eeeeee]">
                  <iframe
                    title="NIAC location map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220.79660034471283!2d85.32842763827327!3d27.694256489686484!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4b1f5a3a5%3A0x20634b5fe727d535!2sNiraula%20Law%20Chamber%20%26%20Co!5e0!3m2!1sen!2snp!4v1779967553121!5m2!1sen!2snp"
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-7 reveal">
            <div className="p-8 md:p-12 border border-[#c5c6cd]"
              style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 mb-2">Service Inquiry</h2>
              <p className="text-sm text-[#45474c] mb-10">
                Please provide the details of your inquiry. All communications are handled with absolute confidentiality.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white py-[120px] px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#c9a84c] mb-2 block">
              Institutional Governance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-gray-900">NIAC Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {leadership.map((person, i) => (
              <div key={person.name} className="group reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="bg-white border border-[#c5c6cd] p-1 hover:border-[#c9a84c] transition-all duration-500 overflow-hidden"
                  style={{ borderTop: "2px solid #c9a84c" }}
                >
                  <div className="aspect-[4/5] bg-[#eeeeee] mb-6 overflow-hidden relative">
                    <img
                      alt={person.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      src={person.image}
                    />
                  </div>
                  <div className="px-6 pb-8">
                    <h3 className="font-serif text-xl sm:text-2xl text-gray-900 mb-1">{person.name}</h3>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#c9a84c] mb-4">{person.title}</p>
                    <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 text-gray-900 group/email hover:text-[#c9a84c] transition-colors duration-300">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{person.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-[120px] px-8 bg-[#101c2e] relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto text-center relative z-10 reveal">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-8 leading-tight">
            Looking for Accessible and Credible ADR Service Provider?
          </h2>
          <div className="flex justify-center">
            <button className="group relative px-12 py-5 bg-[#755b00] text-white text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-500 hover:bg-white hover:text-black">
              <span className="relative z-10">REQUEST A CONSULTATION</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>
          </div>
        </div>
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#755b00] to-transparent opacity-50" />
      </section>
    </div>
  );
}

const leadership = [
  {
    name: "Matrika Prasad Niraula",
    title: "MANAGING DIRECTOR",
    email: "lawyers.adr@gmail.com",
    image: "https://cdn.equitylawandco.com/images/team/matrika.png",
  },
  {
    name: "Rabina Jangam",
    title: "EXECUTIVE OFFICER",
    email: "rabina.niac@gmail.com",
    image: "https://cdn.equitylawandco.com/images/team/rabina-e1722594475871-255x182.jpg",
  },
];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Arbitration Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const response = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "Arbitration Inquiry", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] block mb-2">FULL NAME</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-[#c5c6cd] focus:border-gray-900 px-0 py-2 text-sm text-gray-900 transition-all duration-300 outline-none placeholder:text-gray-400"
            placeholder="e.g. Alexander Hamilton"
            type="text"
          />
        </div>
        <div className="relative">
          <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] block mb-2">EMAIL ADDRESS</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-0 border-b border-[#c5c6cd] focus:border-gray-900 px-0 py-2 text-sm text-gray-900 transition-all duration-300 outline-none placeholder:text-gray-400"
            placeholder="name@firm.com"
            type="email"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] block mb-2">PHONE NUMBER</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-transparent border-0 border-b border-[#c5c6cd] focus:border-gray-900 px-0 py-2 text-sm text-gray-900 transition-all duration-300 outline-none placeholder:text-gray-400"
            placeholder="+000 000 0000"
            type="tel"
          />
        </div>
        <div className="relative">
          <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] block mb-2">SUBJECT</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-transparent border-0 border-b border-[#c5c6cd] focus:border-gray-900 px-0 py-2 text-sm text-gray-900 transition-all duration-300 outline-none appearance-none"
          >
            <option>Arbitration Inquiry</option>
            <option>Mediation Request</option>
            <option>Panel Membership</option>
            <option>General Feedback</option>
          </select>
        </div>
      </div>
      <div className="relative">
        <label className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#45474c] block mb-2">MESSAGE / BRIEF DESCRIPTION</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-0 border-b border-[#c5c6cd] focus:border-gray-900 px-0 py-2 text-sm text-gray-900 transition-all duration-300 outline-none resize-none placeholder:text-gray-400"
          placeholder="Provide a summary of your inquiry..."
          rows="4"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 text-sm">
          Thank you! Your message has been sent successfully. We will get back to you soon.
        </div>
      )}

      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-[#c9a84c] text-white px-12 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#101c2e] transition-all duration-400 disabled:opacity-60"
        >
          {loading ? "SENDING..." : "SUBMIT INQUIRY"}
        </button>
      </div>
    </form>
  );
}
