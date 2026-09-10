import { useContext } from 'preact/hooks'
import { ThemeContext } from '../context/ThemeContext.tsx'
import type { ThemeContextType } from '../types/index.ts'

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
