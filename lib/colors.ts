export const COLOR_HEX: Record<string, string> = {
  brown: "#6B3F2E",
  white: "#F5F1EA",
  black: "#1E1E1E",
  gold: "#D6A84F",
  beige: "#DCC8A8",
  pink: "#E8A3A0",
  green: "#2F6B4B",
  red: "#B3302F",
  purple: "#6C4FB3",
};
export const colorHex = (name: string) => COLOR_HEX[name] ?? "#999999";
