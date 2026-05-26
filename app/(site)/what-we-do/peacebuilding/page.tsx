import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Peacebuilding & Social Cohesion | ASREP Africa",
  description:
    "ASREP Africa's peacebuilding programme convenes the Isiolo Peace Actors Forum and engages 500+ community members in dialogue and conflict resolution across Northern Kenya's pastoral communities.",
};

export default function PeacebuildingPage() {
  return (
    <>
      <PageHero
        title="Peacebuilding & Social Cohesion"
        subtitle="Turning resource conflict into shared futures through dialogue, mediation, and inter-community trust."
        imageSrc="/images/programmes/peacebuilding-hero.jpg"
        imageAlt="Inter-community peace dialogue convened under trees in Northern Kenya — ASREP Africa"
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: "Peacebuilding & Social Cohesion" },
        ]}
        tag="Programme 02"
      />

      {/* Context */}
      <section className="section-pad bg-cream" aria-labelledby="peace-context">
        <div className="container-asrep max-w-3xl">
          <SectionHeader
            tag="The Challenge"
            title="Conflict at the Heart of"
            titleHighlight="ASAL Vulnerability"
            align="left"
            id="peace-context"
          />
          <div className="space-y-4 text-charcoal/75 text-base leading-relaxed">
            <p>
              In Kenya&apos;s ASAL counties, inter-community conflict — often triggered by
              competition over water, pasture, and livestock — remains a persistent driver
              of poverty, displacement, and developmental regression. Climate change
              intensifies this dynamic: as resources shrink, tensions rise.
            </p>
            <p>
              Isiolo County sits at the confluence of multiple pastoral communities —
              Borana, Somali, Samburu, Meru, and others — whose boundaries and resource
              rights are contested and fluid. Without sustained dialogue and mediation
              infrastructure, cycles of conflict recur regardless of development investment.
            </p>
            <p>
              ASREP&apos;s peacebuilding programme is grounded in a conviction that peace is
              not the absence of conflict — it is the presence of just, inclusive, and
              resilient social systems.
            </p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad bg-white" aria-labelledby="peace-approach">
        <div className="container-asrep">
          <SectionHeader
            tag="Our Approach"
            title="Dialogue First."
            titleHighlight="Community Led."
            id="peace-approach"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Peace Actor Training", desc: "Training community mediators, religious leaders, elders, women, and youth as frontline peace actors with conflict resolution skills grounded in local cultural practices." },
              { title: "Isiolo Peace Actors Forum", desc: "A standing multi-community forum where grievances are aired, shared protocols established, and agreements reached — convened quarterly with ASREP facilitation." },
              { title: "Early Warning Systems", desc: "Community-based monitoring that tracks resource tension hotspots and triggers rapid response dialogue before conflicts escalate to violence." },
              { title: "Cross-Community Exchange", desc: "Facilitated visits and joint activities between communities — particularly women's and youth groups — that build personal relationships across identity lines." },
            ].map((item) => (
              <div key={item.title} className="p-7 bg-sand/30 rounded-2xl border border-charcoal/6">
                <h3 className="font-display font-bold text-earth text-lg mb-3">{item.title}</h3>
                <p className="text-charcoal/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section className="section-pad bg-forest" aria-labelledby="peace-flagship">
        <div className="container-asrep max-w-3xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Flagship Initiative</p>
          <h2 id="peace-flagship" className="font-display text-white text-3xl md:text-4xl font-bold mb-6">
            Isiolo Peace Actors Forum
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            The Isiolo Peace Actors Forum is ASREP&apos;s flagship peacebuilding structure —
            a multi-stakeholder, multi-community space for structured dialogue, grievance airing,
            and joint resource management agreement.
          </p>
          <div className="grid grid-cols-3 gap-5">
            {[
              { value: "500+", label: "Peace Actors Engaged" },
              { value: "10", label: "Wards Represented" },
              { value: "60%", label: "Women & Youth" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-5">
                <p className="font-display text-gold text-3xl font-bold mb-1">{s.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & CTA */}
      <section className="section-pad bg-cream" aria-label="Peacebuilding partners">
        <div className="container-asrep max-w-2xl text-center">
          <SectionHeader tag="Partners" title="Peace Requires" titleHighlight="Many Voices" />
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["Interpeace", "Alliance for Peacebuilding", "NCIC", "COPAD", "PROCMURA", "GEN"].map((p) => (
              <span key={p} className="px-4 py-2 bg-white border border-charcoal/10 rounded-full text-sm text-charcoal/70 font-medium">{p}</span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-involved/donate" className="px-8 py-4 bg-cta hover:bg-cta-hover text-white font-semibold text-sm rounded-xl transition-all">Donate to Peacebuilding</Link>
            <Link href="/contact" className="px-8 py-4 border-2 border-forest text-forest hover:bg-forest hover:text-white font-semibold text-sm rounded-xl transition-all">Learn More</Link>
          </div>
        </div>
      </section>
    </>
  );
}
