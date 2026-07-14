'use client';

import { Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { employees } from '@/lib/data';

interface EmployeeTableProps {
  employees: typeof employees;
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
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
                <td className="px-6 py-4 text-sm font-medium text-foreground">{emp.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{emp.role}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {emp.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {format(new Date(emp.joinDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{emp.salary.toLocaleString()} SAR</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
    </div>
  );
}
