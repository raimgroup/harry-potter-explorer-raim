import type { Metadata } from "next"
import { SortingQuiz } from "@/components/sorting-quiz"

export const metadata: Metadata = {
  title: "Распределение — Harry Potter Explorer",
  description: "Пройди обряд распределения и узнай свой факультет в Хогвартсе.",
}

export default function SortingPage() {
  return <SortingQuiz />
}
