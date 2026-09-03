import { NextRequest, NextResponse } from "next/server"
import { getAllCharacters } from "@/lib/hp-api"
import type { CharactersResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = (searchParams.get("search") ?? "").trim().toLowerCase()
    const house = (searchParams.get("house") ?? "").trim().toLowerCase()
    const limitParam = Number.parseInt(searchParams.get("limit") ?? "12", 10)
    const offsetParam = Number.parseInt(searchParams.get("offset") ?? "0", 10)

    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 48) : 12
    const offset = Number.isFinite(offsetParam) ? Math.max(offsetParam, 0) : 0

    const all = await getAllCharacters()

    let filtered = all
    if (search) {
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(search))
    }
    if (house) {
      filtered = filtered.filter((c) => c.house?.toLowerCase() === house)
    }

    const total = filtered.length
    const results = filtered.slice(offset, offset + limit)

    const payload: CharactersResponse = { results, total, limit, offset }

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    })
  } catch (error) {
    console.error("[v0] /api/characters failed:", error)
    return NextResponse.json(
      { error: "Не удалось получить список волшебников. Попробуй позже." },
      { status: 502 },
    )
  }
}
