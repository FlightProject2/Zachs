import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { Lock, ShoppingBasket } from "lucide-react";
import { useCart } from "../context/cart-context";
import { PlantArt } from "../components/plant-art";
import { formatPrice } from "../lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Zachs" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: CheckoutPage,
});

const FREE_DELIVERY_THRESHOLD = 45;
const DELIVERY_FEE = 4.95;

function generateOrderNumber() {
  return `ZC-${Math.floor(100000 + Math.random() * 900000)}`;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingBasket size={40} className="text-brand-300" />
        <h1 className="font-display text-2xl text-brand-950">Your basket is empty</h1>
        <p className="max-w-sm text-sm text-muted">
          Add some plants to your basket before checking out.
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const orderNumber = generateOrderNumber();
    window.setTimeout(() => {
      clearCart();
      navigate({
        to: "/checkout/confirmation",
        search: { order: orderNumber, total: total.toFixed(2) },
      });
    }, 700);
  }

  return (
    <div className="container-page py-10">
      <h1 className="font-display text-3xl text-brand-950">Checkout</h1>
      <p className="mt-2 max-w-lg text-sm text-muted">
        This is a demo checkout &mdash; no payment will actually be taken.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <fieldset className="space-y-4">
            <legend className="font-display text-xl text-brand-950">Contact</legend>
            <Field label="Email address" name="email" type="email" required />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-xl text-brand-950">
              Shipping address
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="first-name" required />
              <Field label="Last name" name="last-name" required />
            </div>
            <Field label="Address" name="address" required />
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="City" name="city" required />
              <Field label="Postcode" name="postcode" required />
              <Field label="Country" name="country" defaultValue="United Kingdom" required />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="flex items-center gap-2 font-display text-xl text-brand-950">
              <Lock size={16} /> Payment
            </legend>
            <Field label="Card number" name="card-number" placeholder="4242 4242 4242 4242" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Expiry" name="expiry" placeholder="MM / YY" required />
              <Field label="CVC" name="cvc" placeholder="123" required />
            </div>
          </fieldset>
        </div>

        <div className="h-fit rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-display text-xl text-brand-950">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={`${item.slug}__${item.size ?? ""}`}
                className="flex items-center gap-3"
              >
                <PlantArt
                  icon={item.art.icon}
                  from={item.art.from}
                  to={item.art.to}
                  className="h-12 w-12 shrink-0 rounded-lg"
                  iconClassName="h-5 w-5"
                />
                <div className="flex-1 text-sm">
                  <p className="text-foreground">{item.name}</p>
                  <p className="text-muted">Qty {item.quantity}</p>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
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
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
          >
            {submitting ? "Placing order..." : `Place order · ${formatPrice(total)}`}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
      />
    </div>
  );
}
