'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { COURSES, type Student } from '@/components/students/types';
import { Pagination, PAGE_SIZE } from '@/components/pagination';

function courseLabel(value: string) {
  return COURSES.find((c) => c.value === value)?.label ?? value;
}

interface GraduationTableProps {
  graduates: Student[];
  searchQuery?: string;
}

export function GraduationTable({ graduates, searchQuery = '' }: GraduationTableProps) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(graduates.length / PAGE_SIZE));
  const pagedGraduates = graduates.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Graduated On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pagedGraduates.map((grad) => (
              <tr key={grad.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{grad.full_name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{grad.email || '-'}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{grad.phone}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {grad.courses?.length ? grad.courses.map(courseLabel).join(', ') : '-'}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {grad.graduated_at ? format(new Date(grad.graduated_at), 'MMM dd, yyyy') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {graduates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No graduation records found</p>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
