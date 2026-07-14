'use client';

import { Edit2, Check, X } from 'lucide-react';
import { salaries } from '@/lib/data';

interface SalaryTableProps {
  salaries: typeof salaries;
}

export function SalaryTable({ salaries }: SalaryTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Employee Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Month</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {salaries.map((salary) => (
              <tr key={salary.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{salary.employeeName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{salary.month}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{salary.amount.toLocaleString()} SAR</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    salary.status === 'paid' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {salary.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {salary.paymentDate || '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {salary.status === 'pending' ? (
                      <>
                        <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                          <Check size={16} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {salaries.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No salary records found</p>
        </div>
      )}
    </div>
  );
}
