'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, DollarSign, Music } from 'lucide-react'
import { SEVCO_COLORS } from '@/lib/utils'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock KPI data
  const kpis = [
    {
      title: 'Revenue',
      value: '$24,500',
      change: '+12.5%',
      icon: DollarSign,
      color: SEVCO_COLORS.blue,
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      icon: Users,
      color: SEVCO_COLORS.green,
    },
    {
      title: 'Projects',
      value: '42',
      change: '+4.1%',
      icon: Users,
      color: SEVCO_COLORS.red,
    },
    {
      title: 'Streams',
      value: '128.5K',
      change: '+24.3%',
      icon: Music,
      color: SEVCO_COLORS.yellow,
    },
  ]

  // Mock chart data
  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 2000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
    { month: 'Jul', revenue: 3490 },
  ]

  const userGrowth = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 520 },
    { month: 'Mar', users: 580 },
    { month: 'Apr', users: 720 },
    { month: 'May', users: 850 },
    { month: 'Jun', users: 980 },
    { month: 'Jul', users: 1200 },
  ]

  const projectStatus = [
    { name: 'Active', value: 28, fill: SEVCO_COLORS.green },
    { name: 'Paused', value: 10, fill: SEVCO_COLORS.yellow },
    { name: 'Archived', value: 4, fill: SEVCO_COLORS.red },
  ]

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Peter. Here's your SEVCO overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: kpi.color + '20' }}
                  >
                    <Icon
                      size={18}
                      style={{ color: kpi.color }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                <p className="text-xs text-green-600 mt-2 font-medium">{kpi.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={SEVCO_COLORS.blue}
                  strokeWidth={2}
                  dot={{ fill: SEVCO_COLORS.blue, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Active users growth trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill={SEVCO_COLORS.green} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Status & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Distribution of project states</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={projectStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions in your workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Project created', details: 'New design system project', time: '2h ago' },
                { action: 'User invited', details: 'Sarah invited to Admin role', time: '5h ago' },
                { action: 'Page published', details: 'Services page went live', time: '1d ago' },
                { action: 'Project updated', details: 'E-commerce platform v2', time: '1d ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-between justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <p className="text-xs text-gray-500">{item.details}</p>
                  </div>
                  <p className="text-xs text-gray-400 whitespace-nowrap ml-4">{item.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
