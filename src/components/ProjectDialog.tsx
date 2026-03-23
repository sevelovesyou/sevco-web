'use client'

import { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { X } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'archived'
  owner_id: string
  created_at: string
  updated_at: string
}

interface ProjectDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => void
  project: Project | null
}

export default function ProjectDialog({ isOpen, onClose, onSave, project }: ProjectDialogProps) {
  const [formData, setFormData] = useState<{
    name: string
    description: string
    status: 'active' | 'paused' | 'archived'
    owner_id: string
  }>({
    name: '',
    description: '',
    status: 'active',
    owner_id: 'peter',
  })

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status as 'active' | 'paused' | 'archived',
        owner_id: project.owner_id,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'active' as const,
        owner_id: 'peter',
      })
    }
  }, [project, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {project ? 'Edit Project' : 'Create Project'}
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
              Project Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., SEVCO E-commerce"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              rows={4}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0037FF] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0037FF] focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner
            </label>
            <select
              name="owner_id"
              value={formData.owner_id}
              onChange={handleChange}
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0037FF] focus:border-transparent"
            >
              <option value="seve">Seve</option>
              <option value="peter">Peter</option>
              <option value="sarah">Sarah</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {project ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
