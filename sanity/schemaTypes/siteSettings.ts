import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One single document that controls her photo, headline, about section
 * and contact details. Everything on the site reads from here.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "photo", title: "Photo" },
    { name: "home", title: "Home page" },
    { name: "about", title: "About" },
    { name: "contact", title: "Contact info" },
    { name: "seo", title: "Search and sharing" },
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      initialValue: "Maveelight",
      group: "photo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Your photo",
      description:
        "Upload a new photo here and click Publish. It changes everywhere on the website automatically (home page, about section, blog author box and share image). A portrait with some space around the head works best.",
      type: "image",
      options: { hotspot: true },
      group: "photo",
    }),
    defineField({
      name: "portraitAlt",
      title: "Photo description",
      description: "A short description for screen readers and search engines.",
      type: "string",
      initialValue: "Portrait of Maveelight, content writer",
      group: "photo",
    }),
    defineField({
      name: "availableForWork",
      title: "Show the 'Available for new projects' badge",
      type: "boolean",
      initialValue: true,
      group: "home",
    }),
    defineField({
      name: "heroHeadline",
      title: "Main headline",
      type: "string",
      group: "home",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "heroSubheadline",
      title: "Text under the headline",
      type: "text",
      rows: 3,
      group: "home",
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "stats",
      title: "Numbers (for example 120+ posts written)",
      type: "array",
      group: "home",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Number", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "aboutTitle",
      title: "About heading",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "About text",
      type: "blockContent",
      group: "about",
    }),
    defineField({
      name: "beliefs",
      title: "What she believes about content",
      description: "Short statements, one per line.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      group: "about",
    }),
    defineField({
      name: "email",
      title: "Email",
      description: "Shown on the site. The Email button opens a new message to this address.",
      type: "string",
      group: "contact",
      validation: (rule) => rule.required().email(),
    }),
    defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      description:
        "Include the country code, for example +234 800 000 0000. The WhatsApp button opens a chat with this number.",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          const digits = value.replace(/\D/g, "");
          return digits.length >= 8 && digits.length <= 15
            ? true
            : "Enter a full number with country code";
        }),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn link",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "xUrl",
      title: "X (Twitter) link",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram link",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "calendlyUrl",
      title: "Booking link (optional)",
      description: "A Calendly or similar link for booking a call.",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "seoTitle",
      title: "Page title for Google",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Description for Google",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "shareImage",
      title: "Image for social sharing (optional)",
      description: "If empty, her photo is used.",
      type: "image",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
