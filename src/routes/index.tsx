import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { UspBar } from "@/components/usp-bar";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { Newsletter } from "@/components/newsletter";
import { categories } from "@/data/categories";
import { getBestsellers, getNewArrivals } from "@/data/products";
import { StarRating } from "@/components/star-rating";

export const Route = createFileRoute("/")({ component: Home });

const TESTIMONIALS = [
  {
    quote:
      "My Monstera arrived in perfect condition, already bigger than the ones I've seen in shops. Genuinely impressed with the packaging.",
    name: "Freya H.",
    location: "Bristol",
  },
  {
    quote:
      "Ordered a gift set for my mum's birthday and she hasn't stopped talking about it. Will definitely be back for more.",
    name: "Tom R.",
    location: "Manchester",
  },
  {
    quote:
      "Fast delivery, great care instructions included, and the plants themselves are noticeably healthier than anywhere else I've tried.",
    name: "Priya S.",
    location: "London",
  },
];

function Home() {
  const bestsellers = getBestsellers(8);
  const newArrivals = getNewArrivals(4);

  return (
    <>
      <Hero />

      <div className="mt-14">
        <UspBar />
      </div>

      <section className="container-page mt-16">
        <SectionHeading eyebrow="Browse" title="Shop by category" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      <section className="container-page mt-20">
        <SectionHeading
          eyebrow="Loved by customers"
          title="Our bestsellers"
          description="The plants our customers keep coming back for, again and again."
          href="/shop"
        />
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-20 bg-brand-50/60 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Just landed" title="New arrivals" href="/shop" />
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page mt-20">
        <SectionHeading eyebrow="Reviews" title="What people are saying" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-line bg-surface p-6"
            >
              <StarRating rating={5} />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-medium text-brand-800">
                {t.name} <span className="font-normal text-muted">&middot; {t.location}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-900 px-8 py-12 text-white sm:flex-row sm:items-center sm:px-12">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">
                Join the Zachs greenhouse
              </h2>
              <p className="mt-2 max-w-md text-sm text-brand-100">
                Seasonal plant picks, care tips and 10% off your first order.
              </p>
            </div>
            <Newsletter dark />
          </div>
        </div>
      </section>
    </>
  );
}
