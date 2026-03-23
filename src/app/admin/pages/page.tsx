'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Plus, Eye, EyeOff } from 'lucide-react'
import PageDialog from '@/components/PageDialog'

interface Page {
  id: string
  slug: string
  title: string
  content: string
  published: boolean
  created_at: string
  created_by: string
}

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<Page | null>(null)

  // Mock data
  useEffect(() => {
    setPages([
      {
        id: '1',
        slug: 'services',
        title: 'Services',
        content: 'Our services include web design, digital strategy, branding, and artist services.',
        published: true,
        created_at: '2024-01-10',
        created_by: 'Seve',
      },
      {
        id: '2',
        slug: 'about',
        title: 'About SEVCO',
        content: 'SEVCO is a digital agency and music services firm focused on inspiring progress.',
        published: true,
        created_at: '2024-01-10',
        created_by: 'Seve',
      },
      {
        id: '3',
        slug: 'privacy',
        title: 'Privacy Policy',
        content: 'Your privacy is important to us...',
        published: true,
        created_at: '2024-02-15',
        created_by: 'Peter',
      },
      {
        id: '4',
        slug: 'terms',
        title: 'Terms of Service',
        content: 'By using our services, you agree to these terms...',
        published: false,
        created_at: '2024-03-01',
        created_by: 'Peter',
      },
    ])
  }, [])

  const handleAddPage = () => {
    setEditingPage(null)
    setIsDialogOpen(true)
  }

  const handleEditPage = (page: Page) => {
    setEditingPage(page)
    setIsDialogOpen(true)
  }

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((p) => p.id !== id))
  }

  const handleSavePage = (data: Omit<Page, 'id' | 'created_at' | 'created_by'>) => {
    if (editingPage) {
      setPages(
        pages.map((p) =>
          p.id === editingPage.id
            ? { ...p, ...data }
            : p
        )
      )
    } else {
      setPages([
        ...pages,
        {
          id: Math.random().toString(),
          ...data,
          created_at: new Date().toISOString().split('T')[0],
          created_by: 'Peter',
        },
      ])
    }
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-strong">Pages</h1>
          <p className="text-muted">Create and manage dynamic pages</p>
        </div>
        <Button onClick={handleAddPage}>
          <Plus size={16} className="mr-2" />
          New Page
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <Input placeholder="Search pages by title or slug..." />
        </CardContent>
      </Card>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">/{page.slug}</CardDescription>
                </div>
                <div className="flex-shrink-0">
                  {page.published ? (
                    <Eye size={18} className="text-green-600" />
                  ) : (
                    <EyeOff size={18} className="text-muted" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted line-clamp-3">
                {page.content}
              </p>

              <div className="text-xs text-muted">
                <p>Created {new Date(page.created_at).toLocaleDateString()}</p>
                <p>By {page.created_by}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEditPage(page)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] transition-colors text-sm font-medium"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePage(page.id)}
                  className="flex items-center justify-center p-2 rounded-lg hover:bg-red-500/100/10 transition-colors"
                >
                  <Trash2 size={16} className="text-[#BD0000]" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Page Dialog */}
      <PageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSavePage}
        page={editingPage}
      />
    </div>
  )
}
