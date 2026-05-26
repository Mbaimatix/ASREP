import { defineType, defineField, type Rule } from "sanity";

export const gallerySchema = defineType({
  name: "gallery",
  title: "Photo & Video Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Gallery Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Gallery Category",
      type: "string",
      options: {
        list: [
          { title: "Waso Eco-Champs", value: "waso-eco-champs" },
          { title: "Peacebuilding", value: "peacebuilding" },
          { title: "Research & Events", value: "research-events" },
          { title: "Civic Governance", value: "civic-governance" },
          { title: "Community & Culture", value: "community-culture" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text (describe the scene, people, location)",
              type: "string",
              validation: (R: Rule) => R.required(),
            },
            { name: "caption", title: "Caption (optional)", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "videos",
      title: "YouTube Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "youtubeUrl",
              title: "YouTube URL",
              type: "url",
              validation: (R) => R.required(),
            }),
            defineField({ name: "title", title: "Video Title", type: "string" }),
            defineField({
              name: "thumbnail",
              title: "Thumbnail (optional — uses YouTube default if empty)",
              type: "image",
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
