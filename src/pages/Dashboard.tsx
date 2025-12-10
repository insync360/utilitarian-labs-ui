import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { mockProjects } from '@/data/mockData';
import { FolderKanban, Code2, TestTube2, GitPullRequest } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back. Here's what's happening with your projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Active Projects"
            value={3}
            subtitle="2 in development"
            icon={FolderKanban}
            variant="primary"
          />
          <StatsCard
            title="Lines Generated"
            value="12.4k"
            subtitle="This month"
            icon={Code2}
            trend={{ value: 24, positive: true }}
            variant="accent"
          />
          <StatsCard
            title="Tests Passing"
            value="92%"
            subtitle="121 of 132 tests"
            icon={TestTube2}
            variant="success"
          />
          <StatsCard
            title="Pull Requests"
            value={8}
            subtitle="3 pending review"
            icon={GitPullRequest}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Your Projects</h2>
            <div className="grid gap-4">
              {mockProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Activity</h2>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}