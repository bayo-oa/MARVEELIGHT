"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, X } from "lucide-react";
import { CoverImage } from "@/components/CoverImage";
import { PortableBody } from "@/components/PortableBody";
import { cn } from "@/lib/utils";
import type { WritingSample } from "../../sanity/lib/types";

const ALL = "All";

export function SamplesGallery({ samples }: { samples: WritingSample[] }) {
  const [category, setCategory] = useState(ALL);
  const [active, setActive] = useState<WritingSample | null>(null);

  const categories = [ALL, ...Array.from(new Set(samples.map((s) => s.category)))];
  const shown = category === ALL ? samples : samples.filter((s) => s.category === category);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter samples">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              category === c
                ? "border-primary bg-primary text-white shadow-glow-sm"
                : "border-border text-muted hover:border-primary/60 hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => (
            <motion.button
              layout
              key={s._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setActive(s)}
              className="card card-hover group overflow-hidden text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
                <CoverImage
                  item={s}
                  w={800}
                  h={500}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs text-accent backdrop-blur">
                  {s.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{s.excerpt}</p>
                <span className="mt-4 inline-block text-sm text-primary-glow">Read sample</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={active.title}>
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              className="card relative max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 shadow-glow md:p-8"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
            >
              <button
                autoFocus
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full border border-border p-2 hover:border-primary"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="text-xs uppercase tracking-wider text-accent">{active.category}</span>
              <h3 className="mb-2 mt-2 pr-10 font-heading text-2xl font-bold">{active.title}</h3>
              {active.results && (
                <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-sm text-accent">
                  <TrendingUp className="h-4 w-4" /> {active.results}
                </p>
              )}
              <PortableBody value={active.body} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
