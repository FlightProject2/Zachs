import { Link } from "@tanstack/react-router";
import type { Category } from "../data/categories";
import { PlantArt } from "./plant-art";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/shop"
      search={{ category: category.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-md"
    >
      <PlantArt
        icon={category.icon}
        from={category.from}
        to={category.to}
        className="aspect-[5/4] w-full transition-transform duration-500 group-hover:scale-[1.03]"
        iconClassName="h-14 w-14"
      />
      <div className="p-4">
        <h3 className="font-display text-lg text-brand-950">{category.name}</h3>
        <p className="mt-1 text-xs text-muted">{category.description}</p>
      </div>
    </Link>
  );
}
