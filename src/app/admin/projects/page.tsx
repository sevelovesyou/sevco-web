'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Plus, Play, Pause, Archive } from 'lucide-react'
import ProjectDialog from '@/components/ProjectDialog'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'archived'
  owner_id: string
  created_at: string
  updated_at: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Mock data
  useEffect(() => {
    setProjects([
      {
        id: '1',
        name: 'SEVCO E-commerce',
        description: 'Custom e-commerce platform for SEVCO products',
        status: 'active',
        owner_id: 'seve',
        created_at: '2024-01-10',
        updated_at: '2024-03-20',
      },
      {
        id: '2',
        name: 'TheHuman.tv',
        description: 'Platform for human narratives and digital engagement',
        status: 'active',
        owner_id: 'seve',
        created_at: '2024-01-10',
        updated_at: '2024-03-15',
      },
      {
        id: '3',
        name: 'Huckleberry',
        description: 'Community-focused tech project in Kalispell',
        status: 'paused',
        owner_id: 'seve',
        created_at: '2024-02-01',
        updated_at: '2024-02-28',
      },
      {
        id: '4',
        name: 'Mission Control Dashboard',
        description: 'Admin dashboard for SEVCO operations',
        status: 'active',
        owner_id: 'peter',
        created_at: '2024-03-01',
        updated_at: '2024-03-22',
      },
      {
        id: '5',
        name: 'Legacy Project',
        description: 'Old project archived for reference',
        status: 'archived',
        owner_id: 'seve',
        created_at: '2023-06-01',
        updated_at: '2023-12-31',
      },
    ])
  }, [])

  const handleAddProject = () => {
    setEditingProject(null)
    setIsDialogOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsDialogOpen(true)
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleUpdateStatus = (id: string, status: 'active' | 'paused' | 'archived') => {
    setProjects(
      projects.map((p) =>
        p.id === id
          ? { ...p, status, updated_at: new Date().toISOString().split('T')[0] }
          : p
      )
    )
  }

  const handleSaveProject = (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                ...data,
                updated_at: new Date().toISOString().split('T')[0],
              }
            : p
        )
      )
    } else {
      const now = new Date().toISOString().split('T')[0]
      setProjects([
        ...projects,
        {
          id: Math.random().toString(),
          ...data,
          created_at: now,
          updated_at: now,
        },
      ])
    }
    setIsDialogOpen(false)
  }

  const statusColors = {
    active: 'bg-[#00A611]/10 text-[#00A611]',
    paused: 'bg-[#FCC318]/10 text-[#FCC318]',
    archived: 'bg-[var(--surface)] text-muted',
  }

  const statusIcons = {
    active: Play,
    paused: Pause,
    archived: Archive,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-strong">Projects</h1>
          <p className="text-muted">Manage your projects and applications</p>
        </div>
        <Button onClick={handleAddProject}>
          <Plus size={16} className="mr-2" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <Input placeholder="Search projects by name..." />
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>{projects.length} projects total</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--border)]">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-muted">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted">Owner</th>
                  <th className="text-left py-3 px-4 font-medium text-muted">Updated</th>
                  <th className="text-right py-3 px-4 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => {
                  const StatusIcon = statusIcons[project.status]
                  return (
                    <tr
                      key={project.id}
                      className="border-b border-[var(--border)] hover:bg-[var(--surface)] transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-strong">
                        {project.name}
                      </td>
                      <td className="py-4 px-4 text-muted max-w-xs truncate">
                        {project.description}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${
                              statusColors[project.status]
                            }`}
                          >
                            <StatusIcon size={14} />
                            {project.status.charAt(0).toUpperCase() +
                              project.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted">{project.owner_id}</td>
                      <td className="py-4 px-4 text-muted">
                        {new Date(project.updated_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-right flex gap-2 justify-end">
                        {project.status === 'active' && (
                          <button
                            onClick={() => handleUpdateStatus(project.id, 'paused')}
                            className="p-2 hover:bg-[var(--surface-hover,var(--surface))] rounded-lg transition-colors"
                            title="Pause project"
                          >
                            <Pause size={16} className="text-muted" />
                          </button>
                        )}
                        {project.status === 'paused' && (
                          <button
                            onClick={() => handleUpdateStatus(project.id, 'active')}
                            className="p-2 hover:bg-[var(--surface-hover,var(--surface))] rounded-lg transition-colors"
                            title="Resume project"
                          >
                            <Play size={16} className="text-muted" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-2 hover:bg-[var(--surface-hover,var(--surface))] rounded-lg transition-colors"
                        >
                          <Edit2 size={16} className="text-muted" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 hover:bg-red-500/100/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-[#BD0000]" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Project Dialog */}
      <ProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />
    </div>
  )
}
