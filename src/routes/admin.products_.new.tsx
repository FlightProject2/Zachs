import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getCategoriesFn } from "../server/categories";
import { createProductFn } from "../server/products";
import { ProductForm } from "../components/admin/product-form";
import type { Product } from "../types/product";

export const Route = createFileRoute("/admin/products_/new")({
  loader: () => getCategoriesFn(),
  head: () => ({
    meta: [
      { title: "Add Product | Zachs Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NewProductPage,
});

function NewProductPage() {
  const categories = Route.useLoaderData();
  const router = useRouter();

  async function handleSubmit(product: Product) {
    await createProductFn({ data: { product } });
    await router.navigate({ to: "/admin/products/$slug", params: { slug: product.slug } });
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-950">Add product</h1>
      <p className="mt-1 text-sm text-muted">
        This appears on the storefront as soon as you save it.
      </p>
      <div className="mt-6">
        <ProductForm
          categories={categories}
          onSubmit={handleSubmit}
          submitLabel="Create product"
        />
      </div>
    </div>
  );
}
