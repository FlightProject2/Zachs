# Zachs — Plant Nursery Ecommerce

A modern, clean ecommerce storefront for **Zachs**, a plant nursery based in **Lurgan, Northern Ireland**, built with [TanStack Start](https://tanstack.com/start) (TanStack Router + Vite), TypeScript and Tailwind CSS.

## Features

- Home, shop (with category + sort filtering via type-safe search params), product detail, cart, checkout and confirmation pages
- Persistent shopping cart (localStorage-backed) with a slide-over basket drawer
- About, Contact, Delivery & Returns and Plant Care Guides pages
- Responsive, mobile-first design with a custom green/terracotta brand theme
- Product catalogue and cart state are all local (no external services required)

## SEO

- Server-rendered by default (TanStack Start), so every page's full content and meta are present in the initial HTML response — no reliance on client-side JS for crawling
- Per-route `<title>`/description, Open Graph and Twitter meta, with a self-referencing `<link rel="canonical">` on every indexable page (category pages under `/shop` canonicalize on `category`, not `sort`, since sorting doesn't change the content)
- Transactional pages (`/cart`, `/checkout`, `/checkout/confirmation`) are `noindex` — no unique public content, so they shouldn't consume crawl budget or dilute the index
- JSON-LD structured data: a site-wide `GardenStore` (LocalBusiness) block with Lurgan/NI address and service area, `Product` + `AggregateRating` + `Offer` on product pages, and `BreadcrumbList` on product and category pages
- `public/robots.txt` plus a generated `public/sitemap.xml` (`npm run generate-sitemap`, wired into `npm run build`) covering every static page, category and product
- Business identity (name, URL, address, phone, delivery area) lives in one place — `src/lib/site.ts` — update it there once real domain/phone/address are confirmed

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project structure

- `src/routes` — file-based routes (TanStack Router)
- `src/components` — shared UI components
- `src/context/cart-context.tsx` — cart state (React context + localStorage)
- `src/data` — product and category catalogue
- `src/types` — shared TypeScript types

## Notes

- The checkout flow is a front-end demo — no real payment is processed.
- Product imagery is represented with generated gradient/icon placeholders rather than photos.
- `checkout_.confirmation.tsx` uses TanStack Router's trailing-underscore convention to opt the confirmation route out of nesting under `checkout.tsx`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint
- `npm run generate-routes` — regenerate `src/routeTree.gen.ts` after adding/removing route files
- `npm run generate-sitemap` — regenerate `public/sitemap.xml` from route/product/category data (also runs automatically as part of `npm run build`)
