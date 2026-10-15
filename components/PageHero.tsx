import type { ReactNode } from "react";
import { PHOTOS, unsplash } from "@/lib/images";
import { Leaves } from "./Decor";
import { SafeImage } from "./SafeImage";

/** Editorial banner (About / Contact / FAQ): copy on the left with a portrait and script overlay on the right. */
export function PageHero({ eyebrow, title, text, script, image = PHOTOS.aboutHero, children }: { eyebrow: string; title: string; text: string; script: string; image?: string; children?: ReactNode }) {
  const src = image.startsWith("/") ? image : unsplash(image, 1400);
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-soft">
      <div className="absolute inset-y-0 right-0 w-full md:w-3/5">
        <SafeImage src={src} alt="" fill priority sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-[50%_25%]" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-transparent md:via-bg/40" />
      <Leaves className="absolute -left-4 bottom-0 h-44 w-24 -scale-x-100" />
      <div className="container-page relative grid min-h-[260px] items-center gap-6 py-12 md:grid-cols-2 md:py-14">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
          <h1 className="mt-3 max-w-md text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-md text-sm leading-7">{text}</p>
          {children}
        </div>
        <p className="hidden -rotate-6 font-script text-4xl leading-tight text-white drop-shadow-md md:block md:text-5xl" aria-hidden="true">{script} ♡</p>
      </div>
    </section>
  );
}
