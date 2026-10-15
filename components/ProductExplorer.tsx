"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DEFAULT_FILTERS, filterProducts, type Filters } from "@/lib/filter";
import { CATEGORIES, type Product } from "@/lib/types";
import { ColorDot } from "./ColorDots";
import { Leaves } from "./Decor";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";
import { useT } from "./Providers";

export function ProductExplorer({ products, colors }: { products: Product[]; colors: string[] }) {
  const t = useT();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const set = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));
  const visible = useMemo(() => filterProducts(products, filters), [products, filters]);
  const active = filters.query !== "" || filters.category !== "all" || filters.color !== "all";

  return (
    <section id="shop" aria-labelledby="shop-title" className="container-page py-7">
      <h2 id="shop-title" className="sr-only">{t("home.collection")}</h2>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={t("home.filterCategory")} className="flex flex-wrap gap-2 sm:gap-3">
          {CATEGORIES.map((c) => {
            const on = filters.category === c;
            return (
              <button key={c} type="button" aria-pressed={on} onClick={() => set({ category: on ? "all" : c })}
                className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-xs transition-colors sm:text-sm ${on ? "border-primary bg-primary text-primary-fg" : "border-line bg-surface hover:border-accent"}`}>
                <span className={`grid h-9 w-9 place-items-center rounded-full border ${on ? "border-primary-fg/40" : "border-line bg-soft"}`}><Icon name={c} size={20} /></span>
                {t(`category.${c}`)}
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 flex-col gap-2 sm:flex-row lg:max-w-xl">
          <div className="relative flex-1">
            <label htmlFor="search" className="sr-only">{t("home.searchLabel")}</label>
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"><Icon name="search" size={16} /></span>
            <input id="search" type="search" value={filters.query} autoComplete="off" onChange={(e) => set({ query: e.target.value })} placeholder={t("home.searchPlaceholder")} className="field pl-9" />
          </div>
          <label className="sr-only" htmlFor="category-select">{t("home.filterCategory")}</label>
          <select id="category-select" className="field sm:w-40" value={filters.category} onChange={(e) => set({ category: e.target.value as Filters["category"] })}>
            <option value="all">{t("home.allCategories")}</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{t(`category.${c}`)}</option>)}
          </select>
          <label className="sr-only" htmlFor="color-select">{t("home.filterColor")}</label>
          <select id="color-select" className="field sm:w-32" value={filters.color} onChange={(e) => set({ color: e.target.value })}>
            <option value="all">{t("home.allColors")}</option>
            {colors.map((c) => <option key={c} value={c}>{t(`color.${c}`)}</option>)}
          </select>
        </div>
      </div>

      <div role="group" aria-label={t("home.filterColor")} className="mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm" aria-hidden="true">{t("home.filterColor")}:</span>
        {colors.map((c) => {
          const on = filters.color === c;
          return (
            <button key={c} type="button" aria-pressed={on} onClick={() => set({ color: on ? "all" : c })}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${on ? "border-accent bg-accent/25 font-medium" : "border-line bg-surface hover:border-accent"}`}>
              <ColorDot color={c} size={16} /> {t(`color.${c}`)}
            </button>
          );
        })}
      </div>

      <div className="mb-4 mt-8 flex items-baseline justify-between">
        <h2 className="text-2xl sm:text-3xl">{t("home.collection")}</h2>
        <p className="flex items-center gap-4 text-xs">
          <span role="status" aria-live="polite" className="text-muted">{visible.length === 1 ? t("home.resultsOne") : t("home.results", { count: visible.length })}</span>
          <Link href="/#shop" onClick={() => setFilters(DEFAULT_FILTERS)} className="flex items-center gap-1 hover:text-accent">{t("product.viewAll")} <Icon name="arrow" size={13} /></Link>
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p, i) => <li key={p.id} className="flex"><ProductCard product={p} priority={i < 4} showAdd={false} /></li>)}
        </ul>
      ) : (
        <div className="card relative flex flex-col items-center gap-2 overflow-hidden px-6 py-12 text-center">
          <Leaves className="absolute -left-2 top-0 h-full w-20 -scale-x-100" /><Leaves className="absolute -right-2 top-0 h-full w-20" />
          <span className="grid h-11 w-11 place-items-center rounded-full border border-line"><Icon name="search" size={22} /></span>
          <h3 className="text-2xl">{t("home.empty")}</h3>
          <p className="max-w-sm text-sm text-muted">{t("home.emptyHint")}</p>
          {active && <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)} className="btn-primary relative mt-3">{t("home.clear")}</button>}
        </div>
      )}
    </section>
  );
}
