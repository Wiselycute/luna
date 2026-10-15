# LUNA – Mini e-commerce store

Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Zustand · next-themes · react-hook-form + zod · Vitest + RTL. No UI library.

```bash
pnpm install      # or: npm install
pnpm dev          # http://localhost:3000
pnpm test         # Vitest (13 tests)
pnpm typecheck && pnpm lint && pnpm build
```

> **Data & images:** `data/products.json` has 20 sample products in the required schema. Every `image` is a real
> **Unsplash** photo (free under the Unsplash License; see `lib/images.ts` for IDs and the gallery/hero/banner photos).
> Replace the file with the official one and the code keeps working. If a photo ever fails to load, `SafeImage`
> falls back to a local illustration in `public/products/`. Remote hosts are whitelisted in `next.config.ts`.
> Ratings/reviews shown in the mockups are **demo values** (deterministic, `ratingFor()`), since the data has none.

## Pages
| Route | Notes |
|---|---|
| `/` | Hero, real-time search, category + colour filters (pills, chips and selects share one state), "No products found" empty state |
| `/products/[id]` | `generateMetadata` (title, description, OpenGraph/Twitter), `next/image`, colour + quantity, stock status, `notFound()` → `not-found.tsx`, tabs, related products |
| `/cart` | Add / remove / update quantity, totals in cents, free-shipping rule, localStorage persistence, empty state |
| `/checkout` | react-hook-form + zod. Submitting **clears the cart** and shows the confirmation |
| `/order-success` | Receipt snapshot of the last order |
| `/about` `/contact` `/faq` `/wishlist` | From the mockups; contact + newsletter forms validated with zod |
| `not-found` `error` `loading` | Global and product-level versions |

## Architecture decisions
- **Server vs Client:** every `page.tsx` is a Server Component that reads `lib/products.ts`; `'use client'` lives only on interactive leaves (`ProductExplorer`, `AddToCartButton`, `CartView`, forms, header, theme/lang toggles).
- **Cart (`/store/cart.ts`):** Zustand + `persist` (localStorage). Stores only `{ id, color, quantity }`, so prices always come from the catalogue. Money is computed in integer cents.
- **Hydration safety:** persisted state is only rendered after `useHydrated()` flips, so there are no server/client mismatches (badges, cart, wishlist).
- **Filtering:** pure `filterProducts()` in `lib/filter.ts` (unit-tested), memoised in the client explorer.
- **Theming:** `next-themes` (`class` strategy) + CSS variables (`globals.css`) → one set of Tailwind tokens (`bg-bg`, `text-fg`, `bg-primary`…) for light and dark.
- **i18n (EN/FR):** typed dictionaries in `/messages`, language stored in a cookie so Server Components render the right language on first paint (no flash, no `/[locale]` routing). `lib/i18n-server.ts` for servers, `useT()` for clients.
- **Accessibility:** skip link, landmarks, visible focus ring, labelled controls, `aria-pressed` filters, `aria-live` result count and add-to-cart feedback, ARIA tabs and disclosure, form errors via `aria-invalid` + `aria-describedby`, `prefers-reduced-motion`, alt text on all images.

## Known trade-offs
- `/products/<unknown-id>` renders the not-found UI with `noindex`, but the HTTP status is 200 because `loading.tsx` streams the shell first (documented Next.js behaviour). If you need a hard 404 status, remove the loading boundary for that segment.
- Tops: only a few Unsplash photos of plain tops were verified, so some tops use model photos and two products share an image (ids 8 and 20).
- The Contact page embeds a Google Maps iframe (no API key needed).
- Product names are not translated (they come from the data file); everything else is.
- Not built (mockup lists them as planned): Shipping & Returns pages.

## Structure
```
app/            routes, layout, loading / error / not-found
components/     UI (client leaves marked 'use client')
lib/            products, filter, format, schemas, i18n
store/          cart + wishlist (zustand)
messages/       en.ts / fr.ts
data/           products.json
__tests__/      ProductCard, filter, cart
```
