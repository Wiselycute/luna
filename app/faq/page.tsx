import type { Metadata } from "next";
import { FaqView } from "@/components/FaqView";
import { Newsletter } from "@/components/Newsletter";
import { PageHero } from "@/components/PageHero";
import { PHOTOS } from "@/lib/images";
import { getT } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "FAQ", description: "Answers about orders, shipping, returns and payments at LUNA." };

export default async function FaqPage() {
  const { t } = await getT();
  return (
    <>
      <PageHero eyebrow={t("faq.eyebrow")} title={t("faq.title")} text={t("faq.text")} script={t("faq.script")} image={PHOTOS.faqHero} />
      <FaqView />
      <Newsletter />
    </>
  );
}
