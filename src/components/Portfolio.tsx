import { portfolio } from "@/data/site";

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="mb-4 text-sm tracking-[0.2em] text-gold">Portfolio</p>
        <h2 className="mb-16 max-w-xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
          A closer look at the work.
        </h2>

        <div className="flex flex-col gap-16">
          {portfolio.map((project) => (
            <article
              key={project.slug}
              className="grid grid-cols-1 gap-8 border-t border-ivory/10 pt-10 lg:grid-cols-[0.8fr_1.2fr]"
            >
              <div>
                <p className="mb-2 text-xs tracking-[0.15em] text-ivory-dim/70">
                  {project.category}
                </p>
                <h3 className="font-display text-2xl leading-snug text-ivory sm:text-3xl">
                  {project.title}
                </h3>
                {project.speculative && (
                  <span className="mt-4 inline-block border border-gold/40 px-3 py-1 text-xs tracking-wide text-gold">
                    Speculative sample
                  </span>
                )}
              </div>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <dt className="mb-2 text-xs tracking-[0.15em] text-gold">Challenge</dt>
                  <dd className="text-sm leading-relaxed text-ivory-dim">{project.challenge}</dd>
                </div>
                <div>
                  <dt className="mb-2 text-xs tracking-[0.15em] text-gold">Approach</dt>
                  <dd className="text-sm leading-relaxed text-ivory-dim">{project.approach}</dd>
                </div>
                <div>
                  <dt className="mb-2 text-xs tracking-[0.15em] text-gold">Outcome</dt>
                  <dd className="text-sm leading-relaxed text-ivory-dim">{project.outcome}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
