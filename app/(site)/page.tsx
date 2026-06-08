import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import NewsTicker from "@/components/home/NewsTicker";
import ImpactNumbersBar from "@/components/home/ImpactNumbersBar";
import WhoWeAreStrip from "@/components/home/WhoWeAreStrip";
import ThematicFocusCards from "@/components/home/ThematicFocusCards";
import PullQuoteSection from "@/components/home/PullQuoteSection";
import PublicationsSection from "@/components/home/PublicationsSection";
import FeaturedStories from "@/components/home/FeaturedStories";
import NewsletterBanner from "@/components/shared/NewsletterBanner";
import GlobalRecognitionStrip from "@/components/home/GlobalRecognitionStrip";
import GetInvolvedCTABand from "@/components/home/GetInvolvedCTABand";
import PartnersLogoStrip from "@/components/home/PartnersLogoStrip";
import ProgrammeQuickLinks from "@/components/home/ProgrammeQuickLinks";

export const metadata: Metadata = {
  alternates: { canonical: "https://asrepafrica.org" },
  title: "ASREP Africa — ASAL Research & Resilience Programme",
  description:
    "ASREP Africa builds resilient communities across Kenya's arid and semi-arid lands through climate resilience, peacebuilding, indigenous knowledge, and civic governance.",
  openGraph: {
    title: "ASREP Africa — Advancing Resilience. Restoring Nature. Sustaining Peace.",
    description:
      "Locally-led programmes for climate resilience, peacebuilding, and sustainable livelihoods across Kenya's ASALs. Headquartered in Isiolo County.",
    url: "https://asrepafrica.org",
    images: [{ url: "/images/hero/hero-1.jpg", width: 1200, height: 630, alt: "ASREP Africa — advancing resilience, restoring nature, sustaining peace" }],
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero slider with Ken Burns effect */}
      <HeroSection />

      {/* 1b — Programme quick-links strip */}
      <ProgrammeQuickLinks />

      {/* 2 — Scrolling news ticker */}
      <NewsTicker />

      {/* 3 — Impact numbers: count-up on scroll */}
      <ImpactNumbersBar />

      {/* 4 — Who We Are: 2-col photo + YouTube + text */}
      <WhoWeAreStrip />

      {/* 5 — Six programme cards */}
      <ThematicFocusCards />

      {/* 6 — Indigenous Knowledge pull quote */}
      <PullQuoteSection />

      {/* 7 — Reports & Publications */}
      <PublicationsSection />

      {/* 8 — Latest news & impact stories (CMS) */}
      <FeaturedStories />

      {/* 9 — Newsletter subscription banner */}
      <NewsletterBanner />

      {/* 10 — Global media recognition */}
      <GlobalRecognitionStrip />

      {/* 11 — Donate / Partner / Volunteer CTAs */}
      <GetInvolvedCTABand />

      {/* 12 — Partners logo carousel */}
      <PartnersLogoStrip />
    </>
  );
}
