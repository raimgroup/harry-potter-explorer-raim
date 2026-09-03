"use client"

import { useState } from "react"
import useSWR from "swr"
import { SpellSearch } from "@/components/spell-search"
import { CharacterPortraitCard } from "@/components/character-portrait-card"
import { BookPagination } from "@/components/book-pagination"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import type { CharactersResponse } from "@/lib/types"

const PAGE_SIZE = 12

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Не удалось загрузить волшебников")
  return res.json() as Promise<CharactersResponse>
}

export default function CharactersPage() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const debouncedQuery = useDebouncedValue(query, 350)

  const offset = (page - 1) * PAGE_SIZE
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    offset: String(offset),
  })
  if (debouncedQuery.trim()) params.set("search", debouncedQuery.trim())

  const { data, isLoading, error } = useSWR<CharactersResponse>(
    `/api/characters?${params.toString()}`,
    fetcher,
    { keepPreviousData: true },
  )

  const totalPages = data ? Math.max(1, Math.ceil(data.total / PAGE_SIZE)) : 1

  function handleQueryChange(next: string) {
    setQuery(next)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-12 text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          Книга обитателей волшебного мира
        </p>
        <h1 className="mb-5 text-balance font-serif text-3xl font-light tracking-wide text-foreground sm:text-4xl">
          Каталог волшебников
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-pretty text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
          Произнеси имя, и движущиеся портреты откликнутся.
        </p>
        <SpellSearch value={query} onChange={handleQueryChange} />
      </div>

      {error && (
        <p className="mx-auto max-w-md text-center text-sm text-destructive">
          Не удалось призвать список волшебников. Попробуй ещё раз чуть позже.
        </p>
      )}

      {isLoading && !data && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse border border-border/40 bg-card/30"
            />
          ))}
        </div>
      )}

      {data && data.results.length === 0 && (
        <p className="mx-auto max-w-md text-center text-sm text-muted-foreground">
          Портреты молчат — ни один волшебник не откликнулся на это имя.
        </p>
      )}

      {data && data.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {data.results.map((character, i) => (
              <CharacterPortraitCard key={character.id} character={character} index={i} />
            ))}
          </div>

          <BookPagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </>
      )}
    </div>
  )
}
