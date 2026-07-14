'use client';

import { Download, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const reports = [
  {
    id: 1,
    name: 'Monthly Revenue Report',
    description: 'Complete revenue breakdown for January 2025',
    type: 'Financial',
    generated: '2025-02-01',
    size: '2.4 MB',
  },
  {
    id: 2,
    name: 'Student Enrollment Summary',
    description: 'Enrollment trends and statistics',
    type: 'Analytics',
    generated: '2025-01-31',
    size: '1.8 MB',
  },
  {
    id: 3,
    name: 'Course Performance Report',
    description: 'Performance metrics for all courses',
    type: 'Analytics',
    generated: '2025-01-30',
    size: '3.1 MB',
  },
  {
    id: 4,
    name: 'Payroll Report',
    description: 'January 2025 payroll and salary details',
    type: 'Financial',
    generated: '2025-02-01',
    size: '1.2 MB',
  },
  {
    id: 5,
    name: 'Graduation Statistics',
    description: 'Graduated students and certificates issued',
    type: 'Analytics',
    generated: '2025-01-28',
    size: '956 KB',
  },
];

export function ReportsList() {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{report.name}</h3>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {report.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {format(new Date(report.generated), 'MMM dd, yyyy')}
                </div>
                <span>{report.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors">
                <Eye size={18} />
              </button>
              <button className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
