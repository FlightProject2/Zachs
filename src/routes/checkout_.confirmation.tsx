import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/format";

interface ConfirmationSearch {
  order?: string;
  total?: string;
}

export const Route = createFileRoute("/checkout_/confirmation")({
  validateSearch: (search: Record<string, unknown>): ConfirmationSearch => ({
    order: typeof search.order === "string" ? search.order : undefined,
    total: typeof search.total === "string" ? search.total : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed | Zachs" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: ConfirmationPage,
});

function ConfirmationPage() {
  const { order, total } = Route.useSearch();
  const orderNumber = order ?? "ZC-000000";
  const totalAmount = total ? Number(total) : 0;

  return (
    <div className="container-page flex flex-col items-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
        <CheckCircle2 size={32} />
      </span>
      <h1 className="mt-6 font-display text-3xl text-brand-950">
        Thank you for your order!
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        Your order <span className="font-medium text-foreground">{orderNumber}</span> has
        been placed. We&apos;ve sent a confirmation email with your delivery details.
      </p>
      {totalAmount > 0 && (
        <p className="mt-2 text-sm text-muted">
          Order total: <span className="font-medium text-foreground">{formatPrice(totalAmount)}</span>
        </p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/shop"
          className="rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
        >
          Continue shopping
        </Link>
        <Link
          to="/"
          className="rounded-full border border-line px-6 py-3 text-sm text-foreground hover:border-brand-400"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
