"use client"

import { useState, type FormEvent } from "react"
import { cn } from "@/lib/utils"

interface Exchange {
  question: string
  answer: string
}

export function OwlChat({ characterId, characterName }: { characterId: string; characterName: string }) {
  const [question, setQuestion] = useState("")
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = question.trim()
    if (!trimmed || isSending) return

    setIsSending(true)
    setError(null)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId, question: trimmed }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error ?? "Сова не долетела.")
      }

      setExchanges((prev) => [...prev, { question: trimmed, answer: data.answer as string }])
      setQuestion("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так.")
    } finally {
      setIsSending(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  return (
    <div className="rounded-2xl border border-accent/30 bg-card/50 p-5 sm:p-6">
      <h2 className="mb-1 font-serif text-lg text-foreground sm:text-xl">
        Поговорить с {characterName}
      </h2>
      <p className="mb-5 text-xs text-muted-foreground sm:text-sm">
        Отправь письмо совиной почтой — ответ развернётся как пергаментный свиток.
      </p>

      {exchanges.length > 0 && (
        <div className="mb-5 flex flex-col gap-4">
          {exchanges.map((exchange, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="self-end rounded-2xl rounded-tr-sm bg-secondary px-4 py-2 text-sm text-foreground/90">
                {exchange.question}
              </p>
              <div
                className={cn(
                  "animate-unroll self-start rounded-lg border border-accent/30 bg-[oklch(0.22_0.02_60)] px-4 py-3 text-sm leading-relaxed text-foreground shadow-inner shadow-black/30",
                )}
              >
                <p className="mb-1 font-serif text-xs uppercase tracking-wide text-muted-foreground">
                  {characterName} отвечает
                </p>
                {exchange.answer}
              </div>
            </div>
          ))}
        </div>
      )}

      {isSending && (
        <p className="mb-4 animate-pulse text-xs text-muted-foreground">
          Сова летит с ответом...
        </p>
      )}

      {error && <p className="mb-4 text-xs text-destructive">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Спроси что-нибудь у ${characterName}...`}
          rows={2}
          maxLength={500}
          className="flex-1 resize-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-accent/60"
        />
        <button
          type="submit"
          disabled={isSending || !question.trim()}
          className="shrink-0 self-end rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:self-auto"
        >
          Отправить сову
        </button>
      </form>
    </div>
  )
}
