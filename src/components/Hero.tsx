export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-24"
    >
      {/* Atmospheric glow, no stock photography — a soft gold light source
          rising from the lower-right, echoing "the illuminator". */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-purple) 0%, transparent 70%)" }}
      />
      <div className="relative grain absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <p className="mb-6 text-sm tracking-[0.2em] text-gold">
            The Content Illuminator
          </p>
          <h1 className="font-display text-5xl leading-[1.1] text-ivory sm:text-6xl lg:text-7xl">
            You have the expertise.
            <br />
            <span className="italic text-gold-soft">Let your content</span>
            <br />
            illuminate it.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ivory-dim">
            I help experts build authority on LinkedIn by turning their
            expertise into compelling personal-brand content.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="border border-gold bg-gold px-7 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              Work With Me
            </a>
            <a
              href="#portfolio"
              className="border-b border-ivory/40 pb-1 text-sm text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              See My Work
            </a>
          </div>
        </div>

        {/* Portrait frame — replace the placeholder with the client's
            professional portrait, cropped as-is per the brief. */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 border border-gold/30" />
          <div className="relative flex aspect-[4/5] w-full items-center justify-center border border-ivory/10 bg-gradient-to-br from-plum-light to-plum">
            <span className="px-8 text-center text-xs tracking-wide text-ivory-dim/70">
              Portrait placeholder — drop in the client&rsquo;s professional
              photo here (aspect 4:5)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
