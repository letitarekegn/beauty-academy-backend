'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { payments } from '@/lib/data';

interface PaymentTableProps {
  payments: typeof payments;
}

export function PaymentTable({ payments }: PaymentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Student Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Due Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.studentName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{payment.course}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{payment.amount.toLocaleString()} SAR</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {format(new Date(payment.dueDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No payments found</p>
        </div>
      )}
    </div>
  );
}
