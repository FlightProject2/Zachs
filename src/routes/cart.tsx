import { Link, createFileRoute } from "@tanstack/react-router";
import { ShoppingBasket, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { PlantArt } from "@/components/plant-art";
import { QuantityStepper } from "@/components/quantity-stepper";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Basket | Zachs" }] }),
  component: CartPage,
});

const FREE_DELIVERY_THRESHOLD = 45;
const DELIVERY_FEE = 4.95;

function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingBasket size={40} className="text-brand-300" />
        <h1 className="font-display text-2xl text-brand-950">Your basket is empty</h1>
        <p className="max-w-sm text-sm text-muted">
          Looks like you haven&apos;t added any plants yet. Let&apos;s fix that.
        </p>
        <Link
          to="/shop"
          className="mt-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
        >
          Shop plants
        </Link>
      </div>
    );
  }

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const remaining = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl text-brand-950">Your Basket</h1>

      {remaining > 0 && (
        <p className="mt-3 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
          Add {formatPrice(remaining)} more to unlock free UK delivery.
        </p>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul>
            {items.map((item) => (
              <li
                key={`${item.slug}__${item.size ?? ""}`}
                className="flex gap-4 border-b border-line py-6 first:pt-0"
              >
                <Link to="/product/$slug" params={{ slug: item.slug }} className="shrink-0">
                  <PlantArt
                    icon={item.art.icon}
                    from={item.art.from}
                    to={item.art.to}
                    className="h-24 w-24 rounded-xl sm:h-28 sm:w-28"
                    iconClassName="h-10 w-10"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug }}
                        className="font-display text-lg text-foreground hover:text-brand-700"
                      >
                        {item.name}
                      </Link>
                      {item.size && <p className="text-sm text-muted">{item.size}</p>}
                      <p className="mt-1 text-sm text-muted">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <span className="font-medium text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper
                      quantity={item.quantity}
                      onChange={(q) => updateQuantity(item.slug, q, item.size)}
                    />
                    <button
                      onClick={() => removeItem(item.slug, item.size)}
                      className="flex items-center gap-1.5 text-sm text-muted hover:text-clay-600"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="mt-4 text-sm text-muted underline-offset-2 hover:text-clay-600 hover:underline"
          >
            Clear basket
          </button>
        </div>

        <div className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-display text-xl text-brand-950">Order Summary</h2>
          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Delivery</span>
              <span className="font-medium text-foreground">
                {delivery === 0 ? "Free" : formatPrice(delivery)}
              </span>
            </div>
            <div className="my-2 h-px bg-line" />
            <div className="flex justify-between text-base">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-display text-lg text-brand-950">
                {formatPrice(total)}
              </span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-brand-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-brand-800"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/shop"
            className="mt-3 flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm text-brand-800 hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
