/** IDs are the `photo-…` part of images.unsplash.com URLs. */
export const unsplash = (id: string, w = 900, extra = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80${extra}`;

export const PHOTOS = {
  heroSlides: ["/products/H3.png", "/products/H1.png", "/products/H2.png"],
  aboutHero: "/products/E1.jpg",
  story: "/products/N1.jpg",
  values: "/products/P16.jpg",
  banner: "1652766540048-de0a878a3266",
  contactHero: "/products/C1.png",
  faqHero: "/products/P17.jpg",
  categories: { necklace: "/products/N1.jpg", earring: "/products/E1.jpg", top: "/products/P3.jpg" },
} as const;

/** Local illustrations used only if a remote photo fails to load. */
export const FALLBACK_SVG: Record<string, string> = {
  "1": "/products/golden-heart-necklace.svg",
  "2": "/products/pearl-drop-earrings.svg",
  "3": "/products/ribbed-crop-top.svg",
  "4": "/products/layered-necklace.svg",
  "5": "/products/hoop-earrings.svg",
  "6": "/products/basic-tank-top.svg",
  "7": "/products/gemstone-earrings.svg",
  "8": "/products/halter-top.svg",
  "9": "/products/moonstone-pendant.svg",
  "10": "/products/crescent-bar-necklace.svg",
  "11": "/products/pearl-strand-necklace.svg",
  "12": "/products/emerald-drop-earrings.svg",
  "13": "/products/stud-earrings-set.svg",
  "14": "/products/twisted-hoop-earrings.svg",
  "15": "/products/rose-quartz-earrings.svg",
  "16": "/products/satin-cami-top.svg",
  "17": "/products/linen-wrap-top.svg",
  "18": "/products/knit-bralette-top.svg",
  "19": "/products/amethyst-pendant.svg",
  "20": "/products/silk-halter-top.svg"
};

/** Extra gallery shots per category (product page thumbnails). */
const GALLERY_EXTRAS: Record<string, string[]> = {
  necklace: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((n) => `/products/N${n}.jpg`),
  earring: Array.from({ length: 20 }, (_, index) => {
    const n = index + 1;
    return `/products/E${n === 14 || n === 20 ? 1 : n}.jpg`;
  }),
  top: Array.from({ length: 20 }, (_, index) => `/products/P${index + 1}.jpg`),
};

export function galleryFor(mainUrl: string, category: string): string[] {
  const extras = (GALLERY_EXTRAS[category] ?? []).map((image) => image.startsWith("/") ? image : unsplash(image, 1000)).filter((u) => u !== mainUrl);
  return [mainUrl.replace("w=900", "w=1000"), ...extras].slice(0, 4);
}

/** Demo ratings (the data file has none): deterministic so server and client agree. */
export function ratingFor(id: string): { rating: number; reviews: number } {
  if (id === "1") return { rating: 4.8, reviews: 112 };
  const n = Number(id) || 1;
  return { rating: Math.round((4.3 + ((n * 7) % 6) / 10) * 10) / 10, reviews: 12 + ((n * 37) % 190) };
}
