# MARVEELIGHT — Website (Phase 1: Frontend)

Next.js 16 + Tailwind CSS v4 site for MARVEELIGHT, "The Content Illuminator."

## What's here

- `src/app/page.tsx` — assembles all sections in order (Hero, Problem,
  Services, Method, Portfolio, About, Insights, Contact)
- `src/components/` — one component per section
- `src/data/site.ts` — all editable content (services, portfolio, insights).
  This is the single place to edit copy today, and the file this swaps out
  for API calls once the Phase 2 admin portal exists
- `src/app/api/contact/route.ts` — contact form handler (uses Resend)
- `src/app/globals.css` — design tokens (color palette, fonts) live in the
  `@theme` block at the top

## Before you deploy

1. **Replace the two portrait placeholders** in `Hero.tsx` and `About.tsx`
   with the client's actual professional photo (the brief asks for it
   "carefully cropped, without altering facial features" — do that crop
   outside the code, then swap the placeholder `<div>` for an `<Image>`).
2. **Set up the contact form email delivery** — see `.env.example`. Without
   these env vars the form still "succeeds" in the UI but only logs the
   submission to the server console, nothing gets emailed.
3. **Update the WhatsApp number** in `Contact.tsx` (`wa.me/000000000000`).
4. Swap the placeholder favicon/social preview if you have one.

## Local dev

```
npm install
npm run dev
```

## Deploy (Phase 1 — frontend only)

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. Add the env vars from `.env.example` in Vercel's project settings.
4. Deploy.

## Phase 2 (later)

When the Python/FastAPI backend + admin portal is ready:
- Replace the static arrays in `src/data/site.ts` with `fetch` calls to the
  new API (same shapes: `Service`, `PortfolioProject`, `InsightPost`)
- No component changes should be needed if the API returns the same shapes
