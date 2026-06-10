import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "https://asrepafrica.org/what-we-do/civic-governance" },
  title: "Civic Governance & Youth Leadership",
  description:
    "The KSG 'Under the Tree' Series takes civic education to communities across Kenya's 47 counties. ASREP's civic governance programme deepens youth engagement and county accountability.",
};

export default function CivicGovernancePage() {
  return (
    <>
      <PageHero
        title="Civic Governance & Youth Leadership"
        subtitle="Deepening citizens' engagement in governance — from Isiolo to all 47 counties."
        imageSrc="/images/programmes/civic-governance-hero.jpg"
        imageAlt="Youth civic education session under acacia trees, Isiolo County — KSG Under the Tree Series"
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: "Civic Governance & Youth" },
        ]}
        tag="Youth Governance"
      />

      {/* Context */}
      <section className="section-pad bg-cream" aria-labelledby="civic-context">
        <div className="container-asrep max-w-3xl">
          <SectionHeader tag="The Gap" title="Citizens Deserve Better" titleHighlight="Governance" align="left" id="civic-context" />
          <div className="space-y-4 text-charcoal/75 text-base leading-relaxed">
            <p>In ASAL counties, civic participation is often low — not because communities don&apos;t care about governance, but because formal civic education structures never reach them. County development processes, public participation forums, and budget cycles are decided without meaningful community input.</p>
            <p>Youth — who represent the majority of Kenya&apos;s population — are particularly excluded from governance processes, leaving a critical leadership gap and stoking grievances that often find expression in conflict rather than civic engagement.</p>
            <p>ASREP&apos;s civic governance programme bridges this gap through accessible, community-based civic education and youth leadership development that meets people where they are.</p>
          </div>
        </div>
      </section>

      {/* Flagship */}
      <section className="section-pad bg-forest" aria-labelledby="ksg-flagship">
        <div className="container-asrep max-w-4xl mx-auto">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 text-center">Flagship: KSG Partnership</p>
          <h2 id="ksg-flagship" className="font-display text-white text-3xl md:text-4xl font-bold mb-6 text-center">
            The &ldquo;Under the Tree&rdquo; Series
          </h2>
          <p className="text-white/70 text-base leading-relaxed text-center mb-10 max-w-2xl mx-auto">
            In partnership with the Kenya School of Government, ASREP developed and piloted the &ldquo;Under the Tree&rdquo; civic education format in Isiolo — interactive, community-based sessions held under trees, in community halls, and at watering points. The format proved so effective it was adopted for a 47-county national rollout. This work cements ASREP&apos;s position at the intersection of governance innovation and community resilience — making us an essential voice in shaping Kenya&apos;s ASAL governance future.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: "1", label: "Isiolo Pilot" },
              { value: "47", label: "National Rollout" },
              { value: "KSG", label: "National Partner" },
              { value: "2025", label: "Partnership Year" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-5 text-center">
                <p className="font-display text-gold text-2xl font-bold mb-1">{s.value}</p>
                <p className="text-white/60 text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad bg-white" aria-labelledby="civic-approach">
        <div className="container-asrep">
          <SectionHeader tag="Youth Leadership" title="Building Tomorrow's" titleHighlight="Civic Leaders" id="civic-approach" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: "🗳️", title: "Public Participation Training", desc: "Equipping youth with the knowledge and skills to engage meaningfully in county public participation forums, budget processes, and development planning." },
              { emoji: "🏛️", title: "Governance Literacy", desc: "Making governance accessible — explaining devolution, public finance, citizen rights, and accountability mechanisms in local languages and culturally resonant formats." },
              { emoji: "🌟", title: "Youth Leadership Incubation", desc: "Identifying and mentoring emerging youth leaders from ASAL communities for careers in public service, civic society, and community leadership." },
            ].map((item) => (
              <div key={item.title} className="p-7 bg-cream rounded-2xl border border-charcoal/6 text-center">
                <span className="text-4xl mb-4 block" aria-hidden="true">{item.emoji}</span>
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
