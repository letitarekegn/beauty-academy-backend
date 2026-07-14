'use client';

import { payments } from '@/lib/data';
import { CreditCard, AlertCircle, CheckCircle } from 'lucide-react';

interface PaymentStatsProps {
  totalPending: number;
}

export function PaymentStats({ totalPending }: PaymentStatsProps) {
  const paidCount = payments.filter(p => p.status === 'paid').length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const overdueCount = payments.filter(p => p.status === 'overdue').length;
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Amount</p>
            <h3 className="text-2xl font-bold text-foreground">{(totalAmount / 1000).toFixed(0)}K SAR</h3>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <CreditCard size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Paid</p>
            <h3 className="text-2xl font-bold text-green-600">{paidCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-600">{pendingCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <AlertCircle size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Overdue</p>
            <h3 className="text-2xl font-bold text-red-600">{overdueCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-red-100 text-red-600">
            <AlertCircle size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
