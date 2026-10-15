import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return <CheckoutForm products={getAllProducts()} />;
}
