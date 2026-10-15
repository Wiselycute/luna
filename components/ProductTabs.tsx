"use client";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Product } from "@/lib/types";
import { ratingFor } from "@/lib/images";
import { Stars } from "./Stars";
import { useT } from "./Providers";

const TABS = ["description", "details", "reviews"] as const;

export function ProductTabs({ product }: { product: Product }) {
  const t = useT();
  const { rating, reviews } = ratingFor(product.id);
  const id = useId();
  const [tab, setTab] = useState<(typeof TABS)[number]>("description");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % TABS.length : e.key === "ArrowLeft" ? (i + TABS.length - 1) % TABS.length : null;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next]);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={t("product.description")} className="flex gap-2 border-b border-line">
        {TABS.map((k, i) => (
          <button
            key={k} ref={(el) => { refs.current[i] = el; }} role="tab" type="button"
            id={`${id}-tab-${k}`} aria-controls={`${id}-panel-${k}`} aria-selected={tab === k} tabIndex={tab === k ? 0 : -1}
            onClick={() => setTab(k)} onKeyDown={(e) => onKey(e, i)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm transition-colors ${tab === k ? "border-accent font-medium" : "border-transparent text-muted hover:text-fg"}`}
          >
            {t(`product.${k}`)}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel-${tab}`} aria-labelledby={`${id}-tab-${tab}`} tabIndex={0} className="max-w-3xl py-6 text-sm leading-7 text-muted">
        {tab === "description" && <p>{t(`product.desc.${product.category}`, { name: product.name.toLowerCase() })}</p>}
        {tab === "details" && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            <dt className="font-medium text-fg">{t("product.detailMaterial")}</dt><dd>{t("product.materialValue")}</dd>
            <dt className="font-medium text-fg">{t("product.detailCategory")}</dt><dd>{t(`category.${product.category}One`)}</dd>
            <dt className="font-medium text-fg">{t("product.detailColors")}</dt><dd>{product.colors.map((c) => t(`color.${c}`)).join(", ")}</dd>
            <dt className="font-medium text-fg">{t("product.detailAvailability")}</dt><dd>{product.inStock ? t("product.inStock") : t("product.outOfStock")}</dd>
          </dl>
        )}
        {tab === "reviews" && <p className="flex items-center gap-3"><Stars rating={rating} size={16} /> {t("product.outOf", { rating, count: reviews })}</p>}
      </div>
    </div>
  );
}
