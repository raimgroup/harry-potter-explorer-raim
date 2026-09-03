import type { Metadata } from "next"
import { HOUSE_LIST } from "@/lib/houses"
import { HouseCard } from "@/components/house-card"

export const metadata: Metadata = {
  title: "Факультеты — Harry Potter Explorer",
  description: "Гриффиндор, Слизерин, Когтевран и Пуффендуй: символика, черты и легенды факультетов Хогвартса.",
}

export default function HousesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-10 text-center">
        <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Четыре дома Хогвартса
        </p>
        <h1 className="mb-4 text-balance font-serif text-3xl text-foreground sm:text-4xl">
          Факультеты
        </h1>
        <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          Каждый факультет носит имя своего основателя и хранит собственные традиции. Узнай, чем
          живёт твой дом — или пройди распределение, если ещё не сделал этого.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {HOUSE_LIST.map((house, i) => (
          <HouseCard key={house.id} house={house} index={i} />
        ))}
      </div>
    </div>
  )
}
