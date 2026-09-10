/**
 * Safe local storage service with fallback
 */
export const storageService = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }
}
