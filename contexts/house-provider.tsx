"use client"

import { createContext, useContext, useEffect, useMemo } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { HOUSES, type HouseId, type House } from "@/lib/houses"

interface HouseContextValue {
  houseId: HouseId | null
  house: House | null
  setHouseId: (id: HouseId) => void
  clearHouse: () => void
  hydrated: boolean
}

const HouseContext = createContext<HouseContextValue | null>(null)

export function HouseProvider({ children }: { children: React.ReactNode }) {
  const [houseId, setHouseIdRaw, hydrated] = useLocalStorage<HouseId | null>(
    "hp-explorer:house",
    null,
  )

  const house = houseId ? HOUSES[houseId] : null

  useEffect(() => {
    const root = document.documentElement
    if (house) {
      root.style.setProperty("--accent", house.colors.accentOklch)
      root.style.setProperty("--accent-foreground", house.colors.accentForeground)
      root.style.setProperty("--ring", house.colors.ring)
      root.style.setProperty("--house-primary", house.colors.primary)
      root.style.setProperty("--house-secondary", house.colors.secondary)
      root.dataset.house = house.id
    } else {
      root.style.removeProperty("--accent")
      root.style.removeProperty("--accent-foreground")
      root.style.removeProperty("--ring")
      root.style.removeProperty("--house-primary")
      root.style.removeProperty("--house-secondary")
      delete root.dataset.house
    }
  }, [house])

  const value = useMemo<HouseContextValue>(
    () => ({
      houseId,
      house,
      setHouseId: (id: HouseId) => setHouseIdRaw(id),
      clearHouse: () => setHouseIdRaw(null),
      hydrated,
    }),
    [houseId, house, setHouseIdRaw, hydrated],
  )

  return <HouseContext.Provider value={value}>{children}</HouseContext.Provider>
}

export function useHouse() {
  const ctx = useContext(HouseContext)
  if (!ctx) throw new Error("useHouse must be used within a HouseProvider")
  return ctx
}
