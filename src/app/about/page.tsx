import type { Metadata } from "next";
import { Leaf, Sprout, Truck, Users } from "lucide-react";
import { PlantArt } from "@/components/plant-art";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Zachs, a UK plant nursery growing healthy houseplants and outdoor greenery for over a decade.",
};

const VALUES = [
  {
    icon: Sprout,
    title: "Grown, not just sold",
    body: "Every plant starts life in our Kent glasshouses, so what you receive has been nurtured, not just shipped in from a warehouse.",
  },
  {
    icon: Leaf,
    title: "Sustainably minded",
    body: "Peat-free compost, recyclable packaging and reusable trays wherever we can &mdash; small steps, taken seriously.",
  },
  {
    icon: Users,
    title: "Real plant people",
    body: "Our small team answers every care question personally. No chatbots, just people who genuinely love plants.",
  },
  {
    icon: Truck,
    title: "Careful delivery",
    body: "Hand-packed with breathable, cushioned packaging designed specifically to protect leaves and soil in transit.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-page py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-600">
              Our story
            </p>
            <h1 className="font-display text-4xl leading-tight text-brand-950">
              A small nursery with big love for plants.
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">
              Zachs began as a single glasshouse in Kent, started by a family who
              simply couldn&apos;t stop propagating cuttings for friends and
              neighbours. Today we&apos;re still a small, independent nursery
              &mdash; just with a few more glasshouses, and a website that lets us
              share what we grow with plant lovers across the whole country.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
              We believe healthy plants start with patient growing, not
              mass-production. That&apos;s why every order is picked, checked and
              packed by hand before it leaves us.
            </p>
          </div>
          <PlantArt
            icon="tree"
            from="#14301f"
            to="#6ca06a"
            className="aspect-[4/3] w-full rounded-3xl"
            iconClassName="h-28 w-28"
          />
        </div>
      </section>

      <section className="bg-brand-50/60 py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl text-brand-950 sm:text-3xl">
            What we stand for
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-line bg-surface p-6">
                <v.icon size={22} className="text-brand-700" />
                <h3 className="mt-4 font-display text-lg text-brand-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
