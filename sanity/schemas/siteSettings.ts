import { defineType, defineField, type Rule } from "sanity";

/**
 * Singleton document — stores home page dynamic content:
 * hero slides, impact numbers, pull quote, featured stories, partner logos.
 *
 * In the Studio, this appears once. Editors update it to change the homepage.
 */
export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "⚙️ Site Settings (Home Page)",
  type: "document",
  fields: [
    // ─── Hero Slides ─────────────────────────────────────────────────────────
    defineField({
      name: "heroSlides",
      title: "Hero Slides (4–5 recommended)",
      description: "Images for the full-viewport hero slider. Min 1920×1080px.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Slide Image (1920×1080px minimum)",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  title: "Alt Text (required — describe the scene)",
                  type: "string",
                  validation: (R: Rule) => R.required(),
                },
              ],
            }),
          ],
          preview: {
            select: { media: "image", alt: "image.alt" },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prepare(value: Record<string, any>) {
              return { title: (value.alt as string) ?? "Hero slide", media: value.media };
            },
          },
        },
      ],
      validation: (R) => R.min(1).max(6),
    }),

    // ─── Impact Numbers Bar ───────────────────────────────────────────────────
    defineField({
      name: "impactNumbers",
      title: "Impact Numbers Bar (5 stats)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Number / Value", type: "string" }),
            defineField({ name: "label", title: "Label (short)", type: "string" }),
            defineField({ name: "sublabel", title: "Sub-label (optional detail)", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
      validation: (R) => R.min(3).max(7),
    }),

    // ─── Pull Quote ───────────────────────────────────────────────────────────
    defineField({
      name: "pullQuote",
      title: "Home Page Pull Quote",
      type: "object",
      fields: [
        defineField({
          name: "quote",
          title: "Quote Text",
          type: "text",
          rows: 4,
          validation: (R) => R.required(),
        }),
        defineField({
          name: "attribution",
          title: "Attribution (source / speaker)",
          type: "string",
          validation: (R) => R.required(),
        }),
      ],
    }),

    // ─── Partner Logos ────────────────────────────────────────────────────────
    defineField({
      name: "partnerLogos",
      title: "Partner & Collaborator Logos",
      description: "Logos display in greyscale; transition to colour on hover.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "logo",
              title: "Logo Image",
              type: "image",
              fields: [
                {
                  name: "alt",
                  title: "Organisation Name (used as alt text)",
                  type: "string",
                  validation: (R: Rule) => R.required(),
                },
              ],
            }),
            defineField({ name: "name", title: "Organisation Name", type: "string" }),
            defineField({ name: "url", title: "Website URL (optional)", type: "url" }),
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        },
      ],
    }),

    // ─── History Timeline ─────────────────────────────────────────────────────
    defineField({
      name: "historyMilestones",
      title: "History Timeline Milestones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "date", title: "Date / Period (e.g. 'June 2023')", type: "string" }),
            defineField({ name: "title", title: "Milestone Title", type: "string" }),
            defineField({ name: "description", title: "Brief Description", type: "text", rows: 2 }),
            defineField({
              name: "image",
              title: "Photo (optional)",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "date" },
          },
        },
      ],
    }),

    // ─── Social Links ─────────────────────────────────────────────────────────
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url",
      initialValue: "https://www.linkedin.com/company/asal-research-resilience-programme-asrep-africa/",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      initialValue: "https://www.facebook.com/share/1Cpm3uk3uY/",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      initialValue: "https://youtube.com/@asrepafrica?si=beAToszi5RgoeRNX",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
