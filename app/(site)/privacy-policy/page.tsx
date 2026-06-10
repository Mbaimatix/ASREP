import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the ASREP Africa website (asrepafrica.org). Information on how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How ASREP Africa collects, uses, and protects your personal information."
        imageSrc="/images/about/about-hero.jpg"
        imageAlt="ASREP Africa team working in Isiolo County"
        breadcrumbs={[{ label: "Privacy Policy" }]}
        tag="Legal"
        overlayOpacity={70}
      />

      <section className="section-pad bg-cream" aria-labelledby="privacy-heading">
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

            <h2 id="privacy-heading">1. About This Policy</h2>
            <p>
              This Privacy Policy explains how ASREP Africa — the ASAL Research &amp; Resilience
              Programme (hereinafter &ldquo;ASREP&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) collects, uses, stores, and protects personal information
              obtained through our website at{" "}
              <a href="https://asrepafrica.org">www.asrepafrica.org</a>.
            </p>
            <p>
              We are committed to protecting your privacy and handling your personal data in
              compliance with applicable Kenyan data protection law, including the Data Protection
              Act, 2019.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect personal information in the following circumstances:</p>
            <ul>
              <li>
                <strong>Contact form submissions</strong> — when you submit our contact or
                enquiry forms, we collect your name, email address, organisation (if provided),
                and message content.
              </li>
              <li>
                <strong>Newsletter sign-ups</strong> — your email address when you subscribe to
                our updates.
              </li>
              <li>
                <strong>Donation forms</strong> — payment and contact information when you make
                a donation through our Pesapal payment gateway.
              </li>
              <li>
                <strong>Volunteer / Partner applications</strong> — name, contact details, and
                application information submitted via our forms.
              </li>
              <li>
                <strong>Website analytics</strong> — anonymous usage data (pages visited,
                session duration, browser type) via Google Analytics to improve the website.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Respond to your enquiries and requests</li>
              <li>Send newsletters and programme updates (with your consent)</li>
              <li>Process donations and provide receipts</li>
              <li>Improve our website and communications</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
            <p>
              We do not sell, rent, or share your personal data with third parties for marketing
              purposes.
            </p>

            <h2>4. Data Storage and Security</h2>
            <p>
              Personal information is stored securely. We use industry-standard encryption and
              security measures to protect your data. Contact form submissions and newsletter
              emails are transmitted to ASREP&apos;s secured email systems.
            </p>
            <p>
              Donation payments are processed by Pesapal, a PCI-DSS compliant payment gateway.
              ASREP does not store your full card details.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain personal data only as long as necessary for the purpose it was collected,
              or as required by law. Newsletter subscribers may unsubscribe at any time.
            </p>

            <h2>6. Your Rights</h2>
            <p>Under the Data Protection Act, 2019 you have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for processing at any time</li>
              <li>Lodge a complaint with the Office of the Data Protection Commissioner (ODPC)</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              Our website uses cookies for analytics and session management. You may adjust
              your browser settings to decline cookies, though this may affect some website
              functionality.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites (The Guardian, Biographic Magazine,
              partner organisations, etc.). ASREP is not responsible for the privacy practices of
              these external websites.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              For any privacy-related enquiries or to exercise your rights, please contact us:
            </p>
            <ul>
              <li>
                Email:{" "}
                <a href="mailto:asrepafrica@gmail.com">asrepafrica@gmail.com</a>
              </li>
              <li>Address: Isiolo Town, Isiolo County, Kenya</li>
            </ul>

            <h2>10. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on
              this page with a revised date. We encourage you to check this page periodically.
            </p>
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
