import type { Metadata } from "next";
import { WishlistView } from "@/components/WishlistView";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return <WishlistView products={getAllProducts()} />;
}
