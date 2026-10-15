import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { getT } from "@/lib/i18n-server";

const serif = { variable: "" };
const sans = { variable: "" };
const script = { variable: "" };

export const metadata: Metadata = {
  title: { default: "LUNA – Necklaces, earrings & tops", template: "%s | LUNA" },
  description: "LUNA is a small fashion accessories store: necklaces, earrings and tops with an elegant, everyday feel.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, t } = await getT();
  return (
    <html lang={locale} suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body className="flex min-h-screen flex-col pb-16 md:pb-0">
        <Providers initialLocale={locale}>
          <a href="#main" className="sr-only z-50 rounded bg-primary px-4 py-2 text-primary-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4">{t("nav.skip")}</a>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <MobileTabBar />
        </Providers>
      </body>
    </html>
  );
}
