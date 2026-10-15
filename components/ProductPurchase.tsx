"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { MAX_QTY } from "@/store/cart";
import { AddToCartButton } from "./AddToCartButton";
import { ColorDot } from "./ColorDots";
import { Icon } from "./Icon";
import { QuantityStepper } from "./QuantityStepper";
import { WishlistButton } from "./WishlistButton";
import { useT } from "./Providers";

export function ProductPurchase({ product }: { product: Product }) {
  const t = useT();
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6 space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm">{t("product.color")}: <span className="font-medium">{t(`color.${color}`)}</span></legend>
        <div className="flex gap-3" role="radiogroup" aria-label={t("product.color")}>
          {product.colors.map((c) => (
            <label key={c} className="cursor-pointer">
              <input type="radio" name="color" value={c} checked={color === c} onChange={() => setColor(c)} className="peer sr-only" />
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-transparent ring-offset-2 ring-offset-bg transition peer-checked:border-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                <ColorDot color={c} size={26} />
                <span className="sr-only">{t(`color.${c}`)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} max={MAX_QTY} label={t("product.quantity")} disabled={!product.inStock} />
        <AddToCartButton productId={product.id} productName={product.name} color={color} quantity={qty} inStock={product.inStock} size="lg" />
        <WishlistButton productId={product.id} productName={product.name} className="h-11 w-11 border border-line" />
      </div>
      {!product.inStock && (
        <p className="flex items-center gap-2 text-sm text-clay"><Icon name="info" size={16} /> {t("product.outOfStock")}</p>
      )}
    </div>
  );
}
