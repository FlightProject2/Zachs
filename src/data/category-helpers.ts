import type { Category } from "@/data/categories";

export function getCategory(categories: Category[], slug: string) {
  return categories.find((c) => c.slug === slug);
}
