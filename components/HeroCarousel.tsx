"use client";
import { useState } from "react";
import Link from "next/link";
import { PHOTOS, unsplash } from "@/lib/images";
import { Icon } from "./Icon";
import { SafeImage } from "./SafeImage";
import { useT } from "./Providers";

export function HeroCarousel() {
  const t = useT();
  const [i, setI] = useState(0);
  const slides = PHOTOS.heroSlides;
  const go = (n: number) => setI((n + slides.length) % slides.length);
  const arrow = "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-surface/80 text-fg shadow-sm hover:bg-surface";
  return (
    <section aria-roledescription="carousel" aria-label={t("home.title")} className="relative isolate h-[320px] overflow-hidden border-b border-line bg-soft sm:h-[400px] lg:h-[430px]">
      {slides.map((id, n) => (
        <div key={id} role="group" aria-roledescription="slide" aria-label={`${n + 1} / ${slides.length}`} aria-hidden={n !== i} className={`absolute inset-0 transition-opacity duration-700 ${n === i ? "opacity-100" : "opacity-0"}`}>
          <SafeImage src={id.startsWith("/") ? id : unsplash(id, 1600)} alt="" fill priority={n === 0} sizes="100vw" className="object-cover object-[75%_25%]" />
        </div>
      ))}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-bg via-bg/75 to-transparent sm:via-bg/50" />
      <div className="container-page relative z-[5] flex h-full flex-col justify-center">
        <p className="text-[11px] uppercase tracking-widest text-muted">{t("home.eyebrow")}</p>
        <h1 className="mt-3 max-w-md text-4xl leading-[1.05] sm:text-6xl">{t("home.title")}</h1>
        <p className="mt-4 max-w-xs text-base sm:text-lg">{t("home.subtitle")}</p>
        <Link href="#shop" className="btn-primary mt-6 w-fit px-7 py-3">{t("home.cta")} <Icon name="arrow" size={16} /></Link>
      </div>
      <button type="button" onClick={() => go(i - 1)} aria-label={t("home.prevSlide")} className={`${arrow} left-3`}><Icon name="chevronDown" size={18} className="rotate-90" /></button>
      <button type="button" onClick={() => go(i + 1)} aria-label={t("home.nextSlide")} className={`${arrow} right-3`}><Icon name="chevronDown" size={18} className="-rotate-90" /></button>
      <div className="absolute bottom-4 right-6 z-10 flex items-center gap-4 text-xs text-white" role="group">
        {slides.map((id, n) => (
          <button key={id} type="button" onClick={() => setI(n)} aria-label={t("home.slide", { n: n + 1 })} aria-current={n === i} className={`border-t-2 pt-1 tabular-nums drop-shadow ${n === i ? "border-white" : "border-transparent opacity-80"}`}>{String(n + 1).padStart(2, "0")}</button>
        ))}
      </div>
    </section>
  );
}
