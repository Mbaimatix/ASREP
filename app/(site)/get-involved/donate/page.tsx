import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import DonationForm from "@/components/forms/DonationForm";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.asrepafrica.org/get-involved/donate" },
  title: "Donate | Support ASREP Africa",
  description:
    "Support ASREP Africa's work in Kenya's ASALs. KES 1,000 plants 10 trees. KES 5,000 sponsors an eco-champion for a month. Donate securely via M-Pesa, card, or PayPal.",
};

const impactEquivalents = [
  { kes: "500", impact: "Plants 5 indigenous tree seedlings" },
  { kes: "1,000", impact: "Trains an eco-champion for a day" },
  { kes: "2,500", impact: "Funds a community peace dialogue session" },
  { kes: "5,000", impact: "Sponsors an eco-champion for a full month" },
  { kes: "10,000", impact: "Funds a full IK documentation workshop" },
  { kes: "50,000", impact: "Supports a youth civic governance cohort" },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        title="Donate to ASREP Africa"
        subtitle="Every contribution plants trees, builds peace, and empowers communities across Kenya's ASALs."
        imageSrc="/images/get-involved/donate-hero.jpg"
        imageAlt="Waso Eco-Champions holding tree seedlings — your donation makes this possible"
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved/donate" },
          { label: "Donate" },
        ]}
        tag="Make a Difference"
      />

      <section className="section-pad bg-cream" aria-label="Donation form and impact information">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Form — 3 cols */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-charcoal/6">
              <h2 className="font-display font-bold text-earth text-2xl mb-2">
                Make a Donation
              </h2>
              <p className="text-charcoal/60 text-sm mb-8">
                Secure payment via Pesapal — M-Pesa, Visa, Mastercard, or PayPal accepted.
              </p>
              <DonationForm />
            </div>

            {/* Sidebar — 2 cols */}
            <aside className="lg:col-span-2 space-y-7">
              {/* Impact equivalents */}
              <div className="bg-forest rounded-2xl p-7 text-white">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-5">
                  Your Gift In Action
                </p>
                <div className="space-y-3.5">
                  {impactEquivalents.map((item) => (
                    <div key={item.kes} className="flex items-start gap-3">
                      <span className="text-gold font-bold text-sm shrink-0 w-20">
                        KES {item.kes}
                      </span>
                      <span className="text-white/70 text-sm leading-relaxed">{item.impact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternative payments */}
              <div className="bg-white rounded-2xl p-7 border border-charcoal/8 shadow-sm">
                <p className="font-semibold text-charcoal text-sm uppercase tracking-widest mb-5">
                  Alternative Ways to Give
                </p>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-1">
                      M-Pesa Paybill
                    </p>
                    <p className="text-charcoal font-medium text-sm">Business No: <strong className="text-earth">Coming soon</strong></p>
                    <p className="text-charcoal/60 text-xs mt-1">Paybill registration in progress. For immediate M-Pesa transfers, email <a href="mailto:asrepafrica@gmail.com" className="text-forest hover:underline">asrepafrica@gmail.com</a> or call +254 733 687 149.</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
                      Bank Transfer — Equity Bank Kenya
                    </p>
                    <dl className="space-y-1.5">
                      {[
                        ["Account Name", "ASAL RESEARCH AND RESILIENCE PROGRAMME"],
                        ["Account Number", "0410286986248"],
                        ["Currency", "KES"],
                        ["Branch", "Isiolo"],
                        ["Branch Code", "041"],
                        ["Bank Code", "68"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-2">
                          <dt className="text-charcoal/50 text-xs shrink-0">{label}</dt>
                          <dd className="text-charcoal font-medium text-xs text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-3">
                      International Wire Transfer
                    </p>
                    <dl className="space-y-1.5">
                      {[
                        ["Bank", "Equity Bank Kenya"],
                        ["SWIFT / BIC", "EQBLKENA"],
                        ["Account", "0410286986248"],
                        ["Beneficiary", "ASAL RESEARCH AND RESILIENCE PROGRAMME"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-2">
                          <dt className="text-charcoal/50 text-xs shrink-0">{label}</dt>
                          <dd className="text-charcoal font-medium text-xs text-right">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="text-charcoal/50 text-xs mt-2 leading-relaxed">
                      For international transfers please email{" "}
                      <a href="mailto:asrepafrica@gmail.com" className="text-forest hover:underline">
                        asrepafrica@gmail.com
                      </a>{" "}
                      so we can confirm receipt.
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust signals */}
              <div className="space-y-3">
                {[
                  "✅ Registered Kenyan NGO",
                  "✅ Annual independent audit",
                  "✅ 100% of funds reach programmes",
                  "✅ Tax receipt provided on request",
                ].map((s) => (
                  <p key={s} className="text-charcoal/65 text-sm">{s}</p>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
