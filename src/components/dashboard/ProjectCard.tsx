import { Project } from '@/types/project';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle2, TestTube2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const statusColors = {
  planning: 'bg-warning/20 text-warning border-warning/30',
  'in-progress': 'bg-primary/20 text-primary border-primary/30',
  review: 'bg-accent/20 text-accent border-accent/30',
  completed: 'bg-success/20 text-success border-success/30',
};

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      onClick={onClick}
      className="p-5 cursor-pointer hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <Badge
          variant="outline"
          className={cn('capitalize text-xs', statusColors[project.status])}
        >
          {project.status.replace('-', ' ')}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 4).map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs font-normal">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Progress */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-card-foreground">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-1.5" />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{project.tasksCompleted}/{project.totalTasks} tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TestTube2 className="w-3.5 h-3.5" />
          <span>{project.testsPassing}/{project.totalTests} tests</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <Clock className="w-3.5 h-3.5" />
          <span>{project.lastUpdated}</span>
        </div>
      </div>
    </Card>
  );
}