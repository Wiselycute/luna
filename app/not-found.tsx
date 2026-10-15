import { NotFoundContent } from "@/components/NotFoundContent";
import { getT } from "@/lib/i18n-server";

export default async function NotFound() {
  const { t } = await getT();
  return <NotFoundContent t={t} />;
}
