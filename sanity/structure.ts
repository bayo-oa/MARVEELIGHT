import type { StructureResolver } from "sanity/structure";
import {
  CogIcon,
  CommentIcon,
  ComposeIcon,
  DocumentTextIcon,
  StarIcon,
} from "@sanity/icons";

/** Sidebar order and names for her dashboard. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Maveelight")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.divider(),
      S.documentTypeListItem("writingSample")
        .title("Writing Samples")
        .icon(ComposeIcon),
      S.documentTypeListItem("blogPost")
        .title("Blog Posts")
        .icon(DocumentTextIcon),
      S.documentTypeListItem("testimonial")
        .title("Testimonials")
        .icon(CommentIcon),
      S.documentTypeListItem("service").title("Services").icon(StarIcon),
    ]);
