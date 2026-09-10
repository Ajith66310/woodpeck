import { useState, useEffect } from 'preact/hooks'
import { storageService } from '../services/storage.ts'

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    return storageService.get<T>(key, initialValue)
  })

  useEffect(() => {
    storageService.set(key, value)
  }, [key, value])

  const setStoredValue = (val: T | ((prev: T) => T)) => {
    if (typeof val === 'function') {
      setValue((prev) => {
        const next = (val as (prev: T) => T)(prev)
        storageService.set(key, next)
        return next
      })
    } else {
      setValue(val)
      storageService.set(key, val)
    }
  }

  return [value, setStoredValue]
}
