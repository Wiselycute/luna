"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { FALLBACK_SVG, galleryFor } from "@/lib/images";
import { Icon } from "./Icon";
import { SafeImage } from "./SafeImage";
import { WishlistButton } from "./WishlistButton";
import { useT } from "./Providers";

export function ProductGallery({ product }: { product: Product }) {
  const t = useT();
  const images = galleryFor(product.image, product.category);
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + images.length) % images.length);
  const arrow = "absolute top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-surface/85 text-fg shadow-sm hover:bg-surface";
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <ul className="flex gap-2 sm:flex-col" aria-label="Thumbnails">
        {images.map((src, n) => (
          <li key={src}>
            <button type="button" onClick={() => setI(n)} aria-label={t("product.viewImage", { n: n + 1 })} aria-current={n === i}
              className={`relative block h-16 w-14 overflow-hidden rounded-lg border-2 bg-soft sm:h-[70px] sm:w-16 ${n === i ? "border-primary dark:border-accent" : "border-line"}`}>
              <SafeImage src={src} alt="" fill sizes="64px" className="object-cover" fallback={n === 0 ? FALLBACK_SVG[product.id] : undefined} />
            </button>
          </li>
        ))}
      </ul>
      <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl border border-line bg-soft">
        <SafeImage key={images[i]} src={images[i]} alt={`${product.name} – ${i + 1} / ${images.length}`} fill priority={i === 0} sizes="(min-width: 768px) 40vw, 100vw"
          className={`object-cover ${product.inStock ? "" : "opacity-70"}`} fallback={i === 0 ? FALLBACK_SVG[product.id] : undefined} />
        <WishlistButton productId={product.id} productName={product.name} className="absolute right-3 top-3" />
        <button type="button" onClick={() => go(i - 1)} aria-label={t("product.prevImage")} className={`${arrow} left-3`}><Icon name="chevronDown" size={18} className="rotate-90" /></button>
        <button type="button" onClick={() => go(i + 1)} aria-label={t("product.nextImage")} className={`${arrow} right-3`}><Icon name="chevronDown" size={18} className="-rotate-90" /></button>
        <span aria-hidden="true" className="absolute bottom-3 right-3 rounded-full bg-fg/60 px-2.5 py-0.5 text-[11px] text-bg">{i + 1} / {images.length}</span>
      </div>
    </div>
  );
}
