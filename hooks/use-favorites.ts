"use client"

import { useCallback } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export interface FavoriteCharacter {
  id: string
  name: string
  image: string
  house: string
}

const KEY = "hp-explorer:favorites"

export function useFavorites() {
  const [favorites, setFavorites, hydrated] = useLocalStorage<FavoriteCharacter[]>(KEY, [])

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites],
  )

  const toggleFavorite = useCallback(
    (character: FavoriteCharacter) => {
      setFavorites((prev) =>
        prev.some((f) => f.id === character.id)
          ? prev.filter((f) => f.id !== character.id)
          : [...prev, character],
      )
    },
    [setFavorites],
  )

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((f) => f.id !== id))
    },
    [setFavorites],
  )

  return { favorites, isFavorite, toggleFavorite, removeFavorite, hydrated }
}
