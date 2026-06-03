"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <section className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">
            <a href="/" className="text-gray-500 hover:text-primary transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Contact</span>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="max-w-[1200px] mx-auto  py-16">
              <h2 class="relative text-[#0F1B4B] inline-block after:content-[''] my-8 after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-2 after:bg-[#b08d2a] after:rounded-full">
              Contact Us
              </h2>
        {/* Tab: Kathmandu Office */}
        <div>
          <div className="flex border-b bg-[#9F8320] border-gray-300 mb-8">
            <button className="px-6 py-4 text-[13px] font-bold uppercase tracking-[0.05em] text-white font-bold border-b-2 border-primary bg-[#0F1B6B]">
              Kathmandu Office
            </button>
          </div>

          {/* Row 1: Image / Map / Contact Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src="/images/contact-page-image.jpeg"
                alt="NIAC Kathmandu Office"
                className="w-full h-auto object-cover"
                onError={(e) => { e.target.src = "https://placehold.co/600x400/eeeeee/999999?text=NIAC+Office"; }}
              />
            </div>

            {/* Google Map */}
            <div className="overflow-hidden">
              <iframe
                title="NIAC location map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220.79660034471283!2d85.32842763827327!3d27.694256489686484!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4b1f5a3a5%3A0x20634b5fe727d535!2sNiraula%20Law%20Chamber%20%26%20Co!5e0!3m2!1sen!2snp!4v1779967553121!5m2!1sen!2snp"
                width="100%"
                height="330"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Details */}
            <div
              className="relative p-10 text-white flex flex-col justify-center"
              style={{
                backgroundImage: "url('https://placehold.co/600x400/10246e/10246e')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-[#10246e]/85" />
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-6">Contact Details</h4>
                <ul className="space-y-5">
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <span className="text-sm leading-relaxed">House no. 163, Pragati Marg, Hanumansthan, Anamnagar, Kathmandu-29</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <span className="text-sm">+977 01 5705609</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </span>
                    <div className="text-sm">
                      <a href="mailto:niacadrweek@gmail.com" className="hover:underline block">niacadrweek@gmail.com</a>
                      <a href="mailto:adrcenter@niac.asia" className="hover:underline">adrcenter@niac.asia</a>
                    </div>
                  </li>
                </ul>
                {/* Social */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-white/20">
                  <a href="https://www.facebook.com/niac.asia" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white hover:text-[#10246e] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white hover:text-[#10246e] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-white/40 rounded-full hover:bg-white hover:text-[#10246e] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Feedback Form + Your Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Feedback Form */}
            <div className="lg:col-span-8">
                            <h2 class="relative text-[#0F1B4B] inline-block after:content-[''] mb-8 after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-2 after:bg-[#b08d2a] after:rounded-full">
              Feedback Form
              </h2>
              <ContactForm />
            </div>

            {/* Your Contact */}
            <div className="lg:col-span-4">
              <h4 className="font-bold text-lg text-[#222] mb-6">Your contact</h4>
              <div className="space-y-8">
                {staff.map((person) => (
                  <div key={person.name} className="flex gap-4">
                    <div className="w-[100px] h-[100px] shrink-0 overflow-hidden bg-gray-100">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://placehold.co/174x174/eeeeee/999999?text=NIAC"; }}
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-[#222]">{person.name}</h5>
                      <p className="text-[11px] font-semibold tracking-[0.05em] uppercase text-[#888] mb-2">{person.title}</p>
                      <a href={`mailto:${person.email}`} className="text-[13px] text-primary hover:underline">
                        {person.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#9F8320]">
        <div className="max-w-[1200px] mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xl font-bold text-white">
            Looking for Accessible and Credible ADR Service Provider?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0F1B4B] text-white px-8 py-4 text-[13px] font-semibold tracking-[0.05em] uppercase hover:brightness-110 transition-all rounded-sm"
          >
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>
    </div>
  );
}

const staff = [
  {
    name: "Matrika Prasad Niraula",
    title: "Managing Director",
    email: "lawyers.adr@gmail.com",
    image: "https://cdn.equitylawandco.com/images/team/matrika.png",
  },
  {
    name: "Rabina Jangam",
    title: "Executive Officer",
    email: "rabina.niac@gmail.com",
    image: "https://cdn.equitylawandco.com/images/team/rabina-e1722594475871-255x182.jpg",
  },
];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-5">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="First name *"
            className="w-full border border-gray-300 px-4 py-3 text-sm text-[#555] placeholder:text-[#999] focus:outline-none focus:border-primary transition-colors"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="E-mail *"
            className="w-full border border-gray-300 px-4 py-3 text-sm text-[#555] placeholder:text-[#999] focus:outline-none focus:border-primary transition-colors"
          />
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone *"
            className="w-full border border-gray-300 px-4 py-3 text-sm text-[#555] placeholder:text-[#999] focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="space-y-5">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message *"
            rows="6"
            className="w-full border border-gray-300 px-4 py-3 text-sm text-[#555] placeholder:text-[#999] focus:outline-none focus:border-primary transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-primary/90 transition-all disabled:opacity-60"
          >
            {loading ? "SENDING..." : "submit"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm">{error}</div>
      )}
      {success && (
        <div className="mt-4 bg-green-50 border border-green-300 text-green-700 px-4 py-3 text-sm">
          Thank you! Your message has been sent successfully.
        </div>
      )}
    </form>
  );
}
