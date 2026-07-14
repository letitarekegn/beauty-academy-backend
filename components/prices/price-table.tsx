'use client';

import { useCallback, useEffect, useState } from 'react';
import { Check, X, Edit2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COURSES } from '@/components/students/types';
import { SuccessToast } from '@/components/success-toast';
import { type CoursePrice } from './types';

function courseLabel(value: string) {
  return COURSES.find((c) => c.value === value)?.label ?? value;
}

export function PriceTable() {
  const [prices, setPrices] = useState<CoursePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchPrices = useCallback(async () => {
    const { data, error } = await supabase.from('course_prices').select('*');

    if (error) {
      console.error(error);
    } else {
      const byCourse = new Map((data ?? []).map((p) => [p.course, p]));
      // Always show every known course, in a stable order, even if a row is missing.
      setPrices(COURSES.map((c) => byCourse.get(c.value) ?? { course: c.value, price: 0 }));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const startEdit = (price: CoursePrice) => {
    setEditingCourse(price.course);
    setEditValue(price.price.toString());
  };

  const handleSave = async (course: string) => {
    setSaving(true);

    const { error } = await supabase
      .from('course_prices')
      .upsert({ course, price: Number(editValue) || 0, updated_at: new Date().toISOString() }, { onConflict: 'course' });

    setSaving(false);

    if (error) {
      console.error(error);
      alert('Failed to update price.');
      return;
    }

    setEditingCourse(null);
    fetchPrices();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  if (loading) {
    return <p className="p-4">Loading prices...</p>;
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price (ETB)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {prices.map((price) => (
              <tr key={price.course} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{courseLabel(price.course)}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {editingCourse === price.course ? (
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                      className="w-32 px-2 py-1 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    `${price.price.toLocaleString()} ETB`
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {editingCourse === price.course ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSave(price.course)}
                        disabled={saving}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
                        title="Save"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingCourse(null)}
                        className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancel"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(price)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSuccess && <SuccessToast message="Price updated! New students will use this price — existing students are unaffected." />}
    </div>
  );
}
