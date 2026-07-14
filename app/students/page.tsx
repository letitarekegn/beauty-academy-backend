'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StudentTable } from '@/components/students/student-table';
import { StudentModal } from '@/components/students/student-modal';

export default function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Students</h1>
            <p className="text-muted-foreground">Manage all enrolled students</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add Student
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="graduated">Graduated</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
            <Download size={18} />
            Export
          </button>
        </div>

        {/* Table */}
        <StudentTable searchQuery={searchQuery} filterStatus={filterStatus} refreshKey={refreshKey} />

        {/* Modal */}
        {isModalOpen && (
          <StudentModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => setRefreshKey((key) => key + 1)}
          />
        )}
      </div>
    </main>
  );
}
