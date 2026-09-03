"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * SSR-safe localStorage-backed state hook.
 * Reads the stored value after mount and keeps it in sync across tabs.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw !== null) {
        setValue(JSON.parse(raw) as T)
      }
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? (next as (prev: T) => T)(prev) : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          // ignore quota / privacy-mode errors
        }
        return resolved
      })
    },
    [key],
  )

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== key) return
      try {
        setValue(e.newValue !== null ? (JSON.parse(e.newValue) as T) : initialValue)
      } catch {
        // ignore
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [value, update, hydrated] as const
}
