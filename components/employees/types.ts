export type Employee = {
  id: string
  full_name: string
  role: string
  department: string
  salary: number | null
  join_date?: string
  created_at?: string
}

export const DEPARTMENTS = ['Training', 'Administration', 'Management']
