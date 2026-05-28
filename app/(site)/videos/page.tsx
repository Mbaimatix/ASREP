import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";

const VIDEO_ID = "9aJQzboyOIY";
const VIDEO_THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export const metadata: Metadata = {
  title: "Videos | ASREP Africa",
  description:
    "Watch ASREP Africa in action — field documentaries and programme highlights from Kenya's ASALs.",
  openGraph: {
    title: "Videos | ASREP Africa",
    description: "Watch ASREP Africa's field work and community-led programmes across Isiolo County, Kenya.",
    images: [{ url: VIDEO_THUMBNAIL, width: 1280, height: 720, alt: "ASREP Africa — programme video" }],
  },
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        title="Watch ASREP Africa"
        subtitle="Field documentaries and programme highlights from our work across Kenya's ASALs."
        imageSrc="/images/impact/impact-hero.jpg"
        imageAlt="ASREP Africa field documentation"
        breadcrumbs={[{ label: "Videos" }]}
        tag="ASREP on YouTube"
      />

      {/* ─── Featured Video ──────────────────────────────────────────────── */}
      <section className="section-pad bg-cream" aria-labelledby="featured-video-heading">
        <div className="container-asrep">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* Video embed — takes 3/5 columns on desktop */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video bg-charcoal">
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                  title="ASREP Africa — Programme Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Description panel — 2/5 columns */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-forest/10 text-forest text-xs font-semibold
                rounded-full uppercase tracking-widest mb-5 w-fit">
                Featured
              </span>

              <h2
                id="featured-video-heading"
                className="font-display text-earth text-2xl md:text-3xl font-bold leading-tight mb-4"
              >
                ASREP Africa{" "}
                <span className="text-forest">in Action</span>
              </h2>

              <p className="text-charcoal/70 leading-relaxed mb-5">
                From community tree-planting drives in Isiolo to peace dialogues
                across pastoral boundaries — watch ASREP Africa&apos;s locally-led,
                evidence-driven programmes creating lasting change in Kenya&apos;s ASALs.
              </p>

              <ul className="space-y-2.5 mb-7">
                {[
                  "10,000 indigenous trees planted with 2,000 eco-champions",
                  "500 community members engaged in peacebuilding forums",
                  "Debut IK Vault Series — Cows, Women & Land",
                ].map((fact) => (
                  <li key={fact} className="flex items-start gap-3 text-sm text-charcoal/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-2 shrink-0" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>

              <a
                href={`https://youtu.be/${VIDEO_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#FF0000] hover:bg-[#CC0000]
                  text-white font-semibold text-sm rounded-lg transition-colors w-fit"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Thumbnail strip (visual context) ────────────────────────────── */}
      <section className="py-14 bg-white" aria-label="Video preview">
        <div className="container-asrep">
          <div className="relative rounded-3xl overflow-hidden shadow-xl max-w-3xl mx-auto group">
            <Image
              src={VIDEO_THUMBNAIL}
              alt="ASREP Africa — programme video thumbnail"
              width={1280}
              height={720}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Play overlay */}
            <a
              href={`https://youtu.be/${VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center
                bg-black/30 group-hover:bg-black/40 transition-colors"
              aria-label="Watch ASREP Africa video on YouTube"
            >
              <div className="w-20 h-20 rounded-full bg-[#FF0000] flex items-center justify-center
                shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-9 h-9 text-white ml-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ─── YouTube channel CTA ──────────────────────────────────────────── */}
      <section className="py-16 bg-forest text-white text-center" aria-label="Subscribe to ASREP Africa on YouTube">
        <div className="container-asrep max-w-2xl mx-auto">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.25em] mb-3">Stay Connected</p>
          <h2 className="font-display text-3xl font-bold mb-4">
            More videos coming soon
          </h2>
          <p className="text-white/65 leading-relaxed mb-8">
            Subscribe to the ASREP Africa YouTube channel for field updates, research
            launches, event recordings, and community stories from Kenya&apos;s ASALs.
          </p>
          <a
            href="https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#FF0000] hover:bg-[#CC0000]
              text-white font-semibold text-sm rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </>
  );
}
