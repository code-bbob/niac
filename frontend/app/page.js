"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Gavel, Handshake, BadgeCheck, ArrowRight, CheckCircle,
  ChevronLeft, ChevronRight, Quote
} from "lucide-react";
import { useTeams } from "./hooks/useAttorneys";
import { useServices } from "./hooks/usePracticeAreas";

const stats = [
  { value: "500+", label: "Cases Resolved" },
  { value: "20+", label: "Years of Excellence" },
  { value: "150+", label: "Qualified Panelists" },
  { value: "12", label: "Countries Represented" },
];

const iconMap = {
  arbitration: Gavel,
  arbitrations: Gavel,
  mediation: Handshake,
  "med-arb-arb-med": BadgeCheck,
  adjudication: BadgeCheck,
};

const linkLabels = {
  arbitration: "EXPLORE PROCESS",
  arbitrations: "EXPLORE PROCESS",
  mediation: "LEARN MORE",
  "med-arb-arb-med": "LEARN MORE",
  adjudication: "VIEW SERVICES",
};

const advantages = [
  {
    title: "Strict Confidentiality",
    description:
      "Maintaining the privacy of your sensitive business and trade secrets throughout the process.",
  },
  {
    title: "Expert Neutrality",
    description:
      "A panel of distinguished jurists and industry veterans from across the globe.",
  },
  {
    title: "Global Standard Rules",
    description:
      "Aligned with UNCITRAL model laws to ensure international enforceability of awards.",
  },
  {
    title: "State-of-the-Art Facilities",
    description:
      "Virtual and physical hearing rooms equipped with the latest forensic technology.",
  },
  {
    title: "Time Efficiency",
    description:
      "Streamlined procedures designed to deliver results in a fraction of court time.",
  },
];

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
      { threshold: 0.1 }
    );

    const observeElements = (root) => {
      if (root.classList?.contains("reveal")) {
        observer.observe(root);
      }
      root.querySelectorAll?.(".reveal").forEach((el) => {
        observer.observe(el);
      });
    };

    observeElements(document.body);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            observeElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
  return null;
}

function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-16 sm:pt-[160px] lg:pt-[200px] pb-[80px] sm:pb-[100px] lg:pb-[120px]">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWhxFkO2KtR8P6sGfPlKHNjU0PfBpR42-L8gOob5lY8y17gQwUKJakVxXh0iXbWM-jA0gnczc_ByXYC_XSYQG0eBLYW7JGh7mNYX5ux9uVBIJOp0Cy1UzCwM2SMDOxk7Ig3jPQzsv2UBQBHrghnoF5wd7ix3dPwi5o_EAyl8GfH3hO9djStm9aRmoC_0w5719Rldd5FY0ExfHT3TH_t3kixZRec7HCPN-mIpw7blmO7TtKmFQjSBFA5UB0ykf4iiD7d95VQrBpELh0"
          alt="A cinematic boardroom overlooking Kathmandu and the Himalayas"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(rgba(16, 28, 46, 0.55), rgba(16, 28, 46, 0.55))" }}
        />
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-8 w-full">
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
            <button className="bg-tertiary-container text-white px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-tertiary transition-all duration-300">
              File a Dispute
            </button>
            <button className="border border-tertiary-container/70 text-tertiary-container px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-primary-container py-8 sm:py-12 border-b border-outline">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={stat.label} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="font-serif text-3xl sm:text-4xl text-tertiary-container mb-2">{stat.value}</div>
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-primary-container">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  const { Services: apiServices, loading } = useServices();

  const mappedServices = apiServices.map((s) => ({
    title: s.name,
    description: s.description?.replace(/<[^>]*>/g, "") || "",
    slug: s.slug,
    Icon: iconMap[s.slug] || BadgeCheck,
    linkLabel: linkLabels[s.slug] || "LEARN MORE",
  }));

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="mb-12 sm:mb-20 reveal">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary ">Our Services</h2>
          <div className="w-24 h-1 bg-tertiary-container" />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white border border-outline-variant border-t-[3px] border-t-tertiary-container p-6 sm:p-10">
                <div className="w-9 h-9 bg-surface rounded mb-6" />
                <div className="h-7 bg-surface rounded w-2/3 mb-4" />
                <div className="h-4 bg-surface rounded w-full mb-2" />
                <div className="h-4 bg-surface rounded w-5/6 mb-8" />
                <div className="h-4 bg-surface rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            {mappedServices.length > 0 ? mappedServices.map((service, i) => {
              const Icon = service.Icon;
              return (
                <div
                  key={service.slug}
                  className="bg-white border border-outline-variant border-t-[3px] border-t-tertiary-container p-6 sm:p-10 flex flex-col h-full hover:shadow-lg transition-all reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Icon className="text-tertiary-container w-9 h-9 mb-6" />
                  <h3 className="font-serif text-2xl text-primary mb-4">{service.title}</h3>
                  <p className="service-card__desc text-sm sm:text-base leading-relaxed text-on-surface-variant mb-8 flex-grow">
                    {service.description}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[11px] font-semibold tracking-[0.1em] text-tertiary-container flex items-center gap-2 group"
                  >
                    {service.linkLabel}{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            }) : (
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

function WhyChooseUs() {
  return (
    <section className="py-[60px] sm:py-[80px] lg:py-[120px] bg-surface">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
        <div className="relative reveal">
          <img
            className="w-full h-[300px] sm:h-[450px] lg:h-[600px] object-cover transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYJA9TjWO46zwSf6QqYd_YUz5zABL_YQ8n1egov0FjM0Om_ou7TXnoymWI0pZjzuWn7EmM658GH6bzU_5XPQwCEK64ig-qiB2RASAOSx60rC4feyU3QsWUX51QlD6dcru0mJfLinVIRfap5ufSfUkuxaHrlbujVofI2YD0QcwP_Jw_fZCIc5VhZORh2zLIRhntS_3I7esgLI6QDkNHaPm1IGqRO5TWMdEwOtOTeHSTDs_NXi9sXBtGXz0PJzv1WoVd-EmHZa8S1zVq"
            alt="Legal professionals in discussion"
          />
          {/* <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-tertiary-container hidden lg:block opacity-10" /> */}
        </div>
        <div className="reveal">
          <h2 className="font-serif text-4xl sm:text-5xl text-primary mb-6">
            Unparalleled Integrity in Dispute Resolution
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-on-surface-variant mb-10">
            As the region&apos;s premier hub for ADR, we offer a neutral, efficient, and cost-effective alternative to traditional litigation, supported by internationally recognized rules and a stellar roster of experts.
          </p>
          <ul className="space-y-6">
            {advantages.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <CheckCircle className="text-tertiary-container w-5 h-5 mt-1 shrink-0" />
                <div>
                  <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-primary mb-1">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function EventBanner() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden reveal">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary-container/95 z-10" />
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEkPJv9gGNrdOoKE0wA-aVzPIFU8Bv5Hecp_J11PG1jFvSyDd27vK3y6jxKFYjmAMRIinjPVCS-dR49KuUScOmU4Gj5f2BzFNRYuX11zwljK-d8r6FqOrHZC_2HSn4KwGY4Hf0UHpn5W8lDK_zb-Oyl8wVBDfUoQBHlEHg32DcbViab46rt7MdG45OCGgSbfyMh9fBcQi4rktU7hq9197vIO7LUwhnObz-dkp0NfuZ2IANLZ8MyAhuNuT3xlvG8YtuwO3DYR5PjNce"
          alt="Architectural building at night"
        />
      </div>
      <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-10">
        <div className="text-white max-w-2xl">
          <span className="text-[11px] font-semibold tracking-[0.1em] text-tertiary-container mb-4 block uppercase">
            SIGNATURE EVENT 2026
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl mb-4">Asia ADR Summit 2026</h2>
          <p className="text-base sm:text-lg leading-relaxed opacity-80">
            Join world-leading arbitrators, counsel, and corporate heads for three days of high-level discourse on the future of international dispute resolution in Asia.
          </p>
        </div>
        <button className="bg-white text-primary-container px-10 py-5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-tertiary-container hover:text-white transition-all whitespace-nowrap">
          Register Now
        </button>
      </div>
    </section>
  );
}

function TeamSection() {
  const { teams, loading } = useTeams();
  const displayTeams = teams.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-16 gap-6 reveal">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl text-primary mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-tertiary-container" />
          </div>
          <Link href="/team" className="text-[11px] font-semibold tracking-[0.1em] text-primary border-b border-primary pb-1 hover:text-tertiary hover:border-tertiary transition-colors uppercase">
            VIEW ALL TEAM
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-surface mb-6" />
                <div className="h-6 bg-surface rounded w-3/4 mb-2" />
                <div className="h-4 bg-surface rounded w-1/2 mb-2" />
                <div className="h-4 bg-surface rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayTeams.length > 0 ? displayTeams.map((team, i) => (
              <Link key={team.id} href={`/team/${team.slug}`} className="group animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface">
                  {team.photo_url? (
                    <img
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                      src={team.photo_url}
                      alt={team.full_name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-on-surface-variant/30 text-6xl font-serif">
                      {team.full_name?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
                <h4 className="font-serif text-xl text-primary mb-1">{team.full_name}</h4>
                <p className="text-[11px] font-semibold tracking-[0.1em] text-secondary uppercase mb-3">{team.job_title || 'Panelist'}</p>
                <p className="text-sm italic text-on-surface-variant line-clamp-2">{team.professional_background || team.specializations || ''}</p>
              </Link>
            )) : (
              <p className="col-span-full text-center text-on-surface-variant text-sm py-20">
                Team information is being updated. Please check back soon.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-[60px] sm:py-[80px] lg:py-[120px] bg-surface-container-low overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
        <Quote className="text-tertiary-container w-12 h-12 mb-8 mx-auto" />
        <div className="max-w-4xl mx-auto reveal active">
          <p className="font-serif text-2xl sm:text-3xl leading-relaxed text-primary mb-10 italic">
            &ldquo;The Arbitration Center provided a level of professional neutrality and efficiency that exceeded our expectations. Their panel of experts truly understands the complexities of cross-border infrastructure projects.&rdquo;
          </p>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] text-primary uppercase mb-1">Chief Legal Officer</p>
            <p className="text-sm text-secondary">Global Logistics Syndicate</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-12">
          <button className="w-12 h-12 rounded-full border border-outline flex items-center justify-center bg-tertiary-container hover:text-white hover:scale-105 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full border border-outline flex items-center justify-center bg-tertiary-container hover:text-white hover:scale-105 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
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
      <StatsBar />
      <ServicesSection />
      <WhyChooseUs />
      <EventBanner />
      <TeamSection />
      <TestimonialsSection />
    </>
  );
}
