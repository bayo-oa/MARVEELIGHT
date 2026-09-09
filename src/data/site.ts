// Central content source. Shaped so that Phase 2 (Python/FastAPI admin
// portal) can replace these static arrays with API fetches without any
// component changes — keep this file as the single import point for
// page content.

export type Service = {
  slug: string;
  name: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "linkedin-content-writing",
    name: "LinkedIn Content Writing",
    description:
      "Strategic, personality-driven LinkedIn content based on your expertise, voice, audience, and goals.",
  },
  {
    slug: "personal-brand-content-strategy",
    name: "Personal Brand Content Strategy",
    description:
      "Positioning, messaging, content pillars, audience direction, and strategic content planning.",
  },
  {
    slug: "writing-coaching",
    name: "Writing Coaching",
    description:
      "Practical coaching that helps professionals communicate their expertise more clearly and confidently.",
  },
];

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  speculative: boolean;
  challenge: string;
  approach: string;
  outcome: string;
};

export const portfolio: PortfolioProject[] = [
  {
    slug: "consultant-authority-series",
    title: "Turning a decade of client work into a content system",
    category: "Personal-Brand Content",
    speculative: true,
    challenge:
      "An independent consultant had deep expertise but a LinkedIn presence that read like a resume, not a point of view.",
    approach:
      "Extracted recurring client problems into a set of content pillars, then built a repeatable weekly writing structure around them.",
    outcome:
      "A clear, consistent voice and a backlog of content pillars the client can write from for months.",
  },
  {
    slug: "founder-storytelling-sample",
    title: "From founder notes to a storytelling voice",
    category: "Storytelling / Before & After",
    speculative: true,
    challenge:
      "A founder's posts were accurate but flat, expertise without personality or narrative shape.",
    approach:
      "Rebuilt three posts from the same raw notes, layering in narrative structure, stakes, and a distinct point of view.",
    outcome:
      "A before/after pair that shows the same idea, once generic and once genuinely illuminated.",
  },
  {
    slug: "coach-content-pillars",
    title: "Content pillars for a first-time content creator",
    category: "Content Strategy",
    speculative: true,
    challenge:
      "A coach wanted to post consistently but had no system, every week started from a blank page.",
    approach:
      "Mapped their expertise into four content pillars and a simple monthly planning rhythm.",
    outcome:
      "A strategy document the client still uses to plan every month's content.",
  },
];

export type InsightPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
};

export const insights: InsightPost[] = [
  {
    slug: "why-expertise-alone-isnt-enough",
    title: "Why expertise alone isn't enough on LinkedIn",
    category: "Personal Branding",
    excerpt:
      "Being good at what you do and being seen as good at what you do are two different skills. Here's the gap between them.",
    date: "2026-01-12",
  },
  {
    slug: "the-extract-clarify-illuminate-method",
    title: "Inside the Extract, Clarify, Illuminate method",
    category: "Content Strategy",
    excerpt:
      "A closer look at the three-step process behind every piece of content MARVEELIGHT writes.",
    date: "2026-02-03",
  },
  {
    slug: "content-pillars-that-actually-hold-up",
    title: "Content pillars that actually hold up after month one",
    category: "Content Writing",
    excerpt:
      "Most content pillar exercises fall apart in three weeks. Here's what makes some survive a full year.",
    date: "2026-02-20",
  },
];
