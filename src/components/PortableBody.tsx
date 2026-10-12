import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "../../sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>,
    h2: ({ children }) => <h2 className="mb-3 mt-8 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-6 text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-primary pl-4 italic text-accent">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 marker:text-primary">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 marker:text-primary">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 hover:text-primary-glow">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ""}
          width={1200}
          height={700}
          className="my-6 h-auto w-full rounded-2xl"
        />
      ) : null,
  },
};

export function PortableBody({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
