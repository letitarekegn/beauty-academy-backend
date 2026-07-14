'use client';

import { useEffect, useState } from 'react';
import { CreditCard, AlertCircle, CircleDashed, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { type Student } from '@/components/students/types';
import { paymentStatusOf } from './derive-status';

interface PaymentStatsProps {
  refreshKey?: number;
}

export function PaymentStats({ refreshKey = 0 }: PaymentStatsProps) {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('payment_status, amount_paid, total_fee');

      if (error) {
        console.error(error);
      } else {
        setStudents((data as Student[]) || []);
      }
    }

    fetchStudents();
  }, [refreshKey]);

  const fullyPaidCount = students.filter(s => paymentStatusOf(s) === 'fully_paid').length;
  const halfPaidCount = students.filter(s => paymentStatusOf(s) === 'half_paid').length;
  const pendingCount = students.filter(s => paymentStatusOf(s) === 'pending').length;
  const totalCollected = students.reduce((sum, s) => sum + (s.amount_paid ?? 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Collected</p>
            <h3 className="text-2xl font-bold text-foreground">{(totalCollected / 1000).toFixed(0)}K ETB</h3>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <CreditCard size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Fully Paid</p>
            <h3 className="text-2xl font-bold text-green-600">{fullyPaidCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Half Paid</p>
            <h3 className="text-2xl font-bold text-yellow-600">{halfPaidCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
            <CircleDashed size={24} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
            <h3 className="text-2xl font-bold text-red-600">{pendingCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-red-100 text-red-600">
            <AlertCircle size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
