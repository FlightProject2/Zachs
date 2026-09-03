import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-brand-50/60 p-10 text-center">
        <CheckCircle2 size={32} className="text-brand-700" />
        <p className="font-display text-lg text-brand-950">Message sent</p>
        <p className="text-sm text-muted">
          Thanks for reaching out &mdash; we&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-foreground">
            Name
          </label>
          <input
            id="name"
            required
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm text-foreground">
          Subject
        </label>
        <input
          id="subject"
          required
          className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-brand-900 px-6 py-3 text-sm font-medium text-white hover:bg-brand-800"
      >
        Send message
      </button>
    </form>
  );
}
