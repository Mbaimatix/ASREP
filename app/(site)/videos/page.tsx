import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Videos | ASREP Africa",
  description:
    "Video documentaries, field highlights, and event recordings from ASREP Africa's programmes across Isiolo County and Kenya's ASALs.",
  openGraph: {
    title: "Videos | ASREP Africa",
    description: "Field documentaries and programme videos from ASREP Africa.",
    images: [{ url: "/images/impact/impact-hero.jpg", width: 1200, height: 630, alt: "ASREP Africa videos" }],
  },
};

// TODO: Replace youtubeId values with real ASREP YouTube video IDs from @asrepafrica
// Leave youtubeId as empty string ("") until real IDs are available
const videos = [
  {
    id: "v1",
    youtubeId: "", // TODO: Add real ASREP video ID
    title: "Waso Eco-Champions: 10,000 Trees for Isiolo County",
    description: "Watch eco-champions restore degraded ASAL landscapes through community-led tree planting across 10 wards of Isiolo County.",
    category: "Climate Resilience",
    year: "2024",
    thumbnail: "/images/gallery/waso-eco-champs-line.jpg",
  },
  {
    id: "v2",
    youtubeId: "", // TODO: Add real ASREP video ID
    title: "Isiolo Peace Actors Forum: Building Durable Community Peace",
    description: "The Isiolo Peace Actors Forum brings together pastoral communities, women leaders, and youth to resolve resource conflicts.",
    category: "Peacebuilding",
    year: "2025",
    thumbnail: "/images/gallery/community-women-peace-prayer.jpg",
  },
  {
    id: "v3",
    youtubeId: "", // TODO: Add real ASREP video ID
    title: "ASAL IK Vault: Cows, Women & Land",
    description: "ASREP launches its debut Indigenous Knowledge publication documenting Borana Oromo ecological and cultural wisdom.",
    category: "Research",
    year: "2025",
    thumbnail: "/images/gallery/asrep-elders-strategic-meeting.jpg",
  },
  {
    id: "v4",
    youtubeId: "", // TODO: Add real ASREP video ID
    title: "KSG Under the Tree: Civic Education in the ASALs",
    description: "The Kenya School of Government partnership brings community-based civic education from Isiolo to all 47 Kenyan counties.",
    category: "Civic Governance",
    year: "2025",
    thumbnail: "/images/gallery/dida-fayo-remarks-under-tree-series-launch-oldonyiro.jpg",
  },
  {
    id: "v5",
    youtubeId: "", // TODO: Add real ASREP video ID
    title: "ASREP Africa: Who We Are",
    description: "An introduction to ASREP Africa's mission, programmes, and community-led approach to building resilience in Kenya's ASALs.",
    category: "About ASREP",
    year: "2023",
    thumbnail: "/images/about/about-hero.jpg",
  },
  {
    id: "v6",
    youtubeId: "", // TODO: Add real ASREP video ID
    title: "Eco-Entrepreneurship Webinar: Green Livelihoods in the ASALs",
    description: "ASREP's inaugural eco-entrepreneurship webinar explores green income pathways for 40+ participants from ASAL communities.",
    category: "Livelihoods",
    year: "2025",
    thumbnail: "/images/gallery/asrep-forest-partnership.jpg",
  },
];

const categoryColour: Record<string, string> = {
  "Climate Resilience": "bg-forest/10 text-forest",
  "Peacebuilding": "bg-earth/10 text-earth",
  "Research": "bg-gold/10 text-earth",
  "Civic Governance": "bg-sage/10 text-sage",
  "About ASREP": "bg-charcoal/10 text-charcoal",
  "Livelihoods": "bg-earth/10 text-earth",
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        title="Videos"
        subtitle="Field documentaries, programme highlights, and event recordings from ASREP Africa's work across Kenya's ASALs."
        imageSrc="/images/impact/impact-hero.jpg"
        imageAlt="ASREP Africa field video documentation and programme highlights"
        breadcrumbs={[{ label: "Videos" }]}
        tag="ASREP on YouTube"
      />

      <section className="section-pad bg-cream" aria-labelledby="videos-heading">
        <div className="container-asrep">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sage text-xs font-semibold uppercase tracking-[0.2em] mb-3">Watch</p>
            <h2 id="videos-heading" className="font-display text-earth text-3xl md:text-4xl font-bold mb-4">
              ASREP Africa <span className="text-forest">in Action</span>
            </h2>
            <p className="text-charcoal/65 leading-relaxed">
              Subscribe to our YouTube channel for field updates, research launches, and event recordings.
            </p>
            <a
              href="https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-[#FF0000] text-white
                font-semibold text-sm rounded-lg hover:bg-[#CC0000] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {videos.map((video) => (
              <article
                key={video.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-charcoal/8 flex flex-col"
              >
                {/* Thumbnail / embed */}
                {video.youtubeId ? (
                  <div className="aspect-video bg-charcoal overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* Placeholder shown until real YouTube IDs are added */
                  <a
                    href="https://youtube.com/@asrepafrica"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-video block overflow-hidden group"
                    aria-label={`Watch ${video.title} on YouTube`}
                  >
                    {video.thumbnail && (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                      Watch on YouTube
                    </div>
                  </a>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${categoryColour[video.category] ?? "bg-charcoal/10 text-charcoal"}`}>
                      {video.category}
                    </span>
                    <span className="text-muted text-xs">{video.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-charcoal text-base leading-snug mb-2">
                    {video.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-3 flex-1">
                    {video.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
