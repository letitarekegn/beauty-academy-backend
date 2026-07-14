'use client';

import { Download, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { graduations } from '@/lib/data';

interface GraduationTableProps {
  graduations: typeof graduations;
}

export function GraduationTable({ graduations }: GraduationTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">GPA</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Graduation Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Certificate ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {graduations.map((grad) => (
              <tr key={grad.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{grad.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{grad.course}</td>
                <td className="px-6 py-4 text-sm font-medium text-primary">{grad.gpa}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {format(new Date(grad.graduationDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 text-sm font-mono text-muted-foreground">{grad.certificateId}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {graduations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No graduation records found</p>
        </div>
      )}
    </div>
  );
}
