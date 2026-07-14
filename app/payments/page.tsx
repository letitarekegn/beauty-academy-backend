'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { PaymentTable } from '@/components/payments/payment-table';
import { PaymentStats } from '@/components/payments/payment-stats';

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
          <p className="text-muted-foreground">Track and manage student payments</p>
        </div>

        {/* Payment Stats */}
        <PaymentStats refreshKey={refreshKey} />

        {/* Filters and Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by student or course..."
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
            <option value="fully_paid">Fully Paid</option>
            <option value="half_paid">Half Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Table */}
        <PaymentTable
          searchQuery={searchQuery}
          filterStatus={filterStatus}
          refreshKey={refreshKey}
          onChange={() => setRefreshKey((key) => key + 1)}
        />
      </div>
    </main>
  );
}
