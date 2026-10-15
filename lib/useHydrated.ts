"use client";
import { useEffect, useState } from "react";

/** True only after the first client render, so persisted (localStorage) state never causes a hydration mismatch. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
