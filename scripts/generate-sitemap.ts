import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { products } from "../src/data/products";
import { categories } from "../src/data/categories";
import { SITE_URL } from "../src/lib/site";

interface UrlEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: number;
}

const staticPages: UrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/shop", changefreq: "daily", priority: 0.9 },
  { path: "/about", changefreq: "monthly", priority: 0.6 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
  { path: "/care-guides", changefreq: "weekly", priority: 0.7 },
  { path: "/delivery-returns", changefreq: "monthly", priority: 0.5 },
];

const categoryPages: UrlEntry[] = categories.map((c) => ({
  path: `/shop?category=${c.slug}`,
  changefreq: "weekly",
  priority: 0.7,
}));

const productPages: UrlEntry[] = products.map((p) => ({
  path: `/product/${p.slug}`,
  changefreq: "weekly",
  priority: 0.8,
}));

const urls = [...staticPages, ...categoryPages, ...productPages];

const body = urls
  .map(
    (u) => `  <url>
    <loc>${(SITE_URL + u.path).replace(/&/g, "&amp;")}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = resolve(import.meta.dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`Sitemap written to ${outPath} (${urls.length} URLs)`);
