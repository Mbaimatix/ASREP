import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import VolunteerForm from "@/components/forms/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer | Get Involved with ASREP Africa",
  description:
    "Volunteer your skills with ASREP Africa — research, communications, field work, or mentorship in Kenya's ASAL communities. Apply online.",
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Volunteer with ASREP Africa"
        subtitle="Bring your skills and passion to the frontlines of community resilience in Kenya's ASALs."
        imageSrc="/images/get-involved/volunteer-hero.jpg"
        imageAlt="Volunteers working alongside ASREP staff in Isiolo County community engagement"
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved/donate" },
          { label: "Volunteer" },
        ]}
        tag="Get Involved"
      />

      <section className="section-pad bg-cream" aria-label="Volunteer opportunities and application">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Sidebar */}
            <aside className="lg:col-span-2 order-2 lg:order-1 space-y-6">
              <div className="bg-forest rounded-2xl p-7 text-white">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                  What to Expect
                </p>
                <ul className="space-y-3">
                  {[
                    "Orientation and onboarding with ASREP team",
                    "Supervised work on active programme activities",
                    "Regular check-ins with programme leads",
                    "Opportunity to co-author field reports",
                    "Certificate of volunteering on completion",
                    "Potential for full-time role for exceptional volunteers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                      <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-7 border border-charcoal/8 shadow-sm">
                <p className="font-semibold text-charcoal text-sm mb-4">Volunteer Areas</p>
                <div className="flex flex-wrap gap-2">
                  {["Research", "Communications", "Field Work", "Monitoring & Evaluation", "Admin", "Mentorship", "Digital & IT"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-sand rounded-full text-xs text-charcoal/70 font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3 order-1 lg:order-2 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-charcoal/6">
              <SectionHeader
                tag="Apply Now"
                title="Join the"
                titleHighlight="ASREP Team"
                align="left"
                subtitle="Complete the form below and our team will respond within 5–7 working days."
              />
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
