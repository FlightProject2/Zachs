import { createFileRoute } from "@tanstack/react-router";
import { ShopFilters } from "../components/shop/shop-filters";
import { ProductCard } from "../components/product-card";
import { JsonLd } from "../components/json-ld";
import { getProductsFn } from "../server/products";
import { getCategoriesFn } from "../server/categories";
import { getCategory } from "../data/category-helpers";
import type { Product } from "../types/product";
import { SITE_URL } from "../lib/site";

interface ShopSearch {
  category?: string;
  sort?: string;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    category: typeof search.category === "string" ? search.category : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
  }),
  loader: async () => {
    const [products, categories] = await Promise.all([
      getProductsFn(),
      getCategoriesFn(),
    ]);
    return { products, categories };
  },
  head: ({ match, loaderData }) => {
    const categorySlug = match.search.category;
    const category =
      categorySlug && loaderData
        ? getCategory(loaderData.categories, categorySlug)
        : undefined;
    // Canonicalize away only the "sort" param — it reorders the same set of
    // products rather than changing the page's content. A valid category
    // keeps its own self-referencing canonical since it's a genuinely
    // different set of products and search intent.
    const canonical = category
      ? `${SITE_URL}/shop?category=${category.slug}`
      : `${SITE_URL}/shop`;
    const title = category
      ? `${category.name} | Zachs, Lurgan`
      : "Shop All Plants | Zachs, Lurgan";
    const description = category
      ? `${category.description} Grown by Zachs, a plant nursery in Lurgan, delivering across Northern Ireland.`
      : "Browse houseplants, outdoor plants, succulents, pots and plant care essentials from Zachs — a plant nursery in Lurgan, delivering across Northern Ireland.";
    return {
      meta: [{ title }, { name: "description", content: description }],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: ShopPage,
});

function sortProducts(list: Product[], sort: string) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy;
  }
}

function ShopPage() {
  const { category, sort } = Route.useSearch();
  const { products, categories } = Route.useLoaderData();
  const activeCategory = category ?? "all";
  const activeSort = sort ?? "featured";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);
  const sorted = sortProducts(filtered, activeSort);
  const activeCategoryData =
    activeCategory !== "all" ? getCategory(categories, activeCategory) : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Shop", item: `${SITE_URL}/shop` },
      ...(activeCategoryData
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: activeCategoryData.name,
              item: `${SITE_URL}/shop?category=${activeCategoryData.slug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <div className="container-page py-10">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="mb-8">
        <h1 className="font-display text-3xl text-brand-950">
          {activeCategoryData ? activeCategoryData.name : "Shop All Plants"}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {activeCategoryData
            ? activeCategoryData.description
            : "Every plant, pot and plant-care essential we stock, hand-picked and ready to ship."}
        </p>
      </div>

      <ShopFilters
        activeCategory={activeCategory}
        activeSort={activeSort}
        categories={categories}
      />

      {sorted.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          No products found in this category yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
