import Image from "next/image"
import Link from "next/link"
import { HOUSE_LIST } from "@/lib/houses"
import { HomeHouseBadge } from "@/components/home-house-badge"

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="mb-6 animate-rise-in text-[11px] uppercase tracking-[0.45em] text-muted-foreground [animation-delay:0.05s]">
          HP Explorer
        </p>
        <h1 className="mb-6 max-w-2xl animate-rise-in text-balance font-serif text-4xl font-light leading-[1.15] tracking-wide text-foreground [animation-delay:0.15s] sm:text-5xl md:text-6xl">
          Распределяющая шляпа проводит тебя
        </h1>
        <p className="mb-12 max-w-md animate-rise-in text-pretty text-sm font-light leading-relaxed text-muted-foreground [animation-delay:0.25s] sm:text-base">
          Пройди обряд распределения, узнай свой факультет и отправляйся исследовать волшебный
          мир — от портретов легендарных волшебников до писем, написанных совиной почтой.
        </p>

        <Link
          href="/sorting"
          className="group relative overflow-hidden border border-foreground/40 px-10 py-3.5 text-xs uppercase tracking-[0.3em] text-foreground transition-colors duration-300 hover:text-accent-foreground animate-rise-in [animation-delay:0.35s]"
        >
          <span
            aria-hidden
            className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
          />
          Пройти распределение
        </Link>

        <Link
          href="/characters"
          className="mt-6 animate-rise-in text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline [animation-delay:0.45s]"
        >
          Каталог волшебников
        </Link>

        <HomeHouseBadge />
      </section>

      <section className="border-t border-border/40 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-center text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Хогвартс
          </p>
          <h2 className="mb-3 text-center font-serif text-2xl font-light text-foreground sm:text-3xl">
            Четыре факультета, четыре пути
          </h2>
          <p className="mx-auto mb-14 max-w-lg text-center text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
            Каждый факультет Хогвартса ценит свои добродетели. Пройди распределение, чтобы узнать,
            куда приведёт тебя шляпа.
          </p>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-border/40 sm:grid-cols-4">
            {HOUSE_LIST.map((house, i) => (
              <Link
                key={house.id}
                href="/houses"
                className="group flex animate-rise-in flex-col items-center gap-3 bg-background/40 px-4 py-10 text-center transition-colors hover:bg-card/60"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <Image
                  src={house.crest || "/placeholder.svg"}
                  alt={`Герб факультета ${house.name}`}
                  width={56}
                  height={56}
                  className="size-12 rounded-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="font-serif text-sm font-light tracking-wide text-foreground sm:text-base">
                  {house.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {house.element}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
