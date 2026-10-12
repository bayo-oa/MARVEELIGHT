import Link from "next/link";
import { Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import type { SiteSettings } from "../../sanity/lib/types";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const socials = [
    { href: settings?.linkedinUrl, label: "LinkedIn", Icon: Linkedin },
    { href: settings?.xUrl, label: "X", Icon: Twitter },
    { href: settings?.instagramUrl, label: "Instagram", Icon: Instagram },
    { href: settings?.email ? `mailto:${settings.email}` : undefined, label: "Email", Icon: Mail },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-heading text-lg font-bold">{settings?.brandName ?? "Maveelight"}</p>
          <p className="text-sm text-muted">LinkedIn and social media content writer</p>
        </div>
        <ul className="flex gap-5 text-sm text-muted">
          <li><Link href="/work" className="hover:text-foreground">Work</Link></li>
          <li><Link href="/#services" className="hover:text-foreground">Services</Link></li>
          <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          <li><Link href="/#contact" className="hover:text-foreground">Contact</Link></li>
        </ul>
        <ul className="flex gap-3">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-primary hover:text-foreground hover:shadow-glow-sm"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} {settings?.brandName ?? "Maveelight"}. All rights reserved.
      </p>
    </footer>
  );
}
