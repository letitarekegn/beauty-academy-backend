import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'primary' | 'accent' | 'secondary';
}

export function StatCard({ title, value, icon: Icon, trend, color = 'primary' }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    secondary: 'bg-secondary text-secondary-foreground',
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          {trend && (
            <p className="text-xs text-muted-foreground mt-2">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
