'use client';

import { Download } from 'lucide-react';
import { type ReportRow } from '@/lib/reports-data';

function csvEscape(value: unknown) {
  const str = value == null ? '' : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

interface ExportCsvButtonProps {
  filename: string;
  rows: ReportRow[];
}

export function ExportCsvButton({ filename, rows }: ExportCsvButtonProps) {
  const handleExport = () => {
    if (rows.length === 0) return;

    const headers = Object.keys(rows[0]);
    const lines = [
      headers.join(','),
      ...rows.map((row) => headers.map((h) => csvEscape(row[h])).join(',')),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={rows.length === 0}
      className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title={rows.length === 0 ? 'No data to export' : `Export ${rows.length} rows`}
    >
      <Download size={16} />
      Export CSV
    </button>
  );
}
