import { defineType, defineField } from "sanity";

export const publicationSchema = defineType({
  name: "publication",
  title: "Publications & Resources",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Publication Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (R) => R.required().integer().min(2023).max(2050),
    }),
    defineField({
      name: "publicationType",
      title: "Publication Type",
      type: "string",
      options: {
        list: [
          { title: "Annual / Impact Report", value: "annual-report" },
          { title: "Research Paper", value: "research" },
          { title: "Policy Brief", value: "policy-brief" },
          { title: "Knowledge Series", value: "knowledge-series" },
          { title: "Webinar Summary", value: "webinar-summary" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (R) => R.required(),
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Brief Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File Upload",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "externalUrl",
      title: "External URL (if hosted elsewhere)",
      type: "url",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Forthcoming", value: "forthcoming" },
          { title: "Request Only", value: "request-only" },
        ],
      },
      initialValue: "available",
    }),
    defineField({
      name: "isFeatured",
      title: "Feature on Impact page?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "title", year: "year", media: "coverImage", type: "publicationType" },
    prepare({ title, year, media, type }) {
      return { title: `${year} — ${title}`, subtitle: type, media };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
