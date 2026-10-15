"use client";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/store/cart";
import { Icon } from "./Icon";
import { useT } from "./Providers";

interface Props {
  productId: string;
  productName: string;
  color: string;
  quantity?: number;
  inStock: boolean;
  size?: "sm" | "lg";
}

/** Small client leaf: the only part of the product page that needs the cart store. */
export function AddToCartButton({ productId, productName, color, quantity = 1, inStock, size = "sm" }: Props) {
  const t = useT();
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = () => {
    add(productId, color, quantity);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={!inStock}
        aria-label={`${t("product.addNamed", { name: productName })}`}
        className={`btn-primary ${size === "lg" ? "flex-1 py-3 text-base" : "w-full rounded-lg py-2 text-xs"}`}
      >
        <Icon name={added ? "check" : "bag"} size={size === "lg" ? 18 : 14} />
        {!inStock ? t("product.soldOut") : added ? t("product.added") : t("product.addToCart")}
      </button>
      <span role="status" aria-live="polite" className="sr-only">{added ? `${productName}: ${t("product.added")}` : ""}</span>
    </>
  );
}
