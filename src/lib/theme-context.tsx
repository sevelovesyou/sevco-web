'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { Theme } from './theme'
import { THEME_CONFIG } from './theme'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('sevco-theme') as Theme | null
    if (savedTheme && Object.keys(THEME_CONFIG).includes(savedTheme)) {
      setThemeState(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme: Theme = prefersDark ? 'dark' : 'light'
      setThemeState(defaultTheme)
      applyTheme(defaultTheme)
    }
    setMounted(true)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const config = THEME_CONFIG[newTheme]
    document.documentElement.style.setProperty('--bg-primary', config.bg)
    document.documentElement.style.setProperty('--text-primary', config.text)
    document.documentElement.style.setProperty('--accent-color', config.accent)
    
    // Update Tailwind dark mode
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('sevco-theme', newTheme)
    applyTheme(newTheme)
  }

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
