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
    <div className="bg-app min-h-screen">
      <AdminNav />
      <div className="md:ml-64">
        <main className="p-6 md:p-10 md:pt-8">
          <div className="max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
