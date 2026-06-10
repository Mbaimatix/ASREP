import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "https://asrepafrica.org/what-we-do/research-knowledge" },
  title: "Research & Knowledge Management",
  description:
    "ASREP Africa documents ASAL indigenous knowledge through the IK Vault Series and generates evidence-based research and policy briefs to inform decision-makers across Kenya.",
};

export default function ResearchKnowledgePage() {
  return (
    <>
      <PageHero
        title="Research & Knowledge Management"
        subtitle="Documenting ASAL indigenous wisdom. Generating evidence. Informing policy."
        imageSrc="/images/programmes/research-hero.jpg"
        imageAlt="ASREP researcher and Borana elder reviewing indigenous knowledge documentation, Isiolo County"
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: "Research & Knowledge" },
        ]}
        tag="Indigenous Knowledge"
      />

      {/* Context */}
      <section className="section-pad bg-cream" aria-labelledby="research-context">
        <div className="container-asrep max-w-3xl">
          <SectionHeader tag="Why It Matters" title="Knowledge Is" titleHighlight="Power" align="left" id="research-context" />
          <div className="space-y-4 text-charcoal/75 text-base leading-relaxed">
            <p>
              Kenya&apos;s ASAL communities hold centuries of ecological knowledge — understanding
              of rainfall patterns, species behaviour, land management techniques, and social
              governance systems — that have sustained livelihoods for generations. Yet this
              knowledge is rarely documented, rarely cited in policy, and at risk of being lost
              as elder knowledge-holders pass on.
            </p>
            <p>
              Simultaneously, policy and development programming in ASAL regions is routinely
              made without adequate local evidence — leading to interventions that miss
              communities&apos; real priorities, ignore indigenous systems, and fail to endure.
            </p>
            <p>
              ASREP addresses both problems simultaneously: by documenting indigenous knowledge
              AND generating applied research that feeds directly into programme design and
              government policy.
            </p>
          </div>
        </div>
      </section>

      {/* IK Vault Flagship */}
      <section className="section-pad bg-forest" aria-labelledby="ik-vault">
        <div className="container-asrep">
          <div className="max-w-4xl mx-auto">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 text-center">Flagship: ASAL IK Vault Series</p>
            <h2 id="ik-vault" className="font-display text-white text-3xl md:text-4xl font-bold mb-4 text-center">
              Debut Release: Cows, Women &amp; Land
            </h2>
            <blockquote className="text-center mb-10">
              <p className="font-display text-gold text-xl md:text-2xl italic font-bold leading-snug">
                &ldquo;In the Borana Oromo Indigenous culture, three things stand above all else:
                Cows. Women. Land. Nothing in the universe rivals their value.&rdquo;
              </p>
              <footer className="text-white/50 text-sm mt-3">
                — ASAL Indigenous Knowledge Vault Series, Debut Release (2025)
              </footer>
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Oral Knowledge Documentation", desc: "Structured interviews with elders, capturing ecological, governance, and cultural knowledge in written and audio formats." },
                { title: "Participatory Validation", desc: "Draft publications reviewed by community knowledge-holders before release — ensuring accuracy, respect, and community ownership." },
                { title: "Policy Dissemination", desc: "Publications shared with county government, NDMA, KFS, and international partners — connecting indigenous wisdom to formal decision-making." },
              ].map((item) => (
                <div key={item.title} className="bg-white/10 rounded-xl p-6">
                  <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applied Research */}
      <section className="section-pad bg-white" aria-labelledby="applied-research">
        <div className="container-asrep max-w-3xl">
          <SectionHeader tag="Applied Research" title="Evidence That" titleHighlight="Drives Change" align="left" id="applied-research" />
          <div className="space-y-4 text-charcoal/75 text-base leading-relaxed mb-8">
            <p>Beyond indigenous knowledge documentation, ASREP generates applied research products — policy briefs, impact evaluations, and community needs assessments — that inform both our own programming and the broader ASAL development sector.</p>
          </div>
          <div className="space-y-4">
            {[
              { title: "Economic Impacts Policy Brief", status: "Forthcoming", desc: "Quantifying the economic value of community-led NbS and peacebuilding interventions in Isiolo County." },
              { title: "Eco-Entrepreneurship Webinar Summary", status: "Available", desc: "Key findings and recommendations from the 2025 ASAL eco-entrepreneurship convening." },
              { title: "ASAL IK Vault Series Vol. 1", status: "Available", desc: "'Cows, Women & Land' — Borana Oromo indigenous ecological and cultural knowledge." },
            ].map((r) => (
              <div key={r.title} className="flex items-start gap-5 p-6 bg-cream rounded-xl border border-charcoal/8">
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold
                  ${r.status === "Available" ? "bg-forest/10 text-forest" : "bg-gold/10 text-earth"}`}>
                  {r.status}
                </span>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">{r.title}</h3>
                  <p className="text-charcoal/60 text-sm">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/resources" className="inline-flex items-center gap-2 px-7 py-3.5 bg-forest hover:bg-sage text-white font-semibold text-sm rounded-xl transition-colors">
              Access All Publications
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
