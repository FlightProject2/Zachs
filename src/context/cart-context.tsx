import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { ArtIcon } from "../types/product";

export interface CartItem {
  slug: string;
  size?: string;
  quantity: number;
  name: string;
  price: number;
  art: { icon: ArtIcon; from: string; to: string };
}

export type CartItemInput = Omit<CartItem, "quantity"> & { quantity?: number };

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItemInput) => void;
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
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage (an external system) on mount.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItemInput) => {
    const quantity = item.quantity ?? 1;
    setItems((prev) => {
      const key = lineKey(item.slug, item.size);
      const existing = prev.find((l) => lineKey(l.slug, l.size) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l.slug, l.size) === key
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, size?: string) => {
    const key = lineKey(slug, size);
    setItems((prev) => prev.filter((l) => lineKey(l.slug, l.size) !== key));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, quantity: number, size?: string) => {
      const key = lineKey(slug, size);
      setItems((prev) => {
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

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
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
