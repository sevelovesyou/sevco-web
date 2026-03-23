'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Zap, Music, ArrowUpRight } from 'lucide-react'
import { SEVCO_COLORS } from '@/lib/utils'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const kpis = [
    {
      title: 'Revenue',
      value: '$24,500',
      change: '+12.5%',
      positive: true,
      icon: Zap,
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      positive: true,
      icon: Users,
    },
    {
      title: 'Projects',
      value: '42',
      change: '+4.1%',
      positive: true,
      icon: TrendingUp,
    },
    {
      title: 'Streams',
      value: '128.5K',
      change: '+24.3%',
      positive: true,
      icon: Music,
    },
  ]

  const revenueData = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 2000 },
    { month: 'Apr', value: 2780 },
    { month: 'May', value: 1890 },
    { month: 'Jun', value: 2390 },
    { month: 'Jul', value: 3490 },
  ]

  const userGrowth = [
    { month: 'Jan', value: 400 },
    { month: 'Feb', value: 520 },
    { month: 'Mar', value: 580 },
    { month: 'Apr', value: 720 },
    { month: 'May', value: 850 },
    { month: 'Jun', value: 980 },
    { month: 'Jul', value: 1200 },
  ]

  if (!mounted) return null

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-strong mb-2">Dashboard</h1>
        <p className="text-muted text-lg">Welcome back. Here's what's happening with SEVCO this month.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.title}
              className="surface-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted mb-2 font-medium">{kpi.title}</p>
                  <h3 className="text-3xl font-bold text-strong mb-3">{kpi.value}</h3>
                  <div className="flex items-center gap-1">
                    <ArrowUpRight size={16} style={{ color: SEVCO_COLORS.green }} />
                    <span style={{ color: SEVCO_COLORS.green }} className="text-sm font-semibold">
                      {kpi.change}
                    </span>
                    <span className="text-quiet text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div
                  className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${SEVCO_COLORS.blue}15` }}
                >
                  <Icon size={24} style={{ color: SEVCO_COLORS.blue }} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="surface-card rounded-xl p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-strong mb-1">Revenue Trend</h2>
            <p className="text-muted text-sm">Monthly revenue over the last 7 months</p>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--text-quiet)" style={{ fontSize: 12 }} />
                <YAxis stroke="var(--text-quiet)" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    border: `1px solid var(--border)`,
                    borderRadius: '8px',
                  }}
                  cursor={{ stroke: SEVCO_COLORS.blue, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={SEVCO_COLORS.blue}
                  strokeWidth={2.5}
                  dot={{ fill: SEVCO_COLORS.blue, r: 5 }}
                  activeDot={{ r: 7 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="surface-card rounded-xl p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-strong mb-1">User Growth</h2>
            <p className="text-muted text-sm">Active users growth over time</p>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowth} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--text-quiet)" style={{ fontSize: 12 }} />
                <YAxis stroke="var(--text-quiet)" style={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    border: `1px solid var(--border)`,
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill={SEVCO_COLORS.green} radius={[8, 8, 0, 0]} isAnimationActive={true} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="surface-card rounded-xl p-8">
        <h2 className="text-xl font-semibold text-strong mb-8">Recent Activity</h2>
        <div className="space-y-6">
          {[
            { action: 'Project created', details: 'New design system project', time: '2h ago', icon: '🚀' },
            { action: 'User invited', details: 'Sarah invited to Admin role', time: '5h ago', icon: '👤' },
            { action: 'Page published', details: 'Services page went live', time: '1d ago', icon: '📄' },
            { action: 'Project updated', details: 'E-commerce platform v2', time: '1d ago', icon: '⚙️' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 pb-6 border-b border-[var(--border)] last:border-0">
              <div className="text-2xl">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-strong text-sm">{item.action}</p>
                <p className="text-muted text-sm">{item.details}</p>
              </div>
              <p className="text-quiet text-xs whitespace-nowrap">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
