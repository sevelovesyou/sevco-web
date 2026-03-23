import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'manager' | 'viewer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'admin' | 'manager' | 'viewer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'manager' | 'viewer'
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          slug: string
          title: string
          content: string
          published: boolean
          created_at: string
          updated_at: string
          created_by: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          content: string
          published?: boolean
          created_at?: string
          updated_at?: string
          created_by: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          content?: string
          published?: boolean
          created_at?: string
          updated_at?: string
          created_by?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string
          status: 'active' | 'paused' | 'archived'
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          status?: 'active' | 'paused' | 'archived'
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          status?: 'active' | 'paused' | 'archived'
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      kpi_data: {
        Row: {
          id: string
          metric: 'revenue' | 'users' | 'projects' | 'streams'
          value: number
          timestamp: string
        }
        Insert: {
          id?: string
          metric: 'revenue' | 'users' | 'projects' | 'streams'
          value: number
          timestamp?: string
        }
        Update: {
          id?: string
          metric?: 'revenue' | 'users' | 'projects' | 'streams'
          value?: number
          timestamp?: string
        }
      }
    }
  }
}
