import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import CoreValueCard from "@/components/about/CoreValueCard";

export const metadata: Metadata = {
  title: "Mission, Vision & Values",
  description:
    "ASREP Africa's mission is locally-led, evidence-driven interventions for climate resilience and peace. Discover the six core values guiding our work across Kenya's ASALs.",
};

const values = [
  {
    title: "Community First",
    description:
      "Every programme begins with listening. Communities are not beneficiaries — they are co-designers, implementers, and evaluators of change.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Evidence & Learning",
    description:
      "Decisions are grounded in research, data, and indigenous knowledge. We document, evaluate, and adapt continuously to remain effective and accountable.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Indigenous Knowledge",
    description:
      "ASAL communities hold centuries of ecological and social wisdom. We document, amplify, and integrate this knowledge into policy and programming.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Inclusion & Equity",
    description:
      "At least 60% of all programme participants are women and youth. We design for inclusion, not as an afterthought but as a foundational commitment.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: "Environmental Stewardship",
    description:
      "The ASALs are fragile, biodiverse, and sacred. We are committed to restoration, conservation, and ensuring that development never degrades the natural world.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Transparency & Accountability",
    description:
      "We operate under 23 institutional policies, conduct independent audits, and publish our impact data openly — because communities and donors deserve nothing less.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function MissionVisionPage() {
  return (
    <>
      <PageHero
        title="Mission, Vision & Core Values"
        subtitle="The beliefs and principles that guide every programme, decision, and partnership."
        imageSrc="/images/gallery/community-roundtable-isiolo.jpg"
        imageAlt="ASREP Africa community roundtable with elders, women and youth representatives discussing values and strategy in Isiolo"
        overlayOpacity={72}
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Mission, Vision & Values" },
        ]}
        tag="Our Foundation"
      />

      {/* Mission & Vision */}
      <section className="section-pad bg-cream" aria-labelledby="mission-heading">
        <div className="container-asrep">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14">
            <div className="bg-forest rounded-2xl p-10 text-white">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">Our Mission</p>
              <p className="font-display text-white text-2xl font-bold leading-snug mb-5">
                Locally-led, evidence-driven, and climate-responsive interventions that build
                resilient ASAL communities.
              </p>
              <div className="border-t border-white/15 pt-5 text-white/60 text-sm leading-relaxed">
                We achieve this through six integrated thematic programmes delivered in partnership
                with communities, government, and institutional allies.
              </div>
            </div>
            <div className="bg-sand rounded-2xl p-10">
              <p className="text-sage text-xs font-semibold uppercase tracking-widest mb-4">Our Vision</p>
              <p className="font-display text-earth text-2xl font-bold leading-snug mb-5">
                A Kenya where ASAL communities are climate-resilient, self-governing, peaceful,
                and economically empowered.
              </p>
              <div className="border-t border-charcoal/10 pt-5 text-charcoal/60 text-sm leading-relaxed">
                We envision communities that chart their own futures — with strong institutions,
                healthy landscapes, and preserved cultural heritage.
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center">
            <p className="font-display text-earth text-2xl md:text-3xl font-bold italic">
              &ldquo;Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad bg-white" aria-labelledby="values-heading">
        <div className="container-asrep">
          <SectionHeader
            tag="Core Values"
            title="Six Values that"
            titleHighlight="Define Us"
            subtitle="These principles are not aspirations — they are operational commitments embedded in every ASREP programme."
            id="values-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <CoreValueCard
                key={value.title}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
