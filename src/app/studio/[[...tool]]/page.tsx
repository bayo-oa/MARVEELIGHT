import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { hasSanityConfig } from "../../../../sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main
        style={{
          fontFamily: "system-ui, sans-serif",
          maxWidth: 560,
          margin: "15vh auto",
          padding: 24,
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: 24 }}>Sanity is not connected yet</h1>
        <p>
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to your{" "}
          <code>.env.local</code> file, then restart the dev server. The
          dashboard will appear here.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
