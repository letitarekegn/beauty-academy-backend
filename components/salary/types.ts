export type EmployeeSalary = {
  salaryId: string | null
  employeeId: string
  fullName: string
  role: string
  department: string
  period: string
  amount: number | null
  status: string
  paymentDate: string | null
}

export function toDateString(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

// Employees are paid monthly on the day-of-month they joined. Returns the
// start date of the employee's *current* pay cycle. A cycle that was marked
// paid only ever covers that one period — once the next monthly anniversary
// arrives, there's no salary row for the new period yet, so it naturally
// reads as pending again without anything needing to be reset.
export function currentPeriodForEmployee(anchorDate: string): string {
  const anchor = new Date(anchorDate)
  const day = anchor.getDate()
  const today = new Date()

  const clamp = (year: number, month: number) =>
    new Date(year, month, Math.min(day, daysInMonth(year, month)))

  let period = clamp(today.getFullYear(), today.getMonth())
  if (period > today) {
    period = clamp(today.getFullYear(), today.getMonth() - 1)
  }

  return toDateString(period)
}
