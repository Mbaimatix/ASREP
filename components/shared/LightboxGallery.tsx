"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
};

export default function LightboxGallery({ images, columns = 3 }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;

  const prev = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length]);

  const next = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % images.length);
  }, [activeIndex, images.length]);

  const close = () => setActiveIndex(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, prev, next]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <>
      {/* ── Thumbnail grid ──────────────────────────────────────────────── */}
      <div className={`grid ${colClass} gap-3`} role="list" aria-label="Photo gallery">
        {images.map((img, i) => (
          <button
            key={i}
            role="listitem"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-sand/40
              focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
            aria-label={`Open full size: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-colors
              flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox overlay ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Image ${activeIndex + 1} of ${images.length}: ${images[activeIndex].alt}`}
          >
            {/* Image container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full mx-4 aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Caption */}
            {images[activeIndex].caption && (
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4 py-2
                  bg-black/60 rounded-lg max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-white/80 text-sm">{images[activeIndex].caption}</p>
                <p className="text-white/40 text-xs mt-0.5">
                  {activeIndex + 1} / {images.length}
                </p>
              </div>
            )}

            {/* Close */}
            <button
              onClick={close}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                flex items-center justify-center text-white transition-colors"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
