import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Check, Compass, GalleryHorizontal, Lightbulb, Linkedin, Mail,
  Megaphone, MessageCircle, MessageSquare, PenTool, Sparkles, Target,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { PortableBody } from "@/components/PortableBody";
import { portraitUrl } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { buildContactLinks } from "@/lib/contact-links";
import type { BlogPostSummary, Service, SiteSettings, Testimonial } from "../../sanity/lib/types";

const ICONS: Record<string, LucideIcon> = {
  PenTool, Compass, GalleryHorizontal, MessageSquare, Sparkles, Megaphone, Target, Lightbulb,
};

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-widest text-primary-glow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-muted">{children}</p>}
    </Reveal>
  );
}

export function About({ settings }: { settings: SiteSettings | null }) {
  return (
    <section id="about" className="section">
      <div className="container grid items-center gap-12 md:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border">
            <Image src={portraitUrl(settings, 700, 875)} alt={settings?.portraitAlt ?? "Portrait"} fill sizes="(max-width: 768px) 80vw, 384px" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm font-medium uppercase tracking-widest text-primary-glow">About</p>
          <h2 className="mb-6 mt-3 text-3xl font-bold md:text-4xl">{settings?.aboutTitle ?? "Quiet ideas deserve loud content"}</h2>
          <PortableBody value={settings?.aboutBody} />
          {!!settings?.beliefs?.length && (
            <ul className="mt-6 space-y-3">
              {settings.beliefs.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary-glow" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function Services({ services }: { services: Service[] }) {
  if (!services.length) return null;
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeading eyebrow="Services" title="How I can help you grow" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon ?? "PenTool"] ?? PenTool;
            return (
              <Reveal key={s._id} delay={i * 0.08}>
                <div className="card card-hover h-full p-6">
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.description}</p>
                  <Link href="/#contact" className="mt-5 inline-flex items-center gap-1 text-sm text-primary-glow hover:gap-2 transition-all">
                    Get started <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Kind words" title="What clients say" />
        <Reveal><TestimonialCarousel items={items} /></Reveal>
      </div>
    </section>
  );
}

export function LatestPosts({ posts }: { posts: BlogPostSummary[] }) {
  if (!posts.length) return null;
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Blog" title="Latest writing" />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p._id} delay={i * 0.1}><PostCard post={p} /></Reveal>
          ))}
        </div>
        <Link href="/blog" className="btn-ghost mt-10">Read the blog</Link>
      </div>
    </section>
  );
}

const CONTACT_ICONS = { email: Mail, whatsapp: MessageCircle, linkedin: Linkedin } as const;

export function Contact({ settings }: { settings: SiteSettings | null }) {
  const links = buildContactLinks(settings);
  const details = [settings?.phone, settings?.location].filter(Boolean).join("  ·  ");
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <div className="card relative overflow-hidden p-8 text-center shadow-glow md:p-16">
            <div className="glow-orb -top-32 left-1/2 h-80 w-80 -translate-x-1/2" />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-bold md:text-5xl">
              Ready to make your content <span className="gradient-text">work harder?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-muted">Pick the way that suits you best and tell me what you have in mind.</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              {links.map((l, i) => {
                const Icon = CONTACT_ICONS[l.type];
                return (
                  <a key={l.type} href={l.href} target={l.external ? "_blank" : undefined} rel="noopener noreferrer" className={i === 0 ? "btn-primary" : "btn-ghost"}>
                    <Icon className="h-4 w-4" /> {l.label}
                  </a>
                );
              })}
            </div>
            {details && <p className="relative mt-8 text-sm text-muted">{details}</p>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
