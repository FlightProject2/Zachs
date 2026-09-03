"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf, Menu, ShoppingBasket, X } from "lucide-react";
import { categories } from "@/data/categories";
import { useCart } from "@/context/cart-context";

const NAV_LINKS = [
  { href: "/shop", label: "Shop All" },
  ...categories.map((c) => ({ href: `/shop?category=${c.slug}`, label: c.name })),
];

export function Header() {
  const { itemCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
        <div className="border-b border-line bg-brand-900 py-2 text-center text-xs text-brand-50">
          Free UK delivery on orders over £45 &middot; Grown with care in our Kent nursery
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

          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900 text-white">
              <Leaf size={18} />
            </span>
            <span className="font-display text-xl tracking-tight text-brand-950">
              Zachs
            </span>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
            {NAV_LINKS.slice(0, 7).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 transition-colors hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/about"
              className="hidden rounded-full px-3 py-2 text-sm text-foreground/80 hover:text-brand-700 lg:inline-block"
            >
              About
            </Link>
            <Link
              href="/contact"
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
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-brand-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-line" />
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-brand-50"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-brand-50"
              >
                Contact
              </Link>
              <Link
                href="/care-guides"
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
