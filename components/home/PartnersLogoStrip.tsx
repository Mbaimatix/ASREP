"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const partners = [
  { name: "Kenya School of Government", abbr: "KSG", logo: null },
  { name: "Kenya Wildlife Service", abbr: "KWS", logo: null },
  { name: "Alliance for Peacebuilding", abbr: "AfP", logo: null },
  { name: "Inclusion Unfolding Africa", abbr: "IUA", logo: null },
  { name: "Horn of Africa Institute for Peace & Security", abbr: "HAIPS", logo: null },
  { name: "Regional Pastoralists Peace Link", abbr: "RPPL", logo: null },
  { name: "WSMTF Water Services Trust Fund", abbr: "WSMTF", logo: null },
  { name: "AGAR — African Agency for Arid Resources", abbr: "AGAR", logo: null },
  { name: "ASAL Humanitarian Network", abbr: "ASAL-HN", logo: null },
  { name: "Mwangaza Light", abbr: "Mwangaza", logo: null },
  { name: "Kenya Forest Service", abbr: "KFS", logo: null },
  { name: "National Drought Management Authority", abbr: "NDMA", logo: null },
  { name: "Mercy Corps", abbr: "Mercy Corps", logo: null },
  { name: "Interpeace", abbr: "Interpeace", logo: null },
  { name: "San Diego Zoo Wildlife Alliance Kenya", abbr: "SDZWA", logo: null },
  { name: "Jameel Observatory", abbr: "Jameel", logo: null },
  { name: "NCIC", abbr: "NCIC", logo: null },
  { name: "FCDC", abbr: "FCDC", logo: null },
  { name: "PROCMURA", abbr: "PROCMURA", logo: null },
  { name: "MID-P", abbr: "MID-P", logo: null },
  { name: "Pelum Kenya", abbr: "Pelum", logo: null },
  { name: "PAMOJA Trust", abbr: "PAMOJA", logo: null },
];

function PartnerTile({ partner }: { partner: typeof partners[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-20 mx-5 gap-1">
      {partner.logo && !imgError ? (
        <div className="relative h-12 w-28 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain"
            onError={() => setImgError(true)}
            sizes="112px"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full bg-forest/12 flex items-center justify-center">
            <span className="text-forest/50 text-[10px] font-bold">
              {partner.abbr.slice(0, 3)}
            </span>
          </div>
          <span className="text-charcoal/40 text-[9px] font-medium text-center leading-tight max-w-[100px]">
            {partner.abbr}
          </span>
        </div>
      )}
    </div>
  );
}

export default function PartnersLogoStrip() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const animationStyle: React.CSSProperties = reducedMotion
    ? { animation: "none" }
    : {
        animation: "ticker 45s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      };

  return (
    <section
      className="section-pad bg-cream"
      aria-labelledby="partners-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-asrep">
        <div className="text-center mb-10">
          <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Our Partners
          </p>
          <h2
            id="partners-heading"
            className="font-display text-earth text-2xl md:text-3xl font-bold"
          >
            Trusted by Leading{" "}
            <span className="text-forest">Partners &amp; Institutions</span>
          </h2>
        </div>

        {/* Auto-scrolling carousel track */}
        <div className="overflow-hidden relative" role="list" aria-label="ASREP Africa partner organisations">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" aria-hidden="true" />

          <div
            className="flex items-center"
            style={{
              ...animationStyle,
              width: "max-content",
            }}
          >
            {/* First set — visible to screen readers */}
            {partners.map((partner, i) => (
              <div key={`${partner.abbr}-${i}`} role="listitem">
                <PartnerTile partner={partner} />
              </div>
            ))}
            {/* Duplicate set — hidden from screen readers to avoid double announcements */}
            <div aria-hidden="true" className="flex items-center">
              {partners.map((partner, i) => (
                <div key={`${partner.abbr}-dup-${i}`}>
                  <PartnerTile partner={partner} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-muted text-xs mt-6">
          {partners.length}+ government, civil society, and international partners across Kenya
        </p>
      </div>
    </section>
  );
}
