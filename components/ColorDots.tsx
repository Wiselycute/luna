import { colorHex } from "@/lib/colors";

export function ColorDot({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <span aria-hidden="true" className="inline-block shrink-0 rounded-full border border-fg/25" style={{ width: size, height: size, backgroundColor: colorHex(color) }} />
  );
}

export function ColorDots({ colors, label }: { colors: string[]; label: string }) {
  return (
    <span className="flex items-center gap-1.5" role="img" aria-label={label}>
      {colors.map((c) => <ColorDot key={c} color={c} />)}
    </span>
  );
}
