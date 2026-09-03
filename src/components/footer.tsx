import { Link } from "@tanstack/react-router";
import { AtSign, Mail } from "lucide-react";
import type { Category } from "@/data/categories";
import { Newsletter } from "@/components/newsletter";

export function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer className="mt-24 bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center">
            <img
              src="/brand/logo-light.png"
              alt="Zachs"
              width={425}
              height={175}
              className="h-8 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-brand-200">
            A small nursery in Lurgan, Northern Ireland, growing beautiful,
            healthy plants &mdash; delivered straight to your door.
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
                <Link to="/shop" search={{ category: c.slug }} className="hover:text-white">
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
              <Link to="/about" className="hover:text-white">
                About Zachs
              </Link>
            </li>
            <li>
              <Link to="/care-guides" className="hover:text-white">
                Care Guides
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/delivery-returns" className="hover:text-white">
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
          <p>Zachs.co.uk &middot; Grown in Lurgan, Northern Ireland</p>
        </div>
      </div>
    </footer>
  );
}
