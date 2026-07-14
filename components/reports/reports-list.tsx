import { type Report } from '@/lib/reports-data';
import { ReportCard } from './report-card';

export function ReportsList({ reports }: { reports: Report[] }) {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}
