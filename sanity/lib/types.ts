import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type Stat = { _key: string; value: string; label: string };

export type SiteSettings = {
  brandName: string;
  portrait?: SanityImage;
  portraitAlt?: string;
  availableForWork?: boolean;
  heroHeadline: string;
  heroSubheadline: string;
  stats?: Stat[];
  aboutTitle?: string;
  aboutBody?: PortableTextBlock[];
  beliefs?: string[];
  email: string;
  phone?: string;
  whatsappNumber?: string;
  location?: string;
  linkedinUrl?: string;
  xUrl?: string;
  instagramUrl?: string;
  calendlyUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  shareImage?: SanityImage;
};

export type SampleCategory =
  | "LinkedIn Post"
  | "Carousel"
  | "Ghostwriting"
  | "Social Caption";

export type WritingSample = {
  _id: string;
  title: string;
  slug: string;
  category: SampleCategory;
  coverImage?: SanityImage;
  /** Plain image link, used by the built-in sample content */
  coverUrl?: string;
  excerpt: string;
  body?: PortableTextBlock[];
  results?: string;
  featured?: boolean;
  order?: number;
};

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImage;
  coverUrl?: string;
  excerpt: string;
  tags?: string[];
  publishedAt: string;
  readTime?: number;
  /** Word count, used to estimate read time when none is set. */
  wordCount?: number;
};

export type BlogPost = BlogPostSummary & {
  body?: PortableTextBlock[];
};

export type Testimonial = {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  avatar?: SanityImage;
  order?: number;
};

export type Service = {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
};
