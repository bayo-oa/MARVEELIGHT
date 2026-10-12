import Image from "next/image";
import { coverSrc } from "@/lib/images";
import type { SanityImage } from "../../sanity/lib/types";

type Props = {
  item: { coverImage?: SanityImage; coverUrl?: string };
  w: number;
  h: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/** Fills its (relative) parent with the item's cover image, or nothing if it has none. */
export function CoverImage({ item, w, h, sizes, className, priority }: Props) {
  const src = coverSrc(item, w, h);
  if (!src) return null;
  return <Image src={src} alt="" fill sizes={sizes} priority={priority} className={className} />;
}
