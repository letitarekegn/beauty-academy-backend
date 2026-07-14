'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { type Student } from '@/components/students/types';
import { derivePaymentStatus, PAYMENT_STATUS_LABELS, PAYMENT_STATUS_STYLES } from './derive-status';

interface PaymentModalProps {
  student: Student;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PaymentModal({ student, onClose, onSuccess }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    totalFee: student.total_fee ? student.total_fee.toString() : '',
    amountPaid: student.amount_paid ? student.amount_paid.toString() : '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const status = derivePaymentStatus(Number(formData.amountPaid) || 0, Number(formData.totalFee) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      total_fee: formData.totalFee ? Number(formData.totalFee) : null,
      amount_paid: formData.amountPaid ? Number(formData.amountPaid) : null,
      payment_status: status,
    };

    const { data, error } = await supabase
      .from('students')
      .update(payload)
      .eq('id', student.id)
      .select();

    setLoading(false);

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    if (!data || data.length === 0) {
      setError('No payment was updated. This usually means a database permission (RLS policy) is blocking the change.');
      return;
    }

    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-sm w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            Update Payment — {student.full_name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Total Fee */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Total Fee (ETB)</label>
            <input
              type="number"
              name="totalFee"
              value={formData.totalFee}
              onChange={handleInputChange}
              placeholder="Enter total fee"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Amount Paid */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Amount Paid (ETB)</label>
            <input
              type="number"
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleInputChange}
              placeholder="Enter amount paid"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Status (derived automatically from the amounts above) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Payment Status</label>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${PAYMENT_STATUS_STYLES[status]}`}>
              {PAYMENT_STATUS_LABELS[status]}
            </span>
            <p className="text-xs text-muted-foreground mt-1">
              Calculated automatically from Amount Paid vs. Total Fee.
            </p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
