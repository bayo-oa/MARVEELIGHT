# Maveelight Portfolio

Portfolio site for a LinkedIn and social media content writer.

Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Sanity CMS, Vercel.

## Run locally

```bash
npm install
cp .env.example .env.local   # skip if you already have .env.local
npm run dev
```

## Built-in sample content

Until Sanity is connected, the site shows built-in sample content (samples, services, testimonials, blog posts and contact details) from `sanity/starter-content.ts`, so nothing looks empty. Once Sanity is connected, the dashboard content replaces it automatically.

## Connect Sanity (Phase 2)

1. Create a project named "Maveelight" (dataset `production`) at https://www.sanity.io/manage.
2. Put the Project ID in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In the project's API settings add CORS origins `http://localhost:3000` and `http://localhost:3001` (tick "Allow credentials").
4. Create a token with the **Editor** role and save it as `SANITY_API_WRITE_TOKEN`.
5. Run `npm run seed` to fill the dashboard, then open `/studio`.

## Contact buttons (Phase 3 update)

There is no contact form and no email service. Visitors reach her with three buttons: email, WhatsApp and LinkedIn. They are built from the details she saves in **Site Settings > Contact info** in the dashboard, and a button only shows if its detail is filled in.

- Email: opens a new message to her address
- WhatsApp: opens a chat with her number (country code required, for example +234 800 000 0000)
- LinkedIn: opens her profile link

## Auto-refresh when she publishes (Phase 5)

`/api/revalidate` is ready. After deployment, add a webhook in Sanity (manage > API > Webhooks) pointing to `https://YOUR-DOMAIN/api/revalidate` with the secret from `SANITY_REVALIDATE_SECRET`. Full steps come in Phase 5.

## Phases

1. Setup (done)
2. CMS and data layer (done)
3. Backend: contact buttons and revalidation (done)
4. Frontend: home, /work, samples modal, testimonial carousel, blog with search (done)
5. Polish and deployment
