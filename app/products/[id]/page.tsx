import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Benefits } from "@/components/Benefits";
import { Icon } from "@/components/Icon";
import { Newsletter } from "@/components/Newsletter";
import { ProductGallery } from "@/components/ProductGallery";
import { Stars } from "@/components/Stars";
import { ratingFor } from "@/lib/images";
import { ProductCard } from "@/components/ProductCard";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductTabs } from "@/components/ProductTabs";
import { formatPrice } from "@/lib/format";
import { getT } from "@/lib/i18n-server";
import { getAllProducts, getProductById, getRelatedProducts } from "@/lib/products";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  const { t } = await getT();
  if (!product) return { title: t("product.notFoundMeta") };

  const description = `${product.name} – ${formatPrice(product.price)}. ${t(`product.desc.${product.category}`, { name: product.name.toLowerCase() })}`;
  return {
    title: product.name,
    description,
    openGraph: { title: `${product.name} | LUNA`, description, images: [{ url: product.image, width: 400, height: 400, alt: product.name }], type: "website" },
    twitter: { card: "summary_large_image", title: product.name, description },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  const { t } = await getT();
  const related = getRelatedProducts(product);
  const { rating, reviews } = ratingFor(product.id);

  return (
    <>
      <div className="container-page py-6">
        <nav aria-label="Breadcrumb" className="text-xs text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent">{t("nav.home")}</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/#shop" className="hover:text-accent">{t(`category.${product.category}`)}</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="text-fg">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 md:grid-cols-[1.05fr_1fr] lg:gap-12">
          <ProductGallery product={product} />

          <div>
            <span className="inline-block rounded-full border border-line bg-soft px-3 py-0.5 text-xs">{t(`category.${product.category}One`)}</span>
            <h1 className="mt-3 text-4xl">{product.name}</h1>
            <p className="mt-3 text-3xl font-semibold">{formatPrice(product.price)}</p>
            <p className="mt-3 flex items-center gap-3 text-sm"><Stars rating={rating} size={16} /> <span className="text-muted">({rating})</span><span aria-hidden="true" className="h-4 w-px bg-line" /><span>{t("product.reviewsCount", { count: reviews })}</span></p>
            <p className={`mt-3 flex items-center gap-2 text-sm ${product.inStock ? "text-primary dark:text-accent" : "text-clay"}`}>
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-600" : "bg-clay"}`} />
              {product.inStock ? t("product.inStock") : t("product.outOfStock")}
            </p>
            <ProductPurchase product={product} />
            <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-5 text-xs">
              {([["truck", "shipping"], ["refresh", "returns"], ["shield", "payment"]] as const).map(([icon, k]) => (
                <li key={k} className="flex items-start gap-2">
                  <span className="text-primary dark:text-accent"><Icon name={icon} size={22} /></span>
                  <span><span className="block font-medium">{t(`benefits.${k}`)}</span><span className="text-muted">{t(`benefits.${k}Sub`)}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12"><ProductTabs product={product} /></div>

        <section aria-labelledby="related" className="mt-12">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 id="related" className="text-2xl">{t("product.related")}</h2>
            <Link href="/#shop" className="flex items-center gap-1 text-sm hover:text-accent">{t("product.viewAll")} <Icon name="arrow" size={14} /></Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => <li key={p.id} className="flex"><ProductCard product={p} meta="rating" /></li>)}
          </ul>
        </section>
      </div>
      <Benefits t={t} />
      <Newsletter />
    </>
  );
}
