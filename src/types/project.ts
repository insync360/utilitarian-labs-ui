export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  techStack: string[];
  createdAt: string;
  lastUpdated: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  testsPassing: number;
  totalTests: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: 'ai' | 'human';
  createdAt: string;
  category: 'architecture' | 'feature' | 'bug' | 'test' | 'docs';
}

export interface CodeFile {
  id: string;
  name: string;
  path: string;
  language: string;
  content: string;
  status: 'generated' | 'reviewed' | 'approved';
  issues: number;
}

export interface ReviewComment {
  id: string;
  file: string;
  line: number;
  type: 'suggestion' | 'issue' | 'security' | 'style';
  message: string;
  severity: 'info' | 'warning' | 'error';
  resolved: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  context?: string[];
}

export interface PlanningStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'current' | 'completed';
  output?: string;
}