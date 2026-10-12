import type { QueryParams } from "next-sanity";
import {
  fallbackPosts, fallbackSamples, fallbackServices, fallbackSettings, fallbackTestimonials,
} from "../../src/lib/fallback-content";
import { client } from "./client";
import { hasSanityConfig } from "../env";
import {
  latestPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  samplesQuery,
  servicesQuery,
  settingsQuery,
  testimonialsQuery,
} from "./queries";
import type {
  BlogPost,
  BlogPostSummary,
  Service,
  SiteSettings,
  Testimonial,
  WritingSample,
} from "./types";

/** Seconds before a cached page is allowed to refresh on its own. */
const REVALIDATE_SECONDS = 60;

type FetchArgs = {
  query: string;
  params?: QueryParams;
  tags: string[];
};

/**
 * Safe wrapper around client.fetch. If Sanity is not configured yet or the
 * request fails, it returns null so the site can fall back to defaults
 * instead of crashing.
 */
async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: FetchArgs): Promise<T | null> {
  if (!hasSanityConfig) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags },
    });
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export async function getSettings() {
  return (
    (await sanityFetch<SiteSettings>({ query: settingsQuery, tags: ["settings"] })) ??
    fallbackSettings
  );
}

export async function getSamples() {
  return (
    (await sanityFetch<WritingSample[]>({
      query: samplesQuery,
      tags: ["samples"],
    })) ?? fallbackSamples
  );
}

export async function getPosts() {
  return (
    (await sanityFetch<BlogPostSummary[]>({
      query: postsQuery,
      tags: ["posts"],
    })) ?? fallbackPosts
  );
}

export async function getLatestPosts() {
  return (
    (await sanityFetch<BlogPostSummary[]>({
      query: latestPostsQuery,
      tags: ["posts"],
    })) ?? fallbackPosts.slice(0, 3)
  );
}

export async function getPostBySlug(slug: string) {
  const post = await sanityFetch<BlogPost>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["posts", `post:${slug}`],
  });
  return post ?? fallbackPosts.find((p) => p.slug === slug) ?? null;
}

export async function getPostSlugs() {
  return (
    (await sanityFetch<string[]>({
      query: postSlugsQuery,
      tags: ["posts"],
    })) ?? fallbackPosts.map((p) => p.slug)
  );
}

export async function getTestimonials() {
  return (
    (await sanityFetch<Testimonial[]>({
      query: testimonialsQuery,
      tags: ["testimonials"],
    })) ?? fallbackTestimonials
  );
}

export async function getServices() {
  return (
    (await sanityFetch<Service[]>({
      query: servicesQuery,
      tags: ["services"],
    })) ?? fallbackServices
  );
}
