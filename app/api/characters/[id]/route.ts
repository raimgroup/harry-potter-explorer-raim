import { NextRequest, NextResponse } from "next/server"
import { getCharacterById } from "@/lib/hp-api"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const character = await getCharacterById(id)

    if (!character) {
      return NextResponse.json({ error: "Волшебник не найден" }, { status: 404 })
    }

    return NextResponse.json(character, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    })
  } catch (error) {
    console.error("[v0] /api/characters/[id] failed:", error)
    return NextResponse.json(
      { error: "Не удалось получить данные волшебника. Попробуй позже." },
      { status: 502 },
    )
  }
}
