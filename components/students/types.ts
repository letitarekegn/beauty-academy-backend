export type Student = {
  id: string
  full_name: string
  email: string
  phone: string
  gender?: string
  age?: number
  address?: string
  courses?: string[]
  schedule?: string
  experience?: string
  status?: string
  graduation_status?: string
  graduated_at?: string
  payment_status?: string
  amount_paid?: number
  total_fee?: number
  notes?: string
  created_at?: string
}

export const COURSES = [
  { value: 'makeup', label: 'Makeup' },
  { value: 'hair', label: 'Hair Styling' },
  { value: 'nails', label: 'Nail Art' },
  { value: 'hair-makeup', label: 'Hair & Makeup' },
  { value: 'hair-nails', label: 'Hair & Nails' },
  { value: 'makeup-nails', label: 'Makeup & Nails' },
  { value: 'full', label: 'Full Package (All Three)' },
]
