import { defineField, defineType } from "sanity";

export const SERVICE_ICONS = [
  "PenTool",
  "Compass",
  "GalleryHorizontal",
  "MessageSquare",
  "Sparkles",
  "Megaphone",
  "Target",
  "Lightbulb",
];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: SERVICE_ICONS.map((name) => ({ title: name, value: name })),
      },
      initialValue: "PenTool",
    }),
    defineField({
      name: "order",
      title: "Order (lower numbers show first)",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
