import { Link, Outlet, createFileRoute, redirect, useNavigate, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Leaf, LogOut, Package, Tags } from "lucide-react";
import { getAdminSessionFn, logoutFn } from "../server/admin";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { isAdmin } = await getAdminSessionFn();
    if (!isAdmin) {
      throw redirect({ to: "/admin/login" });
    }
  },
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

const NAV_ITEMS = [
  { to: "/admin" as const, label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products" as const, label: "Products", icon: Package },
  { to: "/admin/categories" as const, label: "Categories", icon: Tags },
];

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function handleLogout() {
    await logoutFn();
    await navigate({ to: "/admin/login" });
  }

  return (
    <div className="flex min-h-full bg-brand-50/40">
      <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-surface">
        <div className="flex items-center gap-2 border-b border-line px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-white">
            <Leaf size={16} />
          </span>
          <span className="font-display text-lg text-brand-950">Zachs Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_ITEMS.map((item) => {
            const active =
              item.to === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-brand-900 text-white"
                    : "text-foreground/80 hover:bg-brand-50"
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-brand-50"
          >
            View storefront
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-clay-600 hover:bg-clay-100/40"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
