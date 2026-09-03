import type { Character } from "@/lib/types"

const HP_API_URL = "https://hp-api.onrender.com/api/characters"

// Module-scope cache: the upstream HP API has no pagination or search of its
// own, so each server instance fetches the full roster once and reuses it.
let cache: { data: Character[]; fetchedAt: number } | null = null
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

export async function getAllCharacters(): Promise<Character[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data
  }

  const res = await fetch(HP_API_URL, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    if (cache) return cache.data // serve stale data instead of failing outright
    throw new Error(`HP API responded with ${res.status}`)
  }

  const data = (await res.json()) as Character[]
  cache = { data, fetchedAt: Date.now() }
  return data
}

export async function getCharacterById(id: string): Promise<Character | undefined> {
  const all = await getAllCharacters()
  return all.find((c) => c.id === id)
}
