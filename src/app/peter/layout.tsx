import { PeterNav } from '@/components/PeterNav'

export const metadata = {
  title: 'Peter — Mission Control',
  description: 'SEVCO Agent Management Dashboard',
}

export default function PeterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))' }}>
      <PeterNav />
      <div className="md:ml-64">
        <main className="p-6 md:p-10 md:pt-8">
          <div className="max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
