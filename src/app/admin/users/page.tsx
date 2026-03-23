'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Plus } from 'lucide-react'
import UserDialog from '@/components/UserDialog'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
  created_at: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Mock data
  useEffect(() => {
    setUsers([
      {
        id: '1',
        email: 'seve@sevco.us',
        name: 'Seve',
        role: 'admin',
        created_at: '2024-01-15',
      },
      {
        id: '2',
        email: 'peter@sevco.us',
        name: 'Peter',
        role: 'admin',
        created_at: '2024-01-15',
      },
      {
        id: '3',
        email: 'sarah@sevco.us',
        name: 'Sarah',
        role: 'manager',
        created_at: '2024-02-20',
      },
      {
        id: '4',
        email: 'viewer@sevco.us',
        name: 'Viewer User',
        role: 'viewer',
        created_at: '2024-03-01',
      },
    ])
  }, [])

  const handleAddUser = () => {
    setEditingUser(null)
    setIsDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleSaveUser = (data: Omit<User, 'id' | 'created_at'>) => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...data }
            : u
        )
      )
    } else {
      setUsers([
        ...users,
        {
          id: Math.random().toString(),
          ...data,
          created_at: new Date().toISOString().split('T')[0],
        },
      ])
    }
    setIsDialogOpen(false)
  }

  const roleColors = {
    admin: 'bg-[#0037FF]/10 text-[#0037FF]',
    manager: 'bg-[#FCC318]/10 text-[#FCC318]',
    viewer: 'bg-[var(--surface)] text-muted',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-strong">Users</h1>
          <p className="text-muted">Manage user accounts and permissions</p>
        </div>
        <Button onClick={handleAddUser}>
          <Plus size={16} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <Input placeholder="Search users by name or email..." />
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>{users.length} users in workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[var(--border)]">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-muted">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-muted">Created</th>
                  <th className="text-right py-3 px-4 font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--surface)] transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-strong">{user.name}</td>
                    <td className="py-4 px-4 text-muted">{user.email}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          roleColors[user.role]
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 text-right flex gap-2 justify-end">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="p-2 hover:bg-[var(--surface-hover,var(--surface))] rounded-lg transition-colors"
                      >
                        <Edit2 size={16} className="text-muted" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-red-500/100/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="text-[#BD0000]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Dialog */}
      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  )
}
