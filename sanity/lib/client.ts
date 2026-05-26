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

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  useCdn: process.env.NODE_ENV === "production",
  // Write token is only available server-side, never exposed to the client
  token: process.env.SANITY_API_WRITE_TOKEN,
});

/**
 * Read-only client for public content fetching — safe to use in Server Components.
 * Does not include the write token.
 */
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  useCdn: process.env.NODE_ENV === "production",
});
