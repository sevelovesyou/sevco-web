'use client'

import { useState, useEffect } from 'react'
import type { Theme } from '@/lib/theme'
import { THEME_CONFIG, SEVCO_COLORS } from '@/lib/theme'
import { Moon, Sun, Palette } from 'lucide-react'

export function ThemeSwitcher() {
  const [showMenu, setShowMenu] = useState(false)
  const [theme, setThemeState] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('sevco-theme') as Theme | null
    if (savedTheme && Object.keys(THEME_CONFIG).includes(savedTheme)) {
      setThemeState(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setThemeState(prefersDark ? 'dark' : 'light')
    }
    setMounted(true)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('sevco-theme', newTheme)
    
    const config = THEME_CONFIG[newTheme]
    document.documentElement.style.setProperty('--bg-primary', config.bg)
    document.documentElement.style.setProperty('--text-primary', config.text)
    document.documentElement.style.setProperty('--accent-color', config.accent)
    
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) return null

  const themes: Array<{ id: Theme; label: string; color?: string }> = [
    { id: 'light', label: 'Light', color: '#ffffff' },
    { id: 'dark', label: 'Dark', color: '#0a0a0a' },
    { id: 'blue', label: 'Blue', color: SEVCO_COLORS.blue },
    { id: 'red', label: 'Red', color: SEVCO_COLORS.red },
    { id: 'yellow', label: 'Yellow', color: SEVCO_COLORS.yellow },
    { id: 'green', label: 'Green', color: SEVCO_COLORS.green },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-black hover:opacity-80 transition-opacity flex items-center gap-2"
        aria-label="Theme switcher"
      >
        <Palette size={18} />
        <span className="hidden sm:inline text-sm font-medium capitalize">{THEME_CONFIG[theme].name}</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 z-50 min-w-48">
          <div className="space-y-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setShowMenu(false)
                }}
                className={`w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-all flex items-center gap-3 ${
                  theme === t.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-current"
                  style={{ backgroundColor: t.color || 'transparent' }}
                />
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                toggleDarkMode()
                setShowMenu(false)
              }}
              className="w-full px-3 py-2 rounded-lg text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={16} />
                  Switch to Dark Mode
                </>
              ) : (
                <>
                  <Sun size={16} />
                  Switch to Light Mode
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
