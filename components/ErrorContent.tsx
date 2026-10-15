"use client";
import Link from "next/link";
import { Icon } from "./Icon";
import { StateScreen } from "./StateScreen";
import { useT } from "./Providers";

export function ErrorContent({ reset }: { reset: () => void }) {
  const t = useT();
  return (
    <StateScreen>
      <div role="alert" className="flex flex-col items-center gap-3">
        <span className="text-clay"><Icon name="info" size={52} /></span>
        <h1 className="text-3xl">{t("error.title")}</h1>
        <p className="max-w-sm text-muted">{t("error.text")}</p>
        <div className="mt-3 flex gap-3">
          <button type="button" onClick={reset} className="btn-primary">{t("error.retry")}</button>
          <Link href="/" className="btn-outline">{t("notFound.back")}</Link>
        </div>
      </div>
    </StateScreen>
  );
}
