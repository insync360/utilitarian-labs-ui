import { Task } from '@/types/project';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Bot, User, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TaskListProps {
  tasks: Task[];
}

const priorityColors = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-warning/20 text-warning',
  high: 'bg-destructive/20 text-destructive',
};

const statusColors = {
  pending: 'border-muted-foreground/30',
  'in-progress': 'border-primary',
  review: 'border-accent',
  completed: 'border-success',
};

const categoryColors = {
  architecture: 'bg-primary/10 text-primary',
  feature: 'bg-accent/10 text-accent',
  bug: 'bg-destructive/10 text-destructive',
  test: 'bg-success/10 text-success',
  docs: 'bg-muted text-muted-foreground',
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={cn(
            'p-4 border-l-2 hover:bg-secondary/30 transition-colors',
            statusColors[task.status]
          )}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              checked={task.status === 'completed'}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-card-foreground text-sm">
                  {task.title}
                </span>
                <Badge
                  variant="outline"
                  className={cn('text-xs capitalize', categoryColors[task.category])}
                >
                  {task.category}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {task.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn('text-xs capitalize', priorityColors[task.priority])}
              >
                {task.priority}
              </Badge>
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center',
                  task.assignee === 'ai'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                {task.assignee === 'ai' ? (
                  <Bot className="w-3.5 h-3.5" />
                ) : (
                  <User className="w-3.5 h-3.5" />
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}