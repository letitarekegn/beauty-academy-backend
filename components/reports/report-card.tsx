import { type Report } from '@/lib/reports-data';
import { ExportCsvButton } from './export-csv-button';

export function ReportCard({ report }: { report: Report }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{report.name}</h3>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {report.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{report.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {report.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-sm font-semibold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <ExportCsvButton filename={report.filename} rows={report.rows} />
      </div>
    </div>
  );
}
