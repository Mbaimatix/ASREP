import { createClient } from "next-sanity";

/**
 * Returns a valid Sanity projectId.
 * Falls back to "no-project" when the env var is unset or contains the
 * placeholder text (which has uppercase/special characters that Sanity rejects).
 */
function getProjectId(): string {
  const raw = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  // Sanity requires a-z, 0-9, and hyphens only
  return /^[a-z0-9][a-z0-9-]*$/.test(raw) ? raw : "no-project";
}

const projectId = getProjectId();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const baseConfig = {
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

// Vuln 8 — removed write token from the shared client.
// sanityClient is now a read-only alias kept for backwards-compatibility.
export const sanityClient = createClient(baseConfig);

/**
 * Read-only client for public content fetching — safe to use in Server Components.
 */
export const readClient = createClient(baseConfig);

/**
 * SERVER ONLY — never import this in Client Components.
 * Returns a Sanity client with the write token attached.
 * Use only in API routes and Server Actions that need to mutate CMS content.
 */
export function getWriteClient() {
  return createClient({
    ...baseConfig,
    useCdn: false, // writes must bypass the CDN
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
}
