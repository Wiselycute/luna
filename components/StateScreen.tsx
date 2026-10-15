import type { ReactNode } from "react";
import { Leaves } from "./Decor";

/** Shared centered layout for loading / error / not-found states. */
export function StateScreen({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <Leaves className="absolute -left-4 top-6 h-48 w-28 -scale-x-100" />
      <Leaves className="absolute -right-4 bottom-6 h-48 w-28" />
      <div className="container-page relative flex min-h-[55vh] flex-col items-center justify-center py-16 text-center">{children}</div>
    </div>
  );
}
