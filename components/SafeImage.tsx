"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** next/image that swaps to a local fallback (or hides) if the remote photo fails. */
export function SafeImage({ fallback, alt, ...props }: ImageProps & { fallback?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed && !fallback) return null;
  return <Image {...props} alt={alt} src={failed && fallback ? fallback : props.src} onError={() => setFailed(true)} unoptimized={failed ? true : props.unoptimized} />;
}
