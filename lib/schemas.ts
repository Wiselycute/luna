import { z } from "zod";

// Messages are i18n keys (resolved with t() in the form components).
export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "validation.name"),
  email: z.string().trim().email("validation.email"),
  address: z.string().trim().min(5, "validation.address"),
  city: z.string().trim().min(2, "validation.city"),
});
export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "validation.name"),
  email: z.string().trim().email("validation.email"),
  subject: z.string().min(1, "validation.subject"),
  orderNumber: z.string().trim().optional(),
  message: z.string().trim().min(10, "validation.message"),
  consent: z.boolean().refine((v) => v, "validation.consent"),
});
export type ContactValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("validation.email"),
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;
