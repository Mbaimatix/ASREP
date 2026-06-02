// sanity/lib/client.ts
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "4cfxiux0";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production";
const apiVersion = "2026-01-01";

/** Read-only client — safe for Server Components and static pages */
export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});

/** Preview client — shows draft content in preview mode */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * SERVER ONLY — never import in Client Components.
 * Use in API routes / Server Actions that mutate CMS content.
 */
export function getWriteClient() {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });
}

// Backwards-compat alias
export const sanityClient = readClient;
