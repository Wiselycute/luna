import data from "@/data/products.json";
import type { Product } from "./types";

const products = data as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
  const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getAllColors(): string[] {
  return Array.from(new Set(products.flatMap((p) => p.colors)));
}
