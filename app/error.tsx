"use client"; // error boundaries must be Client Components

import { useEffect } from "react";
import { ErrorContent } from "@/components/ErrorContent";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <ErrorContent reset={reset} />;
}
