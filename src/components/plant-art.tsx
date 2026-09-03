import {
  Cherry,
  Flower2,
  Gift,
  Leaf,
  Package,
  Sprout,
  TreeDeciduous,
  TreePine,
  Trees,
  Wand2,
} from "lucide-react";
import type { ArtIcon } from "../types/product";

const ICONS: Record<ArtIcon, typeof Leaf> = {
  monstera: Leaf,
  fern: Sprout,
  cactus: Cherry,
  succulent: Flower2,
  palm: TreePine,
  tree: TreeDeciduous,
  flower: Flower2,
  sprout: Sprout,
  pot: Package,
  care: Wand2,
  gift: Gift,
  vine: Trees,
};

interface PlantArtProps {
  icon: ArtIcon;
  from: string;
  to: string;
  className?: string;
  iconClassName?: string;
}

export function PlantArt({ icon, from, to, className, iconClassName }: PlantArtProps) {
  const Icon = ICONS[icon];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/10"
      />
      <div
        aria-hidden
        className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-black/10"
      />
      <Icon
        aria-hidden
        strokeWidth={1.1}
        className={`relative text-white/90 drop-shadow-sm ${iconClassName ?? "h-16 w-16"}`}
      />
    </div>
  );
}
