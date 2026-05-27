import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Climate Resilience & Nature-Based Solutions | ASREP Africa",
  description:
    "ASREP's Waso Eco-Champions programme has planted 10,000 trees and mobilised 2,000+ community members across 10 Isiolo wards to restore ASAL landscapes through nature-based solutions.",
};

export default function ClimateResiliencePage() {
  return (
    <>
      <PageHero
        title="Climate Resilience & Nature-Based Solutions"
        subtitle="Restoring degraded ASAL landscapes through community-led ecological action."
        imageSrc="/images/programmes/climate-resilience-hero.jpg"
        imageAlt="Waso Eco-Champion planting an indigenous seedling on a degraded hillside in Isiolo County"
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: "Climate Resilience & NbS" },
        ]}
        tag="Programme 01"
      />

      {/* Context */}
      <section className="section-pad bg-cream" aria-labelledby="climate-context">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeader
                tag="The Challenge"
                title="ASAL Landscapes Under"
                titleHighlight="Climate Pressure"
                align="left"
                id="climate-context"
              />
              <div className="space-y-4 text-charcoal/75 text-base leading-relaxed">
                <p>
                  Kenya&apos;s ASAL regions are among the world&apos;s most climate-exposed landscapes.
                  Irregular rainfall, prolonged droughts, and land degradation have eroded the
                  ecological foundations on which pastoral and agro-pastoral communities depend.
                </p>
                <p>
                  Over decades, overgrazing, charcoal production, and agricultural expansion have
                  removed vast areas of native vegetation, destabilising soils, reducing water
                  retention, and diminishing biodiversity. Without intervention, communities face
                  an accelerating spiral of ecological and economic decline.
                </p>
                <p>
                  ASREP&apos;s climate programme addresses this challenge directly — restoring
                  landscapes, building adaptive capacity, and placing communities at the
                  centre of ecological recovery.
                </p>
              </div>
            </div>
            <div className="relative h-80 md:h-[440px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-forest/80 to-sage/60">
              <Image
                src="/images/programmes/climate-context.jpg"
                alt="Degraded ASAL landscape showing erosion and vegetation loss — the challenge ASREP addresses"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad bg-white" aria-labelledby="climate-approach">
        <div className="container-asrep">
          <SectionHeader
            tag="Our Approach"
            title="Nature-Based Solutions"
            titleHighlight="With Community Leadership"
            subtitle="We deploy ecologically-proven NbS strategies, designed and implemented by the communities who know these landscapes best."
            id="climate-approach"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌱",
                title: "Indigenous Species Planting",
                desc: "Working only with species native to the Isiolo ecosystem — acacia, commiphora, and grassland species — to ensure ecological integrity and long-term survival.",
              },
              {
                icon: "👥",
                title: "Community Eco-Champion Model",
                desc: "Training and equipping local community members as eco-champions: trained in planting techniques, ongoing monitoring, and peer mobilisation across their wards.",
              },
              {
                icon: "💧",
                title: "Water Harvesting Structures",
                desc: "Integrating sand dams, check dams, and terracing with tree planting to maximise water retention, reduce erosion, and extend the growing season.",
              },
            ].map((item) => (
              <div key={item.title} className="p-7 bg-sand/30 rounded-2xl border border-charcoal/6">
                <span className="text-3xl mb-4 block" aria-hidden="true">{item.icon}</span>
                <h3 className="font-display font-bold text-earth text-lg mb-3">{item.title}</h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section className="section-pad bg-forest" aria-labelledby="waso-flagship">
        <div className="container-asrep">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Flagship Initiative</p>
            <h2 id="waso-flagship" className="font-display text-white text-3xl md:text-4xl font-bold mb-6">
              Waso Eco-Champions Programme
            </h2>
            <p className="text-white/70 text-base leading-relaxed mb-10">
              The Waso Eco-Champions programme is ASREP&apos;s signature climate initiative —
              mobilising community members as trained ecological stewards across 10 wards of
              Isiolo County.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { value: "10,000", label: "Trees Planted" },
                { value: "2,000+", label: "Eco-Champions" },
                { value: "10", label: "Wards Covered" },
                { value: "2024", label: "Programme Launch" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-5">
                  <p className="font-display text-gold text-3xl font-bold mb-1">{s.value}</p>
                  <p className="text-white/60 text-xs uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-pad bg-cream" aria-labelledby="climate-partners">
        <div className="container-asrep max-w-2xl text-center">
          <SectionHeader
            tag="Partners"
            title="Working Together for"
            titleHighlight="Ecological Restoration"
            id="climate-partners"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {["Kenya Forest Service (KFS)", "Kenya Wildlife Service (KWS)", "NDMA", "Mercy Corps", "San Diego Zoo Wildlife Alliance"].map((p) => (
              <span key={p} className="px-4 py-2 bg-white border border-charcoal/10 rounded-full text-sm text-charcoal/70 font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-earth section-pad">
        <div className="container-asrep text-center">
          <h2 className="font-display text-white text-3xl font-bold mb-4">Support Climate Restoration</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">KES 1,000 plants 10 indigenous tree seedlings. KES 5,000 sponsors an eco-champion for a month.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-involved/donate" className="px-8 py-4 bg-cta hover:bg-cta-hover text-white font-semibold text-sm rounded-xl transition-all">
              Donate to This Programme
            </Link>
            <Link href="/get-involved/partner" className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-semibold text-sm rounded-xl transition-all">
              Partner with Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
