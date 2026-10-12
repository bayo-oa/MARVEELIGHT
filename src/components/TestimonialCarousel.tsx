"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "../../sanity/lib/types";

const AUTO_MS = 6000;

const initials = (name: string) =>
  name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = items.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || reduce || count < 2) return;
    const timer = setInterval(() => go(index + 1, 1), AUTO_MS);
    return () => clearInterval(timer);
  }, [index, paused, reduce, count, go]);

  const t = items[index];
  if (!t) return null;

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="card relative overflow-hidden p-8 md:p-12">
        <Quote className="absolute right-6 top-6 h-10 w-10 text-primary/20" />
        <div aria-live="polite" className="min-h-[14rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={t._id}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(index + 1, 1);
                else if (info.offset.x > 60) go(index - 1, -1);
              }}
            >
              <blockquote className="font-heading text-xl leading-relaxed md:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-heading font-semibold text-accent">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  {t.role && <span className="text-sm text-muted">{t.role}</span>}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(index - 1, -1)}
            aria-label="Previous testimonial"
            className="rounded-full border border-border p-2 transition hover:border-primary hover:shadow-glow-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {items.map((item, i) => (
              <button
                key={item._id}
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-primary-glow" : "w-2 bg-border hover:bg-primary/60",
                )}
              />
            ))}
          </div>
          <button
            onClick={() => go(index + 1, 1)}
            aria-label="Next testimonial"
            className="rounded-full border border-border p-2 transition hover:border-primary hover:shadow-glow-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
