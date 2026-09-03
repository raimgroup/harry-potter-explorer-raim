export type HouseId = "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff"

export interface House {
  id: HouseId
  name: string
  apiName: string
  motto: string
  animal: string
  element: string
  founder: string
  traits: string[]
  description: string
  crest: string
  colors: {
    primary: string
    secondary: string
    /** oklch tuple used to theme the whole site accent */
    accentOklch: string
    accentForeground: string
    ring: string
  }
}

export const HOUSES: Record<HouseId, House> = {
  gryffindor: {
    id: "gryffindor",
    name: "Гриффиндор",
    apiName: "Gryffindor",
    motto: "Отвага, дерзость, доблесть и рыцарство",
    animal: "Лев",
    element: "Огонь",
    founder: "Годрик Гриффиндор",
    traits: ["Храбрость", "Отвага", "Решительность", "Благородство"],
    description:
      "Гриффиндор ценит храбрецов превыше всего. Здесь учатся те, кто не боится идти навстречу опасности, отстаивая правду и справедливость.",
    crest: "/images/crest-gryffindor.png",
    colors: {
      primary: "oklch(0.42 0.16 24)",
      secondary: "oklch(0.72 0.14 85)",
      accentOklch: "oklch(0.5 0.18 24)",
      accentForeground: "oklch(0.96 0.03 85)",
      ring: "oklch(0.72 0.14 85)",
    },
  },
  slytherin: {
    id: "slytherin",
    name: "Слизерин",
    apiName: "Slytherin",
    motto: "Хитрость поможет достичь цели",
    animal: "Змея",
    element: "Вода",
    founder: "Салазар Слизерин",
    traits: ["Амбициозность", "Хитрость", "Лидерство", "Решительность"],
    description:
      "Слизерин собирает тех, кто целеустремлён и хитроумен. Здесь высоко ценят амбиции, находчивость и стремление к величию.",
    crest: "/images/crest-slytherin.png",
    colors: {
      primary: "oklch(0.4 0.1 155)",
      secondary: "oklch(0.75 0.02 200)",
      accentOklch: "oklch(0.45 0.11 155)",
      accentForeground: "oklch(0.95 0.01 200)",
      ring: "oklch(0.75 0.02 200)",
    },
  },
  ravenclaw: {
    id: "ravenclaw",
    name: "Когтевран",
    apiName: "Ravenclaw",
    motto: "Разум превыше всего",
    animal: "Орёл",
    element: "Воздух",
    founder: "Ровена Когтевран",
    traits: ["Мудрость", "Остроумие", "Творчество", "Индивидуальность"],
    description:
      "Когтевран собирает под своей крышей самых умных и любознательных волшебников, ценящих знания и оригинальность мышления.",
    crest: "/images/crest-ravenclaw.png",
    colors: {
      primary: "oklch(0.38 0.1 250)",
      secondary: "oklch(0.65 0.09 60)",
      accentOklch: "oklch(0.42 0.12 250)",
      accentForeground: "oklch(0.95 0.03 60)",
      ring: "oklch(0.65 0.09 60)",
    },
  },
  hufflepuff: {
    id: "hufflepuff",
    name: "Пуффендуй",
    apiName: "Hufflepuff",
    motto: "Терпение приносит свои плоды",
    animal: "Барсук",
    element: "Земля",
    founder: "Хельга Пуффендуй",
    traits: ["Верность", "Терпение", "Трудолюбие", "Честность"],
    description:
      "Пуффендуй ценит преданность и упорный труд. Здесь учатся терпеливые, честные и невероятно верные своим друзьям волшебники.",
    crest: "/images/crest-hufflepuff.png",
    colors: {
      primary: "oklch(0.32 0.02 90)",
      secondary: "oklch(0.78 0.15 90)",
      accentOklch: "oklch(0.55 0.14 88)",
      accentForeground: "oklch(0.2 0.02 90)",
      ring: "oklch(0.78 0.15 90)",
    },
  },
}

export const HOUSE_LIST = Object.values(HOUSES)

export function getHouseByApiName(apiName: string | null | undefined): House | undefined {
  if (!apiName) return undefined
  return HOUSE_LIST.find((h) => h.apiName.toLowerCase() === apiName.toLowerCase())
}
