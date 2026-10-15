"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";
import { Icon } from "./Icon";
import { Leaves } from "./Decor";
import { useT } from "./Providers";

export function Newsletter({ variant = "style" }: { variant?: "style" | "club" }) {
  const t = useT();
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });
  const errId = "newsletter-error";
  return (
    <section className="container-page my-10">
      <div className="relative flex flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl border border-line bg-soft px-6 py-7 md:flex-row md:px-12">
        <Leaves className="absolute -left-2 top-0 h-full w-20 -scale-x-100 opacity-80" />
        <Leaves className="absolute -right-2 top-0 h-full w-20 opacity-80" />
        <div className="relative text-center md:text-left">
          <h2 className="flex items-center gap-2 text-xl">{variant === "club" ? <><Icon name="crown" size={18} /> {t("order2.club")}</> : <><Icon name="mail" size={20} className="hidden md:block" /> {t("newsletter.title")}</>}</h2>
          <p className="mt-1 text-sm text-muted">{variant === "club" ? t("order2.clubText") : t("newsletter.text")}</p>
        </div>
        <form onSubmit={handleSubmit(() => reset({ email: "" }, { keepIsSubmitSuccessful: true }))} noValidate className="relative w-full max-w-md">
          <div className="flex overflow-hidden rounded-lg border border-line bg-surface focus-within:border-accent">
            <label htmlFor="newsletter-email" className="sr-only">{t("newsletter.label")}</label>
            <input
              id="newsletter-email" type="email" autoComplete="email" placeholder={t("newsletter.placeholder")}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? errId : undefined}
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted/70"
              {...register("email")}
            />
            <button type="submit" aria-label={t("newsletter.submit")} className="grid w-11 place-items-center bg-primary text-primary-fg hover:bg-primary/90"><Icon name="arrow" size={18} /></button>
          </div>
          <div aria-live="polite" className="min-h-5">
            {errors.email?.message && <p id={errId} className="field-error">{t(errors.email.message)}</p>}
            {isSubmitSuccessful && !errors.email && <p className="mt-1 text-xs text-primary dark:text-accent">{t("newsletter.ok")}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
