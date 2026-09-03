import { Link, createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Package, Tags } from "lucide-react";
import { getProductsFn } from "@/server/products";
import { getCategoriesFn } from "@/server/categories";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [products, categories] = await Promise.all([
      getProductsFn(),
      getCategoriesFn(),
    ]);
    return { products, categories };
  },
  head: () => ({
    meta: [{ title: "Dashboard | Zachs Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { products, categories } = Route.useLoaderData();
  const lowStock = products.filter((p) => p.stock <= 5);
  const catalogValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-950">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">An overview of your catalog.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Package}
          label="Products"
          value={String(products.length)}
          href="/admin/products"
        />
        <StatCard
          icon={Tags}
          label="Categories"
          value={String(categories.length)}
          href="/admin/categories"
        />
        <StatCard
          icon={AlertTriangle}
          label="Low stock (≤5)"
          value={String(lowStock.length)}
          href="/admin/products"
          warn={lowStock.length > 0}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
        <p className="text-sm text-muted">Total catalog value (price × stock)</p>
        <p className="mt-1 font-display text-2xl text-brand-950">
          {formatPrice(catalogValue)}
        </p>
      </div>

      {lowStock.length > 0 && (
        <div className="mt-6">
          <h2 className="font-display text-lg text-brand-950">Running low</h2>
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
            {lowStock.map((p) => (
              <li key={p.slug} className="flex items-center justify-between px-4 py-3 text-sm">
                <Link
                  to="/admin/products/$slug"
                  params={{ slug: p.slug }}
                  className="text-foreground hover:text-brand-700"
                >
                  {p.name}
                </Link>
                <span className="text-clay-600">{p.stock} left</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
  warn = false,
}: {
  icon: typeof Package;
  label: string;
  value: string;
  href: "/admin/products" | "/admin/categories";
  warn?: boolean;
}) {
  return (
    <Link
      to={href}
      className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-sm"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          warn ? "bg-clay-100 text-clay-600" : "bg-brand-50 text-brand-700"
        }`}
      >
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="font-display text-xl text-brand-950">{value}</p>
      </div>
    </Link>
  );
}
