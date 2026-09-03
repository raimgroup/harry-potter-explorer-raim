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
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-border/50 pt-6">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        <span aria-hidden>←</span> Предыдущая глава
      </button>

      <span className="font-serif text-sm text-muted-foreground">
        Страница {page} из {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        Следующая глава <span aria-hidden>→</span>
      </button>
    </div>
  )
}
