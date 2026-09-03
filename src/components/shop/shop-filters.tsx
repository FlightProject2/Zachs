import { useNavigate } from "@tanstack/react-router";
import type { Category } from "@/data/categories";
import clsx from "clsx";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export function ShopFilters({
  activeCategory,
  activeSort,
  categories,
}: {
  activeCategory: string;
  activeSort: string;
  categories: Category[];
}) {
  const navigate = useNavigate({ from: "/shop" });

  function updateParam(key: "category" | "sort", value: string) {
    navigate({
      search: (prev) => {
        const next = { ...prev };
        if (value === "all" || value === "featured") {
          delete next[key];
        } else {
          next[key] = value;
        }
        return next;
      },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParam("category", "all")}
          className={clsx(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            activeCategory === "all"
              ? "border-brand-900 bg-brand-900 text-white"
              : "border-line text-foreground hover:border-brand-400"
          )}
        >
          All plants
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => updateParam("category", c.slug)}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              activeCategory === c.slug
                ? "border-brand-900 bg-brand-900 text-white"
                : "border-line text-foreground hover:border-brand-400"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 text-sm">
        <label htmlFor="sort" className="text-muted">
          Sort by
        </label>
        <select
          id="sort"
          value={activeSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="rounded-full border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-brand-500"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
