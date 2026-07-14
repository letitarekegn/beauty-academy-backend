import { formatDistanceToNow } from 'date-fns';
import { UserPlus, Award, Briefcase } from 'lucide-react';
import { type ActivityItem } from '@/lib/dashboard-data';

const iconMap: Record<ActivityItem['type'], React.ComponentType<{ size: number; className?: string }>> = {
  student: UserPlus,
  employee: Briefcase,
  graduation: Award,
};

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">Latest updates from the system</p>
      </div>

      {activities.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recent activity yet.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type];
            return (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {Icon && <Icon size={20} className="text-primary" />}
                  </div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-12 bg-border my-2" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.actor}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
