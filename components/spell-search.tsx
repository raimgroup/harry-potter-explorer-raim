"use client"

export function SpellSearch({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="relative mx-auto max-w-xl">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
      >
        <path
          d="M4 20 15.5 8.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M14.5 3.5c1 1 2.5 1 3.5 0M20.5 9.5c-1 1-1 2.5 0 3.5M14.5 9.5c1-1 1-2.5 0-3.5c1 1 2.5 1 3.5 0c-1 1-1 2.5 0 3.5c-1-1-2.5-1-3.5 0Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Произнеси имя..."
        aria-label="Поиск волшебника по имени"
        className="w-full border border-border/50 bg-card/30 py-3.5 pl-12 pr-5 font-serif text-base font-light text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-accent/60"
      />
    </div>
  )
}
