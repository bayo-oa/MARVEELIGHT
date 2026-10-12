import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SamplesGallery } from "@/components/SamplesGallery";
import { Contact, SectionHeading } from "@/components/sections";
import { getSamples, getSettings } from "../../../../sanity/lib/data";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Work",
  description: "Samples of LinkedIn posts, carousels, ghostwriting and social captions.",
};

export default async function WorkPage() {
  const [samples, settings] = await Promise.all([getSamples(), getSettings()]);

  return (
    <>
      <section className="section pt-32 md:pt-40">
        <div className="container">
          <SectionHeading eyebrow="Work" title="All writing samples">
            Posts, carousels, ghostwriting and captions. Filter by type, then tap any card to read it.
          </SectionHeading>
          {samples.length ? (
            <Reveal><SamplesGallery samples={samples} /></Reveal>
          ) : (
            <p className="text-muted">Samples are coming soon.</p>
          )}
        </div>
      </section>
      <Contact settings={settings} />
    </>
  );
}
