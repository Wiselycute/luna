import { beforeEach, describe, expect, it } from "vitest";
import { useCart } from "@/store/cart";
import { formatCents, shippingFor, toCents } from "@/lib/format";

describe("cart store", () => {
  beforeEach(() => useCart.setState({ lines: [], lastOrder: null }));

  it("merges identical product + colour and keeps variants separate", () => {
    const { add } = useCart.getState();
    add("1", "gold"); add("1", "gold"); add("1", "white");
    expect(useCart.getState().lines).toEqual([{ id: "1", color: "gold", quantity: 2 }, { id: "1", color: "white", quantity: 1 }]);
  });
  it("removes a line when quantity drops below 1", () => {
    const s = useCart.getState();
    s.add("2", "white"); s.setQuantity("2", "white", 0);
    expect(useCart.getState().lines).toEqual([]);
  });
  it("clears the cart", () => {
    const s = useCart.getState();
    s.add("3", "brown"); s.clear();
    expect(useCart.getState().lines).toHaveLength(0);
  });
});

describe("money helpers", () => {
  it("avoids floating point drift", () => {
    expect(formatCents(toCents(24.99) + toCents(18.99) * 2)).toBe("$62.97");
  });
  it("applies free shipping over $50", () => {
    expect(shippingFor(4999)).toBe(499);
    expect(shippingFor(5000)).toBe(0);
  });
});
