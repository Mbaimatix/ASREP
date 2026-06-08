import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/* ─── Fonts ──────────────────────────────────────────────────────────────────
   Playfair Display → all H1 & H2 (editorial authority)
   DM Sans         → body text, nav, buttons (highly readable at 16px)
─────────────────────────────────────────────────────────────────────────── */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE = "https://asrepafrica.org";

/* ─── Site-wide metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE
  ),
  title: {
    default: "ASREP Africa — ASAL Research & Resilience Programme",
    template: "%s | ASREP Africa",
  },
  description:
    "ASREP advances climate resilience, peacebuilding, and nature-based solutions across Kenya's Arid and Semi-Arid Lands. Rooted in the ASALs. Driven by Evidence. United for Peace and Resilience.",
  keywords: [
    "ASAL",
    "climate resilience Kenya",
    "peacebuilding Isiolo",
    "indigenous knowledge Kenya",
    "rangeland restoration",
    "Waso Eco-Champs",
    "ASREP Africa",
    "nature-based solutions Kenya",
    "pastoralist communities",
    "Isiolo County NGO",
  ],
  authors: [{ name: "ASAL Research and Resilience Programme (ASREP)" }],
  alternates: {
    canonical: SITE,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE,
    siteName: "ASREP Africa",
    title: "ASREP Africa — ASAL Research & Resilience Programme",
    description:
      "Advancing Resilience. Restoring Nature. Sustaining Peace. — Building resilient communities across Kenya's ASALs.",
    images: [
      {
        url: `${SITE}/images/og/asrep-og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "ASREP Africa — Advancing Resilience. Restoring Nature. Sustaining Peace.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASREP Africa — ASAL Research & Resilience Programme",
    description:
      "Advancing Resilience. Restoring Nature. Sustaining Peace. Building resilient communities across Kenya's ASALs.",
    images: [`${SITE}/images/og/asrep-og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/logos/asrep-logo.png", type: "image/png", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

/* ─── JSON-LD Structured Data ────────────────────────────────────────────── */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": `${SITE}/#organization`,
      name: "ASREP Africa",
      alternateName: "ASAL Research & Resilience Programme",
      url: SITE,
      logo: `${SITE}/logos/asrep-logo.png`,
      foundingDate: "2023",
      description:
        "Locally-led NGO building resilient communities across Kenya's arid and semi-arid lands through climate resilience, peacebuilding, research, and governance programmes.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Isiolo",
        addressRegion: "Isiolo County",
        addressCountry: "KE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "general",
        email: "asrepafrica@gmail.com",
        telephone: "+254-733-687-149",
      },
      sameAs: [
        "https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/",
        "https://www.facebook.com/share/1Cpm3uk3uY/",
        "https://x.com/asrepafrica",
        "https://youtube.com/@asrepafrica",
        "https://www.instagram.com/asrepafrica/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "ASREP Africa",
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en-GB",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE}/news?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

/* ─── Root layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full scroll-smooth`}
    >
      <head>
        {/* Preconnect to Sanity CDN — eliminates DNS + TLS handshake on first CMS image */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        {/* Preconnect to YouTube for the video embed on the home page */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        {/* Preconnect to Google Fonts CDN (next/font uses this internally) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Sitemap declaration */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-body antialiased">
        {/* Accessibility: skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}

        {/* Google Analytics — only loaded when measurement ID is configured */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true
                  });
                `}
              </Script>
            </>
          )}
      </body>
    </html>
  );
}
