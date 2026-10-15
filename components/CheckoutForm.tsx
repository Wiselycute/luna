"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "@/lib/types";
import { checkoutSchema, type CheckoutValues } from "@/lib/schemas";
import { formatCents, shippingFor, toCents } from "@/lib/format";
import { useHydrated } from "@/lib/useHydrated";
import { useCart, type Order } from "@/store/cart";
import { Field } from "./Field";
import { Icon } from "./Icon";
import { useT } from "./Providers";

export function CheckoutForm({ products }: { products: Product[] }) {
  const t = useT();
  const router = useRouter();
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const placeOrder = useCart((s) => s.placeOrder);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { fullName: "", email: "", address: "", city: "" },
  });

  if (!hydrated) return <div className="container-page py-16 text-center text-muted" role="status">{t("cart.loading")}</div>;

  const byId = new Map(products.map((p) => [p.id, p]));
  const resolved = lines.flatMap((l) => { const p = byId.get(l.id); return p ? [{ ...l, p }] : []; });

  if (resolved.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-20 text-center">
        <h1 className="text-4xl">{t("checkout.emptyTitle")}</h1>
        <p className="mt-2 text-muted">{t("checkout.emptyText")}</p>
        <Link href="/#shop" className="btn-primary mt-6">{t("cart.continue")}</Link>
      </div>
    );
  }

  const subtotal = resolved.reduce((s, i) => s + toCents(i.p.price) * i.quantity, 0);
  const shipping = shippingFor(subtotal);

  const onSubmit = async () => {
    const order: Order = {
      ref: `#LUNA${Math.floor(1000 + Math.random() * 9000)}`,
      placedAt: new Date().toISOString(),
      lines: resolved.map((i) => ({ name: i.p.name, image: i.p.image, color: i.color, quantity: i.quantity, priceCents: toCents(i.p.price) })),
      subtotalCents: subtotal, shippingCents: shipping, totalCents: subtotal + shipping,
    };
    placeOrder(order); // saves the receipt and clears the cart
    router.push("/order-success");
  };

  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="text-4xl sm:text-5xl">{t("checkout.title")}</h1>
      <p className="mt-2 text-muted">{t("checkout.subtitle")}</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="card mt-6 grid gap-4 p-6 sm:grid-cols-2">
        <Field id="fullName" label={t("checkout.fullName")} error={errors.fullName?.message} className="sm:col-span-2">
          <input id="fullName" autoComplete="name" className="field" {...register("fullName")} />
        </Field>
        <Field id="email" label={t("checkout.email")} error={errors.email?.message} className="sm:col-span-2">
          <input id="email" type="email" autoComplete="email" className="field" {...register("email")} />
        </Field>
        <Field id="address" label={t("checkout.address")} error={errors.address?.message}>
          <input id="address" autoComplete="street-address" className="field" {...register("address")} />
        </Field>
        <Field id="city" label={t("checkout.city")} error={errors.city?.message}>
          <input id="city" autoComplete="address-level2" className="field" {...register("city")} />
        </Field>
        <div className="flex items-baseline justify-between border-t border-line pt-4 sm:col-span-2">
          <span className="font-serif text-2xl">{t("cart.total")}</span>
          <span className="text-2xl font-semibold tabular-nums">{formatCents(subtotal + shipping)}</span>
        </div>
        <p className="flex items-center gap-2 text-xs text-muted sm:col-span-2"><Icon name="info" size={14} /> {t("checkout.note")}</p>
        <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-between">
          <Link href="/cart" className="btn-outline">{t("checkout.back")}</Link>
          <button type="submit" disabled={isSubmitting} className="btn-primary px-8 py-3"><Icon name="lock" size={15} /> {isSubmitting ? t("checkout.placing") : t("checkout.place")}</button>
        </div>
      </form>
    </div>
  );
}
