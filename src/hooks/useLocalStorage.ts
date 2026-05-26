import { useState } from 'react'

type Updater<T> = T | ((prev: T) => T)

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: Updater<T>) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value: Updater<T>) => {
    try {
      const resolved = value instanceof Function ? value(storedValue) : value
      setStoredValue(resolved)
      window.localStorage.setItem(key, JSON.stringify(resolved))
    } catch (_e) {
      void _e
    }
  }

  return [storedValue, setValue]
}
