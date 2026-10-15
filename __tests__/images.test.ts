import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getAllProducts } from "@/lib/products";
import { galleryFor, PHOTOS } from "@/lib/images";

describe("home hero images", () => {
  it("uses H3, H1, and H2 in order", () => {
    expect(PHOTOS.heroSlides).toEqual(["/products/H3.png", "/products/H1.png", "/products/H2.png"]);
    expect(PHOTOS.heroSlides.every((image) => existsSync(join(process.cwd(), "public", image.slice(1))))).toBe(true);
  });

  describe("contact page image", () => {
    it("uses the local C1 image", () => {
      expect(PHOTOS.contactHero).toBe("/products/C1.png");
      expect(existsSync(join(process.cwd(), "public", PHOTOS.contactHero.slice(1)))).toBe(true);
    });
  });
});

describe("necklace images", () => {
  const necklaces = getAllProducts().filter((product) => product.category === "necklace");

  it("uses the matching local N-series image for each necklace product", () => {
    for (const product of necklaces) {
      expect(product.image).toBe(`/products/N${product.id}.jpg`);
      expect(existsSync(join(process.cwd(), "public", product.image.slice(1)))).toBe(true);
    }
  });

  it("uses local N-series images throughout necklace galleries", () => {
    for (const product of necklaces) {
      const images = galleryFor(product.image, product.category);
      expect(images).toHaveLength(4);
      expect(images.every((image) => image.startsWith("/products/N"))).toBe(true);
      expect(images.every((image) => existsSync(join(process.cwd(), "public", image.slice(1))))).toBe(true);
    }
  });
});

describe("earring images", () => {
  const earrings = getAllProducts().filter((product) => product.category === "earring");

  it("uses local E-series images for each earring product", () => {
    for (const product of earrings) {
      expect(product.image).toMatch(/^\/products\/E\d+\.jpg$/);
      expect(existsSync(join(process.cwd(), "public", product.image.slice(1)))).toBe(true);
    }
  });

  it("uses existing local E-series images throughout earring galleries", () => {
    for (const product of earrings) {
      const images = galleryFor(product.image, product.category);
      expect(images).toHaveLength(4);
      expect(images.every((image) => /^\/products\/E\d+\.jpg$/.test(image))).toBe(true);
      expect(images.every((image) => existsSync(join(process.cwd(), "public", image.slice(1))))).toBe(true);
    }
  });
});

describe("top images", () => {
  const tops = getAllProducts().filter((product) => product.category === "top");

  it("uses local P-series images for each top product", () => {
    for (const product of tops) {
      expect(product.image).toBe(`/products/P${product.id}.jpg`);
      expect(existsSync(join(process.cwd(), "public", product.image.slice(1)))).toBe(true);
    }
  });

  it("uses existing local P-series images throughout top galleries", () => {
    for (const product of tops) {
      const images = galleryFor(product.image, product.category);
      expect(images).toHaveLength(4);
      expect(images.every((image) => /^\/products\/P\d+\.jpg$/.test(image))).toBe(true);
      expect(images.every((image) => existsSync(join(process.cwd(), "public", image.slice(1))))).toBe(true);
    }
  });
});
