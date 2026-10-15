"use client";
import { useI18n } from "./Providers";
import { LOCALES } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  return (
    <div role="group" aria-label={t("lang.label")} className={`flex items-center text-xs font-medium ${className}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="mx-1.5 h-3 w-px bg-current opacity-30" />}
          <button
            type="button"
            lang={l}
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={`rounded px-1 py-0.5 uppercase transition-opacity ${locale === l ? "font-semibold underline decoration-accent decoration-2 underline-offset-4" : "opacity-70 hover:opacity-100"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
