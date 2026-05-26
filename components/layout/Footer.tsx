import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/forms/NewsletterForm";

const quickLinks = [
  { label: "About ASREP", href: "/about" },
  { label: "Our Programmes", href: "/what-we-do" },
  { label: "Our Impact", href: "/impact" },
  { label: "News & Media", href: "/news" },
  { label: "Resources", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
];

const getInvolvedLinks = [
  { label: "Donate Now", href: "/get-involved/donate" },
  { label: "Volunteer", href: "/get-involved/volunteer" },
  { label: "Partner with Us", href: "/get-involved/partner" },
  { label: "Careers & Tenders", href: "/get-involved/careers" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white" role="contentinfo">
      {/* ─── Main footer grid ─────────────────────────────────────────────── */}
      <div className="container-asrep py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-5"
              aria-label="ASREP Africa — Home"
            >
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logos/asrep-logo-white.png"
                  alt="ASREP Africa"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-white font-display font-bold text-xl leading-none">
                  ASREP <span className="text-gold">AFRICA</span>
                </div>
                <div className="text-white/50 text-[9px] tracking-widest uppercase mt-0.5">
                  ASAL Research & Resilience Programme
                </div>
              </div>
            </Link>

            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-xs">
              Rooted in the ASALs. Driven by Evidence. United for Peace and
              Resilience. Building resilient communities across Kenya&apos;s arid and
              semi-arid lands.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ASREP Africa on LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-sage/60 flex items-center justify-center
                  transition-colors"
              >
                {/* LinkedIn */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1Cpm3uk3uY/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ASREP Africa on Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-sage/60 flex items-center justify-center
                  transition-colors"
              >
                {/* Facebook */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ASREP Africa on YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-sage/60 flex items-center justify-center
                  transition-colors"
              >
                {/* YouTube */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-sage/50 group-hover:bg-gold transition-colors shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10 mt-3">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2.5">Get Involved</p>
              </li>
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-sage/50 group-hover:bg-gold transition-colors shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Find Us
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                {/* Map pin */}
                <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-white/65 text-sm leading-relaxed">
                  ASREP Africa<br />
                  Isiolo Town, Isiolo County<br />
                  Kenya
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Phone */}
                <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+254733687149" className="text-white/65 hover:text-gold text-sm transition-colors">
                  +254 733 687 149
                </a>
              </div>

              <div className="flex items-center gap-3">
                {/* Email */}
                <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:asrepafrica@gmail.com" className="text-white/65 hover:text-gold text-sm transition-colors break-all">
                  asrepafrica@gmail.com
                </a>
              </div>
            </address>

            {/* Registered detail */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-white/40 text-xs leading-relaxed">
                Registered NGO · Kenya<br />
                Founded 2023 · Isiolo County
              </p>
            </div>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-2">
              Stay Connected
            </h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Get field updates, research findings, and impact stories from Kenya&apos;s ASALs — straight to your inbox.
            </p>
            <NewsletterForm />
          </div>

        </div>
      </div>

      {/* ─── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-asrep py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {year} ASREP Africa — ASAL Research &amp; Resilience Programme. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs" aria-hidden="true">·</span>
            <Link href="/terms-of-use" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Terms of Use
            </Link>
            <span className="text-white/20 text-xs" aria-hidden="true">·</span>
            <Link href="/sitemap.xml" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
