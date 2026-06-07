"use client";

import { useEffect, useState } from "react";
import {
  ChevronRight,
  Quote,
  CheckCircle,
  BadgeCheck,
  Eye,
  Target,
  Award,
  Shield,
  Users,
  Scale,
  Handshake,
  Heart,
  Gavel,
  ArrowRight,
} from "lucide-react";

const values = [
  { icon: Award, label: "Quality" },
  { icon: Shield, label: "Integrity" },
  { icon: Users, label: "Diversity" },
  { icon: Eye, label: "Transparency" },
  { icon: Scale, label: "Accountability" },
  { icon: Handshake, label: "Engagement" },
  { icon: Heart, label: "Mutual Respect" },
];

const legalFrameworks = [
  "UNCITRAL Model Law",
  "New York Convention 1958",
  "Arbitration Act 1999 (Nepal)",
  "Mediation Act 2011 (Nepal)",
];

const objectives = [
  "Administering domestic and international arbitration and mediation cases with absolute neutrality.",
  "Developing institutional rules and standards for ethical ADR practice.",
  "Maintaining a diverse and highly qualified panel of ADR professionals.",
  "Providing specialized training and certification for future arbitrators and mediators.",
  "Engaging in international research to advance ADR methodologies.",
  "Collaborating with global institutions to facilitate cross-border dispute resolution.",
];

function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="bg-white px-4 sm:px-0">
      <RevealObserver />

      {/* Hero */}
      {/* <section className="relative overflow-hidden bg-primary-container pt-[200px] pb-[120px]">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkhaHZh4zXeTLzrXvrkuN-R1ThgwMOwIs3K4JeA-f5Bgecemn1_zh4pwYETiJsK3fTcXiwEbgbPg1E0QXRrfjXZzueu9fbtc8_NVxqMbdt5BBSaZ_pY4xj-mCA2_eZHLI2L1lTOWSOLEQnksSAWPT_cD1JxhH4_ChrSPomNrewPTLfLovb3wU1PVKq3KfMBIhOk8Ker6qOAKW9e0ku1bUxh_zbKjg3RxNGCVf7dqeiQM_zhY5730AVPK90zRIjfGxdtIT8oKjkfPN8')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(rgba(16, 28, 46, 0.85), rgba(16, 28, 46, 0.95))" }}
          />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 w-full">
          <nav className="flex items-center gap-2 mb-4 text-white/60 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <span className="text-white">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
            <span className="text-tertiary-fixed">Company Profile</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl text-white max-w-2xl mb-6">
            Institutional Excellence in Dispute Resolution
          </h1>
          <p className="text-white text-base sm:text-lg max-w-xl">
            The Nepal International ADR Center (NIAC) serves as the premiere neutral venue for domestic and international arbitration and mediation.
          </p>
        </div>
      </section> */}

      {/* Institutional Overview */}
      <section className="max-w-[1200px] mt-16 text-black mx-auto pt-[100px] pb-[50px]">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
          <div className="md:col-span-7 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 class="relative text-blue-900 inline-block after:content-[''] mb-8 after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-2 after:bg-[#b08d2a] after:rounded-full">
              Nepal International ADR Center - NIAC
            </h2>
            {/* <div className="md:space-y-2 text-black sm:text-lg leading-[1.5] tracking-wide ">
              <p>
                Nepal International ADR Center (NIAC) is an alternative dispute
                resolution service center established in 2013 by a group of
                multidisciplinary experts including jurists, senior lawyers,
                management experts, senior engineers, arbitrators, mediators,
                academicians and chartered accountants. It was restructured in
                2020 as a not for profit entity. It enjoys a really wide mandate
                and scope of work which draw on the Charter of its
                Incorporation. It delivers domestic as well as cross border and
                international commercial dispute resolution services using
                arbitration and mediation as well as their combined forms like
                med-arb, arb-med and so on while continuously keeping a focus on
                knowledge development and capacity building.
              </p>

              <p>
                A mediation focused service facility with the banner of
                Kathmandu Commercial Mediation Center (KCMC) operates under the
                purview of NIAC to deliver commercial mediation services. NIAC
                has its own set of Arbitration and Mediation rules that are
                devised in line with UNCITRAL Model Rules.
              </p>

              <p>
                As a setup with aforementioned attributes, NIAC is an able and
                committed ADR center that provides accessible and credible
                dispute resolution service. Former US Chief Justice Warren E.
                Burger had once mentioned, “Traditional trial systems are too
                costly, too painful, too destructive, and too inefficient for
                truly civilized people.”
              </p>

              <p>
                Hence, there is a need to innovate and change the traditional
                adversarial paradigm into an amicable and non-hostile resolution
                with recourse to Arbitration and Mediation.
              </p>

              {showMore && (
                <>
                  <p>
                    On the 6th of August 2020, NIAC along with nine Dispute
                    Resolution institutes from countries in the Asia-Pacific
                    region founded a transnational Arbitration and Mediation
                    centre aptly named as &ldquo;Asia Pacific Centre for
                    Arbitration and Mediation (APCAM)&rdquo;.
                  </p>

                  <p>
                    As a constituent member of APCAM, NIAC offers arbitration
                    and mediation services to national as well as the
                    international commercial community for resolving domestic
                    and cross border disputes under the aegis of NIAC and APCAM.
                    APCAM members adopt a single set of arbitration and
                    mediation rules and neutrals accreditation system ensuring
                    standardized and competent professionalized services to the
                    business community and other service seekers in all member
                    nations.
                  </p>

                  <p>
                    It is expected to contribute to develop Nepal, a land linked
                    with two larger and dynamic economies; India and China, into
                    a convenient and coveted hub for commercial dispute
                    resolution services. Nepal, as a member of the United
                    Nations (UN), World Trade Organization (WTO), and other
                    international institutions have acceded to and endorsed
                    various international instruments relating to public and
                    private International Law. It has accepted the UNCITRAL
                    model on contract and arbitration law.
                  </p>

                  <p>
                    Nepal has also endorsed the Convention on the Recognition
                    and Enforcement of Foreign Arbitral Awards &ndash; the New
                    York Convention 1958. Nepal has enacted and amended some of
                    its domestic laws with a view to promote and strengthen
                    Dispute Resolution practices in the country. For example,
                    Contract Act 2000, Arbitration Act 1999, Company Act 2006,
                    Foreign Investment and Technology Transfer Act 1992 et al.
                  </p>

                  <p>
                    In addition to that, the country has enacted the Mediation
                    Act 2011 as umbrella legislation with a view to enhance and
                    promote mediation for the amicable resolution of
                    contractual, community and court referred/annexed disputes.
                  </p>

                  <p>
                    Nepal has always held its identity as a peace-loving nation
                    situated at a strategically important location between two
                    dominant economic powers- India and China. NIAC is thus
                    poised to offer a neutral venue where the contesting parties
                    could come for an amicable settlement of their disputes.
                  </p>

                  <p>
                    Nepal possesses diverse natural wonders such as the majestic
                    mountains Mt Everest, Mt, Machhapuchhre, Mt.Annapurna, Mt
                    Kanchanjungha, etc., lakes such as Shey Phoksundo, Rara,
                    Phewa, and meditative luxuriant forests in and around the
                    Kathmandu valley.
                  </p>

                  <p>
                    Nepal is culturally rich since both the Hindus and the
                    Buddhists revere this nation for hosting their sacred places
                    of worship like Pashupatinath, Muktinath, Lumbini, and so
                    on. This natural and cultural heritage offers a solemn
                    attraction for investors and entrepreneurs with NIAC
                    positioned firmly to make Arbitration and Mediation services
                    available to help resolve domestic and cross-border
                    disputes.
                  </p>

                  <p>
                    NIAC&rsquo;s affiliation with APCAM adds a new dimension in
                    enlarging the scope and adding quality in the management and
                    delivery of Arbitration and Mediation services.
                  </p>
                </>
              )}

              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="inline-flex items-center gap-2 mt-2 text-blue-900 font-semibold text-sm tracking-wide hover:text-blue-700 transition-colors group"
              >
                {showMore ? "Show less" : "Read more"}
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showMore ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div> */}
            <div className="md:space-y-6 text-black sm:text-lg leading-[1.7] tracking-wide">
              {" "}
              <div>
                <p className="italic text-gray-700 mt-2">
                  {" "}
                  Redefining Dispute Resolution: Amicable, Efficient, and
                  Globally Credible.{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-semibold mb-2">
                  {" "}
                  A Better Way to Resolve Disputes{" "}
                </h3>{" "}
                <p>
                  {" "}
                  We, the NIAC team, believe resolving disputes should not mean
                  breaking professional relationships. Established in 2013 and
                  restructured as a not-for-profit entity in 2020, NIAC helps
                  businesses move beyond the stress and high costs of
                  traditional court battles through Arbitration, Mediation, and
                  hybrid solutions.{" "}
                </p>{" "}
                <p className="mt-4">
                  {" "}
                  We do not just handle cases; we help build the future of
                  dispute resolution. NIAC serves as a premier center for
                  learning and professional growth, offering practical and
                  high-caliber programs including:{" "}
                </p>{" "}
                <ul className="list-disc ml-6 mt-4 space-y-1">
                  {" "}
                  <li>Professional Arbitration Training</li>{" "}
                  <li>Arbitral Secretary Training</li>{" "}
                  <li>Certified Mediation Training</li>{" "}
                  <li>
                    {" "}
                    National and international ADR summits and other ADR
                    events{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-semibold mb-2">
                  Why Choose NIAC?
                </h3>{" "}
                <p>
                  {" "}
                  We offer a welcoming, transparent, and highly dependable
                  environment for resolving both domestic and international
                  commercial disputes.{" "}
                </p>{" "}
                <ul className="list-disc ml-6 mt-4 space-y-3">
                  {" "}
                  <li>
                    {" "}
                    <strong>Diverse, Real-World Expertise:</strong> Our panel
                    brings together trusted jurists, senior advocates,
                    management experts, senior engineers, experienced
                    arbitrators, accredited mediators, academicians, and
                    chartered accountants with deep knowledge of the corporate
                    and commercial world.{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong>Deep Regional Roots:</strong> As a founding member
                    of the Asia Pacific Centre for Arbitration and Mediation
                    (APCAM), NIAC maintains strong regional and international
                    partnerships through various MoUs with leading dispute
                    resolution institutions. Nepal itself offers an inspiring
                    setting with remarkable natural beauty and tranquility.{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-semibold mb-2">
                  {" "}
                  Nepal: A Strategic & Serene Destination for ADR{" "}
                </h3>{" "}
                <p>
                  {" "}
                  Positioned between India and China, two of the world’s largest
                  economies, Nepal is emerging as a preferred venue for regional
                  and international commercial dispute resolution.{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-semibold mb-2">
                  {" "}
                  A Trusted, Reliable Legal Environment{" "}
                </h3>{" "}
                <p>
                  {" "}
                  As an active member of the United Nations and the WTO, Nepal
                  offers a reliable legal framework that respects international
                  business interests.{" "}
                </p>{" "}
                <ul className="list-disc ml-6 mt-4 space-y-3">
                  {" "}
                  <li>
                    {" "}
                    <strong>Global Enforcement:</strong> Nepal has ratified the
                    New York Convention 1958.{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <strong>Modern Legal Foundations:</strong> Domestic laws
                    including the Arbitration Act and the Mediation Act provide
                    secure and internationally enforceable mechanisms for
                    settlements and awards.{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-semibold mb-2">
                  {" "}
                  A Neutral and Inspiring Venue{" "}
                </h3>{" "}
                <p>
                  {" "}
                  Sometimes a change in perspective is all it takes to find a
                  breakthrough. Beyond legal structures, Nepal offers a peaceful
                  setting that helps ease high-stakes tensions. The majesty of
                  Mt. Everest, the serenity of lakes such as Rara and Phewa, and
                  the cultural heritage of Lumbini and Pashupatinath create an
                  environment conducive to meaningful dispute resolution.{" "}
                </p>{" "}
                <p className="mt-4">
                  {" "}
                  This unique combination of strategic location and peaceful
                  surroundings makes NIAC an ideal neutral venue where
                  international parties can escape litigation fatigue, gain
                  clarity, and reach lasting conclusions.{" "}
                </p>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-semibold mb-2">
                  Connect With Us
                </h3>{" "}
                <p>
                  {" "}
                  Let NIAC and its global network safeguard your commercial
                  interests through standard, qualified, and reliable ADR
                  services.{" "}
                </p>{" "}
              </div>{" "}
            </div>
          </div>
          <div className="md:col-span-3 bg-surface-container-low p-8 border-l-4 border-tertiary-container self-start fade-up opacity-0 translate-y-10 transition-all duration-700">
            <blockquote className="font-serif text-xl sm:text-2xl text-primary italic mb-4 leading-relaxed">
              &ldquo;The notion that ordinary people want black-robed judges,
              well-dressed lawyers, and fine-panelled courtrooms as the setting
              to resolve their disputes is not correct. People with problems,
              like people with pains, want relief, and they want it as quickly
              and inexpensively as possible.&rdquo;
            </blockquote>
            <cite className="text-xs font-semibold tracking-[0.08em] text-on-surface-variant not-italic block">
              &mdash; Former US Chief Justice Warren E. Burger
            </cite>
          </div>
        </div>
      </section>

      {/* Transnational Reach & APCAM */}

      {/* Strategic Legal Framework */}
      <section className="max-w-[1200px] mx-auto text-black  pb-[120px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 class="relative text-blue-900 inline-block after:content-['']  mb-8 after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-2 after:bg-[#b08d2a] after:rounded-full">
              Strategic Legal Framework
            </h2>
            <p className="text-base sm:text-lg leading-relaxed tracking-wide mb-6">
              Situated strategically between the two global economies of India
              and China, Nepal offers a unique neutral ground for international
              commercial disputes. Our legal framework is aligned with global
              standards:
            </p>
            <div className="space-y-4">
              {legalFrameworks.map((item) => (
                <div
                  key={item}
                  className="py-4 border-b border-outline-variant flex justify-between items-center"
                >
                  <span className="text-xs font-semibold tracking-wider uppercase">
                    {item}
                  </span>
                  <BadgeCheck className="text-tertiary w-5 h-5 shrink-0" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center fade-up opacity-0 translate-y-10 transition-all duration-700">
            <div className="bg-primary-container p-8 text-white">
              <h3 className="font-serif text-xl sm:text-2xl mb-4">
                A Neutral Venue
              </h3>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed tracking-wide mb-6">
                Nepal&apos;s identity as a peace-loving nation, home to Mt.
                Everest and the birthplace of Lord Buddha in Lumbini, provides a
                serene and neutral backdrop for resolving complex disputes.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <img
                  className="h-24 w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVl9gRoNdbQFQi_d40A6nqU66KAgS0fYhz0D13h8pYSBpwRrfA7co5Sci_UxAxUstXt6OXWxSHygW4m1E84q5muFPsTPM-4iFEz-nL5LSzetisi2yXjfWITh4bTxyCGq1A8j3DB4Vl1qfcS5FqmV6nKwZEtJTgZgLbPn9TMXdAPZ16WEWZ3n10Mync41aB0Lm4--peDGgME0gdMhyKTIEMCwi__Tvsj8pWkl1FW0toYmOVZ5H4nD4xDHoaXs_6mdADfhyWjpl-fdk2"
                  alt="Mountain Peak"
                />
                <img
                  className="h-24 w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA0D22VZVGw72AQR3o-exokoxwskXHfsH2jp7cwMmAyZCJMIF6-4AtYPhqK8a4vHOoein5VrtlfGLUSZzfhT3AcLo6xX6ovg24Up4jnY3gin9vpVcgriie7Vcyw6UvP2ZFJSkUaqJJQvsUkxwhh3AIDzFcMqm7RqZ397PsG6fx8FjK5i0P9_qrrI4zY7Ffff77Cdi5LxiITrpEADyO4fH3CyF9CV_z9qdJ6yO_IQJtXoMdWjH2oyuHYX6YBdmvAZYTl5dXssh-X4Dq"
                  alt="Temple Architecture"
                />
                <img
                  className="h-24 w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTR75x1d5YhQabHbDcvnqvvZj8VZ9nCZ2F6fwbTD3AQqrVCAmJvgejIn-wZ_OGGGagY98O5pLFQgodc_AuY6WqhTUWLJwkiSqg3NW1Iwya0mWDoCah9wzemck15BPAlZ9fFQIo_uKha-B3z3IcYykeEbmTAfwRVNpiz6ZRDmppergF3iQkoe0Dp0JiOmmOUPl4KC08yrnPdPtYdq_boQz2mMdaBuS_DFMrK5Jw0DxIoshSSni-GCLlLGeTTC8nQvlCFZ2KapB0SBXO"
                  alt="Peaceful Temple"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Objectives */}
      <section className="bg-surface py-[50px]">
        <div className="max-w-[1200px] mx-auto ">
          {/* Objectives */}
          <div className=" text-white md:col-span-3 mb-8 fade-up opacity-0 translate-y-10 transition-all duration-700">
            <h2 class="relative text-blue-900 inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-10 after:h-2 after:bg-[#b08d2a] after:rounded-full">
              Our Objectives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-8">
              {objectives.map((obj, i) => (
                <div key={i} className="space-y-2">
                  <span className="text-black font-bold text-xl block">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="text-black text-base leading-relaxed tracking-wide">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-8 border border-outline-variant border-t-2 border-t-tertiary-container fade-up opacity-0 translate-y-10 transition-all duration-700">
              <Eye className="text-tertiary w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-primary mb-4">
                Our Vision
              </h3>
              <p className="text-base leading-relaxed text-on-surface-variant italic tracking-wide">
                &ldquo;To develop NIAC as a center of excellence in providing
                ADR services and promoting a culture of amicable dispute
                resolution.&rdquo;
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 border border-outline-variant border-t-2 border-t-tertiary-container md:col-span-2 fade-up opacity-0 translate-y-10 transition-all duration-700">
              <Target className="text-tertiary w-8 h-8 mb-4" />
              <h3 className="font-serif text-xl text-primary mb-4">
                Our Mission
              </h3>
              <p className="text-base leading-relaxed text-on-surface-variant tracking-wide">
                &ldquo;To ensure accessibility to quality ADR services through
                professional excellence, institutional integrity, and
                transnational collaboration, ensuring that justice is neither
                painful nor prohibitively expensive for commercial
                entities.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}

      {/* Core Values */}
      <section className=" bg-surface px-8 mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl text-black text-center mb-16">
          Core Institutional Values
        </h2>
        <div className="grid max-w-7xl mx-auto grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-center fade-up opacity-0 translate-y-10 transition-all duration-700">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.label} className="group">
                <div className="w-16 h-16 bg-surface-container-low border border-outline-variant flex items-center justify-center mx-auto mb-4 group-hover:bg-tertiary-container transition-colors duration-400">
                  <Icon className="text-primary w-6 h-6 group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-semibold text-black tracking-wider uppercase">
                  {v.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
