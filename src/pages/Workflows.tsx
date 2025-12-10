import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  GitBranch,
  CheckCircle2,
  Clock,
  XCircle,
  Play,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Pipeline {
  id: string;
  name: string;
  branch: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  stages: { name: string; status: 'running' | 'success' | 'failed' | 'pending' }[];
  startedAt: string;
  duration?: string;
  commit: string;
}

const pipelines: Pipeline[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    branch: 'feature/products',
    status: 'running',
    stages: [
      { name: 'Build', status: 'success' },
      { name: 'Test', status: 'running' },
      { name: 'Security', status: 'pending' },
      { name: 'Deploy', status: 'pending' },
    ],
    startedAt: '2 min ago',
    commit: 'Add product filtering',
  },
  {
    id: '2',
    name: 'AI Chat Interface',
    branch: 'main',
    status: 'success',
    stages: [
      { name: 'Build', status: 'success' },
      { name: 'Test', status: 'success' },
      { name: 'Security', status: 'success' },
      { name: 'Deploy', status: 'success' },
    ],
    startedAt: '1 hour ago',
    duration: '4m 32s',
    commit: 'Update chat UI',
  },
  {
    id: '3',
    name: 'Analytics Dashboard',
    branch: 'develop',
    status: 'failed',
    stages: [
      { name: 'Build', status: 'success' },
      { name: 'Test', status: 'failed' },
      { name: 'Security', status: 'pending' },
      { name: 'Deploy', status: 'pending' },
    ],
    startedAt: '30 min ago',
    duration: '2m 15s',
    commit: 'Add chart components',
  },
];

const statusIcons = {
  running: Clock,
  success: CheckCircle2,
  failed: XCircle,
  pending: Clock,
};

const statusColors = {
  running: 'text-primary animate-pulse',
  success: 'text-success',
  failed: 'text-destructive',
  pending: 'text-muted-foreground',
};

const statusBadgeColors = {
  running: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-success/10 text-success border-success/20',
  failed: 'bg-destructive/10 text-destructive border-destructive/20',
  pending: 'bg-muted text-muted-foreground border-muted',
};

export default function Workflows() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">Workflows</h1>
            <p className="text-muted-foreground">
              Monitor CI/CD pipelines and automated workflows
            </p>
          </div>
          <Button className="gap-2">
            <Play className="w-4 h-4" />
            Run Pipeline
          </Button>
        </div>

        {/* Pipelines */}
        <div className="space-y-4">
          {pipelines.map((pipeline) => {
            const StatusIcon = statusIcons[pipeline.status];
            const completedStages = pipeline.stages.filter(
              (s) => s.status === 'success'
            ).length;
            const progress = (completedStages / pipeline.stages.length) * 100;

            return (
              <Card key={pipeline.id} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <StatusIcon
                      className={cn('w-5 h-5 mt-0.5', statusColors[pipeline.status])}
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-card-foreground">
                          {pipeline.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn('capitalize', statusBadgeColors[pipeline.status])}
                        >
                          {pipeline.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3.5 h-3.5" />
                          {pipeline.branch}
                        </span>
                        <span>•</span>
                        <span>{pipeline.commit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {pipeline.duration || pipeline.startedAt}
                    </span>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stages */}
                <div className="flex items-center gap-2">
                  {pipeline.stages.map((stage, index) => {
                    const StageIcon = statusIcons[stage.status];
                    return (
                      <div key={stage.name} className="flex items-center flex-1">
                        <div
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg flex-1',
                            stage.status === 'success' && 'bg-success/5',
                            stage.status === 'running' && 'bg-primary/5',
                            stage.status === 'failed' && 'bg-destructive/5',
                            stage.status === 'pending' && 'bg-muted/50'
                          )}
                        >
                          <StageIcon
                            className={cn('w-4 h-4', statusColors[stage.status])}
                          />
                          <span className="text-sm font-medium text-card-foreground">
                            {stage.name}
                          </span>
                        </div>
                        {index < pipeline.stages.length - 1 && (
                          <div className="w-4 h-0.5 bg-border mx-1" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {pipeline.status === 'running' && (
                  <div className="mt-4">
                    <Progress value={progress} className="h-1.5" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}