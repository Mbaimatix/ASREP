import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use | ASREP Africa",
  description:
    "Terms and conditions governing the use of the ASREP Africa website (asrepafrica.org).",
};

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        subtitle="The terms and conditions governing your use of the ASREP Africa website."
        imageSrc="/images/about/about-hero.jpg"
        imageAlt="ASREP Africa team working in Isiolo County"
        breadcrumbs={[{ label: "Terms of Use" }]}
        tag="Legal"
        overlayOpacity={70}
      />

      <section className="section-pad bg-cream" aria-labelledby="terms-heading">
        <div className="container-asrep max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-charcoal/8 prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-earth
            prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-charcoal/75 prose-p:leading-relaxed
            prose-a:text-forest prose-a:underline hover:prose-a:text-sage
            prose-strong:text-charcoal prose-li:text-charcoal/75">

            <p className="text-muted text-sm not-prose mb-8">
              Last updated: May 2026
            </p>

            <h2 id="terms-heading">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the ASREP Africa website at{" "}
              <a href="https://www.asrepafrica.org">www.asrepafrica.org</a> (the &ldquo;Website&rdquo;),
              you accept and agree to be bound by these Terms of Use. If you do not agree to these
              terms, please do not use this Website.
            </p>

            <h2>2. About ASREP Africa</h2>
            <p>
              ASREP Africa — the ASAL Research &amp; Resilience Programme — is a registered
              non-governmental organisation headquartered in Isiolo County, Kenya (est. 2023).
              This Website is operated to share information about our programmes, impact, and
              opportunities to engage with our work.
            </p>

            <h2>3. Use of the Website</h2>
            <p>You agree to use this Website only for lawful purposes and in a manner that:</p>
            <ul>
              <li>Does not violate applicable Kenyan law or any applicable international law</li>
              <li>
                Does not transmit any unlawful, harmful, threatening, or harassing content
              </li>
              <li>
                Does not attempt to gain unauthorised access to any part of the Website or its
                underlying systems
              </li>
              <li>
                Does not interfere with the normal operation of the Website
              </li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All content on this Website — including text, photographs, graphics, logos, programme
              reports, and publications — is the property of ASREP Africa or its content providers
              and is protected by copyright.
            </p>
            <p>
              You may view and download content for personal, non-commercial use provided you
              retain all copyright and other proprietary notices. You may not reproduce, distribute,
              or create derivative works from our content without prior written permission from
              ASREP Africa.
            </p>
            <p>
              To request permission to use ASREP Africa content, contact{" "}
              <a href="mailto:asrepafrica@gmail.com">asrepafrica@gmail.com</a>.
            </p>

            <h2>5. Donations</h2>
            <p>
              Donations made through this Website are processed by Pesapal, a secure third-party
              payment gateway. By making a donation, you confirm that you are authorised to use the
              payment method provided. ASREP Africa will use all donations in accordance with its
              stated programmes and financial governance policies.
            </p>
            <p>
              All donations are non-refundable unless an error occurred during processing. For
              donation enquiries, contact{" "}
              <a href="mailto:asrepafrica@gmail.com">asrepafrica@gmail.com</a>.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              This Website may contain links to external websites including partner organisations,
              media outlets, and research institutions. ASREP Africa is not responsible for the
              content, privacy practices, or availability of external websites.
            </p>

            <h2>7. Disclaimer of Warranties</h2>
            <p>
              This Website is provided &ldquo;as is&rdquo; without warranties of any kind.
              ASREP Africa does not warrant that the Website will be uninterrupted, error-free,
              or free from viruses. We make reasonable efforts to keep information accurate and
              up to date but cannot guarantee completeness or accuracy at all times.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, ASREP Africa shall not be liable
              for any direct, indirect, incidental, or consequential damages arising from your use
              of this Website or reliance on any content published on it.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of
              Kenya. Any disputes shall be subject to the exclusive jurisdiction of the Kenyan
              courts.
            </p>

            <h2>10. Changes to These Terms</h2>
            <p>
              ASREP Africa reserves the right to modify these Terms of Use at any time. Updated
              terms will be posted on this page with a revised date. Continued use of the Website
              after changes constitutes acceptance of the revised terms.
            </p>

            <h2>11. Contact</h2>
            <p>
              For any questions about these Terms of Use:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:asrepafrica@gmail.com">asrepafrica@gmail.com</a>
              </li>
              <li>Address: Isiolo Town, Isiolo County, Kenya</li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-white
                font-semibold text-sm rounded-lg hover:bg-sage transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
