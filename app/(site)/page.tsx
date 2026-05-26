import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ImpactNumbersBar from "@/components/home/ImpactNumbersBar";
import WhoWeAreStrip from "@/components/home/WhoWeAreStrip";
import ThematicFocusCards from "@/components/home/ThematicFocusCards";
import PullQuoteSection from "@/components/home/PullQuoteSection";
import FeaturedStories from "@/components/home/FeaturedStories";
import GlobalRecognitionStrip from "@/components/home/GlobalRecognitionStrip";
import GetInvolvedCTABand from "@/components/home/GetInvolvedCTABand";
import PartnersLogoStrip from "@/components/home/PartnersLogoStrip";

export const metadata: Metadata = {
  title: "ASREP Africa — ASAL Research & Resilience Programme",
  description:
    "ASREP Africa builds resilient communities across Kenya's arid and semi-arid lands through climate resilience, peacebuilding, indigenous knowledge, and civic governance.",
  openGraph: {
    title: "ASREP Africa — Advancing Resilience. Restoring Nature. Sustaining Peace.",
    description:
      "Locally-led programmes for climate resilience, peacebuilding, and sustainable livelihoods across Kenya's ASALs. Headquartered in Isiolo County.",
    url: "https://www.asrepafrica.org",
    images: [{ url: "/images/og/home-og.jpg", width: 1200, height: 630, alt: "ASREP Africa" }],
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero slider with Ken Burns effect */}
      <HeroSection />

      {/* 2 — Impact numbers: count-up on scroll */}
      <ImpactNumbersBar />

      {/* 3 — Who We Are: 2-col photo + text */}
      <WhoWeAreStrip />

      {/* 4 — Six programme cards */}
      <ThematicFocusCards />

      {/* 5 — Indigenous Knowledge pull quote */}
      <PullQuoteSection />

      {/* 6 — Latest news & impact stories (CMS) */}
      <FeaturedStories />

      {/* 7 — Global media recognition */}
      <GlobalRecognitionStrip />

      {/* 8 — Donate / Partner / Volunteer CTAs */}
      <GetInvolvedCTABand />

      {/* 9 — Partners logo grid */}
      <PartnersLogoStrip />
    </>
  );
}
