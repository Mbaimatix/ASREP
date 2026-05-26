import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { newsSchema } from "./schemas/news";
import { teamMemberSchema } from "./schemas/teamMember";
import { impactStorySchema } from "./schemas/impactStory";
import { publicationSchema } from "./schemas/publication";
import { gallerySchema } from "./schemas/gallery";
import { siteSettingsSchema } from "./schemas/siteSettings";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "ASREP Africa CMS",
  schema: {
    types: [
      // Singleton — always first in structure
      siteSettingsSchema,
      // Content types
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
            // Singleton: Site Settings
            S.listItem()
              .title("⚙️ Site Settings (Home Page)")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            // Standard document lists
            S.documentTypeListItem("news").title("📰 News & Media"),
            S.documentTypeListItem("impactStory").title("🌍 Impact Stories"),
            S.documentTypeListItem("teamMember").title("👥 Team & Board"),
            S.documentTypeListItem("publication").title("📄 Publications & Reports"),
            S.documentTypeListItem("gallery").title("🖼️ Photo & Video Gallery"),
          ]),
    }),
    // GROQ query tester — only visible in development
    ...(process.env.NODE_ENV === "development" ? [visionTool()] : []),
  ],
});
