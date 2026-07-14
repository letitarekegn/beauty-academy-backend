'use client';

import { activityTimeline } from '@/lib/data';
import { UserPlus, CheckCircle, Award, CreditCard, Briefcase } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  'user-plus': UserPlus,
  'check-circle': CheckCircle,
  'award': Award,
  'credit-card': CreditCard,
  'briefcase': Briefcase,
};

export function ActivityFeed() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">Latest updates from the system</p>
      </div>

      <div className="space-y-4">
        {activityTimeline.map((activity, index) => {
          const Icon = iconMap[activity.icon];
          return (
            <div key={activity.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {Icon && <Icon size={20} className="text-primary" />}
                </div>
                {index < activityTimeline.length - 1 && (
                  <div className="w-0.5 h-12 bg-border my-2" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.actor}
                  {activity.amount && ` • ${activity.amount}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 px-4 py-2 text-sm font-medium text-primary hover:bg-muted rounded-lg transition-colors">
        View all activity
      </button>
    </div>
  );
}
