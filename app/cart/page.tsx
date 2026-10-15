import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

// Thin Server Component: the cart itself lives in localStorage, so the view is a client component.
export default function CartPage() {
  return <CartView products={getAllProducts()} />;
}
