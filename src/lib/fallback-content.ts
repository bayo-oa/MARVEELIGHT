import type { PortableTextBlock } from "@portabletext/types";
import {
  IMG, posts, samples, services, starterSettings, testimonials, toBlocks, unsplash,
} from "../../sanity/starter-content";
import type {
  BlogPost, Service, SampleCategory, SiteSettings, Testimonial, WritingSample,
} from "../../sanity/lib/types";

/**
 * Built-in sample content. The website shows it only while Sanity is not
 * connected (or cannot be reached), so the site never looks empty.
 */

const blocks = (lines: string[]) => toBlocks(lines) as unknown as PortableTextBlock[];

const cover = (imageId: string) => unsplash(imageId, 1400);

export const fallbackSettings: SiteSettings = {
  brandName: "Maveelight",
  availableForWork: true,
  portraitAlt: starterSettings.portraitAlt,
  heroHeadline: starterSettings.heroHeadline,
  heroSubheadline: starterSettings.heroSubheadline,
  stats: starterSettings.stats.map((s, i) => ({ _key: `stat-${i}`, ...s })),
  aboutTitle: starterSettings.aboutTitle,
  aboutBody: blocks(starterSettings.aboutLines),
  beliefs: starterSettings.beliefs,
  email: starterSettings.email,
  phone: starterSettings.phone,
  whatsappNumber: starterSettings.whatsappNumber,
  location: starterSettings.location,
  linkedinUrl: starterSettings.linkedinUrl,
  xUrl: starterSettings.xUrl,
  instagramUrl: starterSettings.instagramUrl,
  seoTitle: starterSettings.seoTitle,
  seoDescription: starterSettings.seoDescription,
};

export const fallbackServices: Service[] = services.map((s, i) => ({
  _id: `service-${i + 1}`,
  order: i + 1,
  ...s,
}));

export const fallbackTestimonials: Testimonial[] = testimonials.map((t, i) => ({
  _id: `testimonial-${i + 1}`,
  order: i + 1,
  ...t,
}));

export const fallbackSamples: WritingSample[] = samples.map((s, i) => ({
  _id: s.id,
  title: s.title,
  slug: s.id.replace("sample-", ""),
  category: s.category as SampleCategory,
  coverUrl: cover(s.image),
  excerpt: s.excerpt,
  body: blocks(s.body),
  results: s.results,
  featured: true,
  order: i + 1,
}));

export const fallbackPosts: BlogPost[] = posts.map((p) => ({
  _id: p.id,
  title: p.title,
  slug: p.id.replace("post-", ""),
  coverUrl: cover(p.image),
  excerpt: p.excerpt,
  tags: p.tags,
  publishedAt: new Date(Date.now() - p.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
  body: blocks(p.body),
  wordCount: p.body.join(" ").split(/\s+/).length,
}));

// Keeps the IMG import meaningful for type checking of image ids
export type StarterImageName = keyof typeof IMG;
