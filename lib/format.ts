const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/** Prices are handled in cents internally to avoid floating-point drift. */
export const toCents = (price: number) => Math.round(price * 100);
export const formatCents = (cents: number) => usd.format(cents / 100);
export const formatPrice = (price: number) => usd.format(price);

export const FREE_SHIPPING_THRESHOLD_CENTS = 5000;
export const SHIPPING_FEE_CENTS = 499;
export const shippingFor = (subtotalCents: number) =>
  subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : SHIPPING_FEE_CENTS;
