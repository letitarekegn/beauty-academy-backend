export function derivePaymentStatus(amountPaid: number, totalFee: number): 'pending' | 'half_paid' | 'fully_paid' {
  if (amountPaid <= 0) return 'pending'
  if (totalFee > 0 && amountPaid < totalFee) return 'half_paid'
  return 'fully_paid'
}

// Normalizes a student's stored payment_status. Anything other than an exact
// 'half_paid' or 'fully_paid' match (null, undefined, '', or a stray value)
// is treated as pending — matches what the UI displays via the label
// fallback, so counts/filters can never silently disagree with the table.
export function paymentStatusOf(student: { payment_status?: string | null }): 'pending' | 'half_paid' | 'fully_paid' {
  const status = student.payment_status
  if (status === 'half_paid' || status === 'fully_paid') return status
  return 'pending'
}

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  fully_paid: 'Fully Paid',
  half_paid: 'Half Paid',
  pending: 'Pending',
}

export const PAYMENT_STATUS_STYLES: Record<string, string> = {
  fully_paid: 'bg-green-100 text-green-700',
  half_paid: 'bg-yellow-100 text-yellow-700',
  pending: 'bg-red-100 text-red-700',
}
