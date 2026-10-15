"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LanguageMenu } from "./LanguageMenu";
import { useT } from "./Providers";
import { selectCount, useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/lib/useHydrated";

const NAV = [
  { href: "/", key: "nav.home" },
  { href: "/#shop", key: "nav.shop" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
] as const;

function Badge({ count }: { count: number }) {
  return (
    <span aria-hidden="true" className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-fg">
      {count}
    </span>
  );
}

export function Header() {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const cartCount = useCart(selectCount);
  const wishCount = useWishlist((s) => s.ids.length);
  const cart = hydrated ? cartCount : 0;
  const wish = hydrated ? wishCount : 0;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const nav = pathname === "/faq" ? [...NAV, { href: "/faq", key: "nav.faq" } as const] : NAV;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
      <div className="hidden border-b border-line bg-soft text-fg sm:block">
        <div className="container-page flex items-center justify-between py-1.5 text-xs">
          <p className="flex items-center gap-2"><span className="text-clay"><Icon name="truck" size={16} /></span>{t("announcement")}</p>
          <LanguageSwitcher />
        </div>
      </div>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label={t("nav.main")} className="hidden md:block">
          <ul className="flex items-center gap-9 text-sm">
            {nav.map((n) => (
              <li key={n.key}>
                <Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined} className={`border-b-2 pb-1 transition-colors hover:text-accent ${isActive(n.href) ? "border-fg" : "border-transparent"}`}>
                  {t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1 sm:gap-2.5">
          <Link href="/#shop" aria-label={t("nav.search")} className="grid h-9 w-9 place-items-center rounded-full hover:bg-soft"><Icon name="search" /></Link>
          <Link href="/wishlist" aria-label={`${t("nav.wishlist")}${wish ? ` (${wish})` : ""}`} className="relative hidden h-9 w-9 place-items-center rounded-full hover:bg-soft sm:grid"><Icon name="heart" />{wish > 0 && <Badge count={wish} />}</Link>
          <Link href="/cart" aria-label={`${t("nav.cart")} (${cart})`} className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-soft"><Icon name="bag" /><Badge count={cart} /></Link>
          <span className="hidden sm:block"><ThemeToggle /></span>
          <span className="hidden sm:block"><LanguageMenu /></span>
          <button type="button" className="grid h-9 w-9 place-items-center rounded-full hover:bg-soft md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label={t("nav.menu")} className="border-t border-line bg-bg md:hidden">
          <ul className="container-page flex flex-col py-2">
            {[...nav, ...(pathname === "/faq" ? [] : [{ href: "/faq", key: "nav.faq" } as const])].map((n) => (
              <li key={n.key}><Link href={n.href} aria-current={isActive(n.href) ? "page" : undefined} className="block py-3 text-base">{t(n.key)}</Link></li>
            ))}
            <li className="flex items-center justify-between py-3"><ThemeToggle /><LanguageSwitcher /></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
