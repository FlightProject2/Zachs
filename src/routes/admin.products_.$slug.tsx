import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { getCategoriesFn } from "@/server/categories";
import { getProductBySlugFn, updateProductFn } from "@/server/products";
import { ProductForm } from "@/components/admin/product-form";
import type { Product } from "@/types/product";

export const Route = createFileRoute("/admin/products_/$slug")({
  loader: async ({ params }) => {
    const [{ product }, categories] = await Promise.all([
      getProductBySlugFn({ data: { slug: params.slug } }),
      getCategoriesFn(),
    ]);
    if (!product) throw notFound();
    return { product, categories };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Edit ${loaderData.product.name} | Zachs Admin` : "Edit Product" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EditProductPage,
});

function EditProductPage() {
  const { product, categories } = Route.useLoaderData();
  const router = useRouter();

  async function handleSubmit(updated: Product) {
    await updateProductFn({ data: { originalSlug: product.slug, product: updated } });
    await router.invalidate();
    if (updated.slug !== product.slug) {
      await router.navigate({ to: "/admin/products/$slug", params: { slug: updated.slug } });
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-950">Edit {product.name}</h1>
      <p className="mt-1 text-sm text-muted">Changes go live on the storefront immediately.</p>
      <div className="mt-6">
        <ProductForm
          categories={categories}
          initialProduct={product}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
