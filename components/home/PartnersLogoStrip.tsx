"use client";

import { useState } from "react";
import Image from "next/image";

const partners = [
  { name: "Kenya School of Government", abbr: "KSG", logo: "/logos/partners/ksg.jpg" },
  { name: "Kenya Forest Service", abbr: "KFS", logo: "/logos/partners/kfs.png" },
  { name: "Kenya Wildlife Service", abbr: "KWS", logo: "/logos/partners/kws.jpg" },
  { name: "National Drought Management Authority", abbr: "NDMA", logo: "/logos/partners/ndma.png" },
  { name: "Mercy Corps", abbr: "Mercy Corps", logo: "/logos/partners/mercy-corps.png" },
  { name: "Interpeace", abbr: "Interpeace", logo: "/logos/partners/interpeace.png" },
  { name: "San Diego Zoo Wildlife Alliance", abbr: "SDZWA", logo: "/logos/partners/sdzwa.png" },
  { name: "Alliance for Peacebuilding", abbr: "AfP", logo: "/logos/partners/afp.jpg" },
  { name: "Jameel Observatory", abbr: "Jameel", logo: "/logos/partners/jameel.png" },
  { name: "NCIC", abbr: "NCIC", logo: "/logos/partners/ncic.png" },
  { name: "FCDC", abbr: "FCDC", logo: "/logos/partners/fcdc.png" },
  { name: "Inclusion Unfolding Africa", abbr: "IUA", logo: "/logos/partners/iua.jpg" },
  { name: "PROCMURA", abbr: "PROCMURA", logo: "/logos/partners/procmura.png" },
  { name: "RPPL", abbr: "RPPL", logo: "/logos/partners/rppl.jpg" },
  { name: "MID-P", abbr: "MID-P", logo: "/logos/partners/midp.png" },
  { name: "Pelum Kenya", abbr: "Pelum", logo: "/logos/partners/pelum.png" },
  { name: "PAMOJA", abbr: "PAMOJA", logo: "/logos/partners/pamoja.png" },
  { name: "Horn of Africa Institute for Peace & Security", abbr: "HAIPS", logo: "/logos/partners/haips.jpg" },
];

export default function PartnersLogoStrip() {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  function handleImgError(abbr: string) {
    setImgErrors((prev) => {
      const next = new Set(prev);
      next.add(abbr);
      return next;
    });
  }

  return (
    <section className="section-pad bg-cream" aria-labelledby="partners-heading">
      <div className="container-asrep">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Our Partners
          </p>
          <h2
            id="partners-heading"
            className="font-display text-earth text-3xl md:text-4xl font-bold leading-tight mb-4"
          >
            Trusted by Leading{" "}
            <span className="text-forest">Partners &amp; Institutions</span>
          </h2>
          <p className="text-charcoal/55 text-base max-w-xl mx-auto leading-relaxed">
            We work alongside government bodies, international NGOs, research institutions,
            and community networks to amplify impact across Kenya&apos;s ASALs.
          </p>
        </div>

        {/* Logo grid */}
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-px
            bg-charcoal/8 rounded-2xl overflow-hidden border border-charcoal/8"
          role="list"
          aria-label="ASREP Africa partner organisations"
        >
          {partners.map((partner) => (
            <div
              key={partner.abbr}
              role="listitem"
              className="partner-logo bg-white flex items-center justify-center p-5 aspect-[3/2]
                hover:z-10 relative group"
              title={partner.name}
            >
              {imgErrors.has(partner.abbr) ? (
                /* Text fallback when logo file is missing */
                <span
                  className="text-[10px] font-bold text-charcoal/40 text-center leading-tight select-none px-1"
                  aria-label={partner.name}
                >
                  {partner.abbr}
                </span>
              ) : (
                <div className="relative w-full h-10">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
                    sizes="160px"
                    onError={() => handleImgError(partner.abbr)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted text-xs mt-8">
          Partnerships reflect collaborative relationships including government, funding, research, and programmatic partners.
        </p>
      </div>
    </section>
  );
}
