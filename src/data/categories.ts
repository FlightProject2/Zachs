import type { ArtIcon, CategorySlug } from "../types/product";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: ArtIcon;
  from: string;
  to: string;
}

// Seed data only — see the comment in src/data/products.ts.
export const categories: Category[] = [
  {
    slug: "houseplants",
    name: "Houseplants",
    description: "Air-purifying, statement-making leaves for every room.",
    icon: "monstera",
    from: "#26502f",
    to: "#46814d",
  },
  {
    slug: "outdoor-plants",
    name: "Outdoor Plants",
    description: "Hardy, garden-ready plants that thrive outside.",
    icon: "tree",
    from: "#14301f",
    to: "#336a3d",
  },
  {
    slug: "succulents-cacti",
    name: "Succulents & Cacti",
    description: "Low-maintenance shapes for sunny windowsills.",
    icon: "cactus",
    from: "#bc6a3d",
    to: "#e4ac7c",
  },
  {
    slug: "pots-planters",
    name: "Pots & Planters",
    description: "Ceramic, terracotta and woven homes for your plants.",
    icon: "pot",
    from: "#a4552f",
    to: "#d1874f",
  },
  {
    slug: "plant-care",
    name: "Plant Care",
    description: "Feeds, tools and tonics to keep everything thriving.",
    icon: "care",
    from: "#336a3d",
    to: "#9cc494",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    description: "Curated bundles, ready to arrive beautifully boxed.",
    icon: "gift",
    from: "#1c3f28",
    to: "#6ca06a",
  },
];
