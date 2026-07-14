import { ReportsList } from '@/components/reports/reports-list';
import { getReportsData } from '@/lib/reports-data';

export default async function ReportsPage() {
  const reports = await getReportsData();

  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
          <p className="text-muted-foreground">Live summaries computed from your current data, exportable as CSV</p>
        </div>

        {/* Reports List */}
        <ReportsList reports={reports} />
      </div>
    </main>
  );
}
