"use client";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { FALLBACK_SVG, ratingFor } from "@/lib/images";
import { AddToCartButton } from "./AddToCartButton";
import { ColorDots } from "./ColorDots";
import { Icon } from "./Icon";
import { SafeImage } from "./SafeImage";
import { Stars } from "./Stars";
import { WishlistButton } from "./WishlistButton";
import { useT } from "./Providers";

const SIZES = "(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw";

interface Props {
  product: Product;
  priority?: boolean;
  /** Bottom meta row: stock badge (home), star rating (related), or nothing (cart / 404). */
  meta?: "stock" | "rating" | "none";
  showAdd?: boolean;
}

export function ProductCard({ product, priority = false, meta = "stock", showAdd = true }: Props) {
  const t = useT();
  const colorLabel = product.colors.map((c) => t(`color.${c}`)).join(", ");
  const { rating, reviews } = ratingFor(product.id);
  return (
    <article className="card group relative flex w-full flex-col overflow-hidden p-2.5" aria-label={product.name}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-soft">
        <Link href={`/products/${product.id}`} tabIndex={-1} aria-hidden="true">
          <SafeImage src={product.image} fallback={FALLBACK_SVG[product.id]} alt={product.name} fill sizes={SIZES} priority={priority}
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${product.inStock ? "" : "opacity-60 grayscale-[40%]"}`} />
        </Link>
        <span className="absolute bottom-2 left-2 rounded-full bg-surface/95 px-2.5 py-0.5 text-[11px]">{t(`category.${product.category}One`)}</span>
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-2 top-2" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-1 pb-1 pt-3">
        <h3 className="font-sans text-sm font-medium tracking-normal"><Link href={`/products/${product.id}`} className="hover:text-accent">{product.name}</Link></h3>
        <p className="text-base font-semibold">{formatPrice(product.price)}</p>
        {meta === "rating" && (
          <p className="flex items-center gap-1.5 text-[11px] text-muted"><Stars rating={rating} size={12} /> {rating} ({reviews})</p>
        )}
        <div className="flex items-center justify-between gap-2">
          <ColorDots colors={product.colors} label={colorLabel} />
          {meta === "stock" && (
            <span className={`flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] ${product.inStock ? "border-primary/30 text-primary dark:border-accent/40 dark:text-accent" : "border-clay/40 text-clay"}`}>
              <Icon name="leaf" size={11} /> {product.inStock ? t("product.inStock") : t("product.outOfStock")}
            </span>
          )}
        </div>
        {showAdd && <div className="mt-auto pt-2"><AddToCartButton productId={product.id} productName={product.name} color={product.colors[0]} inStock={product.inStock} /></div>}
      </div>
    </article>
  );
}
