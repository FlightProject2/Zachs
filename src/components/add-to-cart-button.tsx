import { useState } from "react";
import { Check, ShoppingBasket } from "lucide-react";
import { useCart } from "../context/cart-context";
import type { Product } from "../types/product";
import clsx from "clsx";

export function AddToCartButton({
  product,
  size,
  quantity = 1,
  compact = false,
  label = "Add",
}: {
  product: Product;
  size?: string;
  quantity?: number;
  compact?: boolean;
  label?: string;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      art: product.art,
      size,
      quantity,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`Add ${product.name} to basket`}
        className={clsx(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
          justAdded
            ? "border-brand-600 bg-brand-600 text-white"
            : "border-line bg-surface text-brand-800 hover:border-brand-500 hover:bg-brand-50"
        )}
      >
        {justAdded ? <Check size={16} /> : <ShoppingBasket size={16} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={clsx(
        "flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors",
        justAdded
          ? "bg-brand-700 text-white"
          : "bg-brand-900 text-white hover:bg-brand-800"
      )}
    >
      {justAdded ? (
        <>
          <Check size={18} /> Added to basket
        </>
      ) : (
        <>
          <ShoppingBasket size={18} /> {label}
        </>
      )}
    </button>
  );
}
