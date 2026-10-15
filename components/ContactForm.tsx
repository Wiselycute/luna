"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactValues } from "@/lib/schemas";
import { Field } from "./Field";
import { Icon } from "./Icon";
import { useT } from "./Providers";

export function ContactForm() {
  const t = useT();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", subject: "", orderNumber: "", message: "", consent: false },
  });
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600)); // no backend: simulate a request
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6">
      <h2 className="text-2xl">{t("contact.send")}</h2>
      <p className="mt-1 text-xs text-muted">{t("contact.sendText")}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field id="c-name" label={`${t("contact.fullName")} *`} error={errors.fullName?.message}>
          <input autoComplete="name" placeholder={t("contact.yourName")} className="field" {...register("fullName")} />
        </Field>
        <Field id="c-email" label={`${t("contact.emailAddress")} *`} error={errors.email?.message}>
          <input type="email" autoComplete="email" placeholder="your@email.com" className="field" {...register("email")} />
        </Field>
        <Field id="c-subject" label={`${t("contact.subject")} *`} error={errors.subject?.message}>
          <select className="field" {...register("subject")}>
            <option value="">{t("contact.selectSubject")}</option>
            {[1, 2, 3, 4, 5].map((n) => <option key={n} value={`s${n}`}>{t(`contact.s${n}`)}</option>)}
          </select>
        </Field>
        <Field id="c-order" label={t("contact.orderNumber")} error={errors.orderNumber?.message}>
          <input placeholder="#LUNA2458" className="field" {...register("orderNumber")} />
        </Field>
        <Field id="c-message" label={`${t("contact.yourMessage")} *`} error={errors.message?.message} className="sm:col-span-2">
          <textarea rows={5} placeholder={t("contact.typeMessage")} className="field resize-y" {...register("message")} />
        </Field>
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} className="h-4 w-4 accent-[rgb(var(--primary))]" {...register("consent")} />
            {t("contact.agree")}
          </label>
          <p id="consent-error" role="alert" className="field-error empty:hidden">{errors.consent?.message ? t(errors.consent.message) : null}</p>
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-primary px-6">{isSubmitting ? t("contact.sending") : t("contact.submit")} <Icon name="send" size={15} /></button>
      </div>
      <p role="status" aria-live="polite" className="mt-4 text-sm text-primary empty:hidden dark:text-accent">{isSubmitSuccessful ? t("contact.success") : null}</p>
    </form>
  );
}
