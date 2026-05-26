import { defineType, defineField } from "sanity";

export const teamMemberSchema = defineType({
  name: "teamMember",
  title: "Team Members & Board",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "title",
      title: "Position Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "boardRole",
      title: "Board / Staff Role",
      type: "string",
      options: {
        list: [
          { title: "Non-Executive Chairman", value: "chairman" },
          { title: "Board Director", value: "board" },
          { title: "Executive Director / CEO", value: "executive-director" },
          { title: "Senior Staff", value: "staff" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
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
      name: "shortBio",
      title: "Short Bio (for card — 2–3 sentences)",
      type: "text",
      rows: 3,
      validation: (R) => R.required().max(350),
    }),
    defineField({
      name: "fullBio",
      title: "Full Biography",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "credentials",
      title: "Academic Credentials",
      type: "string",
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn URL (optional)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order (lower = first)",
      type: "number",
      validation: (R) => R.required().integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "photo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
