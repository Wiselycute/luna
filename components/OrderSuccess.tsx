"use client";
import { SafeImage } from "./SafeImage";
import Link from "next/link";
import { formatCents } from "@/lib/format";
import { useHydrated } from "@/lib/useHydrated";
import { useCart } from "@/store/cart";
import { Bag, Leaves } from "./Decor";
import { Icon, type IconName } from "./Icon";
import { Newsletter } from "./Newsletter";
import { useI18n } from "./Providers";

export function OrderSuccess() {
  const { t, locale } = useI18n();
  const hydrated = useHydrated();
  const order = useCart((s) => s.lastOrder);

  if (!hydrated) return <div className="container-page py-16 text-center text-muted" role="status">…</div>;
  if (!order) {
    return (
      <div className="container-page flex flex-col items-center py-20 text-center">
        <h1 className="text-4xl">{t("order.none")}</h1>
        <p className="mt-2 text-muted">{t("order.noneText")}</p>
        <Link href="/#shop" className="btn-primary mt-6">{t("order.continue")}</Link>
      </div>
    );
  }
  const count = order.lines.reduce((n, l) => n + l.quantity, 0);
  const date = new Date(order.placedAt).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "short", day: "numeric" });
  const next: { icon: IconName; title: string; text: string }[] = [
    { icon: "mail", title: t("order.n1t"), text: t("order.n1d") },
    { icon: "box", title: t("order.n2t"), text: t("order.n2d") },
    { icon: "truck", title: t("order.n3t"), text: t("order.n3d") },
    { icon: "heart", title: t("order.n4t"), text: t("order.n4d") },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-soft via-bg to-soft">
        <Leaves className="absolute -left-4 bottom-0 h-48 w-28 -scale-x-100" />
        <div className="container-page grid items-center gap-6 py-12 md:grid-cols-[1.3fr_1fr]">
          <div className="text-center md:text-left" role="status">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-fg md:mx-0"><Icon name="check" size={30} /></span>
            <h1 className="mt-5 text-4xl sm:text-5xl">{t("order.title")}</h1>
            <p className="mx-auto mt-3 max-w-md text-muted md:mx-0">{t("order.thanks")}</p>
            <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-3 rounded-full border border-line bg-surface px-5 py-2 text-sm">
              <strong>{t("order.ref", { ref: order.ref })}</strong><span aria-hidden="true" className="h-4 w-px bg-line" /><span className="text-muted">{t("order.placed", { date })}</span>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start"><Link href="/#shop" className="btn-primary"><Icon name="bag" size={16} /> {t("order.continue")} <Icon name="arrow" size={16} /></Link> <a href="#order-summary" className="btn-outline"><Icon name="file" size={15} /> {t("order2.details")}</a></div>
          </div>
          <div className="relative mx-auto"><Bag className="w-48 sm:w-56" /><p className="absolute -left-10 top-6 -rotate-6 font-script text-xl text-clay">{t("order.thankScript")}</p></div>
        </div>
      </section>

      <div className="container-page grid gap-6 py-10 md:grid-cols-2">
        <section id="order-summary" aria-labelledby="os" className="card scroll-mt-32 p-6">
          <div className="flex items-center justify-between"><h2 id="os" className="text-2xl">{t("order.summary")}</h2><span className="rounded-full bg-soft px-3 py-0.5 text-xs">{t("order.items", { count })}</span></div>
          <ul className="mt-4 divide-y divide-line">
            {order.lines.map((l, i) => (
              <li key={i} className="flex items-center gap-4 py-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-soft"><SafeImage src={l.image} alt={l.name} fill sizes="56px" className="object-cover" /></div>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{l.name}</p><p className="text-xs text-muted">{t(`color.${l.color}`)} • {t("order.qty")}: {l.quantity}</p></div>
                <p className="text-sm tabular-nums">{formatCents(l.priceCents * l.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between"><dt>{t("cart.subtotal")}</dt><dd className="tabular-nums">{formatCents(order.subtotalCents)}</dd></div>
            <div className="flex justify-between"><dt>{t("cart.shipping")}</dt><dd>{order.shippingCents === 0 ? t("cart.free") : formatCents(order.shippingCents)}</dd></div>
            <div className="flex items-baseline justify-between pt-2"><dt className="font-serif text-2xl">{t("cart.total")}</dt><dd className="text-2xl font-semibold tabular-nums">{formatCents(order.totalCents)}</dd></div>
          </dl>
        </section>

        <section aria-labelledby="next" className="card p-6">
          <h2 id="next" className="text-2xl">{t("order.nextTitle")}</h2>
          <ol className="mt-5 space-y-5">
            {next.map((n, i) => (
              <li key={n.title} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-fg"><Icon name={n.icon} size={18} /></span>
                <div className="text-sm"><p className="font-medium">{n.title}</p><p className="text-muted">{n.text}{i === 3 && <> <a href="mailto:support@luna.com" className="underline">support@luna.com</a></>}</p></div>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <Newsletter variant="club" />
    </>
  );
}
