import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Icon, type IconName } from "@/components/Icon";
import { Newsletter } from "@/components/Newsletter";
import { PageHero } from "@/components/PageHero";
import { QuickQuestions } from "@/components/QuickQuestions";
import { PHOTOS } from "@/lib/images";
import { getT } from "@/lib/i18n-server";

export const metadata: Metadata = { title: "Contact us", description: "Questions about an order or a product? Get in touch with the LUNA team." };

const MAP_URL = "https://www.google.com/maps/search/?api=1&query=123+Boulevard+de+la+Libert%C3%A9+Yaound%C3%A9+Cameroon";

export default async function ContactPage() {
  const { t } = await getT();
  const channels: { icon: IconName; title: string; lines: string[] }[] = [
    { icon: "phone", title: t("contact.phone"), lines: ["+237 6 12 34 56 78", t("contact.hours")] },
    { icon: "mail", title: t("contact.email"), lines: ["support@luna.com", t("contact.reply")] },
    { icon: "pin", title: t("contact.location"), lines: ["123 Boulevard de la Liberté", "Yaoundé, Cameroon"] },
  ];
  return (
    <>
      <PageHero eyebrow={t("contact.eyebrow")} title={t("contact.title")} text={t("contact.text")} script={t("contact.script")} image={PHOTOS.contactHero} />
      <div className="container-page grid gap-6 py-8 lg:grid-cols-[20rem_1fr]">
        <section className="card p-6" aria-labelledby="touch">
          <h2 id="touch" className="text-2xl">{t("contact.touch")}</h2>
          <ul className="mt-5 space-y-5">
            {channels.map((c) => (
              <li key={c.title} className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-soft text-primary dark:text-accent"><Icon name={c.icon} size={18} /></span>
                <div className="text-sm"><p className="font-medium">{c.title}</p>{c.lines.map((l) => <p key={l} className="text-muted">{l}</p>)}</div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium">{t("contact.follow")}</p>
          <ul className="mt-2 flex gap-2">
            {(["instagram", "tiktok", "facebook", "pinterest"] as const).map((n) => (
              <li key={n}><a href="#" aria-label={n} className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-accent hover:text-accent"><Icon name={n} size={16} /></a></li>
            ))}
          </ul>
        </section>
        <ContactForm />
      </div>

      <div className="container-page grid gap-6 pb-8 md:grid-cols-[1fr_1.4fr]">
        <section aria-label={t("contact.location")} className="card relative min-h-60 overflow-hidden bg-soft">
          <iframe title={t("contact.store")} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Yaound%C3%A9%2C%20Cameroon&z=12&output=embed" className="absolute inset-0 h-full w-full border-0 dark:[filter:invert(92%)_hue-rotate(180deg)_saturate(.6)]" />
          <div className="absolute left-3 top-3 max-w-[14rem] rounded-xl bg-surface p-3 shadow-card">
            <p className="flex items-center gap-2 text-sm font-medium"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-fg"><Icon name="leaf" size={14} /></span>{t("contact.store")}</p>
            <p className="mt-1 text-xs text-muted">Yaoundé, Cameroon</p>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-xs underline underline-offset-2">{t("contact.directions")} <Icon name="arrow" size={12} /></a>
          </div>
        </section>
        <QuickQuestions />
      </div>
      <Newsletter />
    </>
  );
}
