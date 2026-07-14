import { BarChart3, Users, CreditCard, GraduationCap } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { RevenueChart } from '@/components/charts/revenue-chart';
import { EnrollmentChart } from '@/components/charts/enrollment-chart';
import { ActivityFeed } from '@/components/activity-feed';
import { getDashboardData } from '@/lib/dashboard-data';

export const metadata = {
  title: 'Dashboard - Arkani Beauty Academy',
  description: 'Admin dashboard for managing students, payments, and operations',
};

export default async function DashboardPage() {
  const {
    totalStudents,
    totalEmployees,
    totalRevenue,
    graduatedThisMonth,
    newStudentsThisMonth,
    revenueThisMonth,
    enrollmentTrend,
    revenueTrend,
    recentActivity,
  } = await getDashboardData();

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={totalStudents}
            icon={Users}
            trend={`+${newStudentsThisMonth} this month`}
            color="primary"
          />
          <StatCard
            title="Total Revenue"
            value={`${(totalRevenue / 1000).toFixed(0)}K ETB`}
            icon={CreditCard}
            trend={`+${(revenueThisMonth / 1000).toFixed(0)}K this month`}
            color="accent"
          />
          <StatCard
            title="Total Employees"
            value={totalEmployees}
            icon={BarChart3}
            color="secondary"
          />
          <StatCard
            title="Graduated This Month"
            value={graduatedThisMonth}
            icon={GraduationCap}
            color="primary"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart data={revenueTrend} />
          <EnrollmentChart data={enrollmentTrend} />
        </div>

        {/* Activity Feed */}
        <ActivityFeed activities={recentActivity} />
      </div>
    </main>
  );
}
