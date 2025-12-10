import { Card } from '@/components/ui/card';
import { GitCommit, MessageSquare, CheckCircle2, AlertTriangle, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Activity {
  id: string;
  type: 'commit' | 'review' | 'task' | 'alert' | 'generation';
  message: string;
  project: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'generation',
    message: 'Generated ProductService with pagination',
    project: 'E-Commerce Platform',
    time: '2 min ago',
  },
  {
    id: '2',
    type: 'review',
    message: 'Code review completed for auth module',
    project: 'E-Commerce Platform',
    time: '15 min ago',
  },
  {
    id: '3',
    type: 'commit',
    message: 'Pushed 3 files to feature/products',
    project: 'E-Commerce Platform',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'alert',
    message: 'Security issue detected in API endpoint',
    project: 'AI Chat Interface',
    time: '2 hours ago',
  },
  {
    id: '5',
    type: 'task',
    message: 'Task "Database Schema" marked complete',
    project: 'E-Commerce Platform',
    time: '3 hours ago',
  },
];

const activityIcons = {
  commit: GitCommit,
  review: MessageSquare,
  task: CheckCircle2,
  alert: AlertTriangle,
  generation: Code2,
};

const activityColors = {
  commit: 'text-primary bg-primary/10',
  review: 'text-accent bg-accent/10',
  task: 'text-success bg-success/10',
  alert: 'text-warning bg-warning/10',
  generation: 'text-primary bg-primary/10',
};

export function ActivityFeed() {
  return (
    <Card className="p-5">
      <h3 className="font-semibold text-card-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div key={activity.id} className="flex gap-3">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  activityColors[activity.type]
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">{activity.message}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground truncate">
                    {activity.project}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}