import { createServerFn } from "@tanstack/react-start";
import { readProducts, writeProducts } from "./store";
import { requireAdmin } from "./auth";
import { getRelatedProducts } from "../data/product-helpers";
import type { Product } from "../types/product";

export const getProductsFn = createServerFn({ method: "GET" }).handler(async () => {
  return readProducts();
});

export const getProductBySlugFn = createServerFn({ method: "GET" })
  .validator((input: unknown) => input as { slug: string })
  .handler(async ({ data }) => {
    const products = await readProducts();
    const product = products.find((p) => p.slug === data.slug) ?? null;
    if (!product) return { product: null, related: [] };
    return { product, related: getRelatedProducts(products, product, 4) };
  });

function assertValidProduct(product: Product) {
  if (!product.slug || !product.name) {
    throw new Error("Product must have a slug and name.");
  }
  if (typeof product.price !== "number" || product.price < 0) {
    throw new Error("Product price must be a non-negative number.");
  }
}

export const createProductFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as { product: Product })
  .handler(async ({ data }) => {
    await requireAdmin();
    assertValidProduct(data.product);
    const products = await readProducts();
    if (products.some((p) => p.slug === data.product.slug)) {
      throw new Error(`A product with slug "${data.product.slug}" already exists.`);
    }
    const next = [...products, data.product];
    await writeProducts(next);
    return data.product;
  });

export const updateProductFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as { originalSlug: string; product: Product })
  .handler(async ({ data }) => {
    await requireAdmin();
    assertValidProduct(data.product);
    const products = await readProducts();
    const index = products.findIndex((p) => p.slug === data.originalSlug);
    if (index === -1) {
      throw new Error(`Product "${data.originalSlug}" not found.`);
    }
    if (
      data.product.slug !== data.originalSlug &&
      products.some((p) => p.slug === data.product.slug)
    ) {
      throw new Error(`A product with slug "${data.product.slug}" already exists.`);
    }
    const next = [...products];
    next[index] = data.product;
    await writeProducts(next);
    return data.product;
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as { slug: string })
  .handler(async ({ data }) => {
    await requireAdmin();
    const products = await readProducts();
    const next = products.filter((p) => p.slug !== data.slug);
    if (next.length === products.length) {
      throw new Error(`Product "${data.slug}" not found.`);
    }
    await writeProducts(next);
    return { ok: true as const };
  });
