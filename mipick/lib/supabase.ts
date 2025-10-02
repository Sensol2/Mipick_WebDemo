import { createClient } from '@supabase/supabase-js'

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export interface Store {
  id: string
  name: string
  description?: string
  thumbnail?: string
  address?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Menu {
  id: string
  store_id: string
  title: string
  description?: string
  price: number
  thumbnail?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MenuOption {
  id: string
  name: string
  price: number
}

export interface MenuOptionGroup {
  id: string
  name: string
  isRequired: boolean
  maxSelections: number
  options: MenuOption[]
}