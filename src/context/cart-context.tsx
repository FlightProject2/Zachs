"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";
import type { ArtIcon } from "@/types/product";

export interface CartLine {
  slug: string;
  size?: string;
  quantity: number;
}

export interface CartItem extends CartLine {
  name: string;
  price: number;
  art: { icon: ArtIcon; from: string; to: string };
}

interface CartContextValue {
  lines: CartLine[];
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, quantity?: number, size?: string) => void;
  removeItem: (slug: string, size?: string) => void;
  updateQuantity: (slug: string, quantity: number, size?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "zachs-cart";

function lineKey(slug: string, size?: string) {
  return `${slug}__${size ?? ""}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage (an external system) on mount.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback((slug: string, quantity = 1, size?: string) => {
    setLines((prev) => {
      const key = lineKey(slug, size);
      const existing = prev.find((l) => lineKey(l.slug, l.size) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.slug, l.size) === key
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { slug, size, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, size?: string) => {
    const key = lineKey(slug, size);
    setLines((prev) => prev.filter((l) => lineKey(l.slug, l.size) !== key));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, quantity: number, size?: string) => {
      const key = lineKey(slug, size);
      setLines((prev) => {
        if (quantity <= 0) {
          return prev.filter((l) => lineKey(l.slug, l.size) !== key);
        }
        return prev.map((l) =>
          lineKey(l.slug, l.size) === key ? { ...l, quantity } : l
        );
      });
    },
    []
  );

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const items = useMemo<CartItem[]>(() => {
    return lines
      .map((line) => {
        const product = getProduct(line.slug);
        if (!product) return null;
        return {
          ...line,
          name: product.name,
          price: product.price,
          art: product.art,
        };
      })
      .filter((item): item is CartItem => item !== null);
  }, [lines]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    lines,
    items,
    itemCount,
    subtotal,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
