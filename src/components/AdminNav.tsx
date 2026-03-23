'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, FileText, Package, LogOut } from 'lucide-react'
import { Button } from './ui/button'

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/projects', label: 'Projects', icon: Package },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-6">
      {/* LOGO */}
      <Link href="/" className="mb-8 block">
        <div className="text-xl font-bold text-[#0037FF]">SEVCO</div>
        <div className="text-xs text-gray-500">Mission Control</div>
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
              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#0037FF] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* LOGOUT */}
      <div className="absolute bottom-6 left-6 right-6">
        <Button variant="outline" className="w-full" onClick={() => {}}>
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}
