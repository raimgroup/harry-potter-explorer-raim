"use client"

import Image from "next/image"
import Link from "next/link"
import { useFavorites } from "@/hooks/use-favorites"
import { getHouseByApiName } from "@/lib/houses"

export default function FavoritesPage() {
  const { favorites, removeFavorite, hydrated } = useFavorites()

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-10 text-center">
        <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Твой личный альбом
        </p>
        <h1 className="mb-4 text-balance font-serif text-3xl text-foreground sm:text-4xl">
          Избранное
        </h1>
        <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Здесь хранятся портреты волшебников, которых ты отметил как избранных.
        </p>
      </div>

      {!hydrated ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-card/60" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Пока пусто. Загляни в каталог и найди тех, кто тебе запомнился.
          </p>
          <Link
            href="/characters"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground"
          >
            Открыть каталог волшебников
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {favorites.map((favorite) => {
            const house = getHouseByApiName(favorite.house)
            const borderColor = house?.colors.secondary ?? "oklch(0.6 0.01 60)"
            return (
              <div
                key={favorite.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border bg-card/60"
                style={{ borderColor }}
              >
                <Link href={`/characters/${favorite.id}`} className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  {favorite.image ? (
                    <Image
                      src={favorite.image || "/placeholder.svg"}
                      alt={favorite.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-serif text-4xl text-muted-foreground">
                      {favorite.name.charAt(0)}
                    </div>
                  )}
                </Link>
                <div className="flex flex-1 items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <Link href={`/characters/${favorite.id}`}>
                      <h3 className="truncate font-serif text-sm text-foreground">
                        {favorite.name}
                      </h3>
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">
                      {house ? house.name : favorite.house || "Дом неизвестен"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFavorite(favorite.id)}
                    aria-label={`Убрать ${favorite.name} из избранного`}
                    className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
                      <path
                        d="M6 6l12 12M18 6 6 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
