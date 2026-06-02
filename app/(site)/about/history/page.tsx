import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import TimelineItem from "@/components/about/TimelineItem";

export const metadata: Metadata = {
  title: "Our History | About ASREP Africa",
  description:
    "From founding in 2023 to global media recognition in 2026 — trace the key milestones of ASREP Africa's journey across Kenya's arid and semi-arid lands.",
};

const milestones = [
  {
    year: "2023",
    title: "ASREP Africa Founded",
    description:
      "Established in Isiolo County by a team of ASAL specialists, researchers, and community leaders with a shared vision: locally-led resilience for Kenya's most underserved landscapes. Legal registration as a Kenyan NGO completed.",
  },
  {
    year: "2023",
    title: "First Institutional Policies Developed",
    description:
      "In its founding year, ASREP developed an initial framework of governance, financial, and safeguarding policies — establishing a culture of accountability from the outset. This eventually grew to 23 policies across five domains.",
  },
  {
    year: "2024",
    title: "Waso Eco-Champs Programme Launched",
    description:
      "The flagship Waso Eco-Champions initiative was launched across 10 wards of Isiolo County, mobilising 2,000+ community members to plant indigenous trees, restore degraded land, and build climate-adaptive capacity through nature-based solutions.",
  },
  {
    year: "2025",
    title: "KSG Partnership — 'Under the Tree' Series",
    description:
      "A landmark partnership with the Kenya School of Government delivered the first 'Under the Tree' civic governance education sessions in Isiolo. The model was so successful it was adopted for a 47-county national rollout across Kenya.",
  },
  {
    year: "2025",
    title: "ASAL IK Vault Series — Debut Release",
    description:
      "The inaugural publication of the ASAL Indigenous Knowledge Vault Series was released: 'Cows, Women & Land' — a documentation of Borana Oromo indigenous ecological and cultural knowledge. The series sets a new standard for participatory knowledge preservation in the ASALs.",
  },
  {
    year: "2025",
    title: "Eco-Entrepreneurship Webinar",
    description:
      "ASREP convened a 40+ participant eco-entrepreneurship webinar, linking ASAL community members with green economy skills, market opportunities, and peer networks across Kenya.",
  },
  {
    year: "2026",
    title: "SDZWA-K Biodiversity Strategy Validation",
    description:
      "ASREP represented Isiolo County in the San Diego Zoo Wildlife Alliance Kenya biodiversity strategy validation process — placing ASAL community voices at the heart of national conservation planning.",
  },
  {
    year: "2026",
    title: "Big News: Global Media Recognition",
    description:
      "ASREP's work received major international recognition — featured in Biographic Magazine ('The Future of Conservation Without US Aid') and The Guardian's global environment section. These global feature stories put Isiolo-based community conservation on the world map and affirmed ASREP's place in the global conservation conversation.",
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        title="Our History"
        subtitle="From a founding vision in 2023 to global recognition in 2026 — the ASREP story in milestones."
        imageSrc="/images/about/history-hero.jpg"
        imageAlt="Isiolo landscape at dawn — where ASREP Africa's story began"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Our History" },
        ]}
        tag="Our Journey"
      />

      <section className="section-pad bg-cream" aria-labelledby="history-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Timeline"
            title="A Short Organisation,"
            titleHighlight="A Deep Impact"
            subtitle="ASREP was founded in 2023. In three years, we have built foundations that organisations often take decades to establish."
            id="history-heading"
          />

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <TimelineItem
                key={i}
                year={m.year}
                title={m.title}
                description={m.description}
                isLeft={i % 2 === 0}
                isFirst={i === 0}
                isLast={i === milestones.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest section-pad">
        <div className="container-asrep text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            The Story Continues
          </p>
          <h2 className="font-display text-white text-3xl md:text-4xl font-bold mb-5">
            Be Part of the Next Chapter
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto mb-8">
            ASREP&apos;s impact grows with every partner, donor, and volunteer who joins the mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/get-involved/donate"
              className="px-8 py-4 bg-cta hover:bg-cta-hover text-white font-semibold text-sm rounded-xl
                transition-all hover:shadow-lg hover:-translate-y-0.5">
              Support Our Work
            </a>
            <a href="/get-involved/partner"
              className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-semibold
                text-sm rounded-xl transition-all">
              Partner with Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
