import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  quantity,
  onChange,
  size = "md",
}: {
  quantity: number;
  onChange: (next: number) => void;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? "h-7 w-7" : "h-10 w-10";
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line px-1">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className={`flex items-center justify-center rounded-full hover:bg-brand-50 ${dims}`}
      >
        <Minus size={size === "sm" ? 13 : 15} />
      </button>
      <span className="w-6 text-center text-sm tabular-nums">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className={`flex items-center justify-center rounded-full hover:bg-brand-50 ${dims}`}
      >
        <Plus size={size === "sm" ? 13 : 15} />
      </button>
    </div>
  );
}
