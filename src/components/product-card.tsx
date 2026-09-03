import { Link } from "@tanstack/react-router";
import type { Product } from "../types/product";
import { PlantArt } from "./plant-art";
import { StarRating } from "./star-rating";
import { formatPrice } from "../lib/format";
import { AddToCartButton } from "./add-to-cart-button";

const TAG_LABEL: Record<string, string> = {
  bestseller: "Bestseller",
  new: "New in",
  sale: "Sale",
  "low-stock": "Low stock",
};

export function ProductCard({ product }: { product: Product }) {
  const tag = product.tags?.[0];

  return (
    <div className="group flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-2xl"
      >
        <PlantArt
          icon={product.art.icon}
          from={product.art.from}
          to={product.art.to}
          className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.04]"
          iconClassName="h-20 w-20"
        />
        {tag && (
          <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-2.5 py-1 text-xs font-medium text-brand-900 shadow-sm">
            {TAG_LABEL[tag]}
          </span>
        )}
      </Link>
      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="flex-1"
        >
          <h3 className="font-display text-[1.05rem] leading-snug text-foreground group-hover:text-brand-700">
            {product.name}
          </h3>
          {product.latinName && (
            <p className="text-xs italic text-muted">{product.latinName}</p>
          )}
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-1 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </div>
  );
}
