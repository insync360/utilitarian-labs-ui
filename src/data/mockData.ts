import { Project, Task, CodeFile, ReviewComment, ChatMessage } from '@/types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'Multi-tenant SaaS inventory management system with real-time sync',
    status: 'in-progress',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    createdAt: '2024-12-01',
    lastUpdated: '2024-12-10',
    progress: 65,
    tasksCompleted: 13,
    totalTasks: 20,
    testsPassing: 45,
    totalTests: 52,
  },
  {
    id: '2',
    name: 'AI Chat Interface',
    description: 'Real-time chat application with AI-powered responses and context awareness',
    status: 'review',
    techStack: ['Next.js', 'OpenAI', 'WebSocket', 'MongoDB'],
    createdAt: '2024-11-15',
    lastUpdated: '2024-12-09',
    progress: 90,
    tasksCompleted: 18,
    totalTasks: 20,
    testsPassing: 38,
    totalTests: 40,
  },
  {
    id: '3',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics with custom visualization and reporting',
    status: 'planning',
    techStack: ['Vue.js', 'D3.js', 'Python', 'ClickHouse'],
    createdAt: '2024-12-08',
    lastUpdated: '2024-12-10',
    progress: 15,
    tasksCompleted: 3,
    totalTasks: 20,
    testsPassing: 0,
    totalTests: 0,
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design database schema',
    description: 'Create ER diagram and define all tables, relationships, and indexes',
    status: 'completed',
    priority: 'high',
    assignee: 'ai',
    createdAt: '2024-12-01',
    category: 'architecture',
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up OAuth2 with JWT tokens and refresh token rotation',
    status: 'completed',
    priority: 'high',
    assignee: 'ai',
    createdAt: '2024-12-02',
    category: 'feature',
  },
  {
    id: '3',
    title: 'Build product catalog API',
    description: 'REST endpoints for CRUD operations with pagination and filtering',
    status: 'in-progress',
    priority: 'high',
    assignee: 'ai',
    createdAt: '2024-12-03',
    category: 'feature',
  },
  {
    id: '4',
    title: 'Add unit tests for auth module',
    description: 'Comprehensive tests covering all auth flows and edge cases',
    status: 'review',
    priority: 'medium',
    assignee: 'ai',
    createdAt: '2024-12-04',
    category: 'test',
  },
  {
    id: '5',
    title: 'Security audit for API endpoints',
    description: 'Review all endpoints for SQL injection, XSS, and CSRF vulnerabilities',
    status: 'pending',
    priority: 'high',
    assignee: 'human',
    createdAt: '2024-12-05',
    category: 'bug',
  },
  {
    id: '6',
    title: 'Write API documentation',
    description: 'OpenAPI spec with examples and authentication guide',
    status: 'pending',
    priority: 'low',
    assignee: 'ai',
    createdAt: '2024-12-06',
    category: 'docs',
  },
];

export const mockCodeFiles: CodeFile[] = [
  {
    id: '1',
    name: 'auth.service.ts',
    path: 'src/services/auth.service.ts',
    language: 'typescript',
    content: `import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}`,
    status: 'approved',
    issues: 0,
  },
  {
    id: '2',
    name: 'product.controller.ts',
    path: 'src/controllers/product.controller.ts',
    language: 'typescript',
    content: `import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productService.findAll({ page, limit });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}`,
    status: 'reviewed',
    issues: 2,
  },
  {
    id: '3',
    name: 'database.schema.sql',
    path: 'migrations/001_initial_schema.sql',
    language: 'sql',
    content: `-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  tenant_id UUID REFERENCES tenants(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_products_tenant ON products(tenant_id);
CREATE INDEX idx_users_email ON users(email);`,
    status: 'approved',
    issues: 0,
  },
];

export const mockReviewComments: ReviewComment[] = [
  {
    id: '1',
    file: 'product.controller.ts',
    line: 12,
    type: 'suggestion',
    message: 'Consider adding input validation for page and limit parameters',
    severity: 'warning',
    resolved: false,
  },
  {
    id: '2',
    file: 'product.controller.ts',
    line: 22,
    type: 'security',
    message: 'Add authorization check before creating products',
    severity: 'error',
    resolved: false,
  },
  {
    id: '3',
    file: 'auth.service.ts',
    line: 15,
    type: 'style',
    message: 'Consider extracting password comparison to a separate method',
    severity: 'info',
    resolved: true,
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'system',
    content: 'Project context loaded. Ready to assist with E-Commerce Platform development.',
    timestamp: '2024-12-10T09:00:00Z',
  },
  {
    id: '2',
    role: 'user',
    content: 'Generate the product service with pagination and filtering support',
    timestamp: '2024-12-10T09:01:00Z',
    context: ['product.controller.ts', 'database.schema.sql'],
  },
  {
    id: '3',
    role: 'assistant',
    content: `I'll create the ProductService with full pagination and filtering capabilities. Here's my plan:

1. **Pagination**: Offset-based with configurable page size
2. **Filtering**: Support for price range, category, stock status
3. **Sorting**: Multiple field sorting with direction

Let me generate the code...`,
    timestamp: '2024-12-10T09:01:30Z',
  },
];