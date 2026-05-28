import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
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

/* ─── Site-wide metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.asrepafrica.org"
  ),
  title: {
    default:
      "ASREP Africa — ASAL Research & Resilience Programme",
    template: "%s | ASREP Africa — ASAL Research & Resilience Programme",
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
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.asrepafrica.org",
    siteName: "ASREP Africa",
    title: "ASREP Africa — ASAL Research & Resilience Programme",
    description:
      "Advancing Resilience. Restoring Nature. Sustaining Peace. — Building resilient communities across Kenya's ASALs.",
    images: [
      {
        url: "/images/og-default.jpg",
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
    images: ["/images/og-default.jpg"],
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
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-body antialiased">
        {/* Accessibility: skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
