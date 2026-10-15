"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/** Only ids/colour/quantity are stored (never prices) so totals always come from the catalogue. */
export interface CartLine { id: string; color: string; quantity: number }

export interface OrderLine { name: string; image: string; color: string; quantity: number; priceCents: number }
export interface Order {
  ref: string; placedAt: string; lines: OrderLine[];
  subtotalCents: number; shippingCents: number; totalCents: number;
}

interface CartState {
  lines: CartLine[];
  lastOrder: Order | null;
  add: (id: string, color: string, quantity?: number) => void;
  setQuantity: (id: string, color: string, quantity: number) => void;
  remove: (id: string, color: string) => void;
  clear: () => void;
  placeOrder: (order: Order) => void;
}

const same = (a: CartLine, id: string, color: string) => a.id === id && a.color === color;
export const MAX_QTY = 10;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      lastOrder: null,
      add: (id, color, quantity = 1) =>
        set((s) => {
          const existing = s.lines.find((l) => same(l, id, color));
          if (existing) {
            return { lines: s.lines.map((l) => (same(l, id, color) ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l)) };
          }
          return { lines: [...s.lines, { id, color, quantity: Math.min(MAX_QTY, quantity) }] };
        }),
      setQuantity: (id, color, quantity) =>
        set((s) => ({
          lines:
            quantity < 1
              ? s.lines.filter((l) => !same(l, id, color))
              : s.lines.map((l) => (same(l, id, color) ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)),
        })),
      remove: (id, color) => set((s) => ({ lines: s.lines.filter((l) => !same(l, id, color)) })),
      clear: () => set({ lines: [] }),
      placeOrder: (order) => set({ lines: [], lastOrder: order }),
    }),
    { name: "luna-cart", storage: createJSONStorage(() => localStorage) },
  ),
);

export const selectCount = (s: CartState) => s.lines.reduce((n, l) => n + l.quantity, 0);
