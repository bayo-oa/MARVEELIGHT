import { defineField, defineType } from "sanity";

export const SAMPLE_CATEGORIES = [
  { title: "LinkedIn Post", value: "LinkedIn Post" },
  { title: "Carousel", value: "Carousel" },
  { title: "Ghostwriting", value: "Ghostwriting" },
  { title: "Social Caption", value: "Social Caption" },
];

export const writingSample = defineType({
  name: "writingSample",
  title: "Writing Sample",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: SAMPLE_CATEGORIES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "excerpt",
      title: "Short preview text",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "body",
      title: "Full sample",
      type: "blockContent",
    }),
    defineField({
      name: "results",
      title: "Results (optional)",
      description: "For example: 48K impressions, 410 reactions",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Show on the home page",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Order (lower numbers show first)",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
