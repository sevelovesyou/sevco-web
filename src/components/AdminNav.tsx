'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, FileText, Package, Menu, X, Settings } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { SEVCO_COLORS } from '@/lib/utils'

export function AdminNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/projects', label: 'Projects', icon: Package },
  ]

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[var(--surface)] border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold" style={{ color: SEVCO_COLORS.blue }}>
            SEVCO
          </Link>
          <div className="flex items-center gap-2">
            {mounted && <ThemeSwitcher />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-[var(--surface-muted)] rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-[var(--surface)] border-r border-[var(--border)] p-6 transition-all duration-300 z-30 md:translate-x-0 flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="mb-8 hidden md:block">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold" style={{ color: SEVCO_COLORS.blue }}>
              SEVCO
            </div>
            <div className="text-xs text-muted">Mission Control</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-muted hover:bg-[var(--surface-muted)]'
                }`}
                style={isActive ? { backgroundColor: SEVCO_COLORS.blue } : {}}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="space-y-3 pt-6 border-t border-[var(--border)]">
          {mounted && (
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
          )}
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted hover:bg-[var(--surface-muted)] transition-colors"
          >
            <Settings size={18} strokeWidth={1.5} />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Spacer */}
      <div className="h-16 md:hidden" />
    </>
  )
}
