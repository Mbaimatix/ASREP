import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Simple header */}
      <header className="bg-forest py-4 px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <Image src="/logos/asrep-logo-white.png" alt="ASREP Africa" fill className="object-contain" />
          </div>
          <span className="text-white font-display font-bold text-lg">
            ASREP <span className="text-gold">AFRICA</span>
          </span>
        </Link>
      </header>

      {/* 404 content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          {/* Large 404 */}
          <div className="font-display text-[8rem] font-bold text-forest/12 leading-none select-none mb-0" aria-hidden="true">
            404
          </div>

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-6 -mt-4">
            <svg className="w-10 h-10 text-forest/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="font-display text-earth text-3xl md:text-4xl font-bold mb-4">
            Page Not Found
          </h1>
          <p className="text-charcoal/65 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find your way.
          </p>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto mb-8">
            {[
              { label: "Home", href: "/" },
              { label: "What We Do", href: "/what-we-do" },
              { label: "Our Impact", href: "/impact" },
              { label: "News & Media", href: "/news" },
              { label: "Get Involved", href: "/get-involved" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 bg-white rounded-xl border border-charcoal/12 text-charcoal/75
                  hover:text-forest hover:border-forest/40 transition-colors text-sm font-medium text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-white
              font-semibold rounded-xl hover:bg-sage transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Homepage
          </Link>

          {/* ASAL tagline */}
          <p className="text-charcoal/40 text-xs mt-8 italic">
            &ldquo;Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience.&rdquo;
          </p>
        </div>
      </main>
    </div>
  );
}
