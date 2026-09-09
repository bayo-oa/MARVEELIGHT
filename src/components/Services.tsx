import { services } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="bg-ink py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="mb-4 text-sm tracking-[0.2em] text-gold">Services</p>
        <h2 className="mb-16 max-w-xl font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Three ways to make your expertise impossible to overlook.
        </h2>

        <div className="flex flex-col border-t border-ivory/10">
          {services.map((service) => (
            <div
              key={service.slug}
              className="group grid grid-cols-1 gap-4 border-b border-ivory/10 py-10 transition-colors md:grid-cols-[1fr_1.4fr] md:gap-12"
            >
              <h3 className="font-display text-2xl text-ivory-dim transition-colors group-hover:text-gold-soft sm:text-3xl">
                {service.name}
              </h3>
              <p className="max-w-lg text-base leading-relaxed text-ivory-dim/90">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
