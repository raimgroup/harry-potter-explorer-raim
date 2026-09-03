import Link from "next/link"

export default function CharacterNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Портрет молчит
      </p>
      <h1 className="mb-4 font-serif text-2xl text-foreground">Волшебник не найден</h1>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
        Возможно, этот портрет спрятан в другом крыле замка. Попробуй вернуться в каталог и
        произнести имя ещё раз.
      </p>
      <Link
        href="/characters"
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground"
      >
        Вернуться в каталог
      </Link>
    </div>
  )
}
