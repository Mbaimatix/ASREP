import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/forms/NewsletterForm";

const aboutLinks = [
  { label: "About ASREP", href: "/about" },
  { label: "Mission & Vision", href: "/about/mission-vision" },
  { label: "Our History", href: "/about/history" },
  { label: "Leadership & Governance", href: "/about/leadership" },
  { label: "Theory of Change", href: "/about/theory-of-change" },
  { label: "Our Team", href: "/team" },
];

const programmeLinks = [
  { label: "Climate Resilience & NbS", href: "/what-we-do/climate-resilience" },
  { label: "Peacebuilding & Social Cohesion", href: "/what-we-do/peacebuilding" },
  { label: "Research & Knowledge", href: "/what-we-do/research-knowledge" },
  { label: "Civic Governance & Youth", href: "/what-we-do/civic-governance" },
  { label: "Biodiversity Restoration", href: "/what-we-do/biodiversity" },
  { label: "Livelihoods & Empowerment", href: "/what-we-do/livelihoods" },
];

const resourceLinks = [
  { label: "Publications & Research", href: "/resources" },
  { label: "Our Impact", href: "/impact" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "Events & Summits", href: "/events" },
  { label: "News & Media", href: "/news" },
  { label: "Careers & Tenders", href: "/get-involved/careers" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1Cpm3uk3uY/",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    name: "X / Twitter",
    href: "https://x.com/asrepafrica",
    icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX",
    icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/asrepafrica/",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest text-white" role="contentinfo">
      {/* ─── Main footer grid ─────────────────────────────────────────────── */}
      <div className="container-asrep py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand + About */}
          <div>
            <Link
              href="/"
              className="inline-flex mb-5"
              aria-label="ASREP Africa — Home"
            >
              <Image
                src="/logos/asrep-logo.png"
                alt="ASREP Africa — ASAL Research & Resilience Programme"
                width={180}
                height={72}
                className="object-contain bg-white rounded-xl px-3 py-2 h-16 w-auto"
              />
            </Link>

            <p className="text-white/65 text-sm leading-relaxed mb-6 max-w-xs">
              Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience.
              Building resilient communities across Kenya&apos;s arid and semi-arid lands since 2023.
            </p>

            {/* 5 Social icons */}
            <div className="flex items-center gap-2 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`ASREP Africa on ${social.name}`}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold/70 flex items-center justify-center
                    transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* NGO registration badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/15">
              <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white/60 text-[10px] font-medium tracking-wide">Registered NGO &middot; Kenya &middot; Est. 2023</span>
            </div>
          </div>

          {/* Column 2 — About Links */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              About ASREP
            </h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
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

          {/* Column 3 — Programmes + Resources */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              Programmes
            </h3>
            <ul className="space-y-2.5 mb-6">
              {programmeLinks.map((link) => (
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
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-3 pt-4 border-t border-white/10">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.slice(0, 4).map((link) => (
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

          {/* Column 4 — Newsletter + Contact */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-2">
              Stay Connected
            </h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
              Field updates, research findings, and impact stories from Kenya&apos;s ASALs — straight to your inbox.
            </p>
            <NewsletterForm />

            {/* Contact */}
            <div className="mt-7 pt-6 border-t border-white/10 space-y-2">
              <a href="mailto:asrepafrica@gmail.com" className="flex items-center gap-2 text-white/60 hover:text-gold text-xs transition-colors">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                asrepafrica@gmail.com
              </a>
              <a href="tel:+254733687149" className="flex items-center gap-2 text-white/60 hover:text-gold text-xs transition-colors">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +254 733 687 149
              </a>
              <p className="text-white/40 text-xs flex items-start gap-2">
                <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Isiolo Town, Isiolo County, Kenya
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ─── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-asrep py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            &copy; {year} ASREP Africa &mdash; ASAL Research &amp; Resilience Programme. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20 text-xs" aria-hidden="true">&middot;</span>
            <Link href="/terms-of-use" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Terms of Use
            </Link>
            <span className="text-white/20 text-xs" aria-hidden="true">&middot;</span>
            <Link href="/sitemap.xml" className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
