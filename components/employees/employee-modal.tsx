'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { employeeSchema, type EmployeeFormData } from '@/lib/schemas';

interface EmployeeModalProps {
  onClose: () => void;
}

const departments = ['Training', 'Administration', 'Finance'];

export function EmployeeModal({ onClose }: EmployeeModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log('Form data:', data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Add New Employee</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Enter full name"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Role</label>
            <input
              type="text"
              {...register('role')}
              placeholder="Enter role"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Department</label>
            <select
              {...register('department')}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Salary (SAR)</label>
            <input
              type="number"
              {...register('salary')}
              placeholder="Enter salary"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>}
          </div>

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
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
