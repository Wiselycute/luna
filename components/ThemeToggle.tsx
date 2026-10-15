"use client";
import { useTheme } from "next-themes";
import { Icon } from "./Icon";
import { useT } from "./Providers";
import { useHydrated } from "@/lib/useHydrated";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useT();
  const hydrated = useHydrated();
  const dark = hydrated && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? t("theme.toLight") : t("theme.toDark")}
      className="grid h-9 w-9 place-items-center rounded-full bg-soft text-fg transition-colors hover:bg-accent/30"
    >
      <Icon name={dark ? "moon" : "sun"} size={18} />
    </button>
  );
}
