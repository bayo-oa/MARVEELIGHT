import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/ui/Reveal";
import { SamplesGallery } from "@/components/SamplesGallery";
import { About, Contact, LatestPosts, SectionHeading, Services, Testimonials } from "@/components/sections";
import {
  getLatestPosts, getSamples, getServices, getSettings, getTestimonials,
} from "../../../sanity/lib/data";

export const revalidate = 60;

export default async function Home() {
  const [settings, samples, services, testimonials, posts] = await Promise.all([
    getSettings(), getSamples(), getServices(), getTestimonials(), getLatestPosts(),
  ]);

  const featured = samples.filter((s) => s.featured !== false).slice(0, 6);

  return (
    <>
      <Hero settings={settings} />
      {!!featured.length && (
        <section id="work" className="section">
          <div className="container">
            <SectionHeading eyebrow="Selected work" title="Writing that gets noticed">
              A few samples of the posts, carousels and captions I write. Tap any card to read it.
            </SectionHeading>
            <Reveal><SamplesGallery samples={featured} /></Reveal>
            <Link href="/work" className="btn-ghost mt-10">View all work</Link>
          </div>
        </section>
      )}
      <About settings={settings} />
      <Services services={services} />
      <Testimonials items={testimonials} />
      <LatestPosts posts={posts} />
      <Contact settings={settings} />
    </>
  );
}
