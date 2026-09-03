import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
        <Leaf size={30} />
      </span>
      <h1 className="mt-6 font-display text-3xl text-brand-950">
        This page has wilted away.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        We couldn&apos;t find the page you were looking for. Let&apos;s get you
        back to something green.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
      >
        Back to home
      </Link>
    </div>
  );
}
