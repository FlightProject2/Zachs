import { createServerFn } from "@tanstack/react-start";
import { readCategories, writeCategories } from "@/server/store";
import { requireAdmin } from "@/server/auth";

export const getCategoriesFn = createServerFn({ method: "GET" }).handler(async () => {
  return readCategories();
});

export const updateCategoryFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as { slug: string; name: string; description: string })
  .handler(async ({ data }) => {
    await requireAdmin();
    if (!data.name.trim() || !data.description.trim()) {
      throw new Error("Category name and description are required.");
    }
    const categories = await readCategories();
    const index = categories.findIndex((c) => c.slug === data.slug);
    if (index === -1) {
      throw new Error(`Category "${data.slug}" not found.`);
    }
    const next = [...categories];
    next[index] = { ...next[index], name: data.name, description: data.description };
    await writeCategories(next);
    return next[index];
  });
