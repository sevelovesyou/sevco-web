'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Bot, Wrench, ListTodo, Menu, X, Settings, Shield } from 'lucide-react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { SEVCO_COLORS } from '@/lib/utils'

export function PeterNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: '/peter', label: 'Dashboard', icon: BarChart3 },
    { href: '/peter/agents', label: 'Agents', icon: Bot },
    { href: '/peter/tools', label: 'Tools', icon: Wrench },
    { href: '/peter/tasks', label: 'Task Queue', icon: ListTodo },
  ]

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden px-4 py-3" style={{ backgroundColor: 'hsl(var(--card))', borderBottom: '1px solid hsl(var(--border))' }}>
        <div className="flex items-center justify-between">
          <Link href="/peter" className="text-xl font-bold" style={{ color: SEVCO_COLORS.blue }}>
            PETER
          </Link>
          <div className="flex items-center gap-2">
            {mounted && <ThemeSwitcher />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 p-6 transition-all duration-300 z-30 md:translate-x-0 flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderRight: '1px solid hsl(var(--border))',
        }}
      >
        {/* Logo */}
        <Link href="/peter" className="mb-8 hidden md:block">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: SEVCO_COLORS.blue }}>
                <Shield size={16} className="text-white" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold" style={{ color: SEVCO_COLORS.blue }}>
                PETER
              </div>
            </div>
            <div className="text-xs ml-10" style={{ color: 'hsl(var(--muted-foreground))' }}>Mission Control</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider px-4 mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'text-white shadow-md' : ''
                }`}
                style={
                  isActive
                    ? { backgroundColor: SEVCO_COLORS.blue }
                    : { color: 'hsl(var(--muted-foreground))' }
                }
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="space-y-3 pt-6" style={{ borderTop: '1px solid hsl(var(--border))' }}>
          {mounted && (
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
          )}
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            <Settings size={18} strokeWidth={1.5} />
            <span>Admin Panel</span>
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
