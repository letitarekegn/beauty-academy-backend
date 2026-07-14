import { createClient } from '@/lib/supabase-server'
import { COURSES } from '@/components/students/types'
import { paymentStatusOf } from '@/components/payments/derive-status'
import { currentPeriodForEmployee } from '@/components/salary/types'

function courseLabel(value: string) {
  return COURSES.find((c) => c.value === value)?.label ?? value
}

export type ReportStat = { label: string; value: string }
export type ReportRow = Record<string, string | number | null>

export type Report = {
  id: string
  name: string
  description: string
  type: string
  stats: ReportStat[]
  rows: ReportRow[]
  filename: string
}

export async function getReportsData(): Promise<Report[]> {
  const supabase = await createClient()

  const [{ data: students }, { data: employees }, { data: salaries }] = await Promise.all([
    supabase.from('students').select('*'),
    supabase.from('employees').select('*'),
    supabase.from('salaries').select('*'),
  ])

  const allStudents = students ?? []
  const allEmployees = employees ?? []
  const allSalaries = salaries ?? []

  const now = new Date()

  // --- Enrollment ---
  const graduated = allStudents.filter((s) => s.graduation_status === 'graduated')
  const active = allStudents.filter((s) => s.graduation_status !== 'graduated')
  const courseCounts = new Map<string, number>()
  for (const s of allStudents) {
    for (const c of s.courses ?? []) {
      courseCounts.set(c, (courseCounts.get(c) ?? 0) + 1)
    }
  }
  const topCourse = [...courseCounts.entries()].sort((a, b) => b[1] - a[1])[0]

  const enrollmentReport: Report = {
    id: 'enrollment',
    name: 'Student Enrollment',
    description: 'All students currently in the system, by status and course',
    type: 'Analytics',
    stats: [
      { label: 'Total Students', value: String(allStudents.length) },
      { label: 'Active', value: String(active.length) },
      { label: 'Graduated', value: String(graduated.length) },
      { label: 'Top Course', value: topCourse ? `${courseLabel(topCourse[0])} (${topCourse[1]})` : '-' },
    ],
    rows: allStudents.map((s) => ({
      Name: s.full_name,
      Email: s.email,
      Phone: s.phone,
      Course: (s.courses ?? []).map(courseLabel).join('; '),
      Status: s.graduation_status === 'graduated' ? 'Graduated' : (s.status ?? 'Active'),
      'Enrolled Date': s.created_at ? s.created_at.slice(0, 10) : null,
    })),
    filename: 'enrollment-report.csv',
  }

  // --- Revenue / Payments ---
  const totalCollected = allStudents.reduce((sum, s) => sum + (s.amount_paid ?? 0), 0)
  const totalExpected = allStudents.reduce((sum, s) => sum + (s.total_fee ?? 0), 0)
  const byPaymentStatus = { pending: 0, half_paid: 0, fully_paid: 0 }
  for (const s of allStudents) byPaymentStatus[paymentStatusOf(s)]++

  const revenueReport: Report = {
    id: 'revenue',
    name: 'Revenue & Payments',
    description: 'Fees collected vs. expected across all students',
    type: 'Financial',
    stats: [
      { label: 'Total Collected', value: `${totalCollected.toLocaleString()} ETB` },
      { label: 'Total Expected', value: `${totalExpected.toLocaleString()} ETB` },
      { label: 'Outstanding', value: `${(totalExpected - totalCollected).toLocaleString()} ETB` },
      { label: 'Fully Paid / Half Paid / Pending', value: `${byPaymentStatus.fully_paid} / ${byPaymentStatus.half_paid} / ${byPaymentStatus.pending}` },
    ],
    rows: allStudents.map((s) => ({
      Name: s.full_name,
      Course: (s.courses ?? []).map(courseLabel).join('; '),
      'Total Fee': s.total_fee ?? '',
      'Amount Paid': s.amount_paid ?? '',
      'Payment Status': paymentStatusOf(s),
    })),
    filename: 'revenue-report.csv',
  }

  // --- Graduation ---
  const graduatedThisMonth = graduated.filter((s) => {
    if (!s.graduated_at) return false
    const d = new Date(s.graduated_at)
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  })

  const graduationReport: Report = {
    id: 'graduation',
    name: 'Graduation Statistics',
    description: 'Students who have completed their course',
    type: 'Analytics',
    stats: [
      { label: 'Total Graduated', value: String(graduated.length) },
      { label: 'This Month', value: String(graduatedThisMonth.length) },
      { label: 'Currently Enrolled', value: String(active.length) },
    ],
    rows: graduated.map((s) => ({
      Name: s.full_name,
      Course: (s.courses ?? []).map(courseLabel).join('; '),
      'Graduated On': s.graduated_at ? s.graduated_at.slice(0, 10) : null,
    })),
    filename: 'graduation-report.csv',
  }

  // --- Payroll ---
  const salaryByKey = new Map(allSalaries.map((s) => [`${s.employee_id}:${s.period}`, s]))
  const payrollRows = allEmployees.map((emp) => {
    const period = currentPeriodForEmployee(emp.join_date ?? emp.created_at ?? new Date().toISOString())
    const salary = salaryByKey.get(`${emp.id}:${period}`)
    return {
      employee: emp,
      period,
      amount: salary?.amount ?? emp.salary ?? 0,
      status: salary?.status ?? 'pending',
      paymentDate: salary?.payment_date ?? null,
    }
  })
  const totalPayroll = payrollRows.reduce((sum, r) => sum + (r.amount ?? 0), 0)
  const paidPayroll = payrollRows.filter((r) => r.status === 'paid')
  const pendingPayroll = payrollRows.filter((r) => r.status !== 'paid')

  const payrollReport: Report = {
    id: 'payroll',
    name: 'Payroll',
    description: 'Current pay cycle for every employee',
    type: 'Financial',
    stats: [
      { label: 'Total Employees', value: String(allEmployees.length) },
      { label: 'Total Payroll (Current Cycle)', value: `${totalPayroll.toLocaleString()} ETB` },
      { label: 'Paid', value: String(paidPayroll.length) },
      { label: 'Pending', value: String(pendingPayroll.length) },
    ],
    rows: payrollRows.map((r) => ({
      Name: r.employee.full_name,
      Department: r.employee.department,
      'Pay Period': r.period,
      'Amount (ETB)': r.amount,
      Status: r.status === 'paid' ? 'Paid' : 'Pending',
      'Payment Date': r.paymentDate,
    })),
    filename: 'payroll-report.csv',
  }

  return [enrollmentReport, revenueReport, graduationReport, payrollReport]
}
