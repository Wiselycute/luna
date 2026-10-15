import type { Translate } from "@/lib/i18n";
import { Icon, type IconName } from "./Icon";
import { Leaves } from "./Decor";

export function Benefits({ t, tagline = false }: { t: Translate; tagline?: boolean }) {
  const items: { icon: IconName; title: string; sub: string }[] = [
    { icon: "truck", title: t("benefits.shipping"), sub: t("benefits.shippingSub") },
    { icon: "shield", title: t("benefits.payment"), sub: t("benefits.paymentSub") },
    { icon: "refresh", title: t("benefits.returns"), sub: t("benefits.returnsSub") },
    { icon: "headset", title: t("benefits.support"), sub: t("benefits.supportSub") },
  ];
  return (
    <section aria-label="Benefits" className="border-y border-line">
      <div className="container-page grid items-center gap-6 py-6 lg:grid-cols-[1fr_auto]">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4 md:divide-x md:divide-line">
          {items.map((i) => (
            <li key={i.title} className="flex items-center gap-3 md:pl-6 first:md:pl-0">
              <span className="text-primary dark:text-accent"><Icon name={i.icon} size={28} /></span>
              <span><span className="block text-sm font-medium">{i.title}</span><span className="block text-xs text-muted">{i.sub}</span></span>
            </li>
          ))}
        </ul>
        {tagline && (
          <p className="relative hidden border-l border-line pl-8 text-center font-script text-2xl leading-snug text-clay lg:block">
            {t("home.tagline")}<Leaves className="mx-auto mt-1 h-7 w-5" />
          </p>
        )}
      </div>
    </section>
  );
}
