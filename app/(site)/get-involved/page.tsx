import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Support ASREP Africa's work across Kenya's ASALs — donate, volunteer, partner, or explore career opportunities with our team in Isiolo County.",
  openGraph: {
    title: "Get Involved | ASREP Africa",
    description: "Donate, volunteer, partner, or join the ASREP Africa team in Isiolo County, Kenya.",
    images: [{ url: "/images/get-involved/volunteer-hero.jpg", width: 1200, height: 630, alt: "Get involved with ASREP Africa" }],
  },
};

const ways = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Donate",
    colour: "bg-cta",
    description:
      "Your donation directly funds tree planting, peace dialogues, indigenous knowledge documentation, and civic education across Kenya's ASALs. Every contribution counts.",
    cta: "Donate Now",
    href: "/get-involved/donate",
    highlights: [
      "KES 500 = 5 indigenous tree seedlings",
      "KES 1,000 = one peace dialogue session",
      "KES 5,000 = one eco-champion trained",
    ],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Volunteer",
    colour: "bg-forest",
    description:
      "Bring your skills to Isiolo County. We welcome researchers, field experts, communications professionals, and community development specialists for short and long-term placements.",
    cta: "Apply to Volunteer",
    href: "/get-involved/volunteer",
    highlights: [
      "Research & knowledge documentation",
      "Communications & digital media",
      "Field programme support",
    ],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Partner with Us",
    colour: "bg-earth",
    description:
      "We work with institutional donors, foundations, INGOs, governments, and corporate CSR teams. ASREP is an established implementing partner with strong governance and compliance systems.",
    cta: "Explore Partnerships",
    href: "/get-involved/partner",
    highlights: [
      "Institutional & funding partnerships",
      "Research collaborations",
      "Corporate social responsibility",
    ],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Careers & Tenders",
    colour: "bg-sage",
    description:
      "Join a team committed to evidence-based, community-led development in Kenya's ASALs. We advertise positions in programme management, research, finance, and communications.",
    cta: "View Opportunities",
    href: "/get-involved/careers",
    highlights: [
      "Programme & field staff roles",
      "Research & knowledge positions",
      "Tender & procurement notices",
    ],
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        title="Get Involved"
        subtitle="There are many ways to support ASREP Africa's mission — donate, volunteer, partner, or join the team."
        imageSrc="/images/get-involved/volunteer-hero.jpg"
        imageAlt="Community members and ASREP Africa team working together in Isiolo County"
        breadcrumbs={[{ label: "Get Involved" }]}
        tag="Take Action"
      />

      {/* Ways to get involved */}
      <section className="section-pad bg-cream" aria-labelledby="get-involved-heading">
        <div className="container-asrep">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">How to Help</p>
            <h2
              id="get-involved-heading"
              className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight"
            >
              Four Ways to Make a{" "}
              <span className="text-forest">Difference</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ways.map((way) => (
              <div
                key={way.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-charcoal/8"
              >
                <div className={`${way.colour} p-8 text-white`}>
                  <div className="mb-4">{way.icon}</div>
                  <h3 className="font-display font-bold text-2xl mb-2">{way.title}</h3>
                  <p className="text-white/80 text-base leading-relaxed">{way.description}</p>
                </div>
                <div className="p-7">
                  <ul className="space-y-2.5 mb-7">
                    {way.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-charcoal/75 text-sm">
                        <svg className="w-4 h-4 text-forest shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={way.href}
                    className={`inline-flex items-center gap-2 px-6 py-3 ${way.colour} text-white
                      font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    {way.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact of giving */}
      <section className="section-pad bg-forest" aria-labelledby="impact-giving-heading">
        <div className="container-asrep text-center max-w-3xl">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Your Impact</p>
          <h2 id="impact-giving-heading" className="font-display text-white text-3xl md:text-4xl font-bold mb-6">
            Every Contribution Builds Resilience
          </h2>
          <p className="text-white/70 leading-relaxed mb-8">
            ASREP Africa is a registered NGO with strong financial governance. All funds are deployed
            directly into field programmes across Isiolo County and Kenya&apos;s broader ASAL communities.
            We publish annual impact and financial reports for full transparency.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { value: "10,000+", label: "Trees Planted" },
              { value: "2,000+", label: "People Reached" },
              { value: "500+", label: "Peace Actors" },
              { value: "47", label: "Counties Reached" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-gold text-3xl font-bold">{s.value}</p>
                <p className="text-white/55 text-xs uppercase tracking-wide mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <Link
            href="/get-involved/donate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cta hover:bg-cta-hover text-white
              font-semibold rounded-xl transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </section>

      {/* Contact for partnerships */}
      <section className="section-pad bg-white" aria-labelledby="contact-cta-heading">
        <div className="container-asrep max-w-3xl text-center">
          <h2 id="contact-cta-heading" className="font-display text-earth text-2xl md:text-3xl font-bold mb-4">
            Have a Question?
          </h2>
          <p className="text-charcoal/65 leading-relaxed mb-6">
            Whether you are an institutional funder, a potential volunteer, or a community member interested
            in ASREP&apos;s work, we would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-forest hover:bg-sage text-white
              font-semibold rounded-xl transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
