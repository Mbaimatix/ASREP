import { defineType, defineField, type Rule } from "sanity";

export const newsSchema = defineType({
  name: "news",
  title: "News & Media Articles",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
      type: "string",
      validation: (R) => R.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text (accessibility — describe the image)",
          type: "string",
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Announcements", value: "announcements" },
          { title: "Climate & Environment", value: "climate-environment" },
          { title: "Peacebuilding", value: "peacebuilding" },
          { title: "Research", value: "research" },
          { title: "Partnerships", value: "partnerships" },
          { title: "Media Coverage", value: "media-coverage" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (2–3 sentence summary for cards)",
      type: "text",
      rows: 3,
      validation: (R) => R.max(300),
    }),
    defineField({
      name: "content",
      title: "Article Body",
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
      name: "author",
      title: "Author Name",
      type: "string",
      initialValue: "ASREP Communications Team",
    }),
    defineField({
      name: "authorRole",
      title: "Author Role / Organisation",
      type: "string",
      initialValue: "ASAL Research and Resilience Programme",
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
          { title: "🔍 Awaiting Editor Review", value: "pendingReview" },
          { title: "🌐 Published (Live)", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description (120–155 characters)",
      type: "string",
      validation: (R) => R.min(120).max(155),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      status: "publicationStatus",
    },
    prepare({ title, media, status }) {
      const statusIcon =
        status === "published" ? "🌐" : status === "pendingReview" ? "🔍" : "📝";
      return { title: `${statusIcon} ${title}`, media };
    },
  },
  orderings: [
    {
      title: "Publication Date (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
