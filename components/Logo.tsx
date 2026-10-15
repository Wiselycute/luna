import Link from "next/link";

export function LeafMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="currentColor">
      <path d="M24 44c-1-9-1-17 0-27 1 10 1 18 0 27Z" />
      <path d="M23 36C13 36 6 29 5 18c9 0 17 5 18 18Z" />
      <path d="M25 36c10 0 17-7 18-18-9 0-17 5-18 18Z" />
      <path d="M24 28c-6-3-9-9-8-18 6 3 9 9 8 18Z" opacity=".75" />
      <path d="M24 28c6-3 9-9 8-18-6 3-9 9-8 18Z" opacity=".75" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="LUNA – Home" className={`inline-flex items-center gap-2 text-primary ${className}`}>
      <LeafMark className="h-8 w-8" />
      <span className="font-serif text-3xl tracking-wide text-fg">LUNA</span>
    </Link>
  );
}
