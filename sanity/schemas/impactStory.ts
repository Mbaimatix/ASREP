import { defineType, defineField, type Rule } from "sanity";

export const impactStorySchema = defineType({
  name: "impactStory",
  title: "Impact Stories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Story Title (compelling, human-centred)",
      type: "string",
      validation: (R) => R.required().min(10).max(100),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero / Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text (descriptive — required)",
          type: "string",
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: "programme",
      title: "Programme Area",
      type: "string",
      options: {
        list: [
          { title: "Climate Resilience & NbS", value: "climate-resilience" },
          { title: "Peacebuilding & Social Cohesion", value: "peacebuilding" },
          { title: "Research & Knowledge", value: "research" },
          { title: "Civic Governance & Youth", value: "civic-governance" },
          { title: "Biodiversity Restoration", value: "biodiversity" },
          { title: "Livelihoods & Economic Empowerment", value: "livelihoods" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (for cards — 2–3 sentences)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote (from a community member)",
      type: "object",
      fields: [
        defineField({ name: "quote", title: "Quote Text", type: "text", rows: 3 }),
        defineField({ name: "attribution", title: "Person's Name & Location", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Story Body (400–800 words)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (R: Rule) => R.required(),
            },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "publicationStatus",
      title: "Publication Status",
      type: "string",
      options: {
        list: [
          { title: "📝 Draft", value: "draft" },
          { title: "🔍 Awaiting Review", value: "pendingReview" },
          { title: "🌐 Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
  ],
  preview: {
    select: { title: "title", media: "heroImage", programme: "programme" },
    prepare({ title, media, programme }) {
      return { title, subtitle: programme, media };
    },
  },
});
