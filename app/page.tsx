import Image from "next/image"
import Link from "next/link"
import { HOUSE_LIST } from "@/lib/houses"
import { HomeHouseBadge } from "@/components/home-house-badge"

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="relative mb-8 animate-flicker">
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-accent/25 blur-3xl" />
          <Image
            src="/images/sorting-hat-hero.png"
            alt="Древняя Распределяющая шляпа, освещённая свечами"
            width={280}
            height={280}
            priority
            className="h-56 w-56 rounded-2xl object-cover shadow-2xl candle-glow sm:h-72 sm:w-72"
          />
        </div>

        <p className="mb-3 animate-rise-in font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground [animation-delay:0.05s]">
          Хогвартс приветствует тебя
        </p>
        <h1 className="mb-5 max-w-3xl animate-rise-in text-balance font-serif text-4xl leading-tight text-foreground text-shadow-ember [animation-delay:0.15s] sm:text-5xl md:text-6xl">
          Распределяющая шляпа проводит тебя
        </h1>
        <p className="mb-10 max-w-xl animate-rise-in text-pretty text-base leading-relaxed text-muted-foreground [animation-delay:0.25s] sm:text-lg">
          Пройди древний обряд распределения, узнай свой факультет и отправляйся исследовать
          волшебный мир — от портретов легендарных волшебников до писем, написанных совиной
          почтой.
        </p>

        <div className="flex animate-rise-in flex-col items-center gap-4 [animation-delay:0.35s] sm:flex-row">
          <Link
            href="/sorting"
            className="rounded-full bg-accent px-8 py-3.5 font-serif text-sm uppercase tracking-wider text-accent-foreground shadow-lg shadow-accent/30 transition-transform hover:scale-105"
          >
            Пройти распределение
          </Link>
          <Link
            href="/characters"
            className="rounded-full border border-border/70 px-8 py-3.5 text-sm text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
          >
            Заглянуть в каталог волшебников
          </Link>
        </div>

        <HomeHouseBadge />
      </section>

      <section className="border-t border-border/60 bg-card/40 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center font-serif text-2xl text-foreground sm:text-3xl">
            Четыре факультета, четыре пути
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
            Каждый факультет Хогвартса ценит свои добродетели. Пройди распределение, чтобы узнать,
            куда приведёт тебя шляпа.
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {HOUSE_LIST.map((house, i) => (
              <Link
                key={house.id}
                href="/houses"
                className="group flex animate-rise-in flex-col items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-5 text-center transition-colors hover:border-accent/50"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <Image
                  src={house.crest || "/placeholder.svg"}
                  alt={`Герб факультета ${house.name}`}
                  width={72}
                  height={72}
                  className="size-16 rounded-full object-cover transition-transform group-hover:scale-110"
                />
                <span className="font-serif text-sm text-foreground sm:text-base">
                  {house.name}
                </span>
                <span className="text-xs text-muted-foreground">{house.element}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
