"use client";
import { useEffect, useRef, useState } from "react";
import { LOCALES } from "@/lib/i18n";
import { Icon } from "./Icon";
import { useI18n } from "./Providers";

/** "EN ▾" dropdown shown in the header. */
export function LanguageMenu() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", close); };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-label={t("lang.label")} onClick={() => setOpen((o) => !o)} className="flex items-center gap-1 rounded-full px-2 py-1.5 text-sm font-medium hover:bg-soft">
        {locale.toUpperCase()} <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <ul role="listbox" aria-label={t("lang.label")} className="absolute right-0 z-50 mt-1 w-24 overflow-hidden rounded-lg border border-line bg-surface shadow-card">
          {LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button type="button" lang={l} onClick={() => { setLocale(l); setOpen(false); }} className={`block w-full px-3 py-2 text-left text-sm hover:bg-soft ${l === locale ? "font-semibold" : ""}`}>{l === "en" ? "EN" : "FR"}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
