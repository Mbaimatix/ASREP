import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import LightboxGallery from "@/components/shared/LightboxGallery";
import { readClient } from "@/sanity/lib/client";
import { IMPACT_STORIES_QUERY, ANNUAL_REPORTS_QUERY } from "@/sanity/lib/queries";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const metadata: Metadata = {
  title: "Our Impact | ASREP Africa",
  description:
    "Measurable impact across climate resilience, peacebuilding, research, and civic governance. Download ASREP Africa's 2025-2026 Impact Report and explore field stories and photo galleries.",
};

const builder = createImageUrlBuilder(readClient);
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

const impactAreas = [
  {
    colour: "bg-forest/8 border-forest/20",
    accent: "text-forest",
    title: "Climate Resilience & NbS",
    stats: [
      { value: "10,000", label: "Indigenous trees planted" },
      { value: "2,000+", label: "Eco-champions trained" },
      { value: "10", label: "Wards of Isiolo covered" },
    ],
    story: "Waso Eco-Champions restore degraded ASAL landscapes using nature-based solutions, reversing decades of ecological decline across 10 wards of Isiolo County.",
  },
  {
    colour: "bg-earth/8 border-earth/20",
    accent: "text-earth",
    title: "Peacebuilding & Social Cohesion",
    stats: [
      { value: "500+", label: "Peace actors engaged" },
      { value: "1", label: "County peace forum active" },
      { value: "60%", label: "Women & youth participants" },
    ],
    story: "The Isiolo Peace Actors Forum has created a standing multi-community dialogue space, reducing resource-driven conflict incidents and building durable inter-community trust.",
  },
  {
    colour: "bg-gold/8 border-gold/20",
    accent: "text-earth",
    title: "Research & Indigenous Knowledge",
    stats: [
      { value: "1", label: "IK Vault publication released" },
      { value: "3", label: "Research products published" },
      { value: "2025", label: "Series debut year" },
    ],
    story: "The debut ASAL IK Vault publication â€” 'Cows, Women & Land' â€” documented Borana Oromo indigenous ecological knowledge and entered policy discourse at county and national level.",
  },
  {
    colour: "bg-sage/8 border-sage/20",
    accent: "text-sage",
    title: "Civic Governance & Youth",
    stats: [
      { value: "47", label: "Counties in national rollout" },
      { value: "1", label: "KSG national partnership" },
      { value: "2025", label: "Partnership year" },
    ],
    story: "The KSG 'Under the Tree' Series, piloted in Isiolo, now scales across all 47 Kenyan counties â€” a landmark testament to ASREP's community-sourced civic education model.",
  },
  {
    colour: "bg-forest/8 border-forest/15",
    accent: "text-forest",
    title: "Biodiversity & Livelihoods",
    stats: [
      { value: "40+", label: "Eco-entrepreneurship participants" },
      { value: "SDZWA-K", label: "International biodiversity partner" },
      { value: "2026", label: "Strategy validation" },
    ],
    story: "ASREP represented Isiolo County in national biodiversity strategy development, while eco-entrepreneurship initiatives created green income pathways for 40+ community members.",
  },
];

// Placeholder gallery images
const galleryImages = [
  { src: "/images/gallery/waso-1.jpg", alt: "Waso Eco-Champions planting trees in Isiolo", caption: "Waso Eco-Champions â€” Isiolo County, 2024" },
  { src: "/images/gallery/peace-1.jpg", alt: "Inter-community peace dialogue convened by ASREP", caption: "Peace dialogue â€” Isiolo Peace Actors Forum, 2025" },
  { src: "/images/gallery/research-1.jpg", alt: "ASREP researcher with community elders during IK documentation", caption: "IK Vault Series research â€” Isiolo, 2025" },
  { src: "/images/gallery/civic-1.jpg", alt: "KSG Under the Tree civic education session", caption: "KSG Under the Tree â€” civic governance, 2025" },
  { src: "/images/gallery/community-1.jpg", alt: "ASREP community gathering in Northern Kenya", caption: "Community engagement â€” Isiolo County" },
  { src: "/images/gallery/landscape-1.jpg", alt: "Restored ASAL landscape with new vegetation", caption: "Restored landscape â€” Waso River basin" },
];

export default async function ImpactPage() {
  let annualReports: { title: string; year: number; pdfFile?: { asset: { url: string } }; externalUrl?: string }[] = [];
  try {
    const data = await readClient.fetch(ANNUAL_REPORTS_QUERY, {}, { next: { revalidate: 3600 } });
    if (data && data.length > 0) annualReports = data;
  } catch { /* CMS unavailable */ }

  return (
    <>
      <PageHero
        title="Our Impact"
        subtitle="Real, measurable change across climate resilience, peace, research, and governance in Kenya's ASALs."
        imageSrc="/images/impact/impact-hero.jpg"
        imageAlt="ASREP Africa impact â€” eco-champions, peace dialogues, and community empowerment in Isiolo County"
        breadcrumbs={[{ label: "Our Impact" }]}
        tag="2023 â€“ 2026"
      />

      {/* Numbers summary */}
      <section className="bg-forest py-14" aria-label="Top-level impact statistics">
        <div className="container-asrep">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {[
              { value: "10", suffix: "", label: "Wards Covered" },
              { value: "2,000", suffix: "+", label: "People Reached" },
              { value: "500", suffix: "+", label: "Peace Actors" },
              { value: "23", suffix: "", label: "Policies Developed" },
              { value: "60", suffix: "%", label: "Women & Youth" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-white text-4xl font-bold">
                  {s.value}<span className="text-gold">{s.suffix}</span>
                </p>
                <p className="text-white/55 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact areas */}
      <section className="section-pad bg-cream" aria-labelledby="impact-areas-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Thematic Impact"
            title="Five Areas of"
            titleHighlight="Measurable Change"
            subtitle="Impact across all six thematic programmes, documented in our annual Impact Report."
            id="impact-areas-heading"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {impactAreas.map((area) => (
              <div
                key={area.title}
                className={`rounded-2xl p-7 border-2 bg-white ${area.colour} flex flex-col`}
              >
                <h3 className={`font-display font-bold text-lg mb-5 ${area.accent}`}>{area.title}</h3>
                <div className="space-y-3 mb-5">
                  {area.stats.map((s) => (
                    <div key={s.label} className="flex items-baseline gap-3">
                      <span className={`font-display text-2xl font-bold ${area.accent}`}>{s.value}</span>
                      <span className="text-charcoal/60 text-xs">{s.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-charcoal/65 text-sm leading-relaxed mt-auto pt-4 border-t border-charcoal/8">
                  {area.story}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Report Download */}
      <section className="section-pad bg-forest" aria-labelledby="report-heading">
        <div className="container-asrep max-w-3xl text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Full Report</p>
          <h2 id="report-heading" className="font-display text-white text-3xl md:text-4xl font-bold mb-6">
            ASREP Africa Impact Report 2025â€“2026
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Download our comprehensive impact report, covering all six programmes, financial
            highlights, partner acknowledgements, and our vision for 2026â€“2027.
          </p>
          {annualReports.length > 0 ? (
            <a
              href={annualReports[0].pdfFile?.asset?.url || annualReports[0].externalUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-forest
                font-semibold text-sm rounded-xl hover:bg-cream transition-colors"
              aria-label="Download ASREP Africa Impact Report 2025-2026 (PDF)"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Impact Report 2025â€“2026 (PDF)
            </a>
          ) : (
            <a
              href="/resources"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest
                font-semibold text-sm rounded-xl hover:bg-cream transition-colors"
            >
              View All Publications
            </a>
          )}
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-pad bg-white" aria-labelledby="gallery-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Photo Gallery"
            title="From the"
            titleHighlight="Field"
            subtitle="Images from ASREP's programmes across Isiolo County â€” click any photo to view full size."
            id="gallery-heading"
          />
          <LightboxGallery images={galleryImages} columns={3} />
        </div>
      </section>
    </>
  );
}

