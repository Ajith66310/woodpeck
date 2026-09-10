import { createContext } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import type { ComponentChildren } from 'preact'
import type { Theme, ThemeContextType } from '../types/index.ts'
import { storageService } from '../services/storage.ts'

const THEME_KEY = 'preact_app_theme'

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {}
})

interface ThemeProviderProps {
  children: ComponentChildren
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return storageService.get<Theme>(THEME_KEY, 'dark')
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    storageService.set(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
