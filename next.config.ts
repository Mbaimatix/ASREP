import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 30 days on Vercel
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Limit concurrent image optimisations to avoid cold-start spikes
    dangerouslyAllowSVG: false,
  },

  // Allow Sanity Studio to be embedded at /studio
  transpilePackages: ["next-sanity"],

  // Strict mode for better React debugging
  reactStrictMode: true,

  // Add security + performance headers to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Enable browser-side caching for static assets served by Next.js
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Long-lived cache for all static assets (JS, CSS, images in /_next/)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache public images for 7 days
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
