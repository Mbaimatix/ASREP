"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Eco-champions planting indigenous trees in the ASAL landscape, Isiolo County",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Community peace dialogue under an acacia tree in Northern Kenya",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Women and youth leaders participating in civic governance training",
  },
  {
    src: "/images/hero/hero-4.jpg",
    alt: "Researchers documenting indigenous knowledge with community elders",
  },
  {
    src: "/images/hero/hero-5.jpg",
    alt: "Panoramic view of the Waso Nyiro river valley at dawn, Isiolo",
  },
];

const SLIDE_INTERVAL = 6000; // 6 seconds per slide

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevSlide(current);
      setCurrent((c) => (c + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index: number) => {
    if (index === current) return;
    setPrevSlide(current);
    setCurrent(index);
  };

  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[950px] w-full overflow-hidden"
      aria-label="ASREP Africa hero — advancing resilience, restoring nature, sustaining peace"
    >
      {/* ── Slides ──────────────────────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          {/* Ken Burns zoom */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: SLIDE_INTERVAL / 1000 + 1.2, ease: "linear" }}
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Dark gradient overlay ────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.12) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Text block — lower left ──────────────────────────────────────── */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="container-asrep pb-20 md:pb-24 lg:pb-28 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              ASAL Research &amp; Resilience Programme · Kenya
            </p>

            {/* H1 */}
            <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
              Advancing Resilience.{" "}
              <br className="hidden sm:block" />
              Restoring Nature.{" "}
              <br className="hidden sm:block" />
              <span className="text-gold">Sustaining Peace.</span>
            </h1>

            {/* Subline */}
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Building resilient communities across Kenya&apos;s arid and semi-arid lands —
              through evidence, culture, and community-led action.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-forest font-semibold
                  text-sm rounded-lg hover:bg-cream transition-all duration-200 hover:shadow-lg
                  hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Explore Our Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/get-involved/donate"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-cta hover:bg-cta-hover text-white
                  font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-lg
                  hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-cta focus-visible:outline-none"
              >
                Donate Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Slide indicators ────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Hero image navigation"
      >
        {slides.map((slide, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${slide.alt}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-400 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none
              ${i === current ? "w-8 bg-gold" : "w-3 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
