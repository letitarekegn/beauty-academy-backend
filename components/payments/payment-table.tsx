'use client';

import { useCallback, useEffect, useState } from 'react';
import { Edit2, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COURSES, type Student } from '@/components/students/types';
import { PaymentModal } from './payment-modal';
import { SuccessToast } from '@/components/success-toast';
import { PAYMENT_STATUS_LABELS, PAYMENT_STATUS_STYLES, paymentStatusOf } from './derive-status';

function courseLabel(value: string) {
  return COURSES.find((c) => c.value === value)?.label ?? value;
}

interface PaymentTableProps {
  searchQuery?: string;
  filterStatus?: string;
  refreshKey?: number;
  onChange?: () => void;
}

export function PaymentTable({ searchQuery = '', filterStatus = 'all', refreshKey = 0, onChange }: PaymentTableProps) {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [markingPaidId, setMarkingPaidId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState('');

  const fetchStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setAllStudents(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents, refreshKey]);

  const flashSuccess = (message: string) => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(''), 4000);
  };

  const handleMarkFullyPaid = async (student: Student) => {
    setMarkingPaidId(student.id);

    const { data, error } = await supabase
      .from('students')
      .update({
        payment_status: 'fully_paid',
        amount_paid: student.total_fee ?? student.amount_paid ?? null,
      })
      .eq('id', student.id)
      .select();

    setMarkingPaidId(null);

    if (error || !data || data.length === 0) {
      console.error(error);
      alert('Failed to update payment status.');
      return;
    }

    fetchStudents();
    onChange?.();
    flashSuccess('Marked as fully paid!');
  };

  const handleEditSuccess = () => {
    fetchStudents();
    onChange?.();
    flashSuccess('Payment updated successfully!');
  };

  const students = allStudents.filter((student) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      student.full_name.toLowerCase().includes(query) ||
      (student.courses ?? []).some((c) => courseLabel(c).toLowerCase().includes(query));
    const status = paymentStatusOf(student);
    const matchesFilter = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <p className="p-4">Loading payments...</p>;
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Student Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Fee</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount Paid</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((student) => {
              const status = paymentStatusOf(student);
              return (
                <tr key={student.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{student.full_name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {student.courses?.length ? student.courses.map(courseLabel).join(', ') : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {student.total_fee != null ? `${student.total_fee.toLocaleString()} ETB` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {student.amount_paid != null ? `${student.amount_paid.toLocaleString()} ETB` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${PAYMENT_STATUS_STYLES[status]}`}>
                      {PAYMENT_STATUS_LABELS[status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      {status !== 'fully_paid' && (
                        <button
                          onClick={() => handleMarkFullyPaid(student)}
                          disabled={markingPaidId === student.id}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
                          title="Mark as Fully Paid"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No payments found</p>
        </div>
      )}

      {editingStudent && (
        <PaymentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {showSuccess && <SuccessToast message={showSuccess} />}
    </div>
  );
}
