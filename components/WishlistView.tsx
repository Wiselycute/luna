"use client";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useHydrated } from "@/lib/useHydrated";
import { useWishlist } from "@/store/wishlist";
import { ProductCard } from "./ProductCard";
import { Icon } from "./Icon";
import { useT } from "./Providers";

export function WishlistView({ products }: { products: Product[] }) {
  const t = useT();
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);
  const saved = products.filter((p) => ids.includes(p.id));
  return (
    <div className="container-page py-10">
      <h1 className="text-4xl sm:text-5xl">{t("wishlist.title")}</h1>
      {!hydrated ? (
        <p className="mt-8 text-muted" role="status">{t("wishlist.loading")}</p>
      ) : saved.length === 0 ? (
        <div className="card mt-8 flex flex-col items-center gap-2 px-6 py-14 text-center">
          <span className="text-clay"><Icon name="heart" size={34} /></span>
          <h2 className="text-2xl">{t("wishlist.empty")}</h2>
          <p className="max-w-sm text-sm text-muted">{t("wishlist.emptyText")}</p>
          <Link href="/#shop" className="btn-primary mt-3">{t("cart.continue")}</Link>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {saved.map((p) => <li key={p.id} className="flex"><ProductCard product={p} /></li>)}
        </ul>
      )}
    </div>
  );
}
