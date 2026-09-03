import Image from "next/image"
import Link from "next/link"
import type { Character } from "@/lib/types"
import { getHouseByApiName } from "@/lib/houses"

export function CharacterPortraitCard({
  character,
  index,
}: {
  character: Character
  index: number
}) {
  const house = getHouseByApiName(character.house)
  const borderColor = house?.colors.secondary ?? "oklch(0.6 0.01 60)"

  return (
    <Link
      href={`/characters/${character.id}`}
      className="group animate-rise-in flex flex-col overflow-hidden border bg-card/40 transition-transform duration-300 hover:-translate-y-1"
      style={{
        animationDelay: `${Math.min(index, 10) * 0.05}s`,
        borderColor,
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {character.image ? (
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            fill
            unoptimized
            className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-4xl text-muted-foreground">
            {character.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity group-hover:opacity-80" />
        {!character.alive && (
          <span className="absolute right-2 top-2 border border-white/20 bg-black/50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/80">
            Погиб
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="truncate font-serif text-sm font-light tracking-wide text-foreground sm:text-base">
          {character.name}
        </h3>
        <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {house ? house.name : character.house || "Дом неизвестен"}
        </p>
        {character.patronus && (
          <p className="mt-auto truncate text-xs text-muted-foreground/70">
            Патронус: {character.patronus}
          </p>
        )}
      </div>
    </Link>
  )
}
