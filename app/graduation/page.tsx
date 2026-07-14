'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search } from 'lucide-react';
import { GraduationTable } from '@/components/graduation/graduation-table';
import { COURSES, type Student } from '@/components/students/types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function courseLabel(value: string) {
  return COURSES.find((c) => c.value === value)?.label ?? value;
}

export default function GraduationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      const { data, error } = await supabase.from('students').select('*');

      if (error) {
        console.error(error);
      } else {
        setStudents(data || []);
      }

      setLoading(false);
    }

    fetchStudents();
  }, []);

  const graduates = students.filter((s) => s.graduation_status === 'graduated');
  const enrolled = students.filter((s) => s.graduation_status !== 'graduated');

  const now = new Date();
  const graduatedThisMonth = graduates.filter((s) => {
    if (!s.graduated_at) return false;
    const d = new Date(s.graduated_at);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const filteredGraduates = graduates.filter((grad) => {
    const query = searchQuery.toLowerCase();
    return (
      grad.full_name.toLowerCase().includes(query) ||
      (grad.courses ?? []).some((c) => courseLabel(c).toLowerCase().includes(query))
    );
  });

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Graduation Records</h1>
          <p className="text-muted-foreground">Manage graduated students</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Total Graduated</p>
            <h3 className="text-3xl font-bold text-primary">{graduates.length}</h3>
            <p className="text-xs text-muted-foreground mt-2">All time</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">This Month</p>
            <h3 className="text-3xl font-bold text-accent">{graduatedThisMonth}</h3>
            <p className="text-xs text-muted-foreground mt-2">New graduates</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">Currently Enrolled</p>
            <h3 className="text-3xl font-bold text-primary/80">{enrolled.length}</h3>
            <p className="text-xs text-muted-foreground mt-2">Not yet graduated</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="p-4 text-muted-foreground">Loading graduates...</p>
        ) : (
          <GraduationTable graduates={filteredGraduates} searchQuery={searchQuery} />
        )}
      </div>
    </main>
  );
}
