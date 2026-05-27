"use client";

import Link from "next/link";

const tickerItems = [
  { label: "NEW:", text: "Waso Eco-Champions plant 10,000 indigenous trees across Isiolo County", href: "/news" },
  { label: "FEATURE:", text: "ASREP featured in The Guardian — Conservation in the Age of Trump Aid Cuts", href: "/news" },
  { label: "PARTNERSHIP:", text: "KSG 'Under the Tree' civic education series now scaling to all 47 Kenyan counties", href: "/news" },
  { label: "RESEARCH:", text: "ASAL IK Vault debut release — 'Cows, Women & Land' documents Borana Oromo knowledge", href: "/news" },
  { label: "IMPACT:", text: "500+ peace actors engaged through Isiolo Peace Actors Forum — 60% women & youth", href: "/impact" },
];

export default function NewsTicker() {
  return (
    <div
      className="bg-earth text-white py-2.5 overflow-hidden relative z-40"
      aria-label="Latest news ticker"
    >
      <div className="flex items-center">
        {/* Static label badge */}
        <div className="shrink-0 bg-gold text-forest text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 mr-4 whitespace-nowrap">
          Latest
        </div>
        {/* Scrolling track */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex items-center whitespace-nowrap"
            style={{ animation: "ticker 45s linear infinite" }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="inline-flex items-center gap-2 text-xs hover:text-gold transition-colors mx-8 shrink-0"
              >
                <span className="text-gold font-bold uppercase text-[10px] tracking-widest">{item.label}</span>
                <span className="text-white/85">{item.text}</span>
                <span className="text-white/30 ml-4" aria-hidden="true">&bull;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
