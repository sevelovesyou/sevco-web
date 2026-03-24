'use client'

import { useEffect, useState } from 'react'
import { ListTodo, Clock, CheckCircle2, XCircle, Loader2, AlertTriangle, Bot, ChevronDown, Filter, RefreshCw, Play, Pause, RotateCcw, Trash2 } from 'lucide-react'
import { SEVCO_COLORS } from '@/lib/utils'

type TaskStatus = 'running' | 'completed' | 'failed' | 'queued' | 'cancelled'

interface Task {
  id: string
  name: string
  description: string
  agent: string
  status: TaskStatus
  priority: 'high' | 'medium' | 'low'
  startedAt: string
  completedAt?: string
  duration?: string
  progress?: number
  type: 'subagent' | 'cron' | 'manual' | 'session'
}

const TASKS: Task[] = [
  {
    id: 'task-001',
    name: 'mission-control-build',
    description: 'Build Mission Control dashboard at /peter route',
    agent: 'Peter',
    status: 'running',
    priority: 'high',
    startedAt: '10:18 PM',
    type: 'subagent',
    progress: 65,
  },
  {
    id: 'task-002',
    name: 'dashboard-kpi-integration',
    description: 'Integrate real KPI data from Supabase',
    agent: 'Engineering',
    status: 'completed',
    priority: 'medium',
    startedAt: '8:00 PM',
    completedAt: '8:45 PM',
    duration: '45m',
    type: 'subagent',
  },
  {
    id: 'task-003',
    name: 'heartbeat-check',
    description: 'Periodic heartbeat — check email, calendar, mentions',
    agent: 'Peter',
    status: 'completed',
    priority: 'low',
    startedAt: '7:00 PM',
    completedAt: '7:02 PM',
    duration: '2m',
    type: 'cron',
  },
  {
    id: 'task-004',
    name: 'kyt-workspace-init',
    description: 'Initialize Kyt workspace with SOUL.md and memory files',
    agent: 'Kyt',
    status: 'completed',
    priority: 'medium',
    startedAt: '2:00 PM',
    completedAt: '2:15 PM',
    duration: '15m',
    type: 'manual',
  },
  {
    id: 'task-005',
    name: 'discord-session',
    description: 'Active Discord DM session with Seve',
    agent: 'Peter',
    status: 'running',
    priority: 'high',
    startedAt: '9:30 PM',
    type: 'session',
    progress: undefined,
  },
  {
    id: 'task-006',
    name: 'design-overhaul',
    description: 'SEVCO platform visual redesign with theme system',
    agent: 'Engineering',
    status: 'completed',
    priority: 'high',
    startedAt: '12:00 PM',
    completedAt: '2:47 AM',
    duration: '14h 47m',
    type: 'subagent',
  },
  {
    id: 'task-007',
    name: 'weather-check',
    description: 'Morning weather check for Phoenix, AZ',
    agent: 'Peter',
    status: 'completed',
    priority: 'low',
    startedAt: '8:00 AM',
    completedAt: '8:01 AM',
    duration: '1m',
    type: 'cron',
  },
  {
    id: 'task-008',
    name: 'email-scan',
    description: 'Scan inbox for important unread messages',
    agent: 'Peter',
    status: 'failed',
    priority: 'medium',
    startedAt: '6:00 PM',
    completedAt: '6:01 PM',
    duration: '1m',
    type: 'cron',
  },
]

const statusConfig: Record<TaskStatus, { color: string; icon: React.ElementType; label: string }> = {
  running: { color: SEVCO_COLORS.blue, icon: Loader2, label: 'Running' },
  completed: { color: SEVCO_COLORS.green, icon: CheckCircle2, label: 'Completed' },
  failed: { color: SEVCO_COLORS.red, icon: XCircle, label: 'Failed' },
  queued: { color: SEVCO_COLORS.yellow, icon: Clock, label: 'Queued' },
  cancelled: { color: 'hsl(var(--muted-foreground))', icon: XCircle, label: 'Cancelled' },
}

const priorityColors: Record<string, string> = {
  high: SEVCO_COLORS.red,
  medium: SEVCO_COLORS.yellow,
  low: SEVCO_COLORS.green,
}

const typeLabels: Record<string, string> = {
  subagent: '🤖 Subagent',
  cron: '⏰ Cron',
  manual: '👤 Manual',
  session: '💬 Session',
}

export default function TasksPage() {
  const [mounted, setMounted] = useState(false)
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredTasks = TASKS.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesType = typeFilter === 'all' || task.type === typeFilter
    return matchesStatus && matchesType
  })

  const runningCount = TASKS.filter(t => t.status === 'running').length
  const completedCount = TASKS.filter(t => t.status === 'completed').length
  const failedCount = TASKS.filter(t => t.status === 'failed').length

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>Task Queue</h1>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Monitor agent tasks, sessions, and cron jobs
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: TASKS.length, icon: ListTodo, color: SEVCO_COLORS.blue },
          { label: 'Running', value: runningCount, icon: Loader2, color: SEVCO_COLORS.blue },
          { label: 'Completed', value: completedCount, icon: CheckCircle2, color: SEVCO_COLORS.green },
          { label: 'Failed', value: failedCount, icon: XCircle, color: SEVCO_COLORS.red },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="p-4 rounded-xl flex items-center gap-3"
              style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}12` }}>
                <Icon size={18} style={{ color: stat.color }} className={stat.label === 'Running' ? 'animate-spin' : ''} />
              </div>
              <div>
                <p className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>{stat.value}</p>
                <p className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5">
          <Filter size={14} style={{ color: 'hsl(var(--muted-foreground))' }} />
          <span className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Status:</span>
        </div>
        {(['all', 'running', 'completed', 'failed', 'queued'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
            style={
              statusFilter === status
                ? { backgroundColor: SEVCO_COLORS.blue, color: 'white' }
                : { backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(var(--border))' }
            }
          >
            {status}
          </button>
        ))}
        <div className="w-px h-6 mx-1" style={{ backgroundColor: 'hsl(var(--border))' }} />
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Type:</span>
        </div>
        {(['all', 'subagent', 'cron', 'session', 'manual'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
            style={
              typeFilter === type
                ? { backgroundColor: SEVCO_COLORS.blue, color: 'white' }
                : { backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--muted-foreground))', border: '1px solid hsl(var(--border))' }
            }
          >
            {type}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const sc = statusConfig[task.status]
          const StatusIcon = sc.icon

          return (
            <div
              key={task.id}
              className="rounded-xl p-4 md:p-5 transition-all duration-200 hover:shadow-sm"
              style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className="p-2 rounded-lg flex-shrink-0 mt-0.5" style={{ backgroundColor: `${sc.color}12` }}>
                  <StatusIcon
                    size={18}
                    style={{ color: sc.color }}
                    className={task.status === 'running' ? 'animate-spin' : ''}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-sm font-mono" style={{ color: 'hsl(var(--foreground))' }}>
                      {task.name}
                    </h3>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${sc.color}12`, color: sc.color }}
                    >
                      {sc.label}
                    </span>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full capitalize"
                      style={{ backgroundColor: `${priorityColors[task.priority]}10`, color: priorityColors[task.priority] }}
                    >
                      {task.priority}
                    </span>
                    <span className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {typeLabels[task.type]}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{task.description}</p>

                  {/* Progress Bar */}
                  {task.status === 'running' && task.progress !== undefined && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>Progress</span>
                        <span className="text-[10px] font-bold" style={{ color: SEVCO_COLORS.blue }}>{task.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${task.progress}%`, backgroundColor: SEVCO_COLORS.blue }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Bot size={12} style={{ color: SEVCO_COLORS.blue }} />
                      <span className="text-[11px] font-medium" style={{ color: 'hsl(var(--foreground))' }}>{task.agent}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} style={{ color: 'hsl(var(--muted-foreground))' }} />
                      <span className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Started: {task.startedAt}</span>
                    </div>
                    {task.duration && (
                      <span className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        Duration: {task.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                  {task.status === 'running' && (
                    <button
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                      title="Pause"
                    >
                      <Pause size={14} />
                    </button>
                  )}
                  {task.status === 'failed' && (
                    <button
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: SEVCO_COLORS.yellow }}
                      title="Retry"
                    >
                      <RotateCcw size={14} />
                    </button>
                  )}
                  {task.status !== 'running' && (
                    <button
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <ListTodo size={48} className="mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <p className="text-lg font-medium" style={{ color: 'hsl(var(--foreground))' }}>No tasks match your filters</p>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Try adjusting the status or type filters
          </p>
        </div>
      )}
    </div>
  )
}
