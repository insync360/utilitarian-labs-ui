import { useParams } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { TaskList } from '@/components/project/TaskList';
import { CodeViewer } from '@/components/project/CodeViewer';
import { AIChat } from '@/components/project/AIChat';
import { mockProjects, mockTasks, mockCodeFiles, mockReviewComments } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ListTodo,
  Code2,
  MessageSquare,
  TestTube2,
  GitBranch,
  Play,
  Settings,
} from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];

  return (
    <AppLayout>
      <div className="h-screen flex flex-col">
        {/* Project Header */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">{project.name}</h1>
              <Badge variant="outline" className="capitalize">
                {project.status.replace('-', ' ')}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <GitBranch className="w-4 h-4 mr-2" />
                main
              </Button>
              <Button size="sm" className="gap-2">
                <Play className="w-4 h-4" />
                Run Pipeline
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Progress:</span>
              <Progress value={project.progress} className="w-32 h-2" />
              <span className="font-medium">{project.progress}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Tasks:</span>
              <span className="font-medium">
                {project.tasksCompleted}/{project.totalTasks}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Tests:</span>
              <span className="font-medium text-success">
                {project.testsPassing}/{project.totalTests} passing
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Tabs */}
          <div className="flex-1 flex flex-col border-r border-border">
            <Tabs defaultValue="tasks" className="flex-1 flex flex-col">
              <div className="border-b border-border px-4">
                <TabsList className="h-11 bg-transparent gap-1">
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-secondary gap-2">
                    <ListTodo className="w-4 h-4" />
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="code" className="data-[state=active]:bg-secondary gap-2">
                    <Code2 className="w-4 h-4" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger value="tests" className="data-[state=active]:bg-secondary gap-2">
                    <TestTube2 className="w-4 h-4" />
                    Tests
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="tasks" className="flex-1 m-0 p-4 overflow-auto">
                <TaskList tasks={mockTasks} />
              </TabsContent>

              <TabsContent value="code" className="flex-1 m-0 overflow-hidden">
                <CodeViewer files={mockCodeFiles} comments={mockReviewComments} />
              </TabsContent>

              <TabsContent value="tests" className="flex-1 m-0 p-4">
                <div className="text-center text-muted-foreground py-12">
                  <TestTube2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Test results will appear here after running the pipeline.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - AI Chat */}
          <div className="w-96 flex-shrink-0">
            <AIChat />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}