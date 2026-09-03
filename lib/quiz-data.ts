import type { HouseId } from "@/lib/houses"

export interface QuizAnswer {
  text: string
  house: HouseId
}

export interface QuizQuestion {
  question: string
  answers: QuizAnswer[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Ты нашёл запертую дверь в старом крыле замка. Что делаешь?",
    answers: [
      { text: "Тут же пробую её открыть — интересно, что скрыто внутри", house: "gryffindor" },
      { text: "Ищу способ обойти замок так, чтобы никто не заметил", house: "slytherin" },
      { text: "Изучаю руны на двери, пытаясь понять принцип запора", house: "ravenclaw" },
      { text: "Спрашиваю у смотрителя — вдруг дверь заперта не просто так", house: "hufflepuff" },
    ],
  },
  {
    question: "Друг просит помощи с трудным заданием перед экзаменом. Твоя реакция?",
    answers: [
      { text: "Бросаю все дела и иду разбираться с проблемой немедленно", house: "gryffindor" },
      { text: "Помогу, но взамен попрошу что-то полезное для себя", house: "slytherin" },
      { text: "Предлагаю разложить задачу по шагам и найти логичное решение", house: "ravenclaw" },
      { text: "Останусь рядом столько, сколько нужно, даже если это долго", house: "hufflepuff" },
    ],
  },
  {
    question: "Какое качество ты ценишь в себе больше всего?",
    answers: [
      { text: "Смелость — я не отступаю перед трудностями", house: "gryffindor" },
      { text: "Целеустремлённость — я всегда добиваюсь своего", house: "slytherin" },
      { text: "Любознательность — мне важно понимать, как всё устроено", house: "ravenclaw" },
      { text: "Верность — я никогда не бросаю тех, кто мне дорог", house: "hufflepuff" },
    ],
  },
  {
    question: "Выбери артефакт, который взял бы с собой в опасное путешествие.",
    answers: [
      { text: "Меч — на случай, если придётся сражаться", house: "gryffindor" },
      { text: "Плащ-невидимка — чтобы действовать незаметно", house: "slytherin" },
      { text: "Древний трактат с разгадками старых тайн", house: "ravenclaw" },
      { text: "Компас, который всегда приводит к дому", house: "hufflepuff" },
    ],
  },
]
