/** Decorative botanical + shopping-bag illustrations (stand-ins for photography). */
export function Leaves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={`pointer-events-none select-none text-primary/25 dark:text-accent/20 ${className}`} aria-hidden="true" fill="currentColor">
      <path d="M60 158C58 110 60 60 64 6c4 54 4 104-4 152Z" opacity=".6" />
      <path d="M58 120C30 118 10 100 6 66c28 2 48 22 52 54Z" />
      <path d="M62 96c28-2 48-20 52-54-28 2-48 22-52 54Z" />
      <path d="M58 70C38 62 24 46 24 22c20 6 32 22 34 48Z" opacity=".8" />
    </svg>
  );
}

export function Bag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 300" className={className} role="img" aria-label="LUNA shopping bag">
      <ellipse cx="130" cy="272" rx="105" ry="16" className="fill-soft" />
      <path d="M95 92c0-48 70-48 70 0" fill="none" stroke="rgb(var(--clay))" strokeWidth="6" strokeLinecap="round" />
      <path d="M52 92h156l10 170H42Z" fill="rgb(var(--accent))" opacity=".55" />
      <path d="M52 92h156l10 170H42Z" fill="rgb(var(--bg))" opacity=".55" />
      <path d="M52 92h156l10 170H42Z" fill="none" stroke="rgb(var(--accent))" strokeWidth="2" />
      <g transform="translate(106 150) scale(1.1)" className="fill-primary dark:fill-accent">
        <path d="M24 44c-1-9-1-17 0-27 1 10 1 18 0 27Z" /><path d="M23 36C13 36 6 29 5 18c9 0 17 5 18 18Z" /><path d="M25 36c10 0 17-7 18-18-9 0-17 5-18 18Z" />
      </g>
      <text x="130" y="238" textAnchor="middle" className="fill-primary dark:fill-accent" style={{ font: "500 26px var(--font-serif), Georgia, serif", letterSpacing: "2px" }}>LUNA</text>
    </svg>
  );
}
