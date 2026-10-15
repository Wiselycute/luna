import type { Metadata } from "next";
import { SafeImage } from "@/components/SafeImage";
import { PHOTOS, unsplash } from "@/lib/images";
import { LeafMark } from "@/components/Logo";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Newsletter } from "@/components/Newsletter";
import { PageHero } from "@/components/PageHero";
import { getT } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "About us", description: "The story and values behind LUNA." };

export default async function AboutPage() {
  const { t } = await getT();
  const highlights: { icon: IconName; k: string }[] = [{ icon: "gem", k: "h1" }, { icon: "sparkle", k: "h2" }, { icon: "heart", k: "h3" }, { icon: "shield", k: "h4" }];
  const values: { icon: IconName; k: string }[] = [{ icon: "gem", k: "v1" }, { icon: "sparkle", k: "v2" }, { icon: "heart", k: "v3" }];
  return (
    <>
      <PageHero eyebrow={t("about.eyebrow")} title={t("about.title")} text={t("about.text")} script={t("about.script")}>
        <Link href="#story" className="btn-primary mt-6">{t("about.storyBtn")} <Icon name="arrow" size={15} /></Link>
      </PageHero>

      <ul className="container-page grid grid-cols-2 gap-5 py-8 lg:grid-cols-4">
        {highlights.map((h) => (
          <li key={h.k} className="flex items-center gap-3">
            <span className="text-primary dark:text-accent"><Icon name={h.icon} size={28} /></span>
            <span><span className="block text-sm font-medium">{t(`about.${h.k}`)}</span><span className="block text-xs text-muted">{t(`about.${h.k}d`)}</span></span>
          </li>
        ))}
      </ul>

      <section id="story" className="container-page grid gap-6 py-6 md:grid-cols-[1fr_1.2fr_0.6fr]" aria-labelledby="story-title">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line md:aspect-auto md:min-h-64">
          <SafeImage src={PHOTOS.story} alt="A LUNA necklace in its gift box" fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
          <LeafMark className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-primary/70" />
        </div>
        <div className="self-center">
          <p className="eyebrow">{t("about.story")}</p>
          <h2 id="story-title" className="mt-2 text-3xl">{t("about.storyTitle")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{t("about.storyText")}</p>
          <Link href="/#shop" className="btn-primary mt-5">{t("about.discover")} <Icon name="arrow" size={15} /></Link>
        </div>
        <dl className="card flex justify-around gap-4 p-6 md:flex-col md:justify-center">
          {[["20+", "stat1"], ["10K+", "stat2"], ["2+", "stat3"]].map(([n, k]) => (
            <div key={k}><dd className="font-serif text-3xl">{n}</dd><dt className="text-xs text-muted">{t(`about.${k}`)}</dt></div>
          ))}
        </dl>
      </section>

      <section className="container-page py-8" aria-labelledby="values">
        <div className="card relative overflow-hidden p-6 sm:p-8 md:pr-[38%]">
          <div className="absolute inset-y-0 right-0 hidden w-[36%] md:block"><SafeImage src={PHOTOS.values.startsWith("/") ? PHOTOS.values : unsplash(PHOTOS.values, 900)} alt="" fill sizes="30vw" className="object-cover" /><span aria-hidden="true" className="absolute inset-0 grid place-items-center -rotate-6 font-script text-3xl text-white drop-shadow-md">{t("about.script2")} ♡</span></div>
          <h2 id="values" className="text-2xl">{t("about.values")}</h2>
          <ul className="mt-5 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <li key={v.k} className="sm:border-l sm:border-line sm:pl-6 first:sm:border-0 first:sm:pl-0">
                <span className="text-primary dark:text-accent"><Icon name={v.icon} size={24} /></span>
                <p className="mt-2 text-sm font-medium">{t(`about.${v.k}`)}</p>
                <p className="text-xs text-muted">{t(`about.${v.k}d`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
