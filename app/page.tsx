import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductExplorer } from "@/components/ProductExplorer";
import { Benefits } from "@/components/Benefits";
import { getAllColors, getAllProducts } from "@/lib/products";
import { getT } from "@/lib/i18n-server";

// Server Component: reads the catalogue and hands plain data to the client-side explorer.
export default async function HomePage() {
  const { t } = await getT();
  return (
    <>
      <HeroCarousel />
      <ProductExplorer products={getAllProducts()} colors={getAllColors()} />
      <Benefits t={t} tagline />
    </>
  );
}
