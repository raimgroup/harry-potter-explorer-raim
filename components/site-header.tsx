"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useHouse } from "@/contexts/house-provider"

const NAV_LINKS = [
  { href: "/", label: "Хогвартс" },
  { href: "/sorting", label: "Распределение" },
  { href: "/houses", label: "Факультеты" },
  { href: "/characters", label: "Волшебники" },
  { href: "/favorites", label: "Избранное" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { house } = useHouse()

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="flex size-8 items-center justify-center border border-border/50 text-muted-foreground"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-4">
              <path
                d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-serif text-base font-light uppercase tracking-[0.25em] text-foreground sm:text-lg">
            HP Explorer
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-xs uppercase tracking-[0.15em] transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {house ? (
            <Link
              href="/houses"
              className="flex items-center gap-2 border border-border/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
            >
              <Image
                src={house.crest || "/placeholder.svg"}
                alt={`Герб ${house.name}`}
                width={20}
                height={20}
                className="size-5 rounded-full object-cover opacity-90"
              />
              <span className="hidden sm:inline">{house.name}</span>
            </Link>
          ) : (
            <Link
              href="/sorting"
              className="hidden border border-border/50 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground sm:inline-block"
            >
              Распределение
            </Link>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border/40 px-3 py-1.5 md:hidden">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 px-2.5 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
