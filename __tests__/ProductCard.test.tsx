import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "@/components/ProductCard";
import { I18nProvider } from "@/components/Providers";
import { useCart } from "@/store/cart";
import type { Product } from "@/lib/types";

const product: Product = {
  id: "1", name: "Golden Heart Necklace", category: "necklace",
  colors: ["gold", "white"], price: 24.99, image: "/products/golden-heart-necklace.svg", inStock: true,
};

const renderCard = (p: Product = product, locale: "en" | "fr" = "en") =>
  render(<I18nProvider initialLocale={locale}><ProductCard product={p} /></I18nProvider>);

describe("ProductCard", () => {
  beforeEach(() => useCart.setState({ lines: [], lastOrder: null }));

  it("shows name, formatted price, category and stock status", () => {
    renderCard();
    expect(screen.getByRole("link", { name: "Golden Heart Necklace" })).toHaveAttribute("href", "/products/1");
    expect(screen.getByText("$24.99")).toBeInTheDocument();
    expect(screen.getByText("Necklace")).toBeInTheDocument();
    expect(screen.getByText("In stock")).toBeInTheDocument();
  });

  it("adds the product to the cart when clicking 'Add to cart'", async () => {
    renderCard();
    await userEvent.click(screen.getByRole("button", { name: /add golden heart necklace to cart/i }));
    expect(useCart.getState().lines).toEqual([{ id: "1", color: "gold", quantity: 1 }]);
    expect(screen.getByRole("status")).toHaveTextContent("Added to cart");
  });

  it("disables the button for out-of-stock products", () => {
    renderCard({ ...product, inStock: false });
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add golden heart necklace to cart/i })).toBeDisabled();
  });

  it("renders in French", () => {
    renderCard(product, "fr");
    expect(screen.getByText("En stock")).toBeInTheDocument();
    expect(screen.getByText("Collier")).toBeInTheDocument();
  });
});
