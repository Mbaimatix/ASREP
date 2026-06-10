import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

type ThankYouType = "contact" | "newsletter" | "document";

interface PageContent {
  title: string;
  message: string;
}

const contentMap: Record<ThankYouType, PageContent> = {
  contact: {
    title: "Message Received!",
    message:
      "Thank you for reaching out. Our team will review your message and get back to you within 2–3 business days. We look forward to connecting with you.",
  },
  newsletter: {
    title: "You're Subscribed!",
    message:
      "Welcome to the ASREP Africa community. You'll receive field updates, programme news, and impact stories straight to your inbox. You can unsubscribe at any time.",
  },
  document: {
    title: "Request Received!",
    message:
      "Thank you for requesting this document. Our team will review your request and send the materials to you within 3–5 business days.",
  },
};

const exploreCards = [
  {
    href: "/what-we-do",
    label: "What We Do",
    description:
      "Explore ASREP's six thematic programmes — from climate resilience to indigenous knowledge and civic governance.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
  },
  {
    href: "/impact",
    label: "Our Impact",
    description:
      "See the measurable difference ASREP makes — community numbers, project outcomes, and stories from the field.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    href: "/news",
    label: "Latest News",
    description:
      "Read the latest updates, field reports, and impact stories from ASREP Africa's programmes across Kenya's ASALs.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@asrepafrica",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Cpm3uk3uY/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

function isThankYouType(value: string | undefined): value is ThankYouType {
  return value === "contact" || value === "newsletter" || value === "document";
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const content = isThankYouType(type)
    ? contentMap[type]
    : { title: "Thank You!", message: "We have received your submission and will be in touch soon." };

  return (
    <main className="min-h-screen bg-cream py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Checkmark icon */}
        <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-forest/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-forest"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-earth text-4xl md:text-5xl mb-4">
          {content.title}
        </h1>

        {/* Confirmation message */}
        <p className="text-charcoal/70 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          {content.message}
        </p>

        {/* Return to Homepage CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-forest text-white font-semibold rounded-xl hover:bg-sage transition-colors text-base mb-16"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Homepage
        </Link>

        {/* Explore next cards */}
        <div className="mb-14">
          <h2 className="font-display font-bold text-earth text-xl mb-6">
            What to explore next
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {exploreCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group bg-sand/50 border border-sand rounded-2xl p-6 text-left hover:bg-sand hover:border-forest/20 transition-all"
              >
                <div className="text-forest mb-3">{card.icon}</div>
                <h3 className="font-display font-semibold text-earth text-base mb-2 group-hover:text-forest transition-colors">
                  {card.label}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Social follow */}
        <div>
          <p className="text-charcoal/60 text-sm font-medium mb-4">Follow us for more updates</p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow ASREP Africa on ${social.label}`}
                className="w-11 h-11 rounded-full bg-forest/10 text-forest flex items-center justify-center hover:bg-forest hover:text-white transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
