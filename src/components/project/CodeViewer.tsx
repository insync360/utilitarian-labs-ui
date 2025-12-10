import { CodeFile, ReviewComment } from '@/types/project';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, AlertCircle, FileCode2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeViewerProps {
  files: CodeFile[];
  comments: ReviewComment[];
}

const statusIcons = {
  generated: AlertCircle,
  reviewed: AlertCircle,
  approved: CheckCircle2,
};

const statusColors = {
  generated: 'text-warning',
  reviewed: 'text-primary',
  approved: 'text-success',
};

export function CodeViewer({ files, comments }: CodeViewerProps) {
  return (
    <Tabs defaultValue={files[0]?.id} className="h-full flex flex-col">
      <div className="border-b border-border px-1">
        <TabsList className="h-10 bg-transparent gap-1">
          {files.map((file) => {
            const StatusIcon = statusIcons[file.status];
            return (
              <TabsTrigger
                key={file.id}
                value={file.id}
                className="data-[state=active]:bg-secondary gap-2 text-xs"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                {file.name}
                <StatusIcon
                  className={cn('w-3.5 h-3.5', statusColors[file.status])}
                />
                {file.issues > 0 && (
                  <Badge variant="destructive" className="h-4 px-1 text-[10px]">
                    {file.issues}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {files.map((file) => {
        const fileComments = comments.filter((c) => c.file === file.name);
        return (
          <TabsContent
            key={file.id}
            value={file.id}
            className="flex-1 m-0 overflow-hidden"
          >
            <div className="h-full flex">
              {/* Code */}
              <ScrollArea className="flex-1">
                <div className="p-4">
                  <pre className="text-xs font-mono">
                    <code className="text-card-foreground">
                      {file.content.split('\n').map((line, i) => {
                        const lineComment = fileComments.find((c) => c.line === i + 1);
                        return (
                          <div key={i} className="flex group">
                            <span className="w-8 text-muted-foreground/50 select-none">
                              {i + 1}
                            </span>
                            <span
                              className={cn(
                                'flex-1 px-2',
                                lineComment && !lineComment.resolved && 'bg-warning/10 border-l-2 border-warning'
                              )}
                            >
                              {line || ' '}
                            </span>
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>
              </ScrollArea>

              {/* Comments Panel */}
              {fileComments.length > 0 && (
                <div className="w-72 border-l border-border p-3 space-y-3">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Review Comments
                  </h4>
                  {fileComments.map((comment) => (
                    <Card
                      key={comment.id}
                      className={cn(
                        'p-3 text-xs',
                        comment.resolved && 'opacity-50'
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[10px] capitalize',
                            comment.severity === 'error' && 'border-destructive text-destructive',
                            comment.severity === 'warning' && 'border-warning text-warning',
                            comment.severity === 'info' && 'border-muted-foreground text-muted-foreground'
                          )}
                        >
                          {comment.type}
                        </Badge>
                        <span className="text-muted-foreground">Line {comment.line}</span>
                      </div>
                      <p className="text-card-foreground">{comment.message}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}