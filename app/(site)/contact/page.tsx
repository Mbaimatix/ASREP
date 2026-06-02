import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.asrepafrica.org/contact" },
  title: "Contact Us | ASREP Africa",
  description:
    "Get in touch with ASREP Africa — for programme enquiries, partnership discussions, media requests, or general questions. Headquartered in Isiolo County, Kenya.",
  openGraph: {
    title: "Contact ASREP Africa",
    description: "Reach our team in Isiolo County, Kenya — for partnerships, research, media, and community enquiries.",
    images: [{ url: "/images/contact/contact-hero.jpg", width: 1200, height: 630, alt: "Contact ASREP Africa" }],
  },
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

      {/* Three contact icon-cards — orange/brand background */}
      <section className="bg-cta py-14" aria-label="Contact information cards">
        <div className="container-asrep">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Address */}
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Our Address</h3>
              <address className="not-italic text-white/80 text-sm leading-relaxed">
                ASREP Africa<br />
                Isiolo Town<br />
                Isiolo County, Kenya
              </address>
            </div>

            {/* Email */}
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Email Us</h3>
              <a
                href="mailto:asrepafrica@gmail.com"
                className="text-white/80 hover:text-white text-sm transition-colors break-all"
              >
                asrepafrica@gmail.com
              </a>
              <p className="text-white/50 text-xs mt-2">Response within 3-5 working days</p>
            </div>

            {/* Phone */}
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Call Us</h3>
              <a
                href="tel:+254733687149"
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                +254 733 687 149
              </a>
              <p className="text-white/50 text-xs mt-2">Monday – Friday, 8am – 5pm EAT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Details */}
      <section className="section-pad bg-cream" aria-label="Contact form and additional information">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Social media details */}
            <aside className="lg:col-span-2 space-y-7">
              <div className="bg-white rounded-2xl p-7 border border-charcoal/8 shadow-sm">
                <p className="font-semibold text-charcoal text-sm uppercase tracking-widest mb-5 text-xs text-muted">Follow ASREP Africa</p>
                <div className="space-y-3">
                  {[
                    { name: "LinkedIn", handle: "@asrepafrica", href: "https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                    { name: "Facebook", handle: "ASREP Africa", href: "https://www.facebook.com/share/1Cpm3uk3uY/", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                    { name: "YouTube", handle: "@asrepafrica", href: "https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                    { name: "X (Twitter)", handle: "@asrepafrica", href: "https://x.com/asrepafrica", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                    { name: "Instagram", handle: "@asrepafrica", href: "https://www.instagram.com/asrepafrica/", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                  ].map((social) => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-cream hover:bg-forest/5 transition-colors group"
                      aria-label={`${social.name}: ${social.handle}`}>
                      <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d={social.icon} />
                        </svg>
                      </div>
                      <div>
                        <div className="text-charcoal text-sm font-medium">{social.name}</div>
                        <div className="text-muted text-xs">{social.handle}</div>
                      </div>
                      <svg className="w-4 h-4 text-muted group-hover:text-forest ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* NGO registration */}
              <div className="bg-forest rounded-2xl p-6 text-white">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Registration</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  ASREP Africa is a registered NGO in Kenya, headquartered in Isiolo County. Founded 2023.
                  All donations and partnerships are managed under transparent financial governance frameworks.
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-charcoal/6">
              <h2 className="font-display font-bold text-earth text-2xl mb-2">Send a Message</h2>
              <p className="text-charcoal/60 text-sm mb-8">
                We read every message and respond personally. ASREP will reply within 3-5 working days.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="mt-14 rounded-2xl overflow-hidden shadow-lg border border-charcoal/8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127399.18!2d37.59!3d0.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178280be04c22e6d%3A0x1b96a8a8e8a8a8a8!2sIsiolo%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
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
