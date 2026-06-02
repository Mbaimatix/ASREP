// sanity/sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { newsSchema }         from "./schemas/news";
import { teamMemberSchema }   from "./schemas/teamMember";
import { impactStorySchema }  from "./schemas/impactStory";
import { publicationSchema }  from "./schemas/publication";
import { gallerySchema }      from "./schemas/gallery";
import { siteSettingsSchema } from "./schemas/siteSettings";

export default defineConfig({
  basePath: "/studio",

  // Hardcoded so Studio works both locally and on Vercel without env-var issues
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "4cfxiux0",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production",

  title: "ASREP Africa — Content Studio",

  schema: {
    types: [
      siteSettingsSchema,
      newsSchema,
      impactStorySchema,
      teamMemberSchema,
      publicationSchema,
      gallerySchema,
    ],
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("ASREP Content")
          .items([
            // Singleton: the one-and-only Site Settings document
            S.listItem()
              .title("⚙️  Home Page / Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("news")        .title("📰  News & Media"),
            S.documentTypeListItem("impactStory") .title("🌍  Impact Stories"),
            S.documentTypeListItem("teamMember")  .title("👥  Team & Board"),
            S.documentTypeListItem("publication") .title("📄  Publications & Reports"),
            S.documentTypeListItem("gallery")     .title("🖼️  Photo & Video Gallery"),
          ]),
    }),
    // GROQ playground — dev only
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
});
