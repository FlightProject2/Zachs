import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PlantArt } from "@/components/plant-art";

export function Hero() {
  return (
    <section className="container-page pt-10 sm:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
            New season arrivals now in stock
          </p>
          <h1 className="text-balance font-display text-4xl leading-[1.08] text-brand-950 sm:text-5xl lg:text-[3.4rem]">
            Beautiful plants, delivered to your door.
          </h1>
          <p className="mt-5 max-w-md text-balance text-[15px] leading-relaxed text-muted">
            Zachs is a small nursery growing healthy, happy houseplants,
            outdoor greenery and everything you need to keep them thriving.
            Hand-packed and shipped with care across the UK.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-800"
            >
              Shop all plants
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop"
              search={{ category: "houseplants" }}
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-brand-400 hover:text-brand-700"
            >
              Best for beginners
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <PlantArt
              icon="monstera"
              from="#1c3f28"
              to="#46814d"
              className="col-span-2 aspect-[16/10] rounded-3xl"
              iconClassName="h-24 w-24"
            />
            <PlantArt
              icon="cactus"
              from="#bc6a3d"
              to="#e4ac7c"
              className="aspect-square rounded-3xl"
              iconClassName="h-14 w-14"
            />
            <PlantArt
              icon="pot"
              from="#a4552f"
              to="#d1874f"
              className="aspect-square rounded-3xl"
              iconClassName="h-14 w-14"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
