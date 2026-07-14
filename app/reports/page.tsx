'use client';

import { Download, Filter } from 'lucide-react';
import { ReportsList } from '@/components/reports/reports-list';

export default function ReportsPage() {
  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and view business reports</p>
        </div>

        {/* Filter and Actions */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <select className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Reports</option>
            <option>Revenue Reports</option>
            <option>Enrollment Reports</option>
            <option>Financial Reports</option>
          </select>
          <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Reports List */}
        <ReportsList />
      </div>
    </main>
  );
}
