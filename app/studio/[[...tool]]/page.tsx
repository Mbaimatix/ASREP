"use client";

/**
 * Sanity Studio — embedded at /studio
 *
 * Access is protected by NextAuth middleware (see middleware.ts).
 * Only authenticated users with role EDITOR or SUPER_ADMIN can reach this route.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
