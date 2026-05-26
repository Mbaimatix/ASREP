import Image from "next/image";

const partners = [
  { name: "Kenya School of Government", abbr: "KSG", logo: "/logos/partners/ksg.png" },
  { name: "Kenya Forest Service", abbr: "KFS", logo: "/logos/partners/kfs.png" },
  { name: "Kenya Wildlife Service", abbr: "KWS", logo: "/logos/partners/kws.png" },
  { name: "National Drought Management Authority", abbr: "NDMA", logo: "/logos/partners/ndma.png" },
  { name: "Mercy Corps", abbr: "Mercy Corps", logo: "/logos/partners/mercy-corps.png" },
  { name: "Interpeace", abbr: "Interpeace", logo: "/logos/partners/interpeace.png" },
  { name: "San Diego Zoo Wildlife Alliance", abbr: "SDZWA", logo: "/logos/partners/sdzwa.png" },
  { name: "Alliance for Peacebuilding", abbr: "AfP", logo: "/logos/partners/afp.png" },
  { name: "Jameel Observatory", abbr: "Jameel", logo: "/logos/partners/jameel.png" },
  { name: "NCIC", abbr: "NCIC", logo: "/logos/partners/ncic.png" },
  { name: "FCDC", abbr: "FCDC", logo: "/logos/partners/fcdc.png" },
  { name: "Inclusion Unfolding Africa", abbr: "IUA", logo: "/logos/partners/iua.png" },
  { name: "PROCMURA", abbr: "PROCMURA", logo: "/logos/partners/procmura.png" },
  { name: "RPPL", abbr: "RPPL", logo: "/logos/partners/rppl.png" },
  { name: "MID-P", abbr: "MID-P", logo: "/logos/partners/midp.png" },
  { name: "Pelum Kenya", abbr: "Pelum", logo: "/logos/partners/pelum.png" },
  { name: "PAMOJA", abbr: "PAMOJA", logo: "/logos/partners/pamoja.png" },
  { name: "Horn of Africa Institute for Peace & Security", abbr: "HAIPS", logo: "/logos/partners/haips.png" },
];

export default function PartnersLogoStrip() {
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
              <div className="relative w-full h-10">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-all duration-300 grayscale group-hover:grayscale-0"
                  sizes="160px"
                  onError={() => {/* handled by CSS fallback */}}
                />
              </div>
              {/* Abbr fallback — shows if image fails to load */}
              <span
                className="absolute inset-0 flex items-center justify-center text-xs font-bold
                  text-charcoal/30 select-none pointer-events-none opacity-0"
                aria-hidden="true"
              >
                {partner.abbr}
              </span>
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
