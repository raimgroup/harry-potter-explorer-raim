import { NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { z } from "zod"
import { getCharacterById } from "@/lib/hp-api"

const requestSchema = z.object({
  characterId: z.string().min(1),
  question: z.string().min(1).max(500),
})

const MODEL = "anthropic/claude-sonnet-4.5"

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const parsed = requestSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: "Некорректный запрос совиной почты." }, { status: 400 })
    }

    const { characterId, question } = parsed.data
    const character = await getCharacterById(characterId)

    if (!character) {
      return NextResponse.json({ error: "Волшебник не найден." }, { status: 404 })
    }

    const factSheet = [
      `Дом: ${character.house || "неизвестен"}`,
      character.ancestry ? `Происхождение: ${character.ancestry}` : null,
      character.patronus ? `Патронус: ${character.patronus}` : null,
      character.wand?.wood ? `Палочка: ${character.wand.wood}, ${character.wand.core}` : null,
      character.species ? `Вид: ${character.species}` : null,
      character.actor ? `В фильмах роль играет: ${character.actor}` : null,
      character.alive === false ? "Персонаж погиб по сюжету книг." : null,
    ]
      .filter(Boolean)
      .join("; ")

    const { text } = await generateText({
      model: MODEL,
      instructions: `Ты — ${character.name} из вселенной "Гарри Поттер". Отвечай от первого лица, полностью в характере персонажа, используя его манеру речи, взгляды и знания, ограниченные миром волшебников. Известные факты о тебе: ${factSheet}. Отвечай по-русски, тепло и живо, как в письме, отправленном совиной почтой. Ответ должен быть кратким — 2-4 предложения. Не упоминай, что ты языковая модель или ИИ.`,
      prompt: question,
    })

    return NextResponse.json({ answer: text })
  } catch (error) {
    console.error("[v0] /api/chat failed:", error)
    return NextResponse.json(
      { error: "Сова не долетела — попробуй отправить письмо ещё раз." },
      { status: 502 },
    )
  }
}
