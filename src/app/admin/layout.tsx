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
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="ml-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
