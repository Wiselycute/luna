"use client";
import { Accordion } from "./Accordion";
import { useT } from "./Providers";

export function QuickQuestions() {
  const t = useT();
  const items = [1, 2, 3, 4, 5].map((n) => ({ id: `q${n}`, question: t(`contact.q${n}`), answer: t(`contact.a${n}`) }));
  return (
    <section className="card p-6" aria-labelledby="quick">
      <h2 id="quick" className="mb-2 text-2xl">{t("contact.quick")}</h2>
      <Accordion items={items} />
    </section>
  );
}
