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
        "relative flex animate-rise-in flex-col border bg-card/40 p-6 transition-all sm:p-8",
        isActive ? "border-accent/60" : "border-border/40",
      )}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {isActive && (
        <span className="absolute right-4 top-4 border border-accent/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Твой факультет
        </span>
      )}

      <div className="mb-6 flex items-center gap-4">
        <Image
          src={house.crest || "/placeholder.svg"}
          alt={`Герб факультета ${house.name}`}
          width={64}
          height={64}
          className="size-14 shrink-0 rounded-full object-cover opacity-90 sm:size-16"
        />
        <div>
          <h2 className="font-serif text-xl font-light tracking-wide text-foreground sm:text-2xl">
            {house.name}
          </h2>
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground sm:text-sm">
            {house.animal} · {house.element}
          </p>
        </div>
      </div>

      <p className="mb-1 text-sm font-light italic text-muted-foreground">
        &ldquo;{house.motto}&rdquo;
      </p>
      <p className="mb-6 text-xs text-muted-foreground">Основатель: {house.founder}</p>

      <p className="mb-6 flex-1 text-pretty text-sm font-light leading-relaxed text-foreground/85">
        {house.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {house.traits.map((trait) => (
          <span
            key={trait}
            className="border border-border/40 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
          >
            {trait}
          </span>
        ))}
      </div>

      {!isActive && (
        <button
          onClick={() => setHouseId(house.id)}
          className="mt-auto self-start text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          Выбрать этот факультет
        </button>
      )}
    </div>
  )
}
