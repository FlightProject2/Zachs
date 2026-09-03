import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { getCategory } from "@/data/categories";

export const metadata: Metadata = {
  title: "Shop All Plants",
  description:
    "Browse houseplants, outdoor plants, succulents, pots and plant care essentials from Zachs nursery.",
};

function sortProducts(list: typeof products, sort: string) {
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

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const activeCategory = params.category ?? "all";
  const activeSort = params.sort ?? "featured";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);
  const sorted = sortProducts(filtered, activeSort);
  const category = activeCategory !== "all" ? getCategory(activeCategory) : undefined;

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-brand-950">
          {category ? category.name : "Shop All Plants"}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {category
            ? category.description
            : "Every plant, pot and plant-care essential we stock, hand-picked and ready to ship."}
        </p>
      </div>

      <Suspense>
        <ShopFilters activeCategory={activeCategory} activeSort={activeSort} />
      </Suspense>

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
