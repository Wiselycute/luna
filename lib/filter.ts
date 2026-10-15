import type { Category, Product } from "./types";

export interface Filters {
  query: string;
  category: Category | "all";
  color: string | "all";
}

export const DEFAULT_FILTERS: Filters = { query: "", category: "all", color: "all" };

/** Pure & unit-testable: search by name + category + colour. */
export function filterProducts(products: Product[], { query, category, color }: Filters): Product[] {
  const q = query.trim().toLowerCase();
  return products.filter(
    (p) =>
      (!q || p.name.toLowerCase().includes(q)) &&
      (category === "all" || p.category === category) &&
      (color === "all" || p.colors.includes(color)),
  );
}
