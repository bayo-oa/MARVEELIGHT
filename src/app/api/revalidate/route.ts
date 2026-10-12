import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebhookPayload = {
  _type?: string;
  slug?: string | null;
};

/**
 * Sanity calls this URL whenever she publishes, edits or deletes something.
 * We clear the cached copy so the website shows the change within seconds.
 *
 * Set up in Sanity (manage > API > Webhooks):
 *   URL:        https://YOUR-DOMAIN/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Filter:     _type in ["siteSettings","writingSample","blogPost","testimonial","service"]
 *   Projection: {_type, "slug": slug.current}
 *   Secret:     same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return new NextResponse("SANITY_REVALIDATE_SECRET is not set", { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      request,
      secret,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Missing document type", { status: 400 });
    }

    const tags = new Set<string>();

    switch (body._type) {
      case "siteSettings":
        tags.add("settings");
        break;
      case "writingSample":
        tags.add("samples");
        break;
      case "blogPost":
        tags.add("posts");
        if (body.slug) tags.add(`post:${body.slug}`);
        break;
      case "testimonial":
        tags.add("testimonials");
        break;
      case "service":
        tags.add("services");
        break;
      default:
        return NextResponse.json({ revalidated: false, reason: "Ignored type" });
    }

    tags.forEach((tag) => revalidateTag(tag));

    return NextResponse.json({ revalidated: true, tags: [...tags] });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
