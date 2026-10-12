import { urlFor } from "../../sanity/lib/image";
import type { SanityImage } from "../../sanity/lib/types";

type WithCover = { coverImage?: SanityImage; coverUrl?: string };

/** Cover image link: the Sanity upload if there is one, else the built-in photo. */
export function coverSrc(item: WithCover, width: number, height: number) {
  if (item.coverImage?.asset) {
    return urlFor(item.coverImage).width(width).height(height).fit("crop").url();
  }
  return item.coverUrl;
}
