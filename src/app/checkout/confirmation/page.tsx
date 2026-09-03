import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface ConfirmationPageProps {
  searchParams: Promise<{ order?: string; total?: string }>;
}

export default async function ConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const params = await searchParams;
  const orderNumber = params.order ?? "ZC-000000";
  const total = params.total ? Number(params.total) : 0;

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
      {total > 0 && (
        <p className="mt-2 text-sm text-muted">
          Order total: <span className="font-medium text-foreground">{formatPrice(total)}</span>
        </p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/shop"
          className="rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
        >
          Continue shopping
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line px-6 py-3 text-sm text-foreground hover:border-brand-400"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
