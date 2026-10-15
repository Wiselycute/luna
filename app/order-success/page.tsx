import type { Metadata } from "next";
import { OrderSuccess } from "@/components/OrderSuccess";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };

export default function OrderSuccessPage() {
  return <OrderSuccess />;
}
