import Link from "next/link";
import { Leaf, AtSign, Mail } from "lucide-react";
import { categories } from "@/data/categories";
import { Newsletter } from "@/components/newsletter";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
              <Leaf size={18} />
            </span>
            <span className="font-display text-xl text-white">Zachs</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-brand-200">
            A small nursery growing beautiful, healthy plants &mdash; delivered
            straight to your door across the UK.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <AtSign size={16} />
            </a>
            <a
              href="mailto:hello@zachs.co.uk"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Shop</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
            <li>
              <Link href="/about" className="hover:text-white">
                About Zachs
              </Link>
            </li>
            <li>
              <Link href="/care-guides" className="hover:text-white">
                Care Guides
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-white">
                Delivery &amp; Returns
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">Stay in the loop</h3>
          <p className="mt-4 text-sm text-brand-200">
            Plant care tips and new arrivals, once a month.
          </p>
          <div className="mt-3">
            <Newsletter dark />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-brand-300 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Zachs Plant Nursery. All rights reserved.</p>
          <p>Zachs.co.uk &middot; Grown in Kent, UK</p>
        </div>
      </div>
    </footer>
  );
}
