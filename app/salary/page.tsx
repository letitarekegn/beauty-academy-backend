'use client';

import { useState } from 'react';
import { Search, Zap } from 'lucide-react';
import { SalaryTable } from '@/components/salary/salary-table';
import { SalaryStats } from '@/components/salary/salary-stats';
import { salaries, employees } from '@/lib/data';

export default function SalaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSalaries = salaries.filter(salary => {
    const matchesSearch = salary.employeeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || salary.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Salary Management</h1>
            <p className="text-muted-foreground">Process and track employee salaries</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center">
            <Zap size={20} />
            Process Salaries
          </button>
        </div>

        {/* Stats */}
        <SalaryStats />

        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by employee name..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Table */}
        <SalaryTable salaries={filteredSalaries} />
      </div>
    </main>
  );
}
