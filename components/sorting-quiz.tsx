"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { QUIZ_QUESTIONS } from "@/lib/quiz-data"
import { HOUSES, type HouseId } from "@/lib/houses"
import { useHouse } from "@/contexts/house-provider"
import { cn } from "@/lib/utils"

export function SortingQuiz() {
  const { setHouseId } = useHouse()
  const [step, setStep] = useState(0)
  const [tally, setTally] = useState<Record<HouseId, number>>({
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0,
  })
  const [result, setResult] = useState<HouseId | null>(null)
  const [revealed, setRevealed] = useState(false)

  const question = QUIZ_QUESTIONS[step]
  const progress = useMemo(() => ((step + (result ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100, [step, result])

  function chooseAnswer(house: HouseId) {
    const nextTally = { ...tally, [house]: tally[house] + 1 }
    setTally(nextTally)

    if (step + 1 < QUIZ_QUESTIONS.length) {
      setStep(step + 1)
      return
    }

    const winner = (Object.entries(nextTally) as [HouseId, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0]
    setResult(winner)
    setHouseId(winner)
    window.setTimeout(() => setRevealed(true), 150)
  }

  function restart() {
    setStep(0)
    setTally({ gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 })
    setResult(null)
    setRevealed(false)
  }

  if (result) {
    const house = HOUSES[result]
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center sm:py-24">
        <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          Распределение завершено
        </p>
        <div
          className={cn(
            "relative mb-7 flex size-32 items-center justify-center border border-accent/40 transition-all duration-700 sm:size-36",
            revealed ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        >
          <div className="absolute inset-0 -z-10 animate-soft-glow bg-accent/15 blur-xl" />
          <Image
            src={house.crest || "/placeholder.svg"}
            alt={`Герб ${house.name}`}
            width={120}
            height={120}
            className="size-24 rounded-full object-cover opacity-90 sm:size-28"
          />
        </div>
        <h1
          className={cn(
            "mb-3 font-serif text-3xl font-light tracking-wide text-foreground transition-all delay-300 duration-700 sm:text-4xl",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          {house.name}
        </h1>
        <p
          className={cn(
            "mb-10 max-w-md text-pretty text-sm font-light leading-relaxed text-muted-foreground transition-all delay-500 duration-700 sm:text-base",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          &ldquo;{house.motto}&rdquo; — теперь и твой девиз. {house.description}
        </p>
        <div
          className={cn(
            "flex flex-col items-center gap-4 transition-all delay-700 duration-700 sm:flex-row",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <Link
            href="/houses"
            className="group relative overflow-hidden border border-foreground/40 px-8 py-3 text-xs uppercase tracking-[0.3em] text-foreground transition-colors duration-300 hover:text-accent-foreground"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-y-100"
            />
            Узнать больше
          </Link>
          <button
            onClick={restart}
            className="text-xs uppercase tracking-[0.25em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Пройти ещё раз
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:py-20">
      <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>
          Вопрос {step + 1} из {QUIZ_QUESTIONS.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="mb-12 h-px w-full overflow-hidden bg-border/50">
        <div
          className="h-full bg-accent/70 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div key={step} className="animate-rise-in">
        <h1 className="mb-10 text-balance text-center font-serif text-2xl font-light leading-snug tracking-wide text-foreground sm:text-3xl">
          {question.question}
        </h1>
        <div className="flex flex-col gap-3">
          {question.answers.map((answer) => (
            <button
              key={answer.text}
              onClick={() => chooseAnswer(answer.house)}
              className="border border-border/40 bg-transparent px-5 py-4 text-left text-sm font-light leading-relaxed text-foreground/90 transition-colors hover:border-accent/50 hover:bg-card/40 sm:text-base"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
