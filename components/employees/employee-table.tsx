'use client';

import { useCallback, useEffect, useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';
import { EmployeeModal } from './employee-modal';
import { type Employee } from './types';
import { SuccessToast } from '@/components/success-toast';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface EmployeeTableProps {
  searchQuery?: string;
  filterDepartment?: string;
  refreshKey?: number;
}

export function EmployeeTable({ searchQuery = '', filterDepartment = 'all', refreshKey = 0 }: EmployeeTableProps) {
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  const fetchEmployees = useCallback(async () => {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setAllEmployees(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees, refreshKey]);

  const handleEditSuccess = () => {
    fetchEmployees();
    setShowEditSuccess(true);
    setTimeout(() => setShowEditSuccess(false), 4000);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    const { error } = await supabase.from('employees').delete().eq('id', deleteTarget.id);
    setDeleting(false);

    if (error) {
      console.error(error);
      alert('Failed to delete employee.');
      return;
    }

    setAllEmployees((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  const employees = allEmployees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      emp.full_name.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query);
    const matchesFilter = filterDepartment === 'all' || emp.department === filterDepartment;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <p className="p-4">Loading employees...</p>;
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Department</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Join Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Salary</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{emp.full_name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{emp.role}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {emp.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {emp.join_date ? format(new Date(emp.join_date), 'MMM dd, yyyy') : '-'}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {emp.salary != null ? `${emp.salary.toLocaleString()} ETB` : '-'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingEmployee(emp)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(emp)}
                      className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {employees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No employees found</p>
        </div>
      )}

      {editingEmployee && (
        <EmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {showEditSuccess && <SuccessToast message="Employee updated successfully!" />}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete employee"
          message={`Are you sure you want to delete ${deleteTarget.full_name}? This action cannot be undone.`}
          confirmLabel="Delete"
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
