import type { SiteSettings } from "../../sanity/lib/types";

export type ContactLink = {
  type: "email" | "whatsapp" | "linkedin";
  label: string;
  href: string;
  /** Opens in a new tab */
  external: boolean;
};

const EMAIL_SUBJECT = "Content writing project";
const EMAIL_BODY =
  "Hi, I found your website and I'd like to talk about a content writing project.\n\nA bit about what I need:\n";
const WHATSAPP_TEXT =
  "Hi, I found your website and I'd like to talk about content writing.";

type ContactSource = Pick<
  SiteSettings,
  "email" | "whatsappNumber" | "linkedinUrl"
>;

/**
 * Builds the contact buttons from what she saved in Site Settings.
 * A button only appears if she has filled in that detail.
 */
export function buildContactLinks(
  settings: Partial<ContactSource> | null | undefined,
): ContactLink[] {
  const links: ContactLink[] = [];

  const email = settings?.email?.trim();
  if (email) {
    links.push({
      type: "email",
      label: "Send an email",
      href: `mailto:${email}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`,
      external: false,
    });
  }

  const whatsappDigits = settings?.whatsappNumber?.replace(/\D/g, "");
  if (whatsappDigits) {
    links.push({
      type: "whatsapp",
      label: "Chat on WhatsApp",
      href: `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
      external: true,
    });
  }

  const linkedin = settings?.linkedinUrl?.trim();
  if (linkedin) {
    links.push({
      type: "linkedin",
      label: "Message on LinkedIn",
      href: linkedin,
      external: true,
    });
  }

  return links;
}
