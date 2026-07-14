'use client';

import { salaries } from '@/lib/data';
import { Wallet, TrendingUp, Clock } from 'lucide-react';

export function SalaryStats() {
  const totalSalaries = salaries.reduce((sum, s) => sum + s.amount, 0);
  const paidSalaries = salaries.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.amount, 0);
  const pendingSalaries = salaries.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Salaries</p>
            <h3 className="text-2xl font-bold text-foreground">{(totalSalaries / 1000).toFixed(0)}K SAR</h3>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Wallet size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Paid</p>
            <h3 className="text-2xl font-bold text-green-600">{(paidSalaries / 1000).toFixed(0)}K SAR</h3>
          </div>
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-yellow-600">{(pendingSalaries / 1000).toFixed(0)}K SAR</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <Clock size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
