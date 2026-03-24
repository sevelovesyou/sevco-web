'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Bot, Wrench, ListTodo, Zap, ArrowUpRight, ArrowDownRight, Activity, Clock, CheckCircle2, AlertTriangle, Shield, Cpu, Terminal } from 'lucide-react'
import { SEVCO_COLORS } from '@/lib/utils'
import Link from 'next/link'

// Access gate
const AUTHORIZED_DISCORD_ID = '631523227331461128'

// Agent configurations
const AGENTS = [
  {
    id: 'main',
    name: 'Peter',
    role: 'CEO Agent',
    model: 'Claude Opus',
    status: 'active' as const,
    workspace: '/data/.openclaw/workspace/',
    tasksCompleted: 147,
    uptime: '99.8%',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    role: 'Engineering Agent',
    model: 'Claude Opus',
    status: 'active' as const,
    workspace: '/data/.openclaw/workspace/',
    tasksCompleted: 89,
    uptime: '98.2%',
  },
  {
    id: 'kyt',
    name: 'Kyt',
    role: 'Knowledge Agent',
    model: 'Claude Sonnet',
    status: 'idle' as const,
    workspace: '/data/.openclaw/workspace/kyt-workspace/',
    tasksCompleted: 34,
    uptime: '97.5%',
  },
]

// Mock task activity over last 7 days
const taskActivityData = [
  { day: 'Mon', tasks: 12, completed: 11, failed: 1 },
  { day: 'Tue', tasks: 18, completed: 16, failed: 2 },
  { day: 'Wed', tasks: 15, completed: 14, failed: 1 },
  { day: 'Thu', tasks: 22, completed: 20, failed: 2 },
  { day: 'Fri', tasks: 28, completed: 27, failed: 1 },
  { day: 'Sat', tasks: 8, completed: 8, failed: 0 },
  { day: 'Sun', tasks: 5, completed: 5, failed: 0 },
]

// Mock agent utilization
const agentUtilizationData = [
  { agent: 'Peter', hours: 18.5 },
  { agent: 'Engineering', hours: 12.3 },
  { agent: 'Kyt', hours: 6.7 },
]

// Recent activity feed
const recentActivity = [
  { action: 'Subagent spawned', details: 'mission-control-build via Peter', time: 'Just now', icon: '🚀', agent: 'Peter' },
  { action: 'Task completed', details: 'Dashboard KPI integration', time: '2h ago', icon: '✅', agent: 'Engineering' },
  { action: 'Tool registered', details: 'web_search tool configured', time: '5h ago', icon: '🔧', agent: 'Peter' },
  { action: 'Session started', details: 'Discord direct message session', time: '1d ago', icon: '💬', agent: 'Peter' },
  { action: 'Cron job executed', details: 'Heartbeat check completed', time: '1d ago', icon: '💓', agent: 'Peter' },
  { action: 'Workspace synced', details: 'Kyt workspace initialized', time: '2d ago', icon: '📁', agent: 'Kyt' },
]

export default function PeterDashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const totalTasks = AGENTS.reduce((sum, a) => sum + a.tasksCompleted, 0)
  const activeAgents = AGENTS.filter(a => a.status === 'active').length
  const totalTools = 12 // web_search, web_fetch, browser, exec, read, write, edit, message, tts, image, pdf, canvas

  const kpis = [
    {
      title: 'Active Agents',
      value: `${activeAgents}/${AGENTS.length}`,
      change: '+1 this week',
      positive: true,
      icon: Bot,
      color: SEVCO_COLORS.blue,
    },
    {
      title: 'Tasks Completed',
      value: totalTasks.toString(),
      change: '+23 today',
      positive: true,
      icon: CheckCircle2,
      color: SEVCO_COLORS.green,
    },
    {
      title: 'Tools Available',
      value: totalTools.toString(),
      change: '+2 configured',
      positive: true,
      icon: Wrench,
      color: SEVCO_COLORS.yellow,
    },
    {
      title: 'Uptime',
      value: '99.2%',
      change: '-0.1%',
      positive: false,
      icon: Activity,
      color: SEVCO_COLORS.red,
    },
  ]

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return SEVCO_COLORS.green
      case 'idle': return SEVCO_COLORS.yellow
      case 'error': return SEVCO_COLORS.red
      default: return 'hsl(var(--muted-foreground))'
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${SEVCO_COLORS.blue}15` }}>
            <Shield size={22} style={{ color: SEVCO_COLORS.blue }} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>Mission Control</h1>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Agent operations overview — {currentTime?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.title}
              className="p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
              style={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{kpi.title}</p>
                  <h3 className="text-3xl font-bold mb-3" style={{ color: 'hsl(var(--foreground))' }}>{kpi.value}</h3>
                  <div className="flex items-center gap-1">
                    {kpi.positive ? (
                      <ArrowUpRight size={14} style={{ color: SEVCO_COLORS.green }} />
                    ) : (
                      <ArrowDownRight size={14} style={{ color: SEVCO_COLORS.red }} />
                    )}
                    <span
                      className="text-xs font-semibold"
                      style={{ color: kpi.positive ? SEVCO_COLORS.green : SEVCO_COLORS.red }}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${kpi.color}12` }}
                >
                  <Icon size={22} style={{ color: kpi.color }} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Agent Status Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>Agent Fleet</h2>
          <Link
            href="/peter/agents"
            className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: SEVCO_COLORS.blue, backgroundColor: `${SEVCO_COLORS.blue}10` }}
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="p-5 rounded-xl transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${SEVCO_COLORS.blue}12` }}>
                  <Bot size={20} style={{ color: SEVCO_COLORS.blue }} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>{agent.name}</h3>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{agent.role}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusColor(agent.status) }} />
                  <span className="text-xs font-medium capitalize" style={{ color: statusColor(agent.status) }}>
                    {agent.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <p className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>{agent.tasksCompleted}</p>
                  <p className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Tasks</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <p className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>{agent.uptime}</p>
                  <p className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>Uptime</p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                  <p className="text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                    <Cpu size={16} className="inline" style={{ color: SEVCO_COLORS.blue }} />
                  </p>
                  <p className="text-[10px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{agent.model.split(' ')[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Activity */}
        <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-1" style={{ color: 'hsl(var(--foreground))' }}>Task Activity</h2>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Tasks completed vs failed this week</p>
          </div>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={taskActivityData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={SEVCO_COLORS.blue} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={SEVCO_COLORS.blue} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" style={{ fontSize: 12 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke={SEVCO_COLORS.blue}
                  strokeWidth={2}
                  fill="url(#taskGradient)"
                  name="Completed"
                />
                <Area
                  type="monotone"
                  dataKey="failed"
                  stroke={SEVCO_COLORS.red}
                  strokeWidth={2}
                  fill={`${SEVCO_COLORS.red}15`}
                  name="Failed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agent Utilization */}
        <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-1" style={{ color: 'hsl(var(--foreground))' }}>Agent Utilization</h2>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Active hours per agent (last 7 days)</p>
          </div>
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentUtilizationData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="agent" stroke="hsl(var(--muted-foreground))" style={{ fontSize: 12 }} />
                <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="hours" fill={SEVCO_COLORS.green} radius={[8, 8, 0, 0]} name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Feed + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 rounded-xl p-6 md:p-8" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 pb-4 last:pb-0 last:border-0"
                style={{ borderBottom: idx < recentActivity.length - 1 ? '1px solid hsl(var(--border))' : 'none' }}
              >
                <div className="text-xl flex-shrink-0">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm" style={{ color: 'hsl(var(--foreground))' }}>{item.action}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.details}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span
                    className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-1"
                    style={{ backgroundColor: `${SEVCO_COLORS.blue}12`, color: SEVCO_COLORS.blue }}
                  >
                    {item.agent}
                  </span>
                  <p className="text-[11px]" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl p-6 md:p-8" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}>
          <h2 className="text-lg font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/peter/agents"
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm"
              style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
            >
              <Bot size={18} style={{ color: SEVCO_COLORS.blue }} />
              <span className="text-sm font-medium">Manage Agents</span>
            </Link>
            <Link
              href="/peter/tools"
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm"
              style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
            >
              <Wrench size={18} style={{ color: SEVCO_COLORS.yellow }} />
              <span className="text-sm font-medium">Build a Tool</span>
            </Link>
            <Link
              href="/peter/tasks"
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm"
              style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
            >
              <ListTodo size={18} style={{ color: SEVCO_COLORS.green }} />
              <span className="text-sm font-medium">View Task Queue</span>
            </Link>
            <Link
              href="/peter/tools"
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:shadow-sm"
              style={{ backgroundColor: 'hsl(var(--muted))', color: 'hsl(var(--foreground))' }}
            >
              <Terminal size={18} style={{ color: SEVCO_COLORS.red }} />
              <span className="text-sm font-medium">Create Cron Job</span>
            </Link>
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid hsl(var(--border))' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'hsl(var(--foreground))' }}>System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Gateway</span>
                <span className="text-xs font-medium" style={{ color: SEVCO_COLORS.green }}>● Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Sessions</span>
                <span className="text-xs font-medium" style={{ color: SEVCO_COLORS.green }}>● 3 Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Cron</span>
                <span className="text-xs font-medium" style={{ color: SEVCO_COLORS.green }}>● Running</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
