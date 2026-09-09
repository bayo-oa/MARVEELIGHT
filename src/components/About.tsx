export default function About() {
  return (
    <section id="about" className="bg-plum py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        <div className="relative mx-auto w-full max-w-xs lg:mx-0">
          <div className="absolute -inset-3 border border-gold/30" />
          <div className="relative flex aspect-[4/5] w-full items-center justify-center border border-ivory/10 bg-gradient-to-br from-ink to-plum-light">
            <span className="px-6 text-center text-xs tracking-wide text-ivory-dim/70">
              About portrait placeholder
            </span>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="mb-4 text-sm tracking-[0.2em] text-gold">About</p>
          <h2 className="mb-8 font-display text-4xl leading-tight text-ivory sm:text-5xl">
            The Content Illuminator
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-ivory-dim">
            <p>
              MARVEELIGHT exists for one reason: expertise that goes
              uncommunicated goes unnoticed. Behind the brand is a writer and
              strategist who works closely with founders, coaches,
              consultants, and subject-matter experts to turn what they know
              into content people actually stop to read.
            </p>
            <p>
              &ldquo;The Content Illuminator&rdquo; is a way of working, not
              just a tagline &mdash; bringing clarity, visibility, and
              perspective to expertise that&rsquo;s often too close to the
              expert to see clearly themselves.
            </p>
            <p>
              The specialty is LinkedIn: content strategy, writing, and
              coaching for people who have real authority in their field and
              want their online presence to finally reflect it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
