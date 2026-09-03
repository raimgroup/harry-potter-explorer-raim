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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="flex size-9 items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-accent-foreground"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5 text-accent-foreground">
              <path
                d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M9 12.5l2 2 4-4.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-serif text-lg tracking-wide text-foreground sm:text-xl">
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
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent/20 text-accent-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
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
              className="flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Image
                src={house.crest || "/placeholder.svg"}
                alt={`Герб ${house.name}`}
                width={22}
                height={22}
                className="size-5 rounded-full object-cover"
              />
              <span className="hidden sm:inline">{house.name}</span>
            </Link>
          ) : (
            <Link
              href="/sorting"
              className="hidden rounded-full border border-accent/50 bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/25 sm:inline-block"
            >
              Пройти распределение
            </Link>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border/50 px-3 py-1.5 md:hidden">
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-accent/20 text-accent-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
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
