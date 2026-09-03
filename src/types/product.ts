export type CategorySlug =
  | "houseplants"
  | "outdoor-plants"
  | "succulents-cacti"
  | "pots-planters"
  | "plant-care"
  | "gift-sets";

export type ArtIcon =
  | "monstera"
  | "fern"
  | "cactus"
  | "succulent"
  | "palm"
  | "tree"
  | "flower"
  | "sprout"
  | "pot"
  | "care"
  | "gift"
  | "vine";

export interface ProductCare {
  light: string;
  water: string;
  difficulty: "Easy" | "Moderate" | "Expert";
  petFriendly: boolean;
}

export interface Product {
  slug: string;
  name: string;
  latinName?: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  care?: ProductCare;
  sizes?: string[];
  tags?: Array<"bestseller" | "new" | "sale" | "low-stock">;
  art: {
    icon: ArtIcon;
    from: string;
    to: string;
  };
  rating: number;
  reviewCount: number;
  stock: number;
}
