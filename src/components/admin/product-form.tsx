import { useState } from "react";
import type { FormEvent } from "react";
import type { ArtIcon, Product } from "@/types/product";
import type { Category } from "@/data/categories";

const ART_ICONS: ArtIcon[] = [
  "monstera",
  "fern",
  "cactus",
  "succulent",
  "palm",
  "tree",
  "flower",
  "sprout",
  "pot",
  "care",
  "gift",
  "vine",
];

const TAG_OPTIONS = ["bestseller", "new", "sale", "low-stock"] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function emptyProduct(categories: Category[]): Product {
  return {
    slug: "",
    name: "",
    category: categories[0]?.slug ?? "houseplants",
    price: 0,
    shortDescription: "",
    description: "",
    art: { icon: "monstera", from: "#26502f", to: "#46814d" },
    rating: 5,
    reviewCount: 0,
    stock: 0,
    tags: [],
    sizes: [],
    care: { light: "", water: "", difficulty: "Easy", petFriendly: false },
  };
}

export function ProductForm({
  categories,
  initialProduct,
  onSubmit,
  submitLabel = "Save product",
}: {
  categories: Category[];
  initialProduct?: Product;
  onSubmit: (product: Product) => Promise<void>;
  submitLabel?: string;
}) {
  const [product, setProduct] = useState<Product>(
    initialProduct ?? emptyProduct(categories)
  );
  const [sizesText, setSizesText] = useState(product.sizes?.join(", ") ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialProduct));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<TKey extends keyof Product>(key: TKey, value: Product[TKey]) {
    setProduct((prev) => ({ ...prev, [key]: value }));
  }

  function updateCare<TKey extends keyof NonNullable<Product["care"]>>(
    key: TKey,
    value: NonNullable<Product["care"]>[TKey]
  ) {
    setProduct((prev) => ({
      ...prev,
      care: {
        light: prev.care?.light ?? "",
        water: prev.care?.water ?? "",
        difficulty: prev.care?.difficulty ?? "Easy",
        petFriendly: prev.care?.petFriendly ?? false,
        [key]: value,
      },
    }));
  }

  function updateArt<TKey extends keyof Product["art"]>(key: TKey, value: Product["art"][TKey]) {
    setProduct((prev) => ({ ...prev, art: { ...prev.art, [key]: value } }));
  }

  function toggleTag(tag: (typeof TAG_OPTIONS)[number]) {
    setProduct((prev) => {
      const tags = prev.tags ?? [];
      return {
        ...prev,
        tags: tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag],
      };
    });
  }

  function handleNameChange(name: string) {
    update("name", name);
    if (!slugTouched) {
      update("slug", slugify(name));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const finalProduct: Product = {
      ...product,
      sizes: sizesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    setSubmitting(true);
    try {
      await onSubmit(finalProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && (
        <p className="rounded-xl bg-clay-100/60 px-4 py-2.5 text-sm text-clay-600">{error}</p>
      )}

      <fieldset className="space-y-4">
        <legend className="font-display text-lg text-brand-950">Basics</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input
              required
              value={product.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
          <Field label="Latin name">
            <input
              value={product.latinName ?? ""}
              onChange={(e) => update("latinName", e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
        </div>
        <Field label="Slug (URL)">
          <input
            required
            value={product.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 font-mono text-xs"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category">
            <select
              value={product.category}
              onChange={(e) => update("category", e.target.value as Product["category"])}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Icon artwork">
            <select
              value={product.art.icon}
              onChange={(e) => updateArt("icon", e.target.value as ArtIcon)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            >
              {ART_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Gradient from">
            <input
              type="color"
              value={product.art.from}
              onChange={(e) => updateArt("from", e.target.value)}
              className="h-10 w-full rounded-lg border border-line"
            />
          </Field>
          <Field label="Gradient to">
            <input
              type="color"
              value={product.art.to}
              onChange={(e) => updateArt("to", e.target.value)}
              className="h-10 w-full rounded-lg border border-line"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg text-brand-950">Pricing &amp; stock</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Price (£)">
            <input
              type="number"
              required
              min={0}
              step="0.01"
              value={product.price}
              onChange={(e) => update("price", Number(e.target.value))}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
          <Field label="Compare-at price (£)">
            <input
              type="number"
              min={0}
              step="0.01"
              value={product.compareAtPrice ?? ""}
              onChange={(e) =>
                update(
                  "compareAtPrice",
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
          <Field label="Stock">
            <input
              type="number"
              required
              min={0}
              value={product.stock}
              onChange={(e) => update("stock", Number(e.target.value))}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Tags</p>
          <div className="flex flex-wrap gap-3">
            {TAG_OPTIONS.map((tag) => (
              <label key={tag} className="flex items-center gap-1.5 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={product.tags?.includes(tag) ?? false}
                  onChange={() => toggleTag(tag)}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg text-brand-950">Descriptions</legend>
        <Field label="Short description (used in listings)">
          <input
            required
            value={product.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
          />
        </Field>
        <Field label="Full description">
          <textarea
            required
            rows={4}
            value={product.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
          />
        </Field>
        <Field label="Sizes (comma-separated)">
          <input
            value={sizesText}
            onChange={(e) => setSizesText(e.target.value)}
            placeholder="12cm pot, 17cm pot, 24cm pot"
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg text-brand-950">Care</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Light">
            <input
              value={product.care?.light ?? ""}
              onChange={(e) => updateCare("light", e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
          <Field label="Water">
            <input
              value={product.care?.water ?? ""}
              onChange={(e) => updateCare("water", e.target.value)}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Difficulty">
            <select
              value={product.care?.difficulty ?? "Easy"}
              onChange={(e) =>
                updateCare("difficulty", e.target.value as "Easy" | "Moderate" | "Expert")
              }
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Expert">Expert</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 self-end pb-2.5 text-sm text-foreground">
            <input
              type="checkbox"
              checked={product.care?.petFriendly ?? false}
              onChange={(e) => updateCare("petFriendly", e.target.checked)}
            />
            Pet friendly
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-lg text-brand-950">Reviews</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Rating (0–5)">
            <input
              type="number"
              min={0}
              max={5}
              step="0.1"
              value={product.rating}
              onChange={(e) => update("rating", Number(e.target.value))}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
          <Field label="Review count">
            <input
              type="number"
              min={0}
              value={product.reviewCount}
              onChange={(e) => update("reviewCount", Number(e.target.value))}
              className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
            />
          </Field>
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-60"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-foreground">{label}</label>
      {children}
    </div>
  );
}
