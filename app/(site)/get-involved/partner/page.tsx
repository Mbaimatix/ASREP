import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import SectionHeader from "@/components/shared/SectionHeader";
import PartnerForm from "@/components/forms/PartnerForm";

export const metadata: Metadata = {
  title: "Partner with Us",
  description:
    "Partner with ASREP Africa — institutional, funding, corporate CSR, or academic partnerships that align your organisation with proven, locally-led ASAL resilience programmes.",
};

const partnerTypes = [
  {
    type: "Funding Partners",
    icon: "💰",
    desc: "Foundations, bilateral donors, and international organisations looking to direct grant funding to evidence-based ASAL programming with rigorous accountability.",
    examples: ["Programme grants", "Unrestricted funding", "Co-financing", "Challenge funds"],
  },
  {
    type: "Institutional Partners",
    icon: "🏛️",
    desc: "Government agencies, county administrations, and regional bodies seeking community-rooted implementation partners for policy delivery in ASAL counties.",
    examples: ["MoUs with county governments", "Policy co-development", "Training delivery", "Data sharing"],
  },
  {
    type: "Corporate & CSR Partners",
    icon: "🤝",
    desc: "Companies seeking to align ESG/CSR programmes with genuine, measurable environmental and social impact in Kenya's most underserved regions.",
    examples: ["Tree planting sponsorship", "Employee volunteering", "Branded conservation", "Supply chain sustainability"],
  },
  {
    type: "Academic & Research Partners",
    icon: "📚",
    desc: "Universities, research institutes, and think-tanks seeking field research partnerships in ASAL contexts, indigenous knowledge, and climate adaptation.",
    examples: ["Joint publications", "Student placements", "Research data access", "IK Vault collaboration"],
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        title="Partner with ASREP Africa"
        subtitle="Align your organisation with proven, locally-led impact across Kenya's arid and semi-arid lands."
        imageSrc="/images/gallery/asrep-agar-mou-signing-impact-report-group.jpg"
        imageAlt="ASREP Africa and AGAR representatives holding the signed MOU and Impact Report — partnership, Isiolo"
        imagePosition="object-top"
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved/donate" },
          { label: "Partner with Us" },
        ]}
        tag="Partnerships"
      />

      {/* Partnership types */}
      <section className="section-pad bg-cream" aria-labelledby="partner-types">
        <div className="container-asrep">
          <SectionHeader
            tag="Partnership Models"
            title="How We Work"
            titleHighlight="Together"
            subtitle="We offer four distinct partnership models tailored to your organisation's mandate and resources."
            id="partner-types"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-16">
            {partnerTypes.map((pt) => (
              <div key={pt.type} className="bg-white rounded-2xl p-7 border border-charcoal/8 shadow-sm">
                <span className="text-4xl mb-4 block" aria-hidden="true">{pt.icon}</span>
                <h3 className="font-display font-bold text-earth text-xl mb-3">{pt.type}</h3>
                <p className="text-charcoal/65 text-sm leading-relaxed mb-4">{pt.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {pt.examples.map((ex) => (
                    <span key={ex} className="px-3 py-1 bg-sand rounded-full text-xs text-charcoal/70 font-medium">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Current partners */}
          <div className="text-center mb-12">
            <p className="text-muted text-sm mb-4 uppercase tracking-widest font-medium text-xs">Our Current Partners Include</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["KSG", "KFS", "KWS", "NDMA", "Mercy Corps", "Interpeace", "SDZWA", "Alliance for Peacebuilding", "Jameel Observatory", "NCIC"].map((p) => (
                <span key={p} className="px-4 py-2 bg-white border border-charcoal/10 rounded-full text-sm text-charcoal/70 font-medium">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="section-pad bg-white" aria-label="Partnership enquiry form">
        <div className="container-asrep max-w-2xl">
          <SectionHeader
            tag="Start the Conversation"
            title="Submit a Partnership"
            titleHighlight="Enquiry"
            subtitle="Tell us about your organisation and proposed collaboration. We respond within 5 working days."
          />
          <div className="bg-cream rounded-2xl p-8 md:p-10">
            <PartnerForm />
          </div>
        </div>
      </section>
    </>
  );
}
