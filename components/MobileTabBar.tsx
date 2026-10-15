"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";
import { useT } from "./Providers";
import { selectCount, useCart } from "@/store/cart";
import { useHydrated } from "@/lib/useHydrated";

/** Bottom tab bar from the mobile mockups (Home / Shop / Cart / Profile). */
export function MobileTabBar() {
  const t = useT();
  const pathname = usePathname();
  const count = useCart(selectCount);
  const hydrated = useHydrated();
  const tabs: { href: string; icon: IconName; label: string; active: boolean }[] = [
    { href: "/", icon: "home", label: t("nav.home"), active: pathname === "/" },
    { href: "/#shop", icon: "search", label: t("nav.shop"), active: false },
    { href: "/cart", icon: "bag", label: t("nav.cart"), active: pathname.startsWith("/cart") },
    { href: "/about", icon: "user", label: t("nav.profile"), active: pathname.startsWith("/about") },
  ];
  return (
    <nav aria-label="Tabs" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur md:hidden">
      <ul className="grid grid-cols-4">
        {tabs.map((tab) => (
          <li key={tab.label}>
            <Link href={tab.href} aria-current={tab.active ? "page" : undefined} className={`relative flex flex-col items-center gap-0.5 py-2 text-[11px] ${tab.active ? "text-primary dark:text-accent" : "text-muted"}`}>
              <span className="relative"><Icon name={tab.icon} size={22} filled={tab.active && tab.icon === "home"} />
                {tab.icon === "bag" && hydrated && count > 0 && <span aria-hidden="true" className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] text-primary-fg">{count}</span>}
              </span>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
