import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBasket, X } from "lucide-react";
import type { Category } from "@/data/categories";
import { useCart } from "@/context/cart-context";

export function Header({ categories }: { categories: Category[] }) {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { slug: undefined, label: "Shop All" },
    ...categories.map((c) => ({ slug: c.slug, label: c.name })),
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
        <div className="border-b border-line bg-brand-900 py-2 text-center text-xs text-brand-50">
          Free NI delivery on orders over £45 &middot; Grown with care in our Lurgan nursery
        </div>
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-brand-900 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center">
            <img
              src="/brand/logo.png"
              alt="Zachs"
              width={425}
              height={175}
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {navLinks.slice(0, 7).map((link) => (
              <Link
                key={link.label}
                to="/shop"
                search={link.slug ? { category: link.slug } : {}}
                className="text-sm text-foreground/80 transition-colors hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              to="/about"
              className="hidden rounded-full px-3 py-2 text-sm text-foreground/80 hover:text-brand-700 lg:inline-block"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hidden rounded-full px-3 py-2 text-sm text-foreground/80 hover:text-brand-700 lg:inline-block"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label="Open basket"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-900 hover:bg-brand-50"
            >
              <ShoppingBasket size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay-500 px-1 text-[11px] font-medium text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-xs flex-col bg-surface p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg text-brand-950">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-brand-50"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to="/shop"
                  search={link.slug ? { category: link.slug } : {}}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-brand-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-line" />
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-brand-50"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-brand-50"
              >
                Contact
              </Link>
              <Link
                to="/care-guides"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-brand-50"
              >
                Care Guides
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
