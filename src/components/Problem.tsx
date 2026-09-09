const problems = [
  "They know their subject but struggle to communicate it.",
  "Their content sounds generic.",
  "They struggle to consistently create ideas.",
  "Their LinkedIn presence doesn't reflect their expertise.",
  "They want authority and visibility but don't know how to communicate their value.",
];

export default function Problem() {
  return (
    <section className="relative bg-plum py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <h2 className="font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Your expertise deserves to be seen.
        </h2>
        <ul className="flex flex-col divide-y divide-ivory/10 border-y border-ivory/10">
          {problems.map((problem) => (
            <li key={problem} className="py-5 text-lg leading-relaxed text-ivory-dim">
              {problem}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
