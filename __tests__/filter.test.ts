import { describe, expect, it } from "vitest";
import { filterProducts, DEFAULT_FILTERS } from "@/lib/filter";
import { getAllProducts } from "@/lib/products";

const products = getAllProducts();

describe("filterProducts", () => {
  it("returns everything by default (20 products)", () => {
    expect(filterProducts(products, DEFAULT_FILTERS)).toHaveLength(20);
  });
  it("searches by name, case-insensitively", () => {
    const r = filterProducts(products, { ...DEFAULT_FILTERS, query: "  HOOP " });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.name.toLowerCase().includes("hoop"))).toBe(true);
  });
  it("combines category and colour", () => {
    const r = filterProducts(products, { query: "", category: "top", color: "brown" });
    expect(r.every((p) => p.category === "top" && p.colors.includes("brown"))).toBe(true);
  });
  it("returns an empty list when nothing matches", () => {
    expect(filterProducts(products, { ...DEFAULT_FILTERS, query: "zzzz" })).toEqual([]);
  });
});
