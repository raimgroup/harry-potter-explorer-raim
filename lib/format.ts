const MONTHS_RU = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
]

/** Formats a "DD-MM-YYYY" date string from the HP API into readable Russian text. */
export function formatBirthday(raw: string | null | undefined): string | null {
  if (!raw) return null
  const match = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/)
  if (!match) return raw
  const [, day, month, year] = match
  const monthName = MONTHS_RU[Number.parseInt(month, 10) - 1]
  if (!monthName) return raw
  return `${Number.parseInt(day, 10)} ${monthName} ${year}`
}

const ANCESTRY_RU: Record<string, string> = {
  "pure-blood": "чистокровный",
  "half-blood": "полукровка",
  muggleborn: "маглорождённый",
  squib: "сквиб",
  "part-human": "получеловек",
  "part human (part-goblin)": "получеловек (частично гоблин)",
}

export function formatAncestry(raw: string | null | undefined): string | null {
  if (!raw) return null
  return ANCESTRY_RU[raw.toLowerCase()] ?? raw
}
