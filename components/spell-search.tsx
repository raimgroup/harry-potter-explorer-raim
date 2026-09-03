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
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-accent-foreground/80"
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
        className="w-full rounded-full border border-accent/40 bg-card/70 py-3.5 pl-12 pr-5 font-serif text-base text-foreground placeholder:text-muted-foreground/70 shadow-inner shadow-black/20 outline-none transition-colors focus:border-accent"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 scale-105 rounded-full bg-accent/10 blur-lg" aria-hidden />
    </div>
  )
}
