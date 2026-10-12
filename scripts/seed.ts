/**
 * Fills the Sanity dataset with starter content so the site looks complete.
 * Safe to run more than once: documents use fixed ids and are replaced.
 *
 * Run with: npm run seed
 * Or only some parts: npm run seed -- testimonials posts
 * Parts: settings, services, testimonials, samples, posts
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local
 */
import { config } from "dotenv";
import { createClient } from "@sanity/client";
import {
  IMG, key, posts, samples, services, starterSettings, testimonials, toBlocks, unsplash,
} from "../sanity/starter-content";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const requested = process.argv.slice(2);
const want = (part: string) => requested.length === 0 || requested.includes(part);

const KNOWN = ["settings", "services", "testimonials", "samples", "posts"];
const unknown = requested.filter((r) => !KNOWN.includes(r));
if (unknown.length) {
  console.error(`Unknown part: ${unknown.join(", ")}. Use: ${KNOWN.join(", ")}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const slug = (current: string) => ({ _type: "slug", current });

/** Downloads an image and uploads it to Sanity. Returns null if anything fails. */
async function uploadImage(url: string, filename: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, { filename });
    return {
      _type: "image" as const,
      asset: { _type: "reference" as const, _ref: asset._id },
    };
  } catch (error) {
    console.warn(`  ! Could not upload ${filename}: ${(error as Error).message}`);
    console.warn("    (You can add this image later from the dashboard.)");
    return null;
  }
}


// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

async function main() {
  console.log(`Seeding "${dataset}" on project ${projectId}...\n`);

  const images: Record<string, Awaited<ReturnType<typeof uploadImage>>> = {};
  if (want("settings") || want("samples") || want("posts")) {
    console.log("Uploading images (this can take a minute)...");
    for (const [name, id] of Object.entries(IMG)) {
      images[name] = await uploadImage(unsplash(id), `${name}.jpg`);
      if (images[name]) console.log(`  + ${name}`);
    }
  }

  if (want("settings")) {
    console.log("\nCreating site settings...");
    const { stats, aboutLines, ...text } = starterSettings;
    await client.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      brandName: "Maveelight",
      ...(images.portrait ? { portrait: images.portrait } : {}),
      availableForWork: true,
      ...text,
      stats: stats.map((st) => ({ _key: key(), ...st })),
      aboutBody: toBlocks(aboutLines),
    });
  }

  if (want("services")) {
    console.log("Creating services...");
    for (const [i, s] of services.entries()) {
      await client.createOrReplace({
        _id: `service-${i + 1}`,
        _type: "service",
        order: i + 1,
        ...s,
      });
    }
  }

  if (want("testimonials")) {
    console.log("Creating testimonials...");
    for (const [i, t] of testimonials.entries()) {
      await client.createOrReplace({
        _id: `testimonial-${i + 1}`,
        _type: "testimonial",
        order: i + 1,
        ...t,
      });
    }
  }

  if (want("samples")) {
    console.log("Creating writing samples...");
    for (const [i, s] of samples.entries()) {
      const cover = images[Object.keys(IMG).find((k) => IMG[k as keyof typeof IMG] === s.image) ?? ""];
      await client.createOrReplace({
        _id: s.id,
        _type: "writingSample",
        title: s.title,
        slug: slug(s.id.replace("sample-", "")),
        category: s.category,
        excerpt: s.excerpt,
        body: toBlocks(s.body),
        results: s.results,
        featured: true,
        order: i + 1,
        ...(cover ? { coverImage: cover } : {}),
      });
    }
  }

  if (want("posts")) {
    console.log("Creating blog posts...");
    for (const p of posts) {
      const cover = images[Object.keys(IMG).find((k) => IMG[k as keyof typeof IMG] === p.image) ?? ""];
      const publishedAt = new Date(
        Date.now() - p.daysAgo * 24 * 60 * 60 * 1000,
      ).toISOString();
      await client.createOrReplace({
        _id: p.id,
        _type: "blogPost",
        title: p.title,
        slug: slug(p.id.replace("post-", "")),
        excerpt: p.excerpt,
        body: toBlocks(p.body),
        tags: p.tags,
        publishedAt,
        ...(cover ? { coverImage: cover } : {}),
      });
    }
  }

  console.log("\nDone. Open /studio to see the content.");
}

main().catch((error) => {
  console.error("\nSeed failed:", error);
  process.exit(1);
});
