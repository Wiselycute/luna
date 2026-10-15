"use client";
import { cloneElement, type ReactElement } from "react";
import { useT } from "./Providers";

/** Label + control + accessible error. Injects aria-invalid / aria-describedby into the single child control. */
export function Field({ id, label, error, children, className = "" }: { id: string; label: string; error?: string; children: ReactElement<Record<string, unknown>>; className?: string }) {
  const t = useT();
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      {cloneElement(children, { id, "aria-invalid": !!error, "aria-describedby": error ? `${id}-error` : undefined })}
      <p id={`${id}-error`} role="alert" className="field-error empty:hidden">{error ? t(error) : null}</p>
    </div>
  );
}
