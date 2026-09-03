import { Leaf, ShieldCheck, Truck, Undo2 } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Free UK delivery", subtitle: "On orders over £45" },
  { icon: Leaf, title: "Grown with care", subtitle: "Nursery-fresh, not warehouse-stored" },
  { icon: ShieldCheck, title: "30-day guarantee", subtitle: "Healthy on arrival, or it's on us" },
  { icon: Undo2, title: "Easy returns", subtitle: "Simple, no-fuss process" },
];

export function UspBar() {
  return (
    <div className="border-y border-line bg-brand-50/60">
      <div className="container-page grid grid-cols-2 gap-6 py-6 sm:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex items-center gap-3">
            <item.icon size={22} className="shrink-0 text-brand-700" />
            <div>
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
