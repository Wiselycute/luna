export const CATEGORIES = ["necklace", "earring", "top"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: string;
  name: string;
  category: Category;
  colors: string[];
  price: number;
  image: string;
  inStock: boolean;
}
