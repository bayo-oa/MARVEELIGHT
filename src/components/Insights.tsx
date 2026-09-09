import { insights } from "@/data/site";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function Insights() {
  return (
    <section id="insights" className="bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="mb-4 text-sm tracking-[0.2em] text-gold">Insights</p>
        <h2 className="mb-16 max-w-xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Notes on LinkedIn, content, and communicating expertise.
        </h2>

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((post) => (
            <article key={post.slug} className="border-t border-ivory/10 pt-6">
              <p className="mb-3 text-xs tracking-[0.15em] text-ivory-dim/70">
                {post.category} &middot; {formatDate(post.date)}
              </p>
              <h3 className="mb-3 font-display text-xl leading-snug text-ivory">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-ivory-dim">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
