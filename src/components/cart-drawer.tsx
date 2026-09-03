"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBasket, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { PlantArt } from "@/components/plant-art";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, closeCart, items, itemCount, subtotal, updateQuantity, removeItem } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close basket"
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-surface shadow-xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg text-brand-950">
            Your basket {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button
            aria-label="Close basket"
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-brand-50"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBasket size={32} className="text-brand-300" />
            <p className="text-foreground">Your basket is empty</p>
            <p className="text-sm text-muted">
              Browse our plants and find something to bring home.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
            >
              Shop plants
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <li
                  key={`${item.slug}__${item.size ?? ""}`}
                  className="flex gap-3 border-b border-line py-4 first:pt-0"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="shrink-0"
                  >
                    <PlantArt
                      icon={item.art.icon}
                      from={item.art.from}
                      to={item.art.to}
                      className="h-20 w-20 rounded-xl"
                      iconClassName="h-9 w-9"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-foreground hover:text-brand-700"
                        >
                          {item.name}
                        </Link>
                        {item.size && (
                          <p className="text-xs text-muted">{item.size}</p>
                        )}
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full border border-line px-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity - 1, item.size)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-brand-50"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() =>
                            updateQuantity(item.slug, item.quantity + 1, item.size)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-brand-50"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        className="text-xs text-muted underline-offset-2 hover:text-clay-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-5 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex w-full items-center justify-center rounded-full bg-brand-900 px-6 py-3.5 text-sm font-medium text-white hover:bg-brand-800"
              >
                Checkout &middot; {formatPrice(subtotal)}
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 flex w-full items-center justify-center rounded-full px-6 py-2.5 text-sm text-brand-800 hover:underline"
              >
                View basket
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
