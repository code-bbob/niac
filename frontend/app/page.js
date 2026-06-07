"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useServices } from "./hooks/usePracticeAreas";
import { useBlogs } from "./hooks/useBlogs";
import { useBulletins } from "./hooks/useBulletins";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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
      { threshold: 0.1 },
    );
    const observeElements = (root) => {
      if (root.classList?.contains("reveal")) observer.observe(root);
      root.querySelectorAll?.(".reveal").forEach((el) => observer.observe(el));
    };
    observeElements(document.body);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observeElements(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
  return null;
}

function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
      <div className="absolute hidden md:block inset-x-0 bottom-0 z-0 top-[120px]">

        <div className="absolute w-xl left-1/2 -translate-x-1/2 bottom-1/8 flex gap-4 justify-center">
          <a
            href="/events/asia-adr-summit-2026-2nd-nepal-adr-week/register"
            className="inline-flex items-center justify-center border border-white/40 text-md tracking-[0.2em] uppercase px-8 py-4 bg-red-900 text-white font-extrabold hover:bg-white hover:text-primary-container transition-all"
          >
            Register Now
          </a>
          <a
            href="/events/asia-adr-summit-2026-2nd-nepal-adr-week/"
            className="inline-flex items-center justify-center bg-tertiary-fixed text-md font-extrabold tracking-[0.2em] uppercase px-8 py-4 text-primary-container hover:bg-tertiary-fixed-dim transition-all"
          >
            Learn More
          </a>
        </div>

        <div className="bg-blue-900 text-white font-serif font-bold text-center text-2xl py-4 w-full absolute top-0">
          Nepal is calling the international community!
        </div>

        <img
          className="w-full h-full object-cover object-top mt-8"
          src="/images/herobg.png"
          alt="NIAC Hero"
        />
      </div>
      <div className="absolute block md:hidden inset-x-0 bottom-0 z-0 top-[80px]">
                <div className="absolute w-lg left-1/2 -translate-x-1/2 bottom-1/4 flex gap-4 justify-center">
          <a
            href="/events/asia-adr-summit-2026-2nd-nepal-adr-week/register"
            className="inline-flex items-center justify-center border border-white/40 text-xs tracking-[0.2em] uppercase px-4 py-2 bg-red-900 text-white font-extrabold hover:bg-white hover:text-primary-container transition-all"
          >
            Register Now
          </a>
          <a
            href="/events/asia-adr-summit-2026-2nd-nepal-adr-week/"
            className="inline-flex items-center justify-center bg-tertiary-fixed text-xs font-extrabold tracking-[0.2em] uppercase px-8 py-4 text-primary-container hover:bg-tertiary-fixed-dim transition-all"
          >
            Learn More
          </a>
        </div>

        <div className="bg-blue-900 text-white font-serif font-bold text-center text-sm py-4 w-full absolute top-10">
          Nepal is calling the international community!
        </div>
        <img
          className="w-full h-full object-cover object-top"
          src="/images/mobile-bg.jpeg"
          alt="NIAC Hero"
        />
      </div>
      {/* <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 w-full">
        <div className="max-w-3xl reveal active">
          <span className="inline-flex items-center gap-3 text-[10px] px-1 font-semibold tracking-[0.25em] uppercase text-tertiary-fixed mb-6">
            NIAC
            <span className="h-px w-8 bg-tertiary-fixed/50" />
            Nepal International ADR Center
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight font-bold text-white mb-6">
            Resolving Disputes. Preserving Relationships.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/85 mb-8 italic max-w-2xl">
            Nepal&apos;s leading international arbitration and mediation center, fostering excellence in alternative dispute resolution.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <button className="bg-tertiary-container text-white px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-tertiary transition-all duration-300">
                File a Dispute
              </button>
            </Link>
            <Link href="/about">
              <button className="border border-tertiary-container/70 text-tertiary-container px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div> */}
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-[#10245f] py-10 sm:py-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <p className="text-md font-bold mb-2">
            &ldquo;Accessible and Credible Arbitration and Mediation forum in
            the Asia-Pacific region&rdquo;
          </p>
          <p className="text-[#a0863d] font-serif font-semibold text-base sm:text-lg">
            Looking for a Credible ADR Service Provider?
          </p>
        </div>
        <Link href="/contact">
          <button className="bg-[#9f8320] hover:bg-[#b89a2e] text-white px-8 py-4 text-[13px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 flex items-center gap-2 whitespace-nowrap rounded-sm">
            Get In Touch <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { Services: apiServices, loading } = useServices();

  const services = apiServices.map((s) => ({
    title: s.name,
    slug: s.slug,
    image: s.featured_image_url || "/images/service-placeholder.jpg",
  }));

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-center font-serif text-3xl sm:text-4xl md:text-5xl text-primary mb-12 sm:mb-16 reveal">
          Our Services
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-surface">
                <div className="aspect-[255/182] bg-surface-container-high" />
                <div className="p-5">
                  <div className="h-5 bg-surface-container-high rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.length > 0 ? (
              services.map((service, i) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block reveal relative"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="overflow-hidden">
                    <img
                      className="w-full aspect-[255/182] object-cover transition-transform duration-500 group-hover:scale-105"
                      src={service.image}
                      alt={service.title}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "rgba(0, 0, 0, 0.4)" }}
                    />
                  </div>
                  <div className="bg-transparent px-5 py-5 absolute bottom-2 flex items-center justify-between transition-colors duration-300 ">
                    <h5 className="font-serif font-bold text-xl text-white transition-colors duration-300">
                      {service.title}
                    </h5>
                    <span className="text-white transition-colors duration-300 text-sm">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-on-surface-variant text-sm py-20">
                Our services are being updated. Please check back soon.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function BulletinSection() {
  const { bulletins, loading } = useBulletins();

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-center font-serif text-3xl sm:text-4xl md:text-5xl text-primary mb-12 sm:mb-16 reveal">
          NIAC Bulletin
        </h2>
        {loading ? (
          <div className="animate-pulse max-w-md mx-auto">
            <div className="aspect-[424/600] bg-surface-container-high rounded" />
          </div>
        ) : bulletins.length > 0 ? (
          <div className="flex justify-center ">
            <img
              className="max-w-full h-auto max-h-[600px] object-contain shadow-lg"
              src={bulletins[0].image_url}
              alt={bulletins[0].title}
            />
          </div>
        ) : (
          <p className="text-center text-on-surface-variant text-sm py-20">
            No bulletins available yet.
          </p>
        )}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const features = [
    {
      title: "Accessibility",
      description:
        "NIAC has a dynamic secretariat in Kathmandu, Nepal which is accessible to domestic as well as international clientele. In case our clients are based elsewhere and would want to avail our services, we also provide services in eight countries of the Asia Pacific region.",
      href: "/about",
    },
    {
      title: "Credibility",
      description:
        "NIAC provides an international roster of neutrals who have passed a rigorous accreditation process and have been selected for being impartial and competent. So, our clients can absolutely trust and rely on us for credible service that addresses their needs.",
      href: "/about",
    },
    {
      title: "Expertise",
      description:
        "NIAC boasts of a vibrant team of ADR experts with decades of working experience and a drive for resolving disputes. We have a meticulous understanding of Alternative Resolution practices and follow the due course of procedures while delivering tailor-made services.",
      href: "/about",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#f5f5f5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-center font-serif text-3xl sm:text-4xl md:text-5xl text-primary mb-12 sm:mb-16 reveal">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-white p-8 sm:p-10 h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl text-[#10246e]">
                    <FeatureIcon index={i} />
                  </div>
                  <h5 className="font-serif text-xl text-[#10246e] mt-2">
                    <Link
                      href={feature.href}
                      className="hover:text-[#9f8320] transition-colors"
                    >
                      {feature.title}
                    </Link>
                  </h5>
                </div>
                <p className="text-sm leading-relaxed text-[#555] mb-6">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#9f8320] hover:text-[#10246e] transition-colors flex items-center gap-2"
                >
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ index }) {
  const icons = [
    <svg
      key="access"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 3" />
    </svg>,
    <svg
      key="cred"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
    <svg
      key="expert"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>,
  ];
  return icons[index] || null;
}

function LatestNews() {
  const { blogs, loading } = useBlogs();
  const displayBlogs = blogs.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="text-center font-serif text-3xl sm:text-4xl md:text-5xl text-primary mb-12 sm:mb-16 reveal">
          Latest News
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[350/250] bg-surface-container-high" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-surface-container-high rounded w-3/4" />
                  <div className="h-4 bg-surface-container-high rounded w-full" />
                  <div className="h-4 bg-surface-container-high rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : displayBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayBlogs.map((blog, i) => (
              <Link
                key={blog.slug || blog.id}
                href={`/blogs/${blog.slug}`}
                className="group block reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="overflow-hidden">
                  {blog.featured_image ? (
                    <img
                      className="w-full aspect-[350/250] object-cover transition-transform duration-500 group-hover:scale-105"
                      src={blog?.featured_image}
                      alt={blog.title}
                    />
                  ) : (
                    <div className="w-full aspect-[350/250] bg-[#f5f5f5] flex items-center justify-center text-[#999] text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-5 bg-white">
                  <h5 className="font-serif text-lg text-primary mb-2 line-clamp-2 group-hover:text-[#9f8320] transition-colors">
                    {blog.title}
                  </h5>
                  {blog.excerpt && (
                    <p className="text-sm text-[#666] leading-relaxed mb-3 line-clamp-2">
                      {blog.excerpt.replace(/<[^>]*>/g, "")}
                    </p>
                  )}
                  <span className="text-xs text-[#999]">
                    {blog.published_date
                      ? new Date(blog.published_date).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" },
                        )
                      : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-on-surface-variant text-sm py-20">
            No news articles yet.
          </p>
        )}
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#10246e]/40 z-10" />
        <img
          className="w-full h-full object-cover"
          src="https://niac.asia/wp-content/uploads/2015/12/placeholder.gif"
          alt="Background"
        />
      </div>
      <div className="relative z-20 max-w-[900px] mx-auto px-4 sm:px-8 text-center">
        <h5 className="text-white text-xl sm:text-2xl leading-relaxed font-light italic mb-6">
          &ldquo;Discourage litigation. Persuade your neighbours to compromise
          whenever you can. Point out to them how the nominal winner is often
          the real loser &ndash; in fees, and expenses, and waste of time. As a
          peace-maker, the lawyer has a superior opportunity of being a good
          man. There will still be business enough.&rdquo;
        </h5>
        <p className="text-[#9f8320] text-lg font-semibold">
          &ndash; Abraham Lincoln
        </p>
      </div>
    </section>
  );
}

function ApcamSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-10 reveal">
          APCAM
        </h2>
        <div className="flex flex-col md:flex-row gap-20 items-start reveal">
          <div className="shrink-0">
            <img
              className="w-[150px] h-auto"
              src="/images/apcam-logo.png"
              alt="APCAM"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <div>
            <p className="text-sm sm:text-base leading-relaxed text-[#555] mb-8">
              APCAM (Asia Pacific Centre for Arbitration &amp; Mediation) is an
              international ADR center formed jointly by about ten arbitration
              and mediation centers from the Asia-Pacific countries, which host
              APCAM centers in their respective countries. APCAM caters to the
              requirement of international and cross-border business disputes,
              and help the business community to resolve their international
              commercial and business disputes by mediation or arbitration under
              a single set of Mediation and Arbitration Rules and with a uniform
              fee structure in all the member countries to minimize the hassle
              of adhering to different laws or fees of different institutions.
            </p>
            <Link href="/apcam">
              <button className="border-2 border-[#ddd] text-[#555] px-8 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-[#10246e] hover:border-[#10246e] hover:text-white transition-all duration-300 rounded-sm">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestCallback() {
  const [formData, setFormData] = useState({
    service: "Mediation",
    name: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: `${formData.name.toLowerCase().replace(/\s+/g, ".")}@temp.com`,
          phone: formData.phone,
          message: `Callback request for ${formData.service} service from ${formData.name}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ service: "Mediation", name: "", phone: "" });
      }
    } catch {}
  };

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#19256e]/50 z-10" />
        <img
          className="w-full h-full object-cover"
          src="https://niac.asia/wp-content/uploads/2015/12/placeholder.gif"
          alt="Background"
        />
      </div>
      <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="max-w-3xl">
          <h3 className="text-white text-3xl sm:text-3xl font-bold font-serif mb-4 reveal">
            REQUEST A CALL BACK
          </h3>
          <p className="text-white/80 text-base mb-8 reveal">
            Send us an email and we&apos;ll get in touch shortly, or phone
            between 8:00 and 18:00 Monday to Friday &mdash; we would be
            delighted to speak.
          </p>
          {submitted ? (
            <div className="bg-white/10 text-white p-6 rounded-sm reveal">
              <p className="text-lg font-medium">
                Thank you! We&apos;ll call you back soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reveal">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="bg-white/10 border border-white/20 text-white px-4 py-4 text-sm appearance-none focus:outline-none focus:border-[#9f8320] transition-colors rounded-sm"
                >
                  <option value="Mediation" className="text-[#333]">
                    Mediation
                  </option>
                  <option value="Arbitration" className="text-[#333]">
                    Arbitration
                  </option>
                  <option value="Adjudication" className="text-[#333]">
                    Adjudication
                  </option>
                  <option value="Med-Arb/ Arb-Med" className="text-[#333]">
                    Med-Arb/ Arb-Med
                  </option>
                </select>
                <input
                  type="text"
                  placeholder="First name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-white/10 border border-white/20 text-white px-4 py-4 text-sm placeholder:text-white/50 focus:outline-none focus:border-[#9f8320] transition-colors rounded-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="bg-white/10 border border-white/20 text-white px-4 py-4 text-sm placeholder:text-white/50 focus:outline-none focus:border-[#9f8320] transition-colors rounded-sm"
                />
                <button
                  type="submit"
                  className="bg-[#9f8320] hover:bg-[#b89a2e] text-white px-8 py-4 text-[13px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                >
                  Submit <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageSlider() {
  const slides = [
    { id: 1, src: "/images/niac-slider-1.png" },
    { id: 2, src: "/images/niac-slider-2.png" },
    { id: 3, src: "/images/niac-slider-3.png" },
    { id: 4, src: "/images/niac-slider-4.png" },
    { id: 5, src: "/images/niac-slider-5.png" },
  ];

  const [current, setCurrent] = useState(0);
  const len = slides.length;

  const next = () => setCurrent((c) => (c + 1) % len);
  const prev = () => setCurrent((c) => (c - 1 + len) % len);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div
        className="relative w-full"
        style={{ height: "clamp(300px, 50vw, 700px)" }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <img
              className="w-full h-full object-cover"
              src={slide.src}
              alt={`Slide ${slide.id}`}
            />
          </div>
        ))}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-10"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <RevealObserver />
      <HeroSection />
      <CtaSection />
      <ServicesSection />
      <BulletinSection />
      <WhyChooseUs />
      <LatestNews />
      <QuoteSection />
      <ApcamSection />
      <RequestCallback />
      <ImageSlider />
    </>
  );
}
