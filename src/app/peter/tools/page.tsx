'use client'

import { useEffect, useState } from 'react'
import { Wrench, Plus, Search, Globe, Terminal, FileText, Eye, MessageSquare, Volume2, Image, File, Layout, Code, Pencil, Trash2, Copy, ExternalLink } from 'lucide-react'
import { SEVCO_COLORS } from '@/lib/utils'

interface Tool {
  id: string
  name: string
  description: string
  category: 'core' | 'browser' | 'communication' | 'media' | 'custom'
  icon: React.ElementType
  enabled: boolean
  usage: number
  lastUsed: string
}

const TOOLS: Tool[] = [
  { id: 'read', name: 'read', description: 'Read file contents from workspace', category: 'core', icon: FileText, enabled: true, usage: 892, lastUsed: 'Just now' },
  { id: 'write', name: 'write', description: 'Create or overwrite files', category: 'core', icon: Pencil, enabled: true, usage: 456, lastUsed: '1h ago' },
  { id: 'edit', name: 'edit', description: 'Make precise edits to existing files', category: 'core', icon: Code, enabled: true, usage: 312, lastUsed: '2h ago' },
  { id: 'exec', name: 'exec', description: 'Execute shell commands with background support', category: 'core', icon: Terminal, enabled: true, usage: 678, lastUsed: '30m ago' },
  { id: 'web_search', name: 'web_search', description: 'Search the web using Brave Search API', category: 'browser', icon: Search, enabled: true, usage: 234, lastUsed: '3h ago' },
  { id: 'web_fetch', name: 'web_fetch', description: 'Fetch and extract readable content from URLs', category: 'browser', icon: Globe, enabled: true, usage: 189, lastUsed: '5h ago' },
  { id: 'browser', name: 'browser', description: 'Control web browser via automation', category: 'browser', icon: Eye, enabled: true, usage: 67, lastUsed: '1d ago' },
  { id: 'message', name: 'message', description: 'Send messages via channel plugins (Discord, etc)', category: 'communication', icon: MessageSquare, enabled: true, usage: 345, lastUsed: '1h ago' },
  { id: 'tts', name: 'tts', description: 'Convert text to speech audio', category: 'media', icon: Volume2, enabled: true, usage: 23, lastUsed: '3d ago' },
  { id: 'image', name: 'image', description: 'Analyze images with vision models', category: 'media', icon: Image, enabled: true, usage: 45, lastUsed: '2d ago' },
  { id: 'pdf', name: 'pdf', description: 'Analyze PDF documents with models', category: 'media', icon: File, enabled: true, usage: 12, lastUsed: '5d ago' },
  { id: 'canvas', name: 'canvas', description: 'Control node canvases for UI rendering', category: 'browser', icon: Layout, enabled: true, usage: 8, lastUsed: '1w ago' },
]

const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'core', label: 'Core' },
  { id: 'browser', label: 'Browser & Web' },
  { id: 'communication', label: 'Communication' },
  { id: 'media', label: 'Media' },
  { id: 'custom', label: 'Custom' },
]

const categoryColors: Record<string, string> = {
  core: SEVCO_COLORS.blue,
  browser: SEVCO_COLORS.green,
  communication: SEVCO_COLORS.yellow,
  media: SEVCO_COLORS.red,
  custom: '#8b5cf6',
}

export default function ToolsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalUsage = TOOLS.reduce((sum, t) => sum + t.usage, 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>Tools</h1>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {TOOLS.length} tools available • {totalUsage.toLocaleString()} total invocations
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:shadow-lg hover:opacity-90"
          style={{ backgroundColor: SEVCO_COLORS.blue }}
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Create Tool</span>
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              color: 'hsl(var(--foreground))',
            }}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all"
              style={
                activeCategory === cat.id
                  ? { backgroundColor: SEVCO_COLORS.blue, color: 'white' }
                  : { backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(var(--border))' }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon
          const catColor = categoryColors[tool.category] || SEVCO_COLORS.blue

          return (
            <div
              key={tool.id}
              className="rounded-xl p-5 transition-all duration-300 hover:shadow-md group"
              style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: `${catColor}12` }}>
                    <Icon size={18} style={{ color: catColor }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm font-mono" style={{ color: 'hsl(var(--foreground))' }}>{tool.name}</h3>
                    <span
                      className="text-[10px] font-medium capitalize px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${catColor}10`, color: catColor }}
                    >
                      {tool.category}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full mt-1 ${tool.enabled ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: tool.enabled ? SEVCO_COLORS.green : 'hsl(var(--muted-foreground))' }}
                />
              </div>

              <p className="text-xs leading-relaxed mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {tool.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{tool.usage}</span> calls
                  </span>
                  <span className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Last: {tool.lastUsed}
                  </span>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md transition-all"
                  style={{ backgroundColor: 'hsl(var(--muted))' }}
                >
                  <Copy size={12} style={{ color: 'hsl(var(--muted-foreground))' }} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <Wrench size={48} className="mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <p className="text-lg font-medium" style={{ color: 'hsl(var(--foreground))' }}>No tools found</p>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Try adjusting your search or filter
          </p>
        </div>
      )}

      {/* Create Tool Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowCreateModal(false)} />
          <div
            className="relative w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-xl animate-fade-in max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
          >
            <h2 className="text-xl font-bold mb-1" style={{ color: 'hsl(var(--foreground))' }}>Create Custom Tool</h2>
            <p className="text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Define a new tool for your agents to use
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Tool Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. github_deploy"
                  className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none transition-colors"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What does this tool do?"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Category
                </label>
                <select
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  <option value="custom">Custom</option>
                  <option value="core">Core</option>
                  <option value="browser">Browser & Web</option>
                  <option value="communication">Communication</option>
                  <option value="media">Media</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Parameters (JSON Schema)
                </label>
                <textarea
                  rows={6}
                  placeholder={`{
  "type": "object",
  "properties": {
    "repo": { "type": "string" },
    "branch": { "type": "string" }
  },
  "required": ["repo"]
}`}
                  className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Handler Script
                </label>
                <textarea
                  rows={4}
                  placeholder="#!/bin/bash&#10;# Script that runs when the tool is invoked&#10;echo &quot;Deploying $REPO to $BRANCH...&quot;"
                  className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ backgroundColor: SEVCO_COLORS.blue }}
              >
                Create Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
