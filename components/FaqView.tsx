"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Accordion } from "./Accordion";
import { Icon, type IconName } from "./Icon";
import { useT } from "./Providers";

export function FaqView() {
  const t = useT();
  const [q, setQ] = useState("");
  const all = useMemo(() => Array.from({ length: 9 }, (_, i) => ({ id: `q${i + 1}`, question: t(`faq.q${i + 1}`), answer: t(`faq.a${i + 1}`) })), [t]);
  const items = all.filter((i) => `${i.question} ${i.answer}`.toLowerCase().includes(q.trim().toLowerCase()));
  const links: { icon: IconName; k: string }[] = [{ icon: "truck", k: "l1" }, { icon: "refresh", k: "l2" }, { icon: "top", k: "l3" }, { icon: "box", k: "l4" }, { icon: "lock", k: "l5" }];

  return (
    <div className="container-page py-8">
      <div className="relative">
        <label htmlFor="faq-search" className="sr-only">{t("faq.searchLabel")}</label>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"><Icon name="search" size={18} /></span>
        <input id="faq-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("faq.search")} className="field rounded-full py-3 pl-11 pr-14" />
        <span className="pointer-events-none absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg bg-primary text-primary-fg"><Icon name="search" size={16} /></span>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section aria-labelledby="faq-h">
          <h2 id="faq-h" className="mb-3 text-3xl">{t("faq.heading")}</h2>
          <div className="card px-5">
            {items.length ? <Accordion key={q === "" ? "all" : "filtered"} items={items} defaultOpen={q === "" ? "q1" : undefined} /> : <p role="status" className="py-8 text-center text-sm text-muted">{t("faq.none")}</p>}
          </div>
        </section>
        <div className="space-y-5">
          <nav aria-labelledby="ql" className="card p-5">
            <h2 id="ql" className="text-xl">{t("faq.quick")}</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {links.map((l) => <li key={l.k}><Link href="/contact" className="flex items-center gap-3 hover:text-accent"><Icon name={l.icon} size={18} /> {t(`faq.${l.k}`)}</Link></li>)}
            </ul>
          </nav>
          <aside className="card p-5">
            <div className="flex gap-3"><span className="text-primary dark:text-accent"><Icon name="headset" size={30} /></span><div><h2 className="text-xl">{t("faq.still")}</h2><p className="text-xs text-muted">{t("faq.stillText")}</p></div></div>
            <Link href="/contact" className="btn-primary mt-4 text-xs">{t("faq.contactUs")} <Icon name="arrow" size={14} /></Link>
            <ul className="mt-5 space-y-3 text-xs">
              <li className="flex items-center gap-3"><Icon name="phone" size={16} /> +237 6 12 34 56 78</li>
              <li className="flex items-center gap-3"><Icon name="mail" size={16} /> support@luna.com</li>
              <li className="flex items-center gap-3"><Icon name="pin" size={16} /> 123 Boulevard de la Liberté, Yaoundé</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
