'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, FileText, Package, LogOut, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
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
      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <Link href="/" className="block">
          <div className="text-lg font-bold" style={{ color: SEVCO_COLORS.blue }}>SEVCO</div>
        </Link>
        <div className="flex items-center gap-2">
          {mounted && <ThemeSwitcher />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 transition-all duration-300 z-30 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* LOGO */}
        <Link href="/" className="mb-8 block pt-12 md:pt-0">
          <div className="text-xl font-bold" style={{ color: SEVCO_COLORS.blue }}>
            SEVCO
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Mission Control</div>
        </Link>

        {/* NAV ITEMS */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={isActive ? { backgroundColor: SEVCO_COLORS.blue } : {}}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Theme & LOGOUT */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          {mounted && (
            <div className="hidden md:block mb-3">
              <ThemeSwitcher />
            </div>
          )}
          <Button variant="outline" className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white" onClick={() => {}}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
