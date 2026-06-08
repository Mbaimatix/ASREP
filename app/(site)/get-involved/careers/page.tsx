import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Careers & Tenders | ASREP Africa",
  description:
    "Job opportunities, consultancy tenders, and internships at ASREP Africa. Join a team committed to resilience, peace, and ecological restoration in Kenya's ASALs.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers & Tenders"
        subtitle="Join a team shaping the future of Kenya's arid and semi-arid communities."
        imageSrc="/images/get-involved/careers-hero.jpg"
        imageAlt="ASREP Africa team in the field — career opportunities in ASAL development"
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved" },
          { label: "Careers & Tenders" },
        ]}
        tag="Join Us"
      />

      {/* Why work with ASREP */}
      <section className="section-pad bg-cream" aria-labelledby="careers-why">
        <div className="container-asrep">
          <SectionHeader
            tag="Work With Us"
            title="Why Join"
            titleHighlight="ASREP Africa?"
            subtitle="We are a small, high-impact team with a mandate that matters. Every role at ASREP has direct, visible community impact."
            id="careers-why"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { emoji: "🌍", title: "Real-World Impact", desc: "Work on programmes that directly improve lives and ecosystems in some of Kenya's most marginalised communities." },
              { emoji: "📊", title: "Evidence Culture", desc: "A team that values learning, research, and honest evaluation — where your ideas and insights genuinely shape programmes." },
              { emoji: "🤝", title: "Community Embedded", desc: "Regular field engagement with communities in Isiolo and Northern Kenya — not just desk work." },
              { emoji: "📈", title: "Career Growth", desc: "A rapidly growing organisation with space for talented people to take on significant responsibilities quickly." },
              { emoji: "🌱", title: "Green Mission", desc: "Work for an organisation whose environmental values align with the planet's urgent needs — not extractive or harmful." },
              { emoji: "🎯", title: "Flexible Arrangements", desc: "We believe in output-focused work, remote-capable roles where appropriate, and genuine work-life integration." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-charcoal/8 shadow-sm">
                <span className="text-2xl shrink-0" aria-hidden="true">{item.emoji}</span>
                <div>
                  <h3 className="font-semibold text-charcoal mb-1.5">{item.title}</h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Current openings */}
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-earth text-2xl mb-2 text-center">Current Opportunities</h2>
            <p className="text-charcoal/60 text-sm text-center mb-10">
              Positions are added as they become available. Check back regularly or sign up for updates.
            </p>

            {/* Placeholder — will be CMS-driven */}
            <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-charcoal/15 text-center">
              <div className="w-14 h-14 rounded-full bg-sand flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-earth text-lg mb-2">No Open Positions Currently</h3>
              <p className="text-charcoal/55 text-sm mb-6 max-w-sm mx-auto">
                We don&apos;t have any advertised roles at this time, but we&apos;re always interested in hearing from exceptional candidates.
              </p>
              <a
                href="mailto:asrepafrica@gmail.com?subject=Speculative Application — ASREP Africa"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-forest text-forest
                  hover:bg-forest hover:text-white font-semibold text-sm rounded-xl transition-all"
              >
                Send a Speculative Application
              </a>
            </div>

            {/* Tenders */}
            <div className="mt-12">
              <h2 className="font-display font-bold text-earth text-2xl mb-2 text-center">Procurement & Tenders</h2>
              <p className="text-charcoal/60 text-sm text-center mb-8">
                ASREP occasionally issues tenders for consultancy, research, and supplies. All tenders are listed here when open.
              </p>
              <div className="bg-white rounded-2xl p-10 border-2 border-dashed border-charcoal/15 text-center">
                <p className="text-charcoal/55 text-sm">No active tenders at this time.</p>
                <p className="text-charcoal/40 text-xs mt-2">
                  Procurement enquiries: <a href="mailto:asrepafrica@gmail.com" className="text-forest hover:underline">asrepafrica@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
