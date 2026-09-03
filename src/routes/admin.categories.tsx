import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getCategoriesFn, updateCategoryFn } from "@/server/categories";
import type { Category } from "@/data/categories";

export const Route = createFileRoute("/admin/categories")({
  loader: () => getCategoriesFn(),
  head: () => ({
    meta: [{ title: "Categories | Zachs Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const categories = Route.useLoaderData();

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-950">Categories</h1>
      <p className="mt-1 text-sm text-muted">
        Names and descriptions shown in navigation and on category pages.
      </p>
      <div className="mt-6 space-y-4">
        {categories.map((category) => (
          <CategoryRow key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoryRow({ category }: { category: Category }) {
  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = name !== category.name || description !== category.description;

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await updateCategoryFn({ data: { slug: category.slug, name, description } });
      await router.invalidate();
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2 text-xs text-muted">
        <code className="rounded bg-brand-50 px-1.5 py-0.5">{category.slug}</code>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-foreground">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-foreground">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
          />
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-clay-600">{error}</p>}
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          disabled={!dirty || saving}
          onClick={handleSave}
          className="rounded-full bg-brand-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {saved && <span className="text-sm text-brand-700">Saved</span>}
      </div>
    </div>
  );
}
