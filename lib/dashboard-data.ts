import { format, startOfMonth, subMonths } from 'date-fns'
import { createClient } from '@/lib/supabase-server'

export type ActivityItem = {
  id: string
  type: 'student' | 'employee' | 'graduation'
  message: string
  actor: string
  timestamp: string
}

export type DashboardData = {
  totalStudents: number
  totalEmployees: number
  totalRevenue: number
  graduatedThisMonth: number
  newStudentsThisMonth: number
  revenueThisMonth: number
  enrollmentTrend: { month: string; students: number }[]
  revenueTrend: { month: string; revenue: number }[]
  recentActivity: ActivityItem[]
}

function lastNMonths(n: number) {
  const months: Date[] = []
  for (let i = n - 1; i >= 0; i--) {
    months.push(startOfMonth(subMonths(new Date(), i)))
  }
  return months
}

function monthKey(date: Date) {
  return format(date, 'yyyy-MM')
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()
  const monthStart = startOfMonth(new Date()).toISOString()

  const [
    { count: totalStudents },
    { count: totalEmployees },
    { data: studentRows },
    { count: graduatedThisMonthCount },
    { data: recentStudents },
    { data: recentEmployees },
    { data: recentGraduates },
  ] = await Promise.all([
    supabase.from('students').select('*', { count: 'exact', head: true }),
    supabase.from('employees').select('*', { count: 'exact', head: true }),
    supabase.from('students').select('amount_paid, created_at'),
    supabase
      .from('students')
      .select('*', { count: 'exact', head: true })
      .eq('graduation_status', 'graduated')
      .gte('graduated_at', monthStart),
    supabase.from('students').select('id, full_name, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('employees').select('id, full_name, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('students').select('id, full_name, graduated_at').eq('graduation_status', 'graduated').order('graduated_at', { ascending: false }).limit(5),
  ])

  const totalRevenue = (studentRows ?? []).reduce((sum, s) => sum + (s.amount_paid ?? 0), 0)

  const months = lastNMonths(6)
  const enrollmentByMonth = new Map<string, number>()
  const revenueByMonth = new Map<string, number>()
  months.forEach((m) => {
    enrollmentByMonth.set(monthKey(m), 0)
    revenueByMonth.set(monthKey(m), 0)
  })

  for (const s of studentRows ?? []) {
    if (!s.created_at) continue
    const key = monthKey(new Date(s.created_at))
    if (enrollmentByMonth.has(key)) {
      enrollmentByMonth.set(key, (enrollmentByMonth.get(key) ?? 0) + 1)
      revenueByMonth.set(key, (revenueByMonth.get(key) ?? 0) + (s.amount_paid ?? 0))
    }
  }

  const enrollmentTrend = months.map((m) => ({
    month: format(m, 'MMM'),
    students: enrollmentByMonth.get(monthKey(m)) ?? 0,
  }))

  const revenueTrend = months.map((m) => ({
    month: format(m, 'MMM'),
    revenue: revenueByMonth.get(monthKey(m)) ?? 0,
  }))

  const thisMonthKey = monthKey(startOfMonth(new Date()))

  const recentActivity: ActivityItem[] = [
    ...(recentStudents ?? []).map((s) => ({
      id: `student-${s.id}`,
      type: 'student' as const,
      message: 'New student enrolled',
      actor: s.full_name,
      timestamp: s.created_at as string,
    })),
    ...(recentEmployees ?? []).map((e) => ({
      id: `employee-${e.id}`,
      type: 'employee' as const,
      message: 'New employee added',
      actor: e.full_name,
      timestamp: e.created_at as string,
    })),
    ...(recentGraduates ?? []).map((g) => ({
      id: `graduation-${g.id}`,
      type: 'graduation' as const,
      message: 'Student graduated',
      actor: g.full_name,
      timestamp: g.graduated_at as string,
    })),
  ]
    .filter((a) => a.timestamp)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6)

  return {
    totalStudents: totalStudents ?? 0,
    totalEmployees: totalEmployees ?? 0,
    totalRevenue,
    graduatedThisMonth: graduatedThisMonthCount ?? 0,
    newStudentsThisMonth: enrollmentByMonth.get(thisMonthKey) ?? 0,
    revenueThisMonth: revenueByMonth.get(thisMonthKey) ?? 0,
    enrollmentTrend,
    revenueTrend,
    recentActivity,
  }
}
