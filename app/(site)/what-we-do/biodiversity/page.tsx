import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Biodiversity Restoration | ASREP Africa",
  description:
    "ASREP Africa works with San Diego Zoo Wildlife Alliance to protect iconic ASAL biodiversity and restore habitats across Isiolo County through community-led conservation.",
};

export default function BiodiversityPage() {
  return (
    <>
      <PageHero
        title="Biodiversity Restoration"
        subtitle="Protecting iconic ASAL wildlife and restoring ecosystems through community-owned conservation."
        imageSrc="/images/programmes/biodiversity-hero.jpg"
        imageAlt="Grevy's zebra in Isiolo County — an iconic ASAL species protected through community conservation"
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: "Biodiversity Restoration" },
        ]}
        tag="Programme 05"
      />

      {/* Context */}
      <section className="section-pad bg-cream" aria-labelledby="biodiversity-context">
        <div className="container-asrep max-w-3xl">
          <SectionHeader tag="The Stakes" title="ASAL Biodiversity Is" titleHighlight="Under Threat" align="left" id="biodiversity-context" />
          <div className="space-y-4 text-charcoal/75 text-base leading-relaxed">
            <p>Kenya&apos;s ASALs are home to globally significant biodiversity — Grevy&apos;s zebra, African wild dogs, reticulated giraffe, elephant, and unique endemic plant communities. Yet these ecosystems are under profound pressure: habitat loss, human-wildlife conflict, poaching, and climate disruption are accelerating species decline.</p>
            <p>Conservation models that exclude communities from decision-making have consistently failed in ASAL contexts. The communities who live alongside wildlife are both the primary threat actors (when marginalised) and the most effective conservators (when empowered).</p>
            <p>ASREP&apos;s biodiversity programme places community leadership at the centre of ecological restoration, ensuring that conservation delivers both ecological outcomes and community benefits.</p>
          </div>
        </div>
      </section>

      {/* SDZWA Partnership */}
      <section className="section-pad bg-forest" aria-labelledby="sdzwa-partnership">
        <div className="container-asrep max-w-3xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Strategic Partner</p>
          <h2 id="sdzwa-partnership" className="font-display text-white text-3xl font-bold mb-6">
            San Diego Zoo Wildlife Alliance Kenya
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            ASREP represented Isiolo County in the SDZWA-K biodiversity strategy validation process — ensuring that community conservation voices from Northern Kenya shaped the Alliance&apos;s national conservation framework.
          </p>
          <div className="grid grid-cols-3 gap-5">
            {[
              { value: "1", label: "County Represented" },
              { value: "SDZWA", label: "International Partner" },
              { value: "2026", label: "Strategy Validation" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-5">
                <p className="font-display text-gold text-2xl font-bold mb-1">{s.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad bg-white" aria-labelledby="biodiversity-approach">
        <div className="container-asrep">
          <SectionHeader tag="Our Approach" title="Community Rangers." titleHighlight="Shared Benefits." id="biodiversity-approach" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { title: "Community Conservation Integration", desc: "Embedding biodiversity protection within the Waso Eco-Champions programme — so eco-champions also serve as wildlife monitors and habitat stewards." },
              { title: "Human-Wildlife Conflict Mitigation", desc: "Building community tolerance for wildlife coexistence through benefit-sharing mechanisms, early warning systems, and predator deterrence training." },
              { title: "Habitat Connectivity", desc: "Strategic tree planting and grassland restoration that reconnects fragmented wildlife corridors across the Isiolo landscape." },
              { title: "Policy Advocacy", desc: "Representing ASAL community conservation interests in national biodiversity policy spaces, ensuring community voices shape conservation frameworks." },
            ].map((item) => (
              <div key={item.title} className="p-7 bg-cream rounded-2xl border border-charcoal/6">
                <h3 className="font-display font-bold text-earth text-lg mb-3">{item.title}</h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
