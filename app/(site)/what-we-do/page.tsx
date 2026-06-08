import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "https://asrepafrica.org/what-we-do" },
  title: "What We Do | ASREP Africa Programmes",
  description:
    "Six integrated programmes addressing climate resilience, peacebuilding, research, civic governance, biodiversity restoration, and livelihoods across Kenya's arid and semi-arid lands.",
};

const programmes = [
  {
    href: "/what-we-do/climate-resilience",
    title: "Climate Resilience & Nature-Based Solutions",
    tagline: "Restoring landscapes. Building adaptive capacity.",
    stat1: { value: "10,000", label: "trees planted" },
    stat2: { value: "2,000+", label: "eco-champions trained" },
    image: "/images/programmes/climate-resilience-hero.jpg",
    imageAlt: "Waso Eco-Champions planting indigenous trees in Isiolo County",
    body: "Through the flagship Waso Eco-Champions programme, ASREP mobilises communities across 10 wards to restore degraded ASAL landscapes using indigenous species and nature-based solutions that build long-term climate adaptive capacity.",
  },
  {
    href: "/what-we-do/peacebuilding",
    title: "Peacebuilding & Social Cohesion",
    tagline: "Dialogue. Trust. Shared futures.",
    stat1: { value: "500+", label: "peace actors engaged" },
    stat2: { value: "1", label: "county-wide peace forum" },
    image: "/images/programmes/peacebuilding-hero.jpg",
    imageAlt: "Inter-community peace dialogue convened by ASREP in Isiolo County",
    body: "Kenya's ASAL communities have faced generations of resource-driven conflict between pastoral groups. ASREP's peacebuilding programme convenes dialogue spaces, trains conflict mediators, and facilitates inter-community agreements that hold over time.",
  },
  {
    href: "/what-we-do/research-knowledge",
    title: "Research & Knowledge Management",
    tagline: "Documenting indigenous wisdom. Informing evidence-based policy.",
    stat1: { value: "1", label: "IK Vault publication" },
    stat2: { value: "2025", label: "debut release year" },
    image: "/images/programmes/research-hero.jpg",
    imageAlt: "ASREP researcher documenting oral indigenous knowledge with Borana elders",
    body: "The ASAL Indigenous Knowledge Vault Series documents centuries of ecological and social wisdom held by ASAL communities. Paired with applied research and policy briefs, ASREP's knowledge work informs decision-makers from county to international level.",
  },
  {
    href: "/what-we-do/civic-governance",
    title: "Civic Governance & Youth Leadership",
    tagline: "Citizens at the centre. Youth at the front.",
    stat1: { value: "47", label: "counties targeted" },
    stat2: { value: "1", label: "KSG national partnership" },
    image: "/images/programmes/civic-governance-hero.jpg",
    imageAlt: "Youth civic governance training session under acacia trees, Isiolo",
    body: "The KSG 'Under the Tree' Series brings interactive civic education directly to communities, building county-level accountability and deepening youth engagement in governance processes. From an Isiolo pilot, it has scaled to a 47-county national rollout.",
  },
  {
    href: "/what-we-do/biodiversity",
    title: "Biodiversity Restoration",
    tagline: "Protecting ASAL wildlife. Restoring ecological integrity.",
    stat1: { value: "1", label: "county represented" },
    stat2: { value: "SDZWA", label: "strategic partner" },
    image: "/images/programmes/biodiversity-hero.jpg",
    imageAlt: "Grevy's zebra in the Isiolo landscape — iconic ASAL biodiversity under community protection",
    body: "Working alongside the San Diego Zoo Wildlife Alliance, ASREP brings Isiolo County's community conservation voice into Kenya-wide biodiversity strategy. Our community rangers and eco-champions form the frontline of habitat protection in the northern ASAL belt.",
  },
  {
    href: "/what-we-do/livelihoods",
    title: "Livelihoods & Economic Empowerment",
    tagline: "Green skills. Market linkages. Community enterprise.",
    stat1: { value: "40+", label: "webinar participants" },
    stat2: { value: "2025", label: "eco-entrepreneurship launch" },
    image: "/images/programmes/livelihoods-hero.jpg",
    imageAlt: "ASAL women entrepreneurs participating in ASREP's eco-entrepreneurship programme",
    body: "Sustainable livelihoods reduce community vulnerability to climate shocks and conflict. ASREP's eco-entrepreneurship programme builds green business skills, creates market linkages, and supports community enterprises that generate income while protecting the environment.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        title="What We Do"
        subtitle="Six integrated programmes. One vision: resilient, peaceful, and self-reliant ASAL communities."
        imageSrc="/images/gallery/asrep-community-team-group.jpg"
        imageAlt="ASREP Africa community team and programme staff working across Isiolo County"
        overlayOpacity={65}
        breadcrumbs={[{ label: "What We Do" }]}
        tag="Our Programmes"
        imagePosition="object-top"
      />

      {/* Intro */}
      <section className="section-pad bg-cream" aria-labelledby="programmes-intro">
        <div className="container-asrep max-w-3xl text-center">
          <SectionHeader
            tag="Six Thematic Programmes"
            title="Integrated by Design,"
            titleHighlight="Effective by Evidence"
            subtitle="ASREP's programmes are not siloed — they are deliberately integrated. Climate resilience strengthens peacebuilding. Indigenous knowledge informs governance. Livelihoods anchor biodiversity protection. Together, they create lasting resilience."
            id="programmes-intro"
          />
        </div>
      </section>

      {/* Alternating programme sections */}
      {programmes.map((prog, i) => (
        <section
          key={prog.href}
          className={`section-pad ${i % 2 === 0 ? "bg-white" : "bg-sand/25"}`}
          aria-labelledby={`prog-${i}`}
        >
          <div className="container-asrep">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
              ${i % 2 === 0 ? "" : "lg:[&>*:first-child]:order-last"}`}>
              {/* Image */}
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={prog.image}
                  alt={prog.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text */}
              <div>
                <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  {prog.tagline}
                </p>
                <h2
                  id={`prog-${i}`}
                  className="font-display text-earth text-2xl md:text-3xl font-bold leading-tight mb-5"
                >
                  {prog.title}
                </h2>
                <p className="text-charcoal/70 text-base leading-relaxed mb-6">{prog.body}</p>

                {/* Stats */}
                <div className="flex gap-8 mb-7">
                  <div>
                    <p className="font-display text-forest text-3xl font-bold">{prog.stat1.value}</p>
                    <p className="text-muted text-xs uppercase tracking-wider">{prog.stat1.label}</p>
                  </div>
                  <div>
                    <p className="font-display text-forest text-3xl font-bold">{prog.stat2.value}</p>
                    <p className="text-muted text-xs uppercase tracking-wider">{prog.stat2.label}</p>
                  </div>
                </div>

                <Link
                  href={prog.href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest hover:bg-sage
                    text-white font-semibold text-sm rounded-xl transition-colors
                    focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
