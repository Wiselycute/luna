"use client";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/lib/useHydrated";
import { Icon } from "./Icon";
import { useT } from "./Providers";

export function WishlistButton({ productId, productName, className = "" }: { productId: string; productName: string; className?: string }) {
  const t = useT();
  const hydrated = useHydrated();
  const saved = useWishlist((s) => s.ids.includes(productId));
  const toggle = useWishlist((s) => s.toggle);
  const on = hydrated && saved;
  return (
    <button
      type="button"
      onClick={() => toggle(productId)}
      aria-pressed={on}
      aria-label={t(on ? "product.removeWishlist" : "product.addWishlist", { name: productName })}
      className={`grid h-8 w-8 place-items-center rounded-full bg-surface/90 text-fg shadow-sm transition-colors hover:text-clay ${on ? "text-clay" : ""} ${className}`}
    >
      <Icon name="heart" size={16} filled={on} />
    </button>
  );
}
