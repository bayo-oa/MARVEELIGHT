import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { siteSettings } from "./siteSettings";
import { writingSample } from "./writingSample";
import { blogPost } from "./blogPost";
import { testimonial } from "./testimonial";
import { service } from "./service";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  writingSample,
  blogPost,
  testimonial,
  service,
  blockContent,
];
