'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { EmployeeTable } from '@/components/employees/employee-table';
import { EmployeeModal } from '@/components/employees/employee-modal';
import { employees } from '@/lib/data';

export default function EmployeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = ['Training', 'Administration', 'Finance'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterDepartment === 'all' || emp.department === filterDepartment;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Employees</h1>
            <p className="text-muted-foreground">Manage team members</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add Employee
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <EmployeeTable employees={filteredEmployees} />

        {/* Modal */}
        {isModalOpen && <EmployeeModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </main>
  );
}
