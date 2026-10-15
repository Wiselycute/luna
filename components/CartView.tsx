"use client";
import Link from "next/link";
import { useMemo, useRef } from "react";
import type { Product } from "@/lib/types";
import { FREE_SHIPPING_THRESHOLD_CENTS, formatCents, shippingFor, toCents } from "@/lib/format";
import { useHydrated } from "@/lib/useHydrated";
import { MAX_QTY, useCart } from "@/store/cart";
import { Bag, Leaves } from "./Decor";
import { FALLBACK_SVG, PHOTOS, unsplash } from "@/lib/images";
import { SafeImage } from "./SafeImage";
import { ColorDot } from "./ColorDots";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";
import { QuantityStepper } from "./QuantityStepper";
import { useI18n, useT } from "./Providers";
import { Benefits } from "./Benefits";
import { Newsletter } from "./Newsletter";

export function CartView({ products }: { products: Product[] }) {
  const { t } = useI18n();
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);

  const items = useMemo(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    return lines.flatMap((l) => {
      const product = byId.get(l.id);
      return product ? [{ ...l, product }] : [];
    });
  }, [lines, products]);

  const subtotal = items.reduce((sum, i) => sum + toCents(i.product.price) * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;
  const count = items.reduce((n, i) => n + i.quantity, 0);

  if (!hydrated) {
    return <div className="container-page py-16" role="status" aria-busy="true"><p className="text-center text-muted">{t("cart.loading")}</p></div>;
  }
  if (items.length === 0) return <EmptyCart products={products} />;

  const inCart = new Set(items.map((i) => i.id));
  const suggestions = products.filter((p) => !inCart.has(p.id) && p.inStock).slice(0, 4);
  const remaining = FREE_SHIPPING_THRESHOLD_CENTS - subtotal;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-soft via-bg to-soft">
        <div className="container-page grid items-center gap-4 py-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">{t("cart.eyebrow")}</p>
            <h1 className="mt-2 max-w-md text-4xl sm:text-5xl">{t("cart.heroTitle")}</h1>
            <p className="mt-3 max-w-md text-sm text-muted">{t("cart.heroText")}</p>
          </div>
          <div className="relative hidden md:block"><Leaves className="absolute -left-6 top-0 h-48 w-28" /><Bag className="relative mx-auto w-52" /></div>
        </div>
      </section>

      <div className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_22rem]">
        <section aria-labelledby="cart-title" className="card p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 id="cart-title" className="text-2xl">{t("cart.title")} <span className="text-base text-muted">({count === 1 ? t("cart.itemsOne") : t("cart.items", { count })})</span></h2>
            <Link href="/#shop" className="flex items-center gap-1 text-xs hover:text-accent">{t("cart.continue")} <Icon name="arrow" size={13} /></Link>
          </div>

          <ul className="mt-4 divide-y divide-line">
            {items.map(({ product, color, quantity }) => (
              <li key={`${product.id}-${color}`} className="grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3 py-4 sm:grid-cols-[5rem_1fr_auto_5rem_auto]">
                <Link href={`/products/${product.id}`} className="relative aspect-square overflow-hidden rounded-lg bg-soft">
                  <SafeImage src={product.image} fallback={FALLBACK_SVG[product.id]} alt={product.name} fill sizes="80px" className="object-cover" />
                </Link>
                <div className="min-w-0">
                  <Link href={`/products/${product.id}`} className="block truncate text-sm font-medium hover:text-accent">{product.name}</Link>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted"><span>{t(`color.${color}`)}</span><ColorDot color={color} /></p>
                  <p className="mt-1 text-sm">{formatCents(toCents(product.price))}</p>
                </div>
                <div className="col-start-2 sm:col-start-auto">
                  <QuantityStepper value={quantity} max={MAX_QTY} label={t("cart.quantityOf", { name: product.name })} onChange={(n) => setQuantity(product.id, color, n)} />
                </div>
                <p className="hidden text-right text-sm font-semibold tabular-nums sm:block">{formatCents(toCents(product.price) * quantity)}</p>
                <button
                  type="button" onClick={() => remove(product.id, color)}
                  aria-label={t("cart.remove", { name: product.name })}
                  className="col-start-2 grid h-9 w-9 place-items-center justify-self-end rounded-full text-muted hover:bg-soft hover:text-clay sm:col-start-auto sm:row-start-auto"
                >
                  <Icon name="trash" size={17} />
                </button>
              </li>
            ))}
          </ul>

          <button type="button" onClick={clear} className="mt-2 flex items-center gap-2 text-xs underline underline-offset-4 hover:text-clay">
            <Icon name="trash" size={14} /> {t("cart.clear")}
          </button>
        </section>

        <aside aria-labelledby="summary-title" className="card h-fit p-6 lg:sticky lg:top-32">
          <h2 id="summary-title" className="text-2xl">{t("cart.summary")}</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><dt>{t("cart.subtotal")} ({count === 1 ? t("cart.itemsOne") : t("cart.items", { count })})</dt><dd className="tabular-nums">{formatCents(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>{t("cart.shipping")}</dt><dd>{shipping === 0 ? t("cart.free") : formatCents(shipping)}</dd></div>
            <div className="flex items-baseline justify-between border-t border-line pt-4 text-lg font-semibold"><dt className="font-serif text-2xl font-medium">{t("cart.total")}</dt><dd className="text-2xl tabular-nums" aria-live="polite">{formatCents(total)}</dd></div>
          </dl>
          {remaining > 0 && <p className="mt-3 text-xs text-muted">{t("cart.freeShipHint", { amount: formatCents(remaining) })}</p>}
          <Link href="/checkout" className="btn-primary mt-5 w-full py-3">{t("cart.checkout")} <Icon name="arrow" size={16} /></Link>
          <Link href="/#shop" className="btn-outline mt-3 w-full py-3">{t("cart.continue")}</Link>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted"><Icon name="lock" size={13} /> {t("cart.secure")}</p>
          <div className="mt-5 flex gap-3 rounded-xl bg-soft p-4 text-xs">
            <span className="text-primary dark:text-accent"><Icon name="info" size={20} /></span>
            <div><p className="font-medium">{t("cart.savedTitle")}</p><p className="mt-0.5 text-muted">{t("cart.savedText")}</p></div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="also" className="container-page pb-10">
        <h2 id="also" className="mb-4 text-xl">{t("cart.alsoLike")}</h2>
        <SuggestionRow products={suggestions} />
      </section>
      <Newsletter />
    </>
  );
}

function SuggestionRow({ products }: { products: Product[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const t = useT();
  return (
    <div className="relative">
      <ul ref={ref} className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
        {products.map((p) => <li key={p.id} className="flex w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-[23.5%]"><ProductCard product={p} meta="none" /></li>)}
      </ul>
      <button type="button" aria-label={t("product.nextImage")} onClick={() => ref.current?.scrollBy({ left: ref.current.clientWidth * 0.8, behavior: "smooth" })} className="absolute -right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface shadow-card lg:grid"><Icon name="chevronDown" size={18} className="-rotate-90" /></button>
    </div>
  );
}

function EmptyCart({ products }: { products: Product[] }) {
  const t = useT();
  const cats = (["necklace", "earring", "top"] as const).map((c) => ({ c, product: products.find((p) => p.category === c && p.inStock)! }));
  return (
    <>
      <section className="container-page flex flex-col items-center py-14 text-center">
        <Bag className="w-44" />
        <h1 className="mt-4 text-4xl sm:text-5xl">{t("cart.emptyTitle")}</h1>
        <p className="mt-3 max-w-md text-muted">{t("cart.emptyText")}</p>
        <Link href="/#shop" className="btn-primary mt-6 px-7 py-3"><Icon name="bag" size={16} /> {t("cart.continue")} <Icon name="arrow" size={16} /></Link>
      </section>
      <Benefits t={t} />
      <section className="container-page py-10" aria-labelledby="pop">
        <p className="eyebrow">{t("cart.popular")}</p>
        <div className="mb-5 flex items-end justify-between"><h2 id="pop" className="text-3xl">{t("cart.explore")}</h2><Link href="/#shop" className="text-sm hover:text-accent">{t("cart.shopAll")} →</Link></div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {cats.map(({ c, product }) => (
            <li key={c}>
              <Link href="/#shop" className="card group block overflow-hidden">
                <div className="relative aspect-[4/3] bg-soft"><SafeImage src={PHOTOS.categories[c].startsWith("/") ? PHOTOS.categories[c] : unsplash(PHOTOS.categories[c], 900)} fallback={FALLBACK_SVG[product.id]} alt="" fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                <div className="flex items-center justify-between p-4"><div><p className="font-serif text-xl">{t(`category.${c}`)}</p><p className="text-xs text-muted">{t("cart.shopNow")} →</p></div><span className="grid h-8 w-8 place-items-center rounded-full border border-line"><Icon name="arrow" size={14} /></span></div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Newsletter />
    </>
  );
}
