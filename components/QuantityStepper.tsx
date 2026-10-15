"use client";
import { Icon } from "./Icon";
import { useT } from "./Providers";

interface Props { value: number; onChange: (n: number) => void; max?: number; label: string; disabled?: boolean }

export function QuantityStepper({ value, onChange, max = 10, label, disabled }: Props) {
  const t = useT();
  const btn = "grid h-10 w-9 place-items-center hover:bg-soft disabled:opacity-40";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-lg border border-line bg-surface">
      <button type="button" className={btn} disabled={disabled || value <= 1} onClick={() => onChange(value - 1)} aria-label={t("product.decrease")}><Icon name="minus" size={14} /></button>
      <output aria-live="polite" className="w-8 text-center text-sm font-medium tabular-nums">{value}</output>
      <button type="button" className={btn} disabled={disabled || value >= max} onClick={() => onChange(value + 1)} aria-label={t("product.increase")}><Icon name="plus" size={14} /></button>
    </div>
  );
}
