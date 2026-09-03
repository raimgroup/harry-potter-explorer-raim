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
        <p className="mb-4 font-serif text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Распределение завершено
        </p>
        <div
          className={cn(
            "relative mb-6 flex size-40 items-center justify-center rounded-full border-4 border-accent/50 bg-accent/10 transition-all duration-700 sm:size-48",
            revealed ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        >
          <div className="absolute inset-0 -z-10 animate-flicker rounded-full bg-accent/30 blur-2xl" />
          <Image
            src={house.crest || "/placeholder.svg"}
            alt={`Герб ${house.name}`}
            width={140}
            height={140}
            className="size-32 rounded-full object-cover sm:size-40"
          />
        </div>
        <h1
          className={cn(
            "mb-2 font-serif text-3xl text-foreground transition-all delay-300 duration-700 sm:text-4xl",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          {house.name}!
        </h1>
        <p
          className={cn(
            "mb-8 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground transition-all delay-500 duration-700 sm:text-base",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          &ldquo;{house.motto}&rdquo; — теперь и твой девиз. {house.description}
        </p>
        <div
          className={cn(
            "flex flex-col items-center gap-3 transition-all delay-700 duration-700 sm:flex-row",
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <Link
            href="/houses"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/25 transition-transform hover:scale-105"
          >
            Узнать больше о факультете
          </Link>
          <button
            onClick={restart}
            className="rounded-full border border-border/70 px-6 py-3 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Пройти ещё раз
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:py-20">
      <div className="mb-8 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Вопрос {step + 1} из {QUIZ_QUESTIONS.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="mb-10 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div key={step} className="animate-rise-in">
        <h1 className="mb-8 text-balance text-center font-serif text-2xl leading-snug text-foreground sm:text-3xl">
          {question.question}
        </h1>
        <div className="flex flex-col gap-3">
          {question.answers.map((answer) => (
            <button
              key={answer.text}
              onClick={() => chooseAnswer(answer.house)}
              className="rounded-xl border border-border/60 bg-card/50 px-5 py-4 text-left text-sm leading-relaxed text-foreground transition-all hover:border-accent/50 hover:bg-accent/10 sm:text-base"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
