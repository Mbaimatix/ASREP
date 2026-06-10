import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import Accordion from "@/components/shared/Accordion";

export const metadata: Metadata = {
  title: "Institutional Policies",
  description:
    "ASREP Africa operates under 23 institutional policies covering governance, financial management, HR & safeguarding, programmatic integrity, and digital operations.",
};

const policySections = [
  {
    id: "governance",
    title: "Governance & Compliance (6 Policies)",
    content: (
      <ul className="space-y-2">
        {[
          "Organisational Governance Policy",
          "Board Charter & Code of Conduct",
          "Conflict of Interest Policy",
          "Whistleblower & Complaints Policy",
          "Anti-Corruption & Anti-Bribery Policy",
          "Document Management & Retention Policy",
        ].map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "financial",
    title: "Financial Management (5 Policies)",
    content: (
      <ul className="space-y-2">
        {[
          "Financial Management & Internal Controls Policy",
          "Procurement & Tendering Policy",
          "Asset Management Policy",
          "Audit & Compliance Policy",
          "Reserve Fund & Reserves Policy",
        ].map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "programmatic",
    title: "Programmatic Integrity (4 Policies)",
    content: (
      <ul className="space-y-2">
        {[
          "Programme Design & Quality Assurance Policy",
          "Monitoring, Evaluation & Learning (MEL) Policy",
          "Research Ethics & Indigenous Knowledge Policy",
          "Environmental & Social Safeguards Policy",
        ].map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "hr",
    title: "Human Resources & Safeguarding (5 Policies)",
    content: (
      <ul className="space-y-2">
        {[
          "Human Resources & Staff Welfare Policy",
          "Code of Conduct for Staff & Volunteers",
          "Child Protection & Safeguarding Policy",
          "Prevention of Sexual Exploitation, Abuse & Harassment (PSEAH) Policy",
          "Diversity, Equity & Inclusion Policy",
        ].map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "operational",
    title: "Operational & Digital (3 Policies)",
    content: (
      <ul className="space-y-2">
        {[
          "Communications & Media Policy",
          "Data Protection & Privacy Policy (GDPR-aligned, Kenya Data Protection Act 2019)",
          "Information & Cybersecurity Policy",
        ].map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        title="Institutional Policies"
        subtitle="23 policies embedding accountability, safeguarding, and operational excellence into everything ASREP does."
        imageSrc="/images/about/policies-hero.jpg"
        imageAlt="ASREP Africa board meeting in session — governance and accountability in practice"
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Institutional Policies" },
        ]}
        tag="Accountability"
      />

      {/* Stats bar */}
      <section className="bg-forest py-10" aria-label="Policies summary">
        <div className="container-asrep">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { n: "23", label: "Total Policies" },
              { n: "5", label: "Policy Domains" },
              { n: "2023", label: "Year Adopted" },
              { n: "100%", label: "Board Approved" },
              { n: "Annual", label: "Review Cycle" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-gold text-3xl font-bold mb-1">{s.n}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy accordion */}
      <section className="section-pad bg-cream" aria-labelledby="policies-heading">
        <div className="container-asrep max-w-3xl">
          <SectionHeader
            tag="Policy Framework"
            title="Five Domains,"
            titleHighlight="23 Policies"
            align="left"
            subtitle="Each domain addresses a distinct area of organisational accountability. Click to explore the policies within."
            id="policies-heading"
          />
          <Accordion items={policySections} allowMultiple />

          {/* Request full documents */}
          <div className="mt-14 bg-white rounded-2xl p-8 border border-charcoal/8 shadow-sm">
            <h3 className="font-display font-bold text-earth text-xl mb-3">
              Request Full Policy Documents
            </h3>
            <p className="text-charcoal/65 text-sm leading-relaxed mb-6">
              Full policy documents are available to institutional partners, grant-makers,
              and due-diligence reviewers. Submit a request and our team will respond
              within 3–5 working days.
            </p>
            <form
              action="/api/contact"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="subject" value="Policy Documents Request" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="policy-name" className="block text-xs font-semibold text-charcoal/60 mb-1.5 uppercase tracking-wider">
                    Full Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="policy-name"
                    name="fullName"
                    type="text"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/15 text-sm
                      focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="policy-email" className="block text-xs font-semibold text-charcoal/60 mb-1.5 uppercase tracking-wider">
                    Email Address <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="policy-email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border border-charcoal/15 text-sm
                      focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="policy-org" className="block text-xs font-semibold text-charcoal/60 mb-1.5 uppercase tracking-wider">
                  Organisation
                </label>
                <input
                  id="policy-org"
                  name="organisation"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-charcoal/15 text-sm
                    focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="policy-message" className="block text-xs font-semibold text-charcoal/60 mb-1.5 uppercase tracking-wider">
                  Which policies are you requesting?
                </label>
                <textarea
                  id="policy-message"
                  name="message"
                  rows={3}
                  placeholder="e.g. Full financial management and safeguarding policy suite for grant due diligence."
                  className="w-full px-4 py-3 rounded-lg border border-charcoal/15 text-sm
                    focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 bg-forest hover:bg-sage text-white font-semibold text-sm
                  rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
