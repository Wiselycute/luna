"use client";
import { LeafMark } from "./Logo";
import { StateScreen } from "./StateScreen";
import { useT } from "./Providers";

export function LoadingScreen() {
  const t = useT();
  return (
    <StateScreen>
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-4">
        <LeafMark className="h-12 w-12 animate-pulse text-primary dark:text-accent" />
        <p className="font-serif text-3xl">LUNA</p>
        <p className="text-sm text-muted">{t("loading.text")}</p>
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-line" aria-hidden="true"><div className="h-full w-1/2 animate-pulse rounded-full bg-primary dark:bg-accent" /></div>
      </div>
    </StateScreen>
  );
}
