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
      className="mt-10 flex animate-rise-in items-center gap-3 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-accent/20"
    >
      <Image
        src={house.crest || "/placeholder.svg"}
        alt=""
        width={28}
        height={28}
        className="size-7 rounded-full object-cover"
      />
      Шляпа определила: ты — {house.name.toLowerCase()}
    </Link>
  )
}
