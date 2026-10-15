import { NotFoundContent } from "@/components/NotFoundContent";
import { getT } from "@/lib/i18n-server";

export default async function ProductNotFound() {
  const { t } = await getT();
  return <NotFoundContent t={t} variant="product" />;
}
