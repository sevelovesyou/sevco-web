'use client'

import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { X } from 'lucide-react'

interface Page {
  id: string
  slug: string
  title: string
  content: string
  published: boolean
  created_at: string
  created_by: string
}

interface PageDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (page: Omit<Page, 'id' | 'created_at' | 'created_by'>) => void
  page: Page | null
}

export default function PageDialog({ isOpen, onClose, onSave, page }: PageDialogProps) {
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    published: false,
  })

  useEffect(() => {
    if (page) {
      setFormData({
        slug: page.slug,
        title: page.title,
        content: page.content,
        published: page.published,
      })
    } else {
      setFormData({
        slug: '',
        title: '',
        content: '',
        published: false,
      })
    }
  }, [page, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            {page ? 'Edit Page' : 'Create Page'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., About Us"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <Input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g., about-us"
              required
            />
            <p className="text-xs text-gray-500 mt-1">URL-friendly identifier</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter page content..."
              rows={8}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0037FF] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={formData.published}
              onChange={handleChange}
              className="rounded border-gray-300 text-[#0037FF] focus:ring-[#0037FF]"
            />
            <label htmlFor="published" className="text-sm font-medium text-gray-700">
              Publish this page
            </label>
          </div>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {page ? 'Update Page' : 'Create Page'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
