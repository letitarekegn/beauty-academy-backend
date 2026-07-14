'use client';

import { useCallback, useEffect, useState } from 'react';
import { Edit2, Check } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { fetchEmployeeSalaries } from './fetch-employee-salaries';
import { SalaryModal } from './salary-modal';
import { toDateString, type EmployeeSalary } from './types';
import { SuccessToast } from '@/components/success-toast';

function periodRangeLabel(periodStart: string) {
  const start = new Date(periodStart);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate() - 1);
  return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`;
}

interface SalaryTableProps {
  searchQuery?: string;
  filterStatus?: string;
  refreshKey?: number;
  onChange?: () => void;
}

export function SalaryTable({ searchQuery = '', filterStatus = 'all', refreshKey = 0, onChange }: SalaryTableProps) {
  const [allRows, setAllRows] = useState<EmployeeSalary[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState<EmployeeSalary | null>(null);
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState('');

  const loadRows = useCallback(async () => {
    try {
      setAllRows(await fetchEmployeeSalaries());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRows();
  }, [loadRows, refreshKey]);

  const flashSuccess = (message: string) => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(''), 4000);
  };

  const handleMarkPaid = async (row: EmployeeSalary) => {
    setMarkingPaidId(row.employeeId);

    const payload = { status: 'paid', payment_date: toDateString(new Date()) };
    const { data, error } = row.salaryId
      ? await supabase.from('salaries').update(payload).eq('id', row.salaryId).select()
      : await supabase.from('salaries').insert([{
          employee_id: row.employeeId,
          period: row.period,
          amount: row.amount,
          ...payload,
        }]).select();

    setMarkingPaidId(null);

    if (error || !data || data.length === 0) {
      console.error(error);
      alert('Failed to mark salary as paid.');
      return;
    }

    loadRows();
    onChange?.();
    flashSuccess('Salary marked as paid!');
  };

  const handleEditSuccess = () => {
    loadRows();
    onChange?.();
    flashSuccess('Salary updated successfully!');
  };

  const rows = allRows.filter((row) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = row.fullName.toLowerCase().includes(query);
    const matchesFilter = filterStatus === 'all' || row.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <p className="p-4">Loading salaries...</p>;
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Employee Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Pay Period</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.employeeId} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{row.fullName}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{row.department}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {periodRangeLabel(row.period)}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {row.amount != null ? `${row.amount.toLocaleString()} ETB` : '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === 'paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {row.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {row.paymentDate ? format(new Date(row.paymentDate), 'MMM dd, yyyy') : '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    {row.status === 'pending' && (
                      <button
                        onClick={() => handleMarkPaid(row)}
                        disabled={markingPaidId === row.employeeId}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
                        title="Mark as Paid"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => setEditingRow(row)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No employees found</p>
        </div>
      )}

      {editingRow && (
        <SalaryModal
          employeeSalary={editingRow}
          onClose={() => setEditingRow(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {showSuccess && <SuccessToast message={showSuccess} />}
    </div>
  );
}
