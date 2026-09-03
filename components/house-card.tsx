"use client"

import Image from "next/image"
import type { House } from "@/lib/houses"
import { useHouse } from "@/contexts/house-provider"
import { cn } from "@/lib/utils"

export function HouseCard({ house, index }: { house: House; index: number }) {
  const { houseId, setHouseId } = useHouse()
  const isActive = houseId === house.id

  return (
    <div
      className={cn(
        "relative flex animate-rise-in flex-col overflow-hidden rounded-2xl border bg-card/60 p-6 transition-all sm:p-8",
        isActive ? "border-accent shadow-lg shadow-accent/20" : "border-border/60",
      )}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {isActive && (
        <span className="absolute right-4 top-4 rounded-full border border-accent/60 bg-accent/20 px-3 py-1 text-[10px] uppercase tracking-wider text-accent-foreground">
          Твой факультет
        </span>
      )}

      <div className="mb-5 flex items-center gap-4">
        <Image
          src={house.crest || "/placeholder.svg"}
          alt={`Герб факультета ${house.name}`}
          width={72}
          height={72}
          className="size-16 shrink-0 rounded-full object-cover sm:size-20"
        />
        <div>
          <h2 className="font-serif text-xl text-foreground sm:text-2xl">{house.name}</h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {house.animal} · {house.element}
          </p>
        </div>
      </div>

      <p className="mb-1 text-sm italic text-muted-foreground">&ldquo;{house.motto}&rdquo;</p>
      <p className="mb-5 text-xs text-muted-foreground">Основатель: {house.founder}</p>

      <p className="mb-5 flex-1 text-pretty text-sm leading-relaxed text-foreground/90">
        {house.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {house.traits.map((trait) => (
          <span
            key={trait}
            className="rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs text-muted-foreground"
          >
            {trait}
          </span>
        ))}
      </div>

      {!isActive && (
        <button
          onClick={() => setHouseId(house.id)}
          className="mt-auto self-start rounded-full border border-border/70 px-4 py-2 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
        >
          Выбрать этот факультет
        </button>
      )}
    </div>
  )
}
