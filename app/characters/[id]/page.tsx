import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCharacterById } from "@/lib/hp-api"
import { getHouseByApiName } from "@/lib/houses"
import { formatAncestry, formatBirthday } from "@/lib/format"
import { FavoriteButton } from "@/components/favorite-button"
import { OwlChat } from "@/components/owl-chat"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const character = await getCharacterById(id)
  return {
    title: character ? `${character.name} — Harry Potter Explorer` : "Волшебник не найден",
  }
}

export default async function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const character = await getCharacterById(id)

  if (!character) {
    notFound()
  }

  const house = getHouseByApiName(character.house)
  const birthday = formatBirthday(character.dateOfBirth)
  const ancestry = formatAncestry(character.ancestry)

  const facts: { label: string; value: string }[] = [
    { label: "Дом", value: house?.name ?? (character.house || "Неизвестен") },
    ...(birthday ? [{ label: "Дата рождения", value: birthday }] : []),
    ...(character.wand?.wood
      ? [
          {
            label: "Палочка",
            value: [
              character.wand.wood,
              character.wand.core,
              character.wand.length ? `${character.wand.length}"` : null,
            ]
              .filter(Boolean)
              .join(", "),
          },
        ]
      : []),
    ...(character.patronus ? [{ label: "Патронус", value: character.patronus }] : []),
    ...(ancestry ? [{ label: "Кровь", value: ancestry }] : []),
    ...(character.species && character.species.toLowerCase() !== "human"
      ? [{ label: "Вид", value: character.species }]
      : []),
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <Link
        href="/characters"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Предыдущая глава
      </Link>

      <div className="mb-10 flex flex-col gap-6 sm:flex-row">
        <div className="relative mx-auto aspect-[3/4] w-56 shrink-0 overflow-hidden border border-border/50 sm:mx-0">
          {character.image ? (
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary font-serif text-5xl text-muted-foreground">
              {character.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <p className="mb-2 font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {house ? house.name : "Личное дело волшебника"}
          </p>
          <h1 className="mb-4 text-balance font-serif text-3xl text-foreground sm:text-4xl">
            {character.name}
          </h1>

          <dl className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-lg border border-border/50 bg-card/40 px-3 py-2">
                <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="text-sm text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <FavoriteButton
            id={character.id}
            name={character.name}
            image={character.image}
            house={character.house}
          />
        </div>
      </div>

      <OwlChat characterId={character.id} characterName={character.name} />
    </div>
  )
}
