const steps = [
  {
    number: "01",
    name: "Extract",
    description: "Identify valuable ideas, experiences, stories, and expertise.",
  },
  {
    number: "02",
    name: "Clarify",
    description: "Turn complex thoughts into clear, compelling messages.",
  },
  {
    number: "03",
    name: "Illuminate",
    description:
      "Transform those messages into content that is visible, memorable, and impactful.",
  },
];

export default function Method() {
  return (
    <section className="relative bg-plum py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="mb-4 text-sm tracking-[0.2em] text-gold">The Method</p>
        <h2 className="mb-16 font-display text-4xl text-ivory sm:text-5xl">
          Extract. Clarify. Illuminate.
        </h2>

        <div className="relative grid grid-cols-1 gap-12 sm:grid-cols-3">
          {/* connecting line, literal to the three-step process */}
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="mb-6 block font-display text-sm text-gold">
                {step.number}
              </span>
              <h3 className="mb-3 font-display text-2xl text-ivory">{step.name}</h3>
              <p className="text-base leading-relaxed text-ivory-dim">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
