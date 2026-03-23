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
      document.documentElement.classList.remove('blue', 'red', 'yellow', 'green')
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      if (['blue', 'red', 'yellow', 'green'].includes(newTheme)) {
        document.documentElement.classList.remove('blue', 'red', 'yellow', 'green')
        document.documentElement.classList.add(newTheme)
      }
    }
  }

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) return null

  const themes: Array<{ id: Theme; label: string; color?: string; icon?: React.ReactNode }> = [
    { id: 'light', label: 'Light', color: '#ffffff' },
    { id: 'dark', label: 'Dark', color: '#1e293b' },
    { id: 'blue', label: 'Blue', color: SEVCO_COLORS.blue },
    { id: 'red', label: 'Red', color: SEVCO_COLORS.red },
    { id: 'yellow', label: 'Yellow', color: SEVCO_COLORS.yellow },
    { id: 'green', label: 'Green', color: SEVCO_COLORS.green },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-full px-4 py-3 rounded-lg bg-[var(--surface-muted)] text-strong hover:bg-[var(--surface-strong)] transition-colors flex items-center gap-2 font-medium text-sm"
        aria-label="Theme switcher"
      >
        <Palette size={16} strokeWidth={1.5} />
        <span className="hidden sm:inline capitalize">{THEME_CONFIG[theme].name}</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg p-4 z-50">
          <p className="text-xs text-muted font-semibold mb-3 uppercase tracking-wider">Theme</p>
          <div className="space-y-2 mb-4 pb-4 border-b border-[var(--border)]">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setShowMenu(false)
                }}
                className={`w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-all flex items-center gap-3 ${
                  theme === t.id
                    ? 'bg-[var(--accent-soft)]'
                    : 'text-muted hover:bg-[var(--surface-muted)]'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 border-current flex-shrink-0"
                  style={{ backgroundColor: t.color || 'transparent' }}
                />
                <span>{t.label}</span>
                {theme === t.id && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              toggleDarkMode()
              setShowMenu(false)
            }}
            className="w-full px-3 py-2 rounded-lg text-left text-sm font-medium text-muted hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-2"
          >
            {theme === 'light' ? (
              <>
                <Moon size={16} strokeWidth={1.5} />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun size={16} strokeWidth={1.5} />
                <span>Light Mode</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
