"use client";
import { ThemeProvider } from "next-themes";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { createTranslator, LOCALE_COOKIE, type Locale, type Translate } from "@/lib/i18n";

interface I18nValue { locale: Locale; setLocale: (l: Locale) => void; t: Translate }
const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = l;
  }, []);

  const value = useMemo(() => ({ locale, setLocale, t: createTranslator(locale) }), [locale, setLocale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
export const useT = () => useI18n().t;

export function Providers({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>
    </ThemeProvider>
  );
}
