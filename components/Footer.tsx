"use client";
import Link from "next/link";
import { Logo } from "./Logo";
import { Icon, type IconName } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Leaves } from "./Decor";
import { useT } from "./Providers";

const SOCIALS: { icon: IconName; label: string }[] = [
  { icon: "instagram", label: "Instagram" },
  { icon: "tiktok", label: "TikTok" },
  { icon: "pinterest", label: "Pinterest" },
  { icon: "facebook", label: "Facebook" },
];

export function Footer() {
  const t = useT();
  return (
    <footer className="relative mt-4 overflow-hidden border-t border-line">
      <Leaves className="absolute -left-4 bottom-0 h-40 w-24 -scale-x-100" />
      <div className="container-page relative flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <div className="text-center md:text-left">
          <Logo />
          <p className="mt-1 text-xs text-muted">{t("footer.tagline")}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <li><Link href="/#shop" className="hover:text-accent">{t("nav.shop")}</Link></li>
            <li><Link href="/about" className="hover:text-accent">{t("nav.about")}</Link></li>
            <li><Link href="/contact" className="hover:text-accent">{t("nav.contact")}</Link></li>
            <li><Link href="/faq" className="hover:text-accent">{t("nav.faq")}</Link></li>
          </ul>
        </nav>
        <ul className="flex gap-3">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href="#" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-accent hover:text-accent"><Icon name={s.icon} size={17} /></a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-page relative flex flex-col items-center justify-between gap-3 border-t border-line py-4 text-xs text-muted sm:flex-row">
        <p>{t("footer.rights")}</p>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
