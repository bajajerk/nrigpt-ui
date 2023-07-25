export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          pan: string | null
          ssn: string | null
          nominee_first_name: string | null
          nominee_last_name: string | null
          nominee_pan: string | null
          avatar_url: string | null
          pan_url: string | null
          bank_proof_url: string | null
          passport_front_url: string | null
          address_proof_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          pan?: string | null
          ssn?: string | null
          nominee_first_name?: string | null
          nominee_last_name?: string | null
          nominee_pan?: string | null
          avatar_url?: string | null
          pan_url?: string | null
          bank_proof_url?: string | null
          passport_front_url?: string | null
          address_proof_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          pan?: string | null
          ssn?: string | null
          nominee_first_name?: string | null
          nominee_last_name?: string | null
          nominee_pan?: string | null
          avatar_url?: string | null
          pan_url?: string | null
          bank_proof_url?: string | null
          passport_front_url?: string | null
          address_proof_url?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

