"use client";

import { useState, type FormEvent } from "react";

export function Newsletter({ dark = false }: { dark?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      {submitted ? (
        <p className={dark ? "text-brand-100" : "text-brand-800"}>
          You&apos;re on the list &mdash; welcome to the greenhouse. 🌿
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none transition-colors ${
              dark
                ? "border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:border-white/50"
                : "border-line bg-surface text-foreground placeholder:text-muted focus:border-brand-500"
            }`}
          />
          <button
            type="submit"
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              dark
                ? "bg-white text-brand-900 hover:bg-brand-100"
                : "bg-brand-900 text-white hover:bg-brand-800"
            }`}
          >
            Sign up
          </button>
        </form>
      )}
    </div>
  );
}
