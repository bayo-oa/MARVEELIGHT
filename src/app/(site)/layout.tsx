import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSettings } from "../../../sanity/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maveelight | LinkedIn and Social Media Content Writer",
    template: "%s | Maveelight",
  },
  description:
    "Maveelight helps founders and professionals turn their ideas into LinkedIn and social posts that build trust, attract clients and grow their personal brand.",
};

export const viewport: Viewport = {
  themeColor: "#0A0612",
  colorScheme: "dark",
};

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  return (
    <html lang="en">
      <body className="grain min-h-screen">
        <Navbar brand={settings?.brandName ?? "Maveelight"} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
