const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-ink py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="font-display text-lg text-ivory">MARVEELIGHT</p>
          <p className="mt-1 text-sm text-ivory-dim/70">The Content Illuminator</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ivory-dim transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-ivory-dim/50">
          &copy; {new Date().getFullYear()} MARVEELIGHT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
