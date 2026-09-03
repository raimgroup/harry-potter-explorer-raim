"use client"

import Link from "next/link"
import Image from "next/image"
import { useHouse } from "@/contexts/house-provider"

export function HomeHouseBadge() {
  const { house, hydrated } = useHouse()

  if (!hydrated || !house) return null

  return (
    <Link
      href="/houses"
      className="mt-10 flex animate-rise-in items-center gap-3 border border-border/50 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
    >
      <Image
        src={house.crest || "/placeholder.svg"}
        alt=""
        width={24}
        height={24}
        className="size-6 rounded-full object-cover opacity-90"
      />
      Шляпа определила: ты — {house.name.toLowerCase()}
    </Link>
  )
}
