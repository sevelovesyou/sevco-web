import { AdminNav } from '@/components/AdminNav'

export const metadata = {
  title: 'SEVCO Mission Control',
  description: 'Admin Dashboard for SEVCO',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <AdminNav />
      <div className="md:ml-64">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
