'use client'

import { useEffect, useState } from 'react'
import { Bot, Plus, Settings, Activity, Clock, CheckCircle2, XCircle, ChevronRight, Cpu, Folder, Terminal, Trash2, Power, RefreshCw } from 'lucide-react'
import { SEVCO_COLORS } from '@/lib/utils'

interface Agent {
  id: string
  name: string
  role: string
  model: string
  status: 'active' | 'idle' | 'error' | 'stopped'
  workspace: string
  tasksCompleted: number
  tasksInProgress: number
  uptime: string
  lastActive: string
  description: string
  channels: string[]
  capabilities: string[]
}

const AGENTS: Agent[] = [
  {
    id: 'main',
    name: 'Peter',
    role: 'CEO Agent',
    model: 'Claude Opus 4',
    status: 'active',
    workspace: '/data/.openclaw/workspace/',
    tasksCompleted: 147,
    tasksInProgress: 3,
    uptime: '99.8%',
    lastActive: 'Now',
    description: 'Primary SEVCO agent. Handles strategy, communication, and coordination across all operations.',
    channels: ['Discord DM', 'Webchat'],
    capabilities: ['web_search', 'browser', 'exec', 'message', 'tts', 'read', 'write'],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    role: 'Engineering Agent',
    model: 'Claude Opus 4',
    status: 'active',
    workspace: '/data/.openclaw/workspace/',
    tasksCompleted: 89,
    tasksInProgress: 1,
    uptime: '98.2%',
    lastActive: '2h ago',
    description: 'Technical implementation agent. Builds features, fixes bugs, and manages the SEVCO platform codebase.',
    channels: ['Subagent'],
    capabilities: ['exec', 'read', 'write', 'browser', 'web_search'],
  },
  {
    id: 'kyt',
    name: 'Kyt',
    role: 'Knowledge Agent',
    model: 'Claude Sonnet 4',
    status: 'idle',
    workspace: '/data/.openclaw/workspace/kyt-workspace/',
    tasksCompleted: 34,
    tasksInProgress: 0,
    uptime: '97.5%',
    lastActive: '1d ago',
    description: 'Knowledge and research agent. Handles information gathering, analysis, and documentation tasks.',
    channels: ['Subagent'],
    capabilities: ['web_search', 'web_fetch', 'read', 'write', 'pdf', 'image'],
  },
]

const statusConfig = {
  active: { color: SEVCO_COLORS.green, label: 'Active', bg: `${SEVCO_COLORS.green}15` },
  idle: { color: SEVCO_COLORS.yellow, label: 'Idle', bg: `${SEVCO_COLORS.yellow}15` },
  error: { color: SEVCO_COLORS.red, label: 'Error', bg: `${SEVCO_COLORS.red}15` },
  stopped: { color: 'hsl(var(--muted-foreground))', label: 'Stopped', bg: 'hsl(var(--muted))' },
}

export default function AgentsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>Agents</h1>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Manage your OpenClaw agent fleet
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:shadow-lg hover:opacity-90"
          style={{ backgroundColor: SEVCO_COLORS.blue }}
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Agent</span>
        </button>
      </div>

      {/* Agent Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Agents', value: AGENTS.length, icon: Bot, color: SEVCO_COLORS.blue },
          { label: 'Active', value: AGENTS.filter(a => a.status === 'active').length, icon: Activity, color: SEVCO_COLORS.green },
          { label: 'Tasks Running', value: AGENTS.reduce((s, a) => s + a.tasksInProgress, 0), icon: RefreshCw, color: SEVCO_COLORS.yellow },
          { label: 'Total Completed', value: AGENTS.reduce((s, a) => s + a.tasksCompleted, 0), icon: CheckCircle2, color: SEVCO_COLORS.green },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}12` }}>
                <Icon size={18} style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>{stat.value}</p>
                <p className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Agent Cards */}
      <div className="space-y-4">
        {AGENTS.map((agent) => {
          const sc = statusConfig[agent.status]
          const isExpanded = selectedAgent?.id === agent.id

          return (
            <div
              key={agent.id}
              className="rounded-xl transition-all duration-300"
              style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
            >
              {/* Agent Header */}
              <button
                onClick={() => setSelectedAgent(isExpanded ? null : agent)}
                className="w-full p-5 flex items-center gap-4 text-left transition-colors"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${SEVCO_COLORS.blue}12` }}>
                  <Bot size={24} style={{ color: SEVCO_COLORS.blue }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{agent.name}</h3>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: sc.bg, color: sc.color }}
                    >
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{agent.role} • {agent.model}</p>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>{agent.tasksCompleted}</p>
                    <p className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>{agent.tasksInProgress}</p>
                    <p className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>In Progress</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>{agent.uptime}</p>
                    <p className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Uptime</p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                />
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="px-5 pb-5 animate-fade-in" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                  <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Info */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Description</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--foreground))' }}>{agent.description}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Workspace</p>
                        <div className="flex items-center gap-2 p-2 rounded-lg text-sm font-mono" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                          <Folder size={14} style={{ color: SEVCO_COLORS.blue }} />
                          <span style={{ color: 'hsl(var(--foreground))' }}>{agent.workspace}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Channels</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.channels.map((ch) => (
                            <span
                              key={ch}
                              className="text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                            >
                              {ch}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Capabilities</p>
                        <div className="flex flex-wrap gap-2">
                          {agent.capabilities.map((cap) => (
                            <span
                              key={cap}
                              className="text-xs font-mono px-2.5 py-1 rounded-lg"
                              style={{ backgroundColor: `${SEVCO_COLORS.blue}10`, color: SEVCO_COLORS.blue }}
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Last Active</p>
                        <div className="flex items-center gap-2">
                          <Clock size={14} style={{ color: 'hsl(var(--muted-foreground))' }} />
                          <span className="text-sm" style={{ color: 'hsl(var(--foreground))' }}>{agent.lastActive}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <button
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                          style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                        >
                          <Settings size={13} />
                          Configure
                        </button>
                        <button
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                          style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
                        >
                          <Terminal size={13} />
                          Console
                        </button>
                        {agent.status === 'active' ? (
                          <button
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                            style={{ backgroundColor: `${SEVCO_COLORS.red}12`, color: SEVCO_COLORS.red }}
                          >
                            <Power size={13} />
                            Stop
                          </button>
                        ) : (
                          <button
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                            style={{ backgroundColor: `${SEVCO_COLORS.green}12`, color: SEVCO_COLORS.green }}
                          >
                            <Power size={13} />
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowCreateModal(false)} />
          <div
            className="relative w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-xl animate-fade-in"
            style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
          >
            <h2 className="text-xl font-bold mb-1" style={{ color: 'hsl(var(--foreground))' }}>Create New Agent</h2>
            <p className="text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Configure a new agent for your fleet
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Agent Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marketing"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marketing Agent"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Model
                </label>
                <select
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: 'hsl(var(--muted))',
                    border: '1px solid hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  <option>Claude Opus 4</option>
                  <option>Claude Sonnet 4</option>
                  <option>Claude Haiku</option>
                  <option>GPT-4o</option>
                  <option>Gemini Pro</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="What does this agent do?"
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
                  Workspace Path
                </label>
                <input
                  type="text"
                  placeholder="/data/.openclaw/workspace/"
                  className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none transition-colors"
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
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
