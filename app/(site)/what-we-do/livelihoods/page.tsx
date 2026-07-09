import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "https://asrepafrica.org/what-we-do/livelihoods" },
  title: "Livelihoods & Economic Empowerment",
  description:
    "ASREP Africa's livelihoods programme builds eco-entrepreneurship skills, creates market linkages, and supports community enterprises that generate income while protecting ASAL environments.",
};

export default function LivelihoodsPage() {
  return (
    <>
      <PageHero
        title="Livelihoods & Economic Empowerment"
        subtitle="Sustainable income that grows with — not against — the ASAL environment."
        imageSrc="/images/programmes/livelihoods-hero.jpg"
        imageAlt="ASAL women entrepreneurs in ASREP's eco-entrepreneurship programme, Isiolo County"
        imagePosition="object-top"
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: "Livelihoods & Economic Empowerment" },
        ]}
        tag="Economic Empowerment"
      />

      {/* Context */}
      <section className="section-pad bg-cream" aria-labelledby="livelihoods-context">
        <div className="container-asrep max-w-3xl">
          <SectionHeader tag="The Challenge" title="Poverty Fuels" titleHighlight="Vulnerability" align="left" id="livelihoods-context" />
          <div className="space-y-4 text-charcoal/75 text-base leading-relaxed">
            <p>Economic marginalisation is both a cause and consequence of vulnerability in ASAL communities. Dependence on rain-fed pastoralism and subsistence agriculture leaves households exposed to climate shocks, with few safety nets when droughts strike.</p>
            <p>Without viable alternative livelihoods, conservation-hostile practices — charcoal production, overgrazing, illegal logging — become economic survival strategies. The path to ecological restoration runs through economic security.</p>
            <p>ASREP&apos;s livelihoods programme creates green economic pathways that align community prosperity with environmental restoration — so communities benefit most when ecosystems thrive.</p>
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section className="section-pad bg-earth" aria-labelledby="eco-enterprise">
        <div className="container-asrep max-w-3xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Flagship</p>
          <h2 id="eco-enterprise" className="font-display text-white text-3xl font-bold mb-6">
            Eco-Entrepreneurship Programme
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            ASREP&apos;s 2025 eco-entrepreneurship webinar convened 40+ community members, NGO professionals, and green economy practitioners to explore sustainable business models aligned with ASAL ecological restoration.
          </p>
          <div className="grid grid-cols-3 gap-5">
            {[
              { value: "40+", label: "Participants" },
              { value: "2025", label: "Launch Year" },
              { value: "Green", label: "Economy Focus" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-5">
                <p className="font-display text-gold text-2xl font-bold mb-1">{s.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Green economy pillars */}
      <section className="section-pad bg-white" aria-labelledby="green-economy">
        <div className="container-asrep">
          <SectionHeader tag="Green Economy Pillars" title="Six Pathways to" titleHighlight="Green Prosperity" id="green-economy" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { emoji: "🌿", title: "Eco-Tourism", desc: "Community-owned tourism enterprises that showcase ASAL landscapes, culture, and wildlife — keeping value in local hands." },
              { emoji: "🍯", title: "NTFPs & Beekeeping", desc: "Non-timber forest product enterprises: honey, medicinal plants, and wild fruits that incentivise forest conservation." },
              { emoji: "♻️", title: "Green Skills Training", desc: "Building technical capacity in solar installation, water harvesting, and sustainable construction for green economy employment." },
              { emoji: "🌱", title: "Seedling Nurseries", desc: "Community nurseries supplying indigenous seedlings to Waso Eco-Champions — creating income while supporting ecological restoration." },
              { emoji: "🤝", title: "Market Linkages", desc: "Connecting ASAL green enterprises to Nairobi, regional, and international markets through digital platforms and buyer networks." },
              { emoji: "💰", title: "Micro-Finance Access", desc: "Linking community entrepreneurs to appropriate financing mechanisms, including green loans and conservation investment funds." },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-cream rounded-2xl border border-charcoal/6 text-center">
                <span className="text-3xl mb-3 block" aria-hidden="true">{item.emoji}</span>
                <h3 className="font-display font-bold text-earth text-base mb-2">{item.title}</h3>
                <p className="text-charcoal/60 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest section-pad">
        <div className="container-asrep text-center">
          <h2 className="font-display text-white text-3xl font-bold mb-4">Invest in ASAL Livelihoods</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Support community enterprises that grow alongside Kenya&apos;s ASAL ecosystems.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-involved/donate" className="px-8 py-4 bg-cta hover:bg-cta-hover text-white font-semibold text-sm rounded-xl transition-all">Donate</Link>
            <Link href="/get-involved/partner" className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-semibold text-sm rounded-xl transition-all">Corporate Partnership</Link>
          </div>
        </div>
      </section>
    </>
  );
}
