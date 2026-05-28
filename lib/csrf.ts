import type { NextRequest } from "next/server";

/**
 * Returns true if the request Origin is allowed.
 * - Requests with no Origin header (server-to-server) are allowed through.
 * - In development, localhost origins are always allowed.
 * - In production, the Origin must exactly match NEXT_PUBLIC_SITE_URL.
 */
export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // no Origin — not a browser cross-origin request

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (process.env.NODE_ENV === "development" && origin.startsWith("http://localhost")) {
    return true;
  }
  return origin === siteUrl;
}
