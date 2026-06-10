import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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

  // Strict mode for better React debugging
  reactStrictMode: true,

  // 301 redirect www → non-www (canonical domain is asrepafrica.org)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.asrepafrica.org" }],
        destination: "https://asrepafrica.org/:path*",
        permanent: true,
      },
    ];
  },

  // Add security + performance headers to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            // HSTS — enforces HTTPS on repeat visits for 2 years
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // CSP — prevents XSS. unsafe-inline/eval required by Next.js/Framer.
            // Tighten with nonce-based policy post-launch.
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://lh3.googleusercontent.com https://img.youtube.com https://i.ytimg.com",
              "media-src 'self' https://www.youtube.com",
              "frame-src https://www.youtube.com https://youtube.com",
              "connect-src 'self' https://pay.pesapal.com https://cybqa.pesapal.com https://www.google-analytics.com https://analytics.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
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
