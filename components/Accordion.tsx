"use client";
import { useId, useState } from "react";
import { Icon } from "./Icon";

export interface AccordionItem { id: string; question: string; answer: string }

/** Disclosure pattern: buttons with aria-expanded controlling regions. */
export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const base = useId();
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  return (
    <ul className="divide-y divide-line">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <li key={it.id}>
            <h3 className="font-sans text-sm font-normal tracking-normal">
              <button
                type="button" id={`${base}-${it.id}-btn`} aria-expanded={isOpen} aria-controls={`${base}-${it.id}`}
                onClick={() => setOpen(isOpen ? null : it.id)}
                className="flex w-full items-center justify-between gap-4 py-3.5 text-left hover:text-accent"
              >
                {it.question}
                <Icon name={isOpen ? "minus" : "plus"} size={16} />
              </button>
            </h3>
            <div id={`${base}-${it.id}`} role="region" aria-labelledby={`${base}-${it.id}-btn`} hidden={!isOpen} className="pb-4 pr-8 text-sm leading-6 text-muted">
              {it.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
