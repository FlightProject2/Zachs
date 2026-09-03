# Zachs — Plant Nursery Ecommerce

A modern, clean ecommerce storefront for **Zachs**, a plant nursery based in **Lurgan, Northern Ireland**, built with [TanStack Start](https://tanstack.com/start) (TanStack Router + Vite), TypeScript and Tailwind CSS.

## Features

- Home, shop (with category + sort filtering via type-safe search params), product detail, cart, checkout and confirmation pages
- Persistent shopping cart (localStorage-backed) with a slide-over basket drawer
- About, Contact, Delivery & Returns and Plant Care Guides pages
- Responsive, mobile-first design with a custom green/terracotta brand theme
- Product catalogue and cart state are all local (no external services required)
- Admin panel at `/admin` for managing the product and category catalogue (see [Admin panel](#admin-panel) below)

## SEO

- Server-rendered by default (TanStack Start), so every page's full content and meta are present in the initial HTML response — no reliance on client-side JS for crawling
- Per-route `<title>`/description, Open Graph and Twitter meta, with a self-referencing `<link rel="canonical">` on every indexable page (category pages under `/shop` canonicalize on `category`, not `sort`, since sorting doesn't change the content)
- Transactional pages (`/cart`, `/checkout`, `/checkout/confirmation`) are `noindex` — no unique public content, so they shouldn't consume crawl budget or dilute the index
- JSON-LD structured data: a site-wide `GardenStore` (LocalBusiness) block with Lurgan/NI address and service area, `Product` + `AggregateRating` + `Offer` on product pages, and `BreadcrumbList` on product and category pages
- `public/robots.txt` plus a generated `public/sitemap.xml` (`npm run generate-sitemap`, wired into `npm run build`) covering every static page, category and product — both read from the live catalogue, so admin edits are reflected
- Business identity (name, URL, address, phone, delivery area) lives in one place — `src/lib/site.ts` — update it there once real domain/phone/address are confirmed

## AEO / GEO (answer & generative engine optimisation)

- `FAQPage` JSON-LD on `/delivery-returns`, matching its visible Q&A-shaped content
- `public/llms.txt` — a concise Markdown summary of the site and its key pages, following the emerging `llms.txt` convention for AI assistants and answer engines
- `public/robots.txt` explicitly allows major AI crawlers (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, anthropic-ai, Google-Extended, PerplexityBot, Perplexity-User, CCBot, Applebot-Extended, Bytespider) in addition to the general `*` rule
- `/admin` and its sub-routes are `Disallow`-ed in `robots.txt` and every admin route sets `noindex, nofollow` explicitly (not just inherited from the layout route), so the admin panel never leaks into search or AI-answer indexes

## Admin panel

`/admin` is a password-gated panel for managing the product and category catalogue without touching code.

- Sign in at `/admin/login` with the password in `ADMIN_PASSWORD`. The session is a sealed, httpOnly cookie (TanStack Start's built-in session API), valid for 12 hours.
- Dashboard, Products (create/edit/delete) and Categories (edit name/description) sections.
- Changes made in the admin panel go live on the storefront immediately — the same catalogue backs both.

### Required environment variables

Copy `.env.example` to `.env` and set both values before running the admin panel:

- `ADMIN_PASSWORD` — the password required to sign in to `/admin`.
- `ADMIN_SESSION_SECRET` — at least 32 characters, used to encrypt/sign the session cookie. Generate one with `openssl rand -base64 32`.

Without a `.env`, the app falls back to an insecure development-only secret and an empty admin password (which locks out `/admin` entirely) — fine for a quick look around, not for anything real.

### Data storage (temporary — dev-only)

The catalogue lives in `data/products.json` and `data/categories.json`, read and written directly on the filesystem by `src/server/store.ts`. This is a deliberate, temporary stand-in:

- It works for local development and for a persistent-filesystem server deployment.
- It will **not** persist writes on typical serverless/edge hosting (Vercel, Netlify, Cloudflare Workers, etc.), since those platforms ship a read-only or ephemeral filesystem at runtime.
- It's intentionally shaped as a drop-in replacement target: `src/server/store.ts` exposes exactly four functions (`readProducts`, `writeProducts`, `readCategories`, `writeCategories`); swapping to Supabase later means replacing the bodies of those four functions with Supabase queries — nothing else in the app (routes, server functions, components) needs to change.
- `data/products.json` / `data/categories.json` are committed to the repo as the live seed data. If they're ever missing (e.g. a fresh environment before first run), regenerate them from the static seed arrays in `src/data/products.ts` / `src/data/categories.ts` with `npm run seed-data` (add `--force` to overwrite existing files).

## Getting Started

```bash
npm install
cp .env.example .env   # then fill in ADMIN_PASSWORD and ADMIN_SESSION_SECRET
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Project structure

- `src/routes` — file-based routes (TanStack Router), including `admin*` routes for the admin panel
- `src/components` — shared UI components
- `src/context/cart-context.tsx` — cart state (React context + localStorage)
- `src/data` — seed product/category data and pure lookup helpers (`product-helpers.ts`, `category-helpers.ts`)
- `src/server` — server-only code (fs-backed data store, auth/session, and the `createServerFn` RPCs the routes call) — never imported by client-reachable component code
- `src/types` — shared TypeScript types
- `data/*.json` — the live, mutable catalogue (see [Data storage](#data-storage-temporary---dev-only) above)

## Notes

- The checkout flow is a front-end demo — no real payment is processed.
- Product imagery is represented with generated gradient/icon placeholders rather than photos.
- `checkout_.confirmation.tsx` uses TanStack Router's trailing-underscore convention to opt the confirmation route out of nesting under `checkout.tsx`; the same convention is used for `admin_.login.tsx` and the `admin.products_.*` routes so they don't inherit the admin layout/products-list layout where they shouldn't.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build (also regenerates `public/sitemap.xml` first)
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
- `npm run generate-routes` — regenerate `src/routeTree.gen.ts` after adding/removing route files
- `npm run generate-sitemap` — regenerate `public/sitemap.xml` from the live catalogue (also runs automatically as part of `npm run build`)
- `npm run seed-data` — write `data/products.json` / `data/categories.json` from the static seed arrays if they don't already exist (`--force` to overwrite)
