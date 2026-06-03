import { fetchTeams } from "@/lib/api";
import { baseUrl } from "@/lib/seo";
import PanelistTable from "../components/PanelistTable";
import Link from "next/link";
import { FileText, Phone } from "lucide-react";
export const metadata = {
  title: "National Panelist - NIAC",
  description:
    "Meet our esteemed national panel of arbitrators and ADR professionals at the Nepal International ADR Center.",
  keywords:
    "NIAC national panelists, arbitrators Nepal, ADR Nepal, dispute resolution experts",
  openGraph: {
    title: "National Panelist | NIAC",
    description:
      "Meet our esteemed national panel of arbitrators and ADR professionals.",
    url: `${baseUrl}/national-panelist`,
    type: "website",
    siteName: "NIAC - Nepal International ADR Center",
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "NIAC National Panelists",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/national-panelist`,
  },
};

export default async function NationalPanelistPage() {
  const teams = await fetchTeams();
  const panelists = teams.filter((t) =>
    t.panelist
      ?.split(",")
      .map((s) => s.trim())
      .includes("National Panelist"),
  );
  console.log("Fetched panelists:", teams);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#9F8320] overflow-hidden flex items-center justify-center pt-[150px] pb-[50px]">
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <h1 className="font-serif text-5xl leading-[1.2] font-semibold text-white mb-2 drop-shadow-sm">
            National Panelist
          </h1>
          <p className="text-lg leading-[1.6] text-white/90 max-w-2xl mx-auto">
            Nepal&rsquo;s foremost arbitrators and ADR professionals dedicated
            to upholding justice.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="max-w-[1200px] mx-auto py-[120px]">
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-4">
            <h2 className="font-serif text-[32px] leading-[1.3] font-medium text-primary-container">
              Roster of Arbitrators
            </h2>
            <div className="w-24 h-0.5 bg-tertiary-container hidden md:block" />
          </div>
        </div>
        <div className="border border-outline-variant/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 rounded-sm overflow-hidden">
          <div className="col-span-5">
            <PanelistTable panelists={panelists} />
          </div>
          <div className="hidden lg:block lg:col-span-2">
            <div className="space-y-8">
              {/* Company Presentation Button */}
              <div>
                <Link
                  href="/pdfs/company-presentation.pdf"
                  className="flex items-center gap-4 w-full bg-blue-900 text-white px-6 py-5 text-[13px] font-semibold tracking-[0.05em] uppercase hover:bg-primary/90 transition-all rounded-sm"
                >
                  <FileText className="w-6 h-6 shrink-0" />
                  <span>Company presentation</span>
                </Link>
              </div>

              {/* How can we help you? */}
              <div className="bg-[#9F8320] p-8">
                <h3 className="text-base font-bold  mb-4">
                  How can we help you?
                </h3>
                <p className="text-sm leading-relaxed  mb-6">
                  Contact us at the NIAC office nearest to you or submit an
                  inquiry online.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-primary px-5 py-3 text-[12px] font-semibold tracking-[0.05em] uppercase hover:bg-primary hover:text-white transition-all rounded-sm border border-gray-200"
                >
                  <Phone className="w-4 h-4" />
                  contacts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-8 pb-[120px]">
        <div className="bg-[#9F8320] text-white px-10 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-[28px] mb-2">
              Looking for an Arbitrator?
            </h2>
            <p className="text-sm text-white/70 max-w-xl">
              Contact the NIAC Secretariat to appoint an arbitrator or learn
              more about our arbitration services.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center border border-white/40 text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-white hover:text-primary-container transition-all"
            >
              Contact Secretariat
            </a>
            <a
              href="/services/arbitration"
              className="inline-flex items-center justify-center bg-tertiary-fixed text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 text-primary-container hover:bg-tertiary-fixed-dim transition-all"
            >
              Arbitration Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
