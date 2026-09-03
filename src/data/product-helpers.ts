import type { Product } from "../types/product";

export function getProduct(products: Product[], slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(products: Product[], category: string) {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(products: Product[], product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, count);
}

export function getBestsellers(products: Product[], count = 8) {
  return products.filter((p) => p.tags?.includes("bestseller")).slice(0, count);
}

export function getNewArrivals(products: Product[], count = 8) {
  return products.filter((p) => p.tags?.includes("new")).slice(0, count);
}
