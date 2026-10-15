import Link from "next/link";
import { Bag } from "./Decor";
import { LeafMark } from "./Logo";
import { SafeImage } from "./SafeImage";
import { PHOTOS, unsplash } from "@/lib/images";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";
import { getAllProducts } from "@/lib/products";
import type { Translate } from "@/lib/i18n";

/** Used by the global and product-level not-found pages. */
export function NotFoundContent({ t, variant = "page" }: { t: Translate; variant?: "page" | "product" }) {
  const popular = getAllProducts().filter((p) => p.inStock).slice(0, 4);
  return (
    <>
      <section className="border-b border-line bg-gradient-to-br from-soft via-bg to-soft">
        <div className="container-page grid items-center gap-6 py-12 md:grid-cols-2">
          <div>
            <p className="font-serif text-8xl leading-none text-primary dark:text-accent sm:text-9xl" aria-hidden="true">4<span className="relative inline-block">0<LeafMark className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 sm:h-9 sm:w-9" /></span>4</p>
            <h1 className="mt-4 text-4xl">{variant === "product" ? t("notFound.productTitle") : t("notFound.title")}</h1>
            <p className="mt-3 max-w-md text-muted">{variant === "product" ? t("notFound.productText") : t("notFound.text")}</p>
            <Link href="/" className="btn-primary mt-6"><Icon name="arrowLeft" size={16} /> {t("notFound.back")}</Link>
          </div>
          <Bag className="mx-auto w-56 sm:w-64" />
        </div>
      </section>
      <section className="container-page py-10" aria-labelledby="maybe">
        <div className="mb-5 flex items-end justify-between">
          <div><h2 id="maybe" className="text-3xl">{t("notFound.maybe")}</h2><p className="mt-1 text-sm text-muted">{t("notFound.maybeText")}</p></div>
          <Link href="/#shop" className="hidden items-center gap-1 text-sm hover:text-accent sm:flex">{t("product.viewAll")} <Icon name="arrow" size={14} /></Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {popular.map((p) => <li key={p.id} className="flex"><ProductCard product={p} meta="none" /></li>)}
        </ul>
        <div className="relative mt-10 grid items-center overflow-hidden rounded-2xl border border-line bg-soft sm:grid-cols-[1fr_1.2fr]">
          <div className="relative h-40 sm:h-full sm:min-h-40"><SafeImage src={unsplash(PHOTOS.banner, 900)} alt="" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" /></div>
          <div className="p-6 sm:p-8"><h2 className="text-2xl">{t("notFound.discover")}</h2><p className="mt-1 text-sm">{t("notFound.discoverText")}</p>
            <Link href="/#shop" className="btn-primary mt-4">{t("notFound.explore")} <Icon name="arrow" size={16} /></Link></div>
        </div>
      </section>
    </>
  );
}
