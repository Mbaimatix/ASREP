import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | ASREP Africa",
  description:
    "Get in touch with ASREP Africa — for programme enquiries, partnership discussions, media requests, or general questions. Headquartered in Isiolo County, Kenya.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact ASREP Africa"
        subtitle="We would love to hear from you — whether you are a donor, partner, journalist, researcher, or community member."
        imageSrc="/images/contact/contact-hero.jpg"
        imageAlt="ASREP Africa headquarters in Isiolo Town, Isiolo County, Kenya"
        breadcrumbs={[{ label: "Contact" }]}
        tag="Get in Touch"
      />

      <section className="section-pad bg-cream" aria-label="Contact information and form">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Contact details */}
            <aside className="lg:col-span-2 space-y-7">
              {/* Offices */}
              <div className="bg-forest rounded-2xl p-7 text-white">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-5">Our Office</p>

                <address className="not-italic space-y-5">
                  <div className="flex items-start gap-4">
                    <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="text-white/75 text-sm leading-relaxed">
                      ASREP Africa<br />
                      Isiolo Town<br />
                      Isiolo County, Kenya
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+254733687149" className="text-white/75 hover:text-gold text-sm transition-colors">
                      +254 733 687 149
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:asrepafrica@gmail.com" className="text-white/75 hover:text-gold text-sm transition-colors break-all">
                      asrepafrica@gmail.com
                    </a>
                  </div>
                </address>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-white/40 text-xs">Response time: 3–5 working days</p>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl p-7 border border-charcoal/8 shadow-sm">
                <p className="font-semibold text-charcoal text-sm mb-4">Follow Us</p>
                <div className="space-y-3">
                  {[
                    { name: "LinkedIn", handle: "ASREP Africa", href: "https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/" },
                    { name: "Facebook", handle: "ASREP Africa", href: "https://www.facebook.com/share/1Cpm3uk3uY/" },
                    { name: "YouTube", handle: "@asrepafrica", href: "https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX" },
                  ].map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg bg-cream hover:bg-forest/5 transition-colors group"
                      aria-label={`${social.name}: ${social.handle}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-charcoal/70 text-sm font-medium">{social.name}</span>
                        <span className="text-muted text-xs">{social.handle}</span>
                      </div>
                      <svg className="w-4 h-4 text-muted group-hover:text-forest transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-charcoal/6">
              <h2 className="font-display font-bold text-earth text-2xl mb-2">Send a Message</h2>
              <p className="text-charcoal/60 text-sm mb-8">
                We read every message and respond personally. ASREP will reply within 3–5 working days.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-14 rounded-2xl overflow-hidden shadow-lg h-72 md:h-96 border border-charcoal/8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127399.18!2d37.59!3d0.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178280be04c22e6d%3A0x1b96a8a8e8a8a8a8!2sIsiolo%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ASREP Africa — Isiolo Town, Isiolo County, Kenya"
              aria-label="Map showing ASREP Africa's location in Isiolo Town, Kenya"
            />
          </div>
        </div>
      </section>
    </>
  );
}
