import type { BlogPostSummary } from "../../sanity/lib/types";

/** Estimated minutes to read, using the editor's value when it is set. */
export function getReadTime(post: Pick<BlogPostSummary, "readTime" | "wordCount">) {
  if (post.readTime) return post.readTime;
  return Math.max(1, Math.round((post.wordCount ?? 0) / 200));
}
