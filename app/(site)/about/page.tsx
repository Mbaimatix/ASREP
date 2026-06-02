import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.asrepafrica.org/about" },
  title: "About ASREP Africa",
  description:
    "Founded in 2023 and headquartered in Isiolo County, ASREP Africa delivers locally-led, evidence-driven programmes for climate resilience, peacebuilding, and sustainable livelihoods across Kenya's ASALs.",
};

const whyPillars = [
  {
    icon: "🌍",
    title: "ASAL-Specialist",
    text: "Exclusively focused on Kenya's 84% — the arid and semi-arid lands most overlooked by national and international development programming.",
  },
  {
    icon: "🤝",
    title: "Community-Owned",
    text: "All programmes are co-designed with communities. We work under existing leadership structures, not parallel to them.",
  },
  {
    icon: "📊",
    title: "Evidence-Driven",
    text: "Research, monitoring, and indigenous knowledge documentation underpin every decision. Our ASAL IK Vault Series sets a new benchmark.",
  },
  {
    icon: "👩",
    title: "Gender & Youth Intentional",
    text: "At least 60% of programme participants are women and youth — not by accident, but by design.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About ASREP Africa"
        subtitle="Locally led. Evidence driven. Rooted in the ASALs."
        imageSrc="/images/about/about-hero.jpg"
        imageAlt="ASREP Africa team members conducting community engagement in Isiolo County"
        breadcrumbs={[{ label: "About", href: "/about" }]}
        tag="Who We Are"
      />

      {/* ── Overview ──────────────────────────────────────────────────── */}
      <section className="section-pad bg-cream" aria-labelledby="about-overview">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeader
                tag="Our Story"
                title="Born in the ASALs,"
                titleHighlight="For the ASALs"
                align="left"
                id="about-overview"
              />
              <div className="space-y-5 text-charcoal/75 text-base leading-relaxed">
                <p>
                  Kenya&apos;s arid and semi-arid lands cover approximately 84% of the
                  country&apos;s landmass and are home to some of its most climate-vulnerable,
                  conflict-prone, and historically underserved communities — yet they represent
                  extraordinary ecosystems, cultures, and peoples.
                </p>
                <p>
                  ASREP Africa — the ASAL Research &amp; Resilience Programme — was
                  established in 2023 and is headquartered in Isiolo County, at the geographic
                  and cultural heart of Kenya&apos;s Northern Frontier. We are a locally-led
                  non-governmental organisation committed to building resilience where it is
                  needed most.
                </p>
                <p>
                  Our founding vision was clear: that sustainable change in the ASALs requires
                  organisations that emerge from those landscapes, speak their languages, and
                  honour their knowledge systems — not organisations that arrive from outside
                  with pre-formed solutions.
                </p>
                <p>
                  In just three years of operation, ASREP has engaged over 2,000 community
                  members, planted 10,000 indigenous trees, convened hundreds of peace actors,
                  developed 23 institutional policies, and had its work featured in The Guardian
                  and Biographic Magazine.
                </p>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-5 mt-9">
                {[
                  { label: "Founded", value: "2023" },
                  { label: "Location", value: "Isiolo, Kenya" },
                  { label: "Registration", value: "Kenyan NGO" },
                  { label: "Staff & Board", value: "7 Leaders" },
                ].map((fact) => (
                  <div key={fact.label} className="bg-white rounded-xl p-5 border border-charcoal/8">
                    <p className="text-muted text-xs uppercase tracking-widest font-medium mb-1">{fact.label}</p>
                    <p className="font-display font-bold text-forest text-xl">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Mission box */}
              <div className="bg-forest rounded-2xl p-8 text-white">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Our Mission</p>
                <p className="font-display text-white text-xl font-bold leading-snug">
                  To deliver locally-led, evidence-driven, and climate-responsive interventions
                  that build resilient ASAL communities.
                </p>
              </div>
              {/* Vision box */}
              <div className="bg-sand rounded-2xl p-8">
                <p className="text-sage text-xs font-semibold uppercase tracking-widest mb-3">Our Vision</p>
                <p className="font-display text-earth text-xl font-bold leading-snug">
                  A Kenya where ASAL communities are climate-resilient, self-governing,
                  peaceful, and economically empowered.
                </p>
              </div>
              {/* Tagline */}
              <div className="border-l-4 border-gold pl-5 py-2">
                <p className="text-charcoal/70 italic text-base leading-relaxed">
                  &ldquo;Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why ASREP ──────────────────────────────────────────────────── */}
      <section className="section-pad bg-white" aria-labelledby="why-asrep">
        <div className="container-asrep">
          <SectionHeader
            tag="Why ASREP"
            title="Four Pillars that Set"
            titleHighlight="Us Apart"
            subtitle="Our approach is distinct, deliberate, and deeply rooted in the communities we serve."
            id="why-asrep"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
            {whyPillars.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-5 p-7 bg-cream rounded-2xl border border-charcoal/6"
              >
                <span className="text-3xl shrink-0 mt-0.5" aria-hidden="true">{p.icon}</span>
                <div>
                  <h3 className="font-display font-bold text-earth text-lg mb-2">{p.title}</h3>
                  <p className="text-charcoal/65 text-sm leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sub-nav links ──────────────────────────────────────────────── */}
      <section className="section-pad bg-sand/30" aria-label="Explore more about ASREP">
        <div className="container-asrep">
          <SectionHeader
            tag="Explore"
            title="Learn More"
            titleHighlight="About Us"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { label: "Mission, Vision & Values", href: "/about/mission-vision", desc: "The core beliefs and values that drive everything we do." },
              { label: "Our History", href: "/about/history", desc: "Key milestones from founding in 2023 to global recognition in 2026." },
              { label: "Leadership & Governance", href: "/about/leadership", desc: "Meet the Board of Directors and Executive team guiding ASREP." },
              { label: "Theory of Change", href: "/about/theory-of-change", desc: "Our five-step logic model from inputs to lasting community impact." },
              { label: "Institutional Policies", href: "/about/policies", desc: "23 policies across governance, finance, HR, and operations." },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col p-6 bg-white rounded-2xl border border-charcoal/8
                  hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="font-semibold text-charcoal group-hover:text-forest transition-colors mb-2">
                  {link.label}
                </h3>
                <p className="text-charcoal/55 text-sm leading-relaxed flex-1 mb-4">{link.desc}</p>
                <span className="flex items-center gap-1 text-forest text-sm font-semibold
                  group-hover:gap-2 transition-all">
                  Explore
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
