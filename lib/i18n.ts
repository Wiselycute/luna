import en, { type Messages } from "@/messages/en";
import fr from "@/messages/fr";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "luna-locale";

export const dictionaries: Record<Locale, Messages> = { en, fr };

export const isLocale = (v: unknown): v is Locale => LOCALES.includes(v as Locale);

export type Translate = (key: string, vars?: Record<string, string | number>) => string;

export function createTranslator(locale: Locale): Translate {
  const dict = dictionaries[locale];
  return (key, vars) => {
    const value = key.split(".").reduce<unknown>((acc, part) => (acc as Record<string, unknown> | undefined)?.[part], dict);
    if (typeof value !== "string") return key;
    return vars ? value.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : value;
  };
}
