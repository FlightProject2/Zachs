import { useState } from "react";
import { Check, ShoppingBasket } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { QuantityStepper } from "@/components/quantity-stepper";
import clsx from "clsx";

export function ProductPurchasePanel({
  slug,
  sizes,
}: {
  slug: string;
  sizes?: string[];
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState(sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(slug, quantity, size);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="flex flex-col gap-5">
      {sizes && sizes.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={clsx(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  size === s
                    ? "border-brand-900 bg-brand-900 text-white"
                    : "border-line text-foreground hover:border-brand-400"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-foreground">Quantity</p>
        <QuantityStepper quantity={quantity} onChange={setQuantity} />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={clsx(
          "flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium transition-colors",
          justAdded ? "bg-brand-700 text-white" : "bg-brand-900 text-white hover:bg-brand-800"
        )}
      >
        {justAdded ? (
          <>
            <Check size={18} /> Added to basket
          </>
        ) : (
          <>
            <ShoppingBasket size={18} /> Add to basket
          </>
        )}
      </button>
    </div>
  );
}
