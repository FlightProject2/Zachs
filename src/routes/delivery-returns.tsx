import { Link, createFileRoute } from "@tanstack/react-router";
import { Leaf, MapPin, PackageCheck, RotateCcw, Truck } from "lucide-react";
import { JsonLd } from "../components/json-ld";
import { SITE_URL } from "../lib/site";

export const Route = createFileRoute("/delivery-returns")({
  head: () => ({
    meta: [
      { title: "Delivery & Returns | Zachs, Lurgan" },
      {
        name: "description",
        content:
          "Delivery areas, costs and timings for Zachs plant nursery in Lurgan, Northern Ireland, plus our 30-day healthy-on-arrival guarantee and returns process.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/delivery-returns` }],
  }),
  component: DeliveryReturnsPage,
});

const FAQS = [
  {
    question: "How much does delivery cost in Northern Ireland?",
    answer:
      "Delivery is free on all Northern Ireland orders over £45. Below £45, a flat £4.95 courier charge applies, and most orders arrive within 2–3 working days of dispatch.",
  },
  {
    question: "Do you deliver locally to Lurgan?",
    answer:
      "Yes. We regularly deliver to Lurgan, Craigavon, Portadown, Armagh, Banbridge and Belfast. Local collection from the nursery is also available — choose it at checkout or get in touch to arrange a time.",
  },
  {
    question: "What happens if my plant arrives damaged or unwell?",
    answer:
      "Every plant is covered by our 30-day healthy-on-arrival guarantee. Email us a photo within 48 hours of delivery and we'll send a free replacement or refund.",
  },
  {
    question: "Can I return a plant if I change my mind?",
    answer:
      "Pots, planters and plant care items can be returned unused within 14 days for a full refund. As living products, plants themselves are covered by our healthy-on-arrival guarantee rather than a standard return.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const LOCAL_AREAS = [
  "Lurgan",
  "Craigavon",
  "Portadown",
  "Armagh",
  "Banbridge",
  "Belfast",
];

function DeliveryReturnsPage() {
  return (
    <div className="container-page py-14">
      <JsonLd data={faqJsonLd} />
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-600">
          Good to know
        </p>
        <h1 className="font-display text-4xl text-brand-950">Delivery &amp; Returns</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
          Every plant is hand-packed at our nursery in Lurgan before it leaves us.
          Here&apos;s exactly what to expect once you&apos;ve placed an order.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <Truck size={22} className="text-brand-700" />
          <h2 className="mt-4 font-display text-lg text-brand-950">
            Delivery across Northern Ireland
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Free delivery on all Northern Ireland orders over £45. Under £45,
            a flat £4.95 courier charge applies. Most orders arrive within
            2&ndash;3 working days of dispatch.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <MapPin size={22} className="text-brand-700" />
          <h2 className="mt-4 font-display text-lg text-brand-950">
            Local to Lurgan?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We regularly deliver to {LOCAL_AREAS.slice(0, -1).join(", ")} and{" "}
            {LOCAL_AREAS[LOCAL_AREAS.length - 1]}. Local collection from the
            nursery is also available &mdash; just choose it at checkout or
            get in touch to arrange a time.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <PackageCheck size={22} className="text-brand-700" />
          <h2 className="mt-4 font-display text-lg text-brand-950">
            Healthy-on-arrival guarantee
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Every plant is covered by our 30-day guarantee. If anything
            arrives damaged or unwell, email us a photo within 48 hours of
            delivery and we&apos;ll send a free replacement or refund.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6">
          <RotateCcw size={22} className="text-brand-700" />
          <h2 className="mt-4 font-display text-lg text-brand-950">Returns</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Pots, planters and plant care items can be returned unused within
            14 days for a full refund. As living products, plants themselves
            are covered by our guarantee above rather than a standard return.
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-2xl bg-brand-50/60 p-6">
        <Leaf size={20} className="mt-0.5 shrink-0 text-brand-700" />
        <p className="text-sm leading-relaxed text-brand-800">
          Questions about a specific order or postcode? Our team in Lurgan is
          happy to help &mdash; see the{" "}
          <Link to="/contact" className="underline">
            contact page
          </Link>{" "}
          for ways to reach us.
        </p>
      </div>
    </div>
  );
}
