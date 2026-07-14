'use client';

import { Search, Download } from 'lucide-react';
import { GraduationTable } from '@/components/graduation/graduation-table';
import { graduations, dashboardStats } from '@/lib/data';
import { useState } from 'react';

export default function GraduationPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGraduations = graduations.filter(grad =>
    grad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grad.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grad.certificateId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Graduation Records</h1>
          <p className="text-muted-foreground">Manage graduated students and certificates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Graduated</p>
            <h3 className="text-3xl font-bold text-primary">{dashboardStats.totalGraduated}</h3>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">This Month</p>
            <h3 className="text-3xl font-bold text-accent">{dashboardStats.graduatedThisMonth}</h3>
            <p className="text-xs text-muted-foreground mt-2">New graduates</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Avg GPA</p>
            <h3 className="text-3xl font-bold text-primary/80">3.8</h3>
            <p className="text-xs text-muted-foreground mt-2">All graduates</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, course, or certificate ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Table */}
        <GraduationTable graduations={filteredGraduations} />
      </div>
    </main>
  );
}
