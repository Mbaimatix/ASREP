import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import Accordion from "@/components/shared/Accordion";
import { readClient } from "@/sanity/lib/client";
import { PUBLICATIONS_QUERY, ANNUAL_REPORTS_QUERY } from "@/sanity/lib/queries";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.asrepafrica.org/resources" },
  title: "Resources | Publications & Research - ASREP Africa",
  description:
    "Download ASREP Africa's Impact Report 2025-2026, the ASAL IK Vault Series debut, eco-entrepreneurship webinar summary, and policy briefs. Access our full publications library.",
};

const builder = createImageUrlBuilder(readClient);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

type Publication = {
  _id: string;
  title: string;
  year: number;
  publicationType: string;
  description?: string;
  status: "available" | "forthcoming" | "request-only";
  isFeatured: boolean;
  pdfFile?: { asset: { url: string } };
  externalUrl?: string;
  downloadUrl?: string;
  coverImage?: SanityImageSource & { alt?: string };
};

// Fallback publications shown when CMS is unavailable
const fallbackPublications: Publication[] = [
  {
    _id: "p1",
    title: "ASREP Africa Impact Report 2025-2026",
    year: 2026,
    publicationType: "annual-report",
    description:
      "Comprehensive review of ASREP's work across all six thematic programmes, covering 2023-2026 impact data, financial highlights, and strategic outlook.",
    status: "available",
    isFeatured: true,
    downloadUrl: "/downloads/asrep-impact-report-2025-2026.pdf",
  },
  {
    _id: "p2",
    title: "ASAL IK Vault Series: Cows, Women & Land",
    year: 2025,
    publicationType: "knowledge-series",
    description:
      "Debut publication of the ASAL Indigenous Knowledge Vault Series - documenting Borana Oromo ecological and cultural knowledge from Isiolo County.",
    status: "available",
    isFeatured: true,
    downloadUrl: "/downloads/cows-women-land.pdf",
  },
  {
    _id: "p3",
    title: "Eco-Entrepreneurship Webinar Summary",
    year: 2025,
    publicationType: "webinar-summary",
    description:
      "Key findings and recommendations from the 2025 ASAL eco-entrepreneurship convening, covering green business models and market linkages for ASAL communities.",
    status: "available",
    isFeatured: false,
  },
  {
    _id: "p4",
    title: "Economic Impacts of NbS in ASAL Regions - Policy Brief",
    year: 2026,
    publicationType: "policy-brief",
    description:
      "Quantifying the economic value of nature-based solutions and community-led conservation in Isiolo County - evidence for policy advocacy.",
    status: "forthcoming",
    isFeatured: false,
  },
];

const typeLabel: Record<string, string> = {
  "annual-report": "Annual Report",
  "knowledge-series": "IK Vault Series",
  "policy-brief": "Policy Brief",
  research: "Research Paper",
  "webinar-summary": "Webinar Summary",
};

const typeColour: Record<string, string> = {
  "annual-report": "bg-forest/10 text-forest",
  "knowledge-series": "bg-gold/10 text-earth",
  "policy-brief": "bg-sage/10 text-sage",
  research: "bg-earth/10 text-earth",
  "webinar-summary": "bg-muted/10 text-muted",
};

const policyCategories = [
  {
    id: "gov",
    title: "Governance & Compliance (6)",
    items: [
      "Organisational Governance Policy",
      "Board Charter & Code of Conduct",
      "Conflict of Interest Policy",
      "Whistleblower & Complaints Policy",
      "Anti-Corruption & Anti-Bribery Policy",
      "Document Management & Retention Policy",
    ],
  },
  {
    id: "fin",
    title: "Financial Management (5)",
    items: [
      "Financial Management & Internal Controls Policy",
      "Procurement & Tendering Policy",
      "Asset Management Policy",
      "Audit & Compliance Policy",
      "Reserve Fund & Reserves Policy",
    ],
  },
  {
    id: "prog",
    title: "Programmatic Integrity (4)",
    items: [
      "Programme Design & Quality Assurance Policy",
      "Monitoring, Evaluation & Learning (MEL) Policy",
      "Research Ethics & Indigenous Knowledge Policy",
      "Environmental & Social Safeguards Policy",
    ],
  },
  {
    id: "hr",
    title: "HR & Safeguarding (5)",
    items: [
      "Human Resources & Staff Welfare Policy",
      "Code of Conduct",
      "Child Protection Policy",
      "PSEAH Policy",
      "Diversity, Equity & Inclusion Policy",
    ],
  },
  {
    id: "ops",
    title: "Operational & Digital (3)",
    items: [
      "Communications & Media Policy",
      "Data Protection & Privacy Policy",
      "Information & Cybersecurity Policy",
    ],
  },
];

export default async function ResourcesPage() {
  let publications: Publication[] = fallbackPublications;
  let annualReports: Publication[] = [];

  try {
    const [pubs, reports] = await Promise.all([
      readClient.fetch(PUBLICATIONS_QUERY, {}, { next: { revalidate: 3600 } }),
      readClient.fetch(ANNUAL_REPORTS_QUERY, {}, { next: { revalidate: 3600 } }),
    ]);
    if (pubs && pubs.length > 0) publications = pubs;
    if (reports && reports.length > 0) annualReports = reports;
  } catch {
    /* CMS unavailable */
  }

  // annualReports used for future report download section
  void annualReports;

  return (
    <>
      <PageHero
        title="Resources & Publications"
        subtitle="Research, indigenous knowledge documentation, policy briefs, and impact reports from ASREP Africa's work."
        imageSrc="/images/resources/resources-hero.jpg"
        imageAlt="ASREP research publications and field documentation materials"
        breadcrumbs={[{ label: "Resources" }]}
        tag="Publications & Research"
      />

      {/* Publications grid */}
      <section className="section-pad bg-cream" aria-labelledby="publications-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Publications Library"
            title="Knowledge from"
            titleHighlight="the Field"
            subtitle="Research products, indigenous knowledge publications, and policy briefs generated through ASREP's programmes."
            id="publications-heading"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {publications.map((pub) => (
              <div
                key={pub._id}
                className={`bg-white rounded-2xl p-7 border shadow-sm flex flex-col
                  ${pub.isFeatured ? "border-forest/20 ring-2 ring-forest/10" : "border-charcoal/8"}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeColour[pub.publicationType] ?? "bg-sand text-charcoal"}`}
                    >
                      {typeLabel[pub.publicationType] ?? pub.publicationType}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold
                      ${
                        pub.status === "available"
                          ? "bg-green-50 text-green-700"
                          : pub.status === "forthcoming"
                            ? "bg-gold/10 text-earth"
                            : "bg-muted/10 text-muted"
                      }`}
                    >
                      {pub.status === "available"
                        ? "Available"
                        : pub.status === "forthcoming"
                          ? "Forthcoming"
                          : "On Request"}
                    </span>
                    {pub.isFeatured && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-forest/10 text-forest">
                        Featured
                      </span>
                    )}
                  </div>
                  <span className="text-muted text-xs font-medium shrink-0">{pub.year}</span>
                </div>

                <h3 className="font-display font-bold text-earth text-lg leading-snug mb-3">
                  {pub.title}
                </h3>
                {pub.description && (
                  <p className="text-charcoal/60 text-sm leading-relaxed flex-1 mb-5">
                    {pub.description}
                  </p>
                )}

                <div className="mt-auto">
                  {pub.status === "available" && (pub.downloadUrl || pub.pdfFile?.asset?.url || pub.externalUrl) ? (
                    <a
                      href={pub.downloadUrl || pub.pdfFile?.asset?.url || pub.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest hover:bg-sage text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Download PDF
                    </a>
                  ) : pub.status === "forthcoming" ? (
                    <a
                      href={`/contact?subject=Notify%20Me%3A%20${encodeURIComponent(pub.title)}`}
                      className="text-forest hover:text-sage text-sm font-medium underline underline-offset-2 transition-colors"
                    >
                      Notify me when available →
                    </a>
                  ) : (
                    <a
                      href={`/contact?subject=Document%20Request%3A%20${encodeURIComponent(pub.title)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-white text-sm font-semibold rounded-lg hover:bg-sage transition-colors"
                    >
                      Request This Document
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Policies accordion */}
      <section className="section-pad bg-white" aria-labelledby="policies-resources-heading">
        <div className="container-asrep max-w-3xl">
          <SectionHeader
            tag="Institutional Policies"
            title="23 Policies Governing"
            titleHighlight="Our Work"
            subtitle="Summary overview - full documents available to institutional partners on request."
            id="policies-resources-heading"
          />
          <Accordion
            items={policyCategories.map((cat) => ({
              id: cat.id,
              title: cat.title,
              content: (
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ),
            }))}
            allowMultiple
          />
          <div className="mt-8 text-center">
            <a
              href="/contact?subject=Document%20Request%3A%20Institutional%20Policy%20Documents"
              className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-white text-sm font-semibold rounded-lg hover:bg-sage transition-colors"
            >
              Request Full Policy Documents
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
