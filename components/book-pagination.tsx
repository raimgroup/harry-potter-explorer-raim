export function BookPagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-12 flex items-center justify-between gap-4 border-t border-border/40 pt-6">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        <span aria-hidden>←</span> Предыдущая глава
      </button>

      <span className="font-serif text-sm font-light text-muted-foreground">
        Страница {page} из {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        Следующая глава <span aria-hidden>→</span>
      </button>
    </div>
  )
}
