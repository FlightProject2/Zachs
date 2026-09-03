import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Sun, Thermometer, Wind } from "lucide-react";
import { PlantArt } from "@/components/plant-art";
import { SectionHeading } from "@/components/section-heading";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/care-guides")({
  head: () => ({
    meta: [
      { title: "Plant Care Guides | Zachs, Lurgan" },
      {
        name: "description",
        content:
          "Simple, practical plant care guides from the Zachs nursery team in Lurgan — including tips suited to Northern Ireland's mild, damp climate.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/care-guides` }],
  }),
  component: CareGuidesPage,
});

const GUIDES = [
  {
    title: "The beginner's guide to watering",
    icon: "monstera" as const,
    from: "#26502f",
    to: "#9cc494",
    excerpt:
      "More houseplants are lost to overwatering than underwatering. Learn how to check soil moisture properly and build a watering rhythm that suits your home.",
  },
  {
    title: "Choosing the right light for every room",
    icon: "fern" as const,
    from: "#336a3d",
    to: "#c9e2bf",
    excerpt:
      "Not all 'bright light' is equal. A quick guide to reading your windows and matching plants to the light your home actually gets.",
  },
  {
    title: "Repotting without the stress",
    icon: "pot" as const,
    from: "#a4552f",
    to: "#e4ac7c",
    excerpt:
      "Signs your plant has outgrown its pot, and a simple step-by-step for repotting without shocking the roots.",
  },
  {
    title: "Succulents & cacti: less is more",
    icon: "cactus" as const,
    from: "#bc6a3d",
    to: "#f7e4d3",
    excerpt:
      "Why 'neglect' is often the kindest thing you can do for desert plants, and how to spot the difference between dormancy and distress.",
  },
  {
    title: "Keeping pests off your plants naturally",
    icon: "care" as const,
    from: "#1c3f28",
    to: "#6ca06a",
    excerpt:
      "Simple, plant-safe ways to spot and treat common pests like spider mites and fungus gnats before they spread.",
  },
  {
    title: "Feeding your plants through the seasons",
    icon: "sprout" as const,
    from: "#14301f",
    to: "#46814d",
    excerpt:
      "When to feed, when to hold off, and how to avoid the common mistake of overfeeding a dormant plant.",
  },
];

const ESSENTIALS = [
  { icon: Sun, title: "Light", body: "Match light levels before anything else — it's the #1 factor in plant health." },
  { icon: Droplets, title: "Water", body: "Check the top 2-3cm of soil before watering. When in doubt, wait a day." },
  { icon: Thermometer, title: "Temperature", body: "Most houseplants prefer 15-24°C and dislike cold draughts or radiators." },
  { icon: Wind, title: "Humidity", body: "Group plants together or use a pebble tray to raise humidity naturally." },
];

function CareGuidesPage() {
  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-brand-600">
          Learn
        </p>
        <h1 className="font-display text-4xl text-brand-950">Plant Care Guides</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
          Practical, no-nonsense advice from our growers &mdash; so whatever
          arrives on your doorstep keeps thriving long after unboxing day.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ESSENTIALS.map((e) => (
          <div key={e.title} className="rounded-2xl border border-line bg-surface p-5">
            <e.icon size={20} className="text-brand-700" />
            <h3 className="mt-3 text-sm font-medium text-foreground">{e.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{e.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Guides" title="Latest from the nursery" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide) => (
            <article
              key={guide.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <PlantArt
                icon={guide.icon}
                from={guide.from}
                to={guide.to}
                className="aspect-[16/9] w-full"
                iconClassName="h-14 w-14"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg text-brand-950">{guide.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {guide.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
