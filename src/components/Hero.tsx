import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { urlFor } from "../../sanity/lib/image";
import type { SiteSettings } from "../../sanity/lib/types";

export const FALLBACK_PORTRAIT =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";

export function portraitUrl(settings: SiteSettings | null, w = 800, h = 1000) {
  return settings?.portrait?.asset
    ? urlFor(settings.portrait).width(w).height(h).fit("crop").url()
    : FALLBACK_PORTRAIT;
}

export function Hero({ settings }: { settings: SiteSettings | null }) {
  const headline = settings?.heroHeadline ?? "Content that makes people stop scrolling and start reaching out.";
  const sub =
    settings?.heroSubheadline ??
    "I help founders and professionals turn their ideas into LinkedIn and social posts that build trust and attract clients.";

  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="glow-orb -left-40 -top-32 h-[34rem] w-[34rem]" />
      <div className="glow-orb -bottom-40 right-0 h-[28rem] w-[28rem]" />

      <div className="container relative grid items-center gap-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          {settings?.availableForWork !== false && (
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-accent">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                Available for new projects
              </span>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] md:text-6xl">{headline}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted">{sub}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-primary">
                Hire me <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#work" className="btn-ghost">See my work</Link>
            </div>
          </Reveal>
          {!!settings?.stats?.length && (
            <Reveal delay={0.4}>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {settings.stats.map((s) => (
                  <div key={s._key}>
                    <dt className="gradient-text font-heading text-3xl font-bold">{s.value}</dt>
                    <dd className="text-sm text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.2} className="mx-auto w-full max-w-sm">
          <div className="relative animate-float">
            <div className="absolute -inset-1.5 animate-spin-slow rounded-[2rem] bg-[conic-gradient(from_0deg,#8B5CF6,#0A0612,#A855F7,#C4B5FD,#8B5CF6)] opacity-80 blur-sm" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-surface">
              <Image
                src={portraitUrl(settings)}
                alt={settings?.portraitAlt ?? "Portrait"}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 384px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
