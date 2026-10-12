import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getReadTime } from "@/lib/read-time";
import { PortableBody } from "@/components/PortableBody";
import { portraitUrl } from "@/components/Hero";
import { coverSrc } from "@/lib/images";
import { CoverImage } from "@/components/CoverImage";
import { getPostBySlug, getPostSlugs, getSettings } from "../../../../../sanity/lib/data";

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const image = coverSrc(post, 1200, 630);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: image ? [image] : [] },
  };
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([getPostBySlug(params.slug), getSettings()]);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="section pt-32 md:pt-40">
      <div className="container max-w-3xl">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>
        <p className="text-sm text-muted">{date} · {getReadTime(post)} min read</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">{post.title}</h1>
        {!!post.tags?.length && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full border border-border px-3 py-1 text-xs text-accent">{t}</li>
            ))}
          </ul>
        )}
        {post.coverImage?.asset || post.coverUrl ? (
          <div className="relative my-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border">
            <CoverImage item={post} w={1400} h={790} priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        ) : null}
        <div className="mt-8 text-lg"><PortableBody value={post.body} /></div>

        <aside className="card mt-14 flex flex-col items-center gap-5 p-6 text-center sm:flex-row sm:text-left">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border">
            <Image src={portraitUrl(settings, 128, 128)} alt="" fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Written by {settings?.brandName ?? "Maveelight"}</p>
            <p className="text-sm text-muted">Need content like this for your own profile?</p>
          </div>
          <Link href="/#contact" className="btn-primary">Hire me</Link>
        </aside>
      </div>
    </article>
  );
}
