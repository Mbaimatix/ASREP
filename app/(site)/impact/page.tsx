import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import LightboxGallery from "@/components/shared/LightboxGallery";
import { getStats } from "@/lib/get-stats";

export const metadata: Metadata = {
  alternates: { canonical: "https://asrepafrica.org/impact" },
  title: "Our Impact",
  description:
    "Measurable impact across climate resilience, peacebuilding, research, and civic governance. Download ASREP Africa's 2025-2026 Impact Report and explore field stories and photo galleries.",
};

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
    story: "The debut ASAL IK Vault publication  -  'Cows, Women & Land'  -  documented Borana Oromo indigenous ecological knowledge and entered policy discourse at county and national level.",
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
    story: "The KSG 'Under the Tree' Series, piloted in Isiolo, now scales across all 47 Kenyan counties  -  a landmark testament to ASREP's community-sourced civic education model.",
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

// Impact gallery images using real field photos
const galleryImages = [
  { src: "/images/gallery/waso-eco-champs-line.jpg", alt: "Waso Eco-Champions lined up at a community tree planting event in Isiolo County", caption: "Waso Eco-Champions - Isiolo County, 2024" },
  { src: "/images/gallery/community-women-peace-prayer.jpg", alt: "Women community leaders in a peace prayer circle convened by ASREP Africa's peacebuilding programme", caption: "Women peace prayer - Isiolo Peace Actors Forum, 2025" },
  { src: "/images/gallery/asrep-elders-strategic-meeting.jpg", alt: "ASREP Africa executive and community elders at a strategic planning meeting", caption: "IK documentation with elders - Isiolo, 2025" },
  { src: "/images/gallery/dida-fayo-remarks-under-tree-series-launch-oldonyiro.jpg", alt: "Dida Fayo giving remarks at the KSG Under the Tree Series launch in Oldonyiro, Isiolo", caption: "KSG Under the Tree launch - Oldonyiro, 2025" },
  { src: "/images/gallery/asrep-community-team-group.jpg", alt: "ASREP Africa community team group photo with programme staff and partners", caption: "Community engagement - Isiolo County" },
  { src: "/images/gallery/sdzwa-k-biodiversity-strategy-validation-meeting-laikipia.jpg", alt: "ASREP and SDZWA-K officials at the national biodiversity strategy validation meeting in Laikipia", caption: "Biodiversity strategy validation - Laikipia, 2026" },
];

export default function ImpactPage() {
  const stats = getStats();
  return (
    <>
      <PageHero
        title="Our Impact"
        subtitle="Real, measurable change across climate resilience, peace, research, and governance in Kenya's ASALs."
        imageSrc="/images/impact/impact-hero.jpg"
        imageAlt="ASREP Africa impact  -  eco-champions, peace dialogues, and community empowerment in Isiolo County"
        imagePosition="object-top"
        breadcrumbs={[{ label: "Our Impact" }]}
        tag="2023 - 2026"
      />

      {/* Numbers summary */}
      <section className="bg-forest py-14" aria-label="Top-level impact statistics">
        <div className="container-asrep">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-white text-4xl font-bold">
                  {s.value.toLocaleString("en")}<span className="text-gold">{s.suffix}</span>
                </p>
                <p className="text-white/55 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Download CTA */}
      <div className="bg-forest">
        <div className="container-asrep">
          <div className="mt-0 pb-12 text-center">
            <p className="text-white/60 text-sm mb-4">Read the full story behind these numbers</p>
            <a
              href="/resources"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold/90 text-forest
                font-bold text-base rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Download Impact Report 2025–2026 (PDF)
            </a>
            <p className="text-white/40 text-xs mt-3">Free download · No sign-up required</p>
          </div>
        </div>
      </div>

      {/* Impact areas */}
      <section className="section-pad bg-cream" aria-labelledby="impact-areas-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Thematic Impact"
            title="Five Areas of"
            titleHighlight="Measurable Change"
            subtitle="Impact across our five thematic areas, documented in our annual Impact Report."
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
            ASREP Africa Impact Report 2025-2026
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Download our comprehensive impact report, covering all six programmes, financial
            highlights, partner acknowledgements, and our vision for 2026-2027.
          </p>
          <a
            href="/resources"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest
              font-semibold text-sm rounded-xl hover:bg-cream transition-colors"
          >
            View All Publications
          </a>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section-pad bg-white" aria-labelledby="gallery-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Photo Gallery"
            title="From the"
            titleHighlight="Field"
            subtitle="Images from ASREP's programmes across Isiolo County  -  click any photo to view full size."
            id="gallery-heading"
          />
          <LightboxGallery images={galleryImages} columns={3} />
        </div>
      </section>
    </>
  );
}

