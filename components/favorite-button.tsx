"use client"

import { useFavorites } from "@/hooks/use-favorites"
import { cn } from "@/lib/utils"

export function FavoriteButton({
  id,
  name,
  image,
  house,
}: {
  id: string
  name: string
  image: string
  house: string
}) {
  const { isFavorite, toggleFavorite, hydrated } = useFavorites()
  const active = isFavorite(id)

  return (
    <button
      onClick={() => toggleFavorite({ id, name, image, house })}
      disabled={!hydrated}
      className={cn(
        "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
        active
          ? "border-accent bg-accent/20 text-accent-foreground"
          : "border-border/70 text-muted-foreground hover:border-accent/50 hover:text-foreground",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        className="size-4"
        aria-hidden
      >
        <path
          d="M12 20s-7-4.5-9.5-9C.5 7 2 3.5 5.5 3 8 2.6 10.3 3.9 12 6c1.7-2.1 4-3.4 6.5-3 3.5.5 5 4 3 8-2.5 4.5-9.5 9-9.5 9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {active ? "В избранном" : "Добавить в избранное"}
    </button>
  )
}
