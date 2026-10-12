"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { PostCard } from "@/components/PostCard";
import { cn } from "@/lib/utils";
import type { BlogPostSummary } from "../../sanity/lib/types";

export function BlogList({ posts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort(),
    [posts],
  );

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag && !p.tags?.includes(tag)) return false;
      if (!needle) return true;
      return [p.title, p.excerpt, ...(p.tags ?? [])].join(" ").toLowerCase().includes(needle);
    });
  }, [posts, query, tag]);

  const filtering = query.trim() !== "" || tag !== null;

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts by title, topic or tag"
            aria-label="Search posts"
            className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-11 text-sm outline-none transition placeholder:text-muted focus:border-primary focus:shadow-glow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Filter by tag">
            {[null, ...tags].map((t) => (
              <button
                key={t ?? "all"}
                onClick={() => setTag(t)}
                aria-pressed={tag === t}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition",
                  tag === t
                    ? "border-primary bg-primary text-white shadow-glow-sm"
                    : "border-border text-muted hover:border-primary/60 hover:text-foreground",
                )}
              >
                {t ?? "All"}
              </button>
            ))}
          </div>
        )}

        <p className="text-sm text-muted" aria-live="polite">
          {filtering
            ? `${shown.length} ${shown.length === 1 ? "post" : "posts"} found`
            : `${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
        </p>
      </div>

      {shown.length ? (
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                layout
                key={p._id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
              >
                <PostCard post={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="card p-10 text-center">
          <p className="font-heading text-lg font-semibold">No posts match that search</p>
          <p className="mt-2 text-sm text-muted">Try a different word, or clear the filters.</p>
          <button
            onClick={() => {
              setQuery("");
              setTag(null);
            }}
            className="btn-ghost mt-6"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
