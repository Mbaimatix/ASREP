import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import TheoryOfChangeFlow from "@/components/about/TheoryOfChangeFlow";

export const metadata: Metadata = {
  title: "Theory of Change",
  description:
    "ASREP Africa's five-step Theory of Change: from community inputs and integrated activities to resilient ASAL communities. Grounded in the Impact Report 2025-2026.",
};

export default function TheoryOfChangePage() {
  return (
    <>
      <PageHero
        title="Theory of Change"
        subtitle="How ASREP transforms inputs into lasting resilience — a five-step logic model grounded in evidence and community leadership."
        imageSrc="/images/gallery/asrep-elders-strategic-meeting.jpg"
        imageAlt="ASREP Africa executive and community elders collaborating on knowledge documentation and strategic planning"
        overlayOpacity={70}
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Theory of Change" },
        ]}
        tag="Our Logic Model"
      />

      {/* Intro */}
      <section className="section-pad bg-cream" aria-labelledby="toc-intro">
        <div className="container-asrep max-w-3xl">
          <SectionHeader
            tag="Framework"
            title="From Community to"
            titleHighlight="Lasting Change"
            align="left"
            id="toc-intro"
          />
          <div className="space-y-5 text-charcoal/75 text-base leading-relaxed mb-12">
            <p>
              ASREP&apos;s Theory of Change is grounded in a fundamental conviction: that
              sustainable resilience in Kenya&apos;s ASALs cannot be imposed from outside. It
              must be built from within communities — through their leadership, their knowledge,
              and their agency.
            </p>
            <p>
              Our five-box logic model traces how carefully selected inputs are translated
              through evidence-driven activities into measurable outputs, meaningful outcomes,
              and ultimately, lasting impact for ASAL communities.
            </p>
            <p>
              Click or tap each step in the flow below to reveal the detailed rationale
              behind it.
            </p>
          </div>

          {/* Interactive flow */}
          <TheoryOfChangeFlow />
        </div>
      </section>

      {/* Key assumptions */}
      <section className="section-pad bg-white" aria-labelledby="assumptions-heading">
        <div className="container-asrep max-w-3xl">
          <SectionHeader
            tag="Underpinning Assumptions"
            title="What Our Theory"
            titleHighlight="Assumes"
            align="left"
            subtitle="All theories of change rest on assumptions. Ours are explicit, monitored, and stress-tested."
            id="assumptions-heading"
          />
          <div className="space-y-4">
            {[
              "Communities will engage meaningfully when respected as knowledge-holders, not recipients.",
              "Government institutions are willing partners when approached through co-design, not imposition.",
              "Indigenous knowledge systems contain valid, evidence-based ecological and social wisdom.",
              "Climate resilience and peacebuilding are deeply connected — you cannot sustain one without the other.",
              "Women and youth, when resourced and supported, are the most effective agents of community transformation.",
              "Sustainable funding models that blend donor income with community ownership reduce dependency.",
            ].map((assumption, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-cream border border-charcoal/8">
                <span className="w-6 h-6 rounded-full bg-forest text-white text-xs font-bold
                  flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-charcoal/70 text-sm leading-relaxed">{assumption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
