# Zachs — Plant Nursery Ecommerce

A modern, clean ecommerce storefront for **Zachs**, a UK plant nursery, built with [TanStack Start](https://tanstack.com/start) (TanStack Router + Vite), TypeScript and Tailwind CSS.

## Features

- Home, shop (with category + sort filtering via type-safe search params), product detail, cart, checkout and confirmation pages
- Persistent shopping cart (localStorage-backed) with a slide-over basket drawer
- About, Contact and Plant Care Guides pages
- Responsive, mobile-first design with a custom green/terracotta brand theme
- Product catalogue and cart state are all local (no external services required)

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
