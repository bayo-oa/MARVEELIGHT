import { CoverImage } from "@/components/CoverImage";
import Link from "next/link";
import { getReadTime } from "@/lib/read-time";
import type { BlogPostSummary } from "../../sanity/lib/types";

export function PostCard({ post }: { post: BlogPostSummary }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group block h-full overflow-hidden">
      <div className="relative aspect-[16/10] bg-surface-2">
        <CoverImage
          item={post}
          w={800}
          h={500}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs text-muted">{date} · {getReadTime(post)} min read</p>
        <h3 className="mt-2 font-heading text-lg font-semibold">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
      </div>
    </Link>
  );
}
