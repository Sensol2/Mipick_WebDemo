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
  image_url?: string
  location?: string
  pickup_location?: string
  hashtags?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Menu {
  id: string
  store_id: string
  name: string
  description?: string
  price: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}