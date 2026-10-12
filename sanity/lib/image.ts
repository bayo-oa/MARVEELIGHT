import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "../env";

const builder = imageUrlBuilder({
  projectId: projectId || "missing-project-id",
  dataset,
});

/**
 * Build an optimised image URL from a Sanity image.
 * Example: urlFor(settings.portrait).width(800).height(1000).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
