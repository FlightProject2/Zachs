import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { getProductsFn, deleteProductFn } from "@/server/products";
import { getCategoriesFn } from "@/server/categories";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/admin/products")({
  loader: async () => {
    const [products, categories] = await Promise.all([
      getProductsFn(),
      getCategoriesFn(),
    ]);
    return { products, categories };
  },
  head: () => ({
    meta: [{ title: "Products | Zachs Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const { products, categories } = Route.useLoaderData();
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  async function confirmDelete(slug: string) {
    setBusy(true);
    setError(null);
    try {
      await deleteProductFn({ data: { slug } });
      setPendingDelete(null);
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-brand-950">Products</h1>
          <p className="mt-1 text-sm text-muted">{products.length} products in the catalog.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          <Plus size={16} />
          Add product
        </Link>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-clay-100/60 px-4 py-2.5 text-sm text-clay-600">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Tags</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {products.map((p) => (
              <tr key={p.slug}>
                <td className="px-4 py-3 text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted">{categoryName(p.category)}</td>
                <td className="px-4 py-3 text-foreground">{formatPrice(p.price)}</td>
                <td className={`px-4 py-3 ${p.stock <= 5 ? "text-clay-600" : "text-foreground"}`}>
                  {p.stock}
                </td>
                <td className="px-4 py-3 text-muted">{p.tags?.join(", ") || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to="/admin/products/$slug"
                      params={{ slug: p.slug }}
                      aria-label={`Edit ${p.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Delete ${p.name}`}
                      onClick={() => setPendingDelete(p.slug)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-clay-600 hover:bg-clay-100/60"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-xl">
            <h2 className="font-display text-lg text-brand-950">Delete product?</h2>
            <p className="mt-2 text-sm text-muted">
              This removes &ldquo;{products.find((p) => p.slug === pendingDelete)?.name}&rdquo;
              from the catalog. This can&apos;t be undone.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="rounded-full px-4 py-2 text-sm text-foreground hover:bg-brand-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => confirmDelete(pendingDelete)}
                className="rounded-full bg-clay-600 px-4 py-2 text-sm font-medium text-white hover:bg-clay-600/90 disabled:opacity-60"
              >
                {busy ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
