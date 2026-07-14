import { supabase } from '@/lib/supabase'
import { currentPeriodForEmployee, type EmployeeSalary } from './types'

export async function fetchEmployeeSalaries(): Promise<EmployeeSalary[]> {
  const { data: employees, error: empError } = await supabase
    .from('employees')
    .select('id, full_name, role, department, salary, join_date, created_at')

  if (empError) throw empError

  const employeesWithPeriod = (employees ?? []).map((emp) => ({
    ...emp,
    period: currentPeriodForEmployee(emp.join_date ?? emp.created_at ?? new Date().toISOString()),
  }))

  const employeeIds = employeesWithPeriod.map((e) => e.id)

  const { data: salaries, error: salError } = employeeIds.length
    ? await supabase.from('salaries').select('*').in('employee_id', employeeIds)
    : { data: [], error: null }

  if (salError) throw salError

  const byKey = new Map((salaries ?? []).map((s) => [`${s.employee_id}:${s.period}`, s]))

  return employeesWithPeriod.map((emp) => {
    const s = byKey.get(`${emp.id}:${emp.period}`)
    return {
      salaryId: s?.id ?? null,
      employeeId: emp.id,
      fullName: emp.full_name,
      role: emp.role,
      department: emp.department,
      period: emp.period,
      amount: s?.amount ?? emp.salary,
      status: s?.status ?? 'pending',
      paymentDate: s?.payment_date ?? null,
    }
  })
}
