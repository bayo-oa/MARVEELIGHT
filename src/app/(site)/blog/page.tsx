import type { Metadata } from "next";
import { BlogList } from "@/components/BlogList";
import { SectionHeading } from "@/components/sections";
import { getPosts } from "../../../../sanity/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Blog",
  description: "Practical writing tips for LinkedIn and social media.",
};

export default async function BlogIndex() {
  const posts = await getPosts();
  return (
    <section className="section pt-32 md:pt-40">
      <div className="container">
        <SectionHeading eyebrow="Blog" title="Notes on writing that works" />
        {posts.length ? (
          <BlogList posts={posts} />
        ) : (
          <p className="text-muted">No posts yet. Check back soon.</p>
        )}
      </div>
    </section>
  );
}
