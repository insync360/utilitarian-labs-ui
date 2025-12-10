import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  User,
  Send,
  Paperclip,
  Sparkles,
  Code2,
  FileText,
  Database,
  TestTube2,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: Code2, label: 'Generate Code', prompt: 'Generate a React component for...' },
  { icon: FileText, label: 'Write Docs', prompt: 'Write documentation for...' },
  { icon: Database, label: 'Design Schema', prompt: 'Design a database schema for...' },
  { icon: TestTube2, label: 'Create Tests', prompt: 'Write unit tests for...' },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI development assistant. I can help you with:

• **Code Generation** - Write production-ready code with best practices
• **Architecture Design** - Plan scalable system architectures
• **Code Review** - Analyze and improve existing code
• **Testing** - Generate comprehensive test suites
• **Documentation** - Create clear, helpful docs

What would you like to work on today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you want to work on: "${input}"

Let me break this down into steps:

1. **Analysis** - Understanding the requirements
2. **Design** - Planning the implementation approach
3. **Implementation** - Writing the code
4. **Review** - Ensuring quality and best practices

Should I proceed with generating the code, or would you like to discuss the approach first?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">AI Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Your context-aware development partner
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-4',
                      message.role === 'user' && 'flex-row-reverse'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        message.role === 'assistant'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-secondary text-secondary-foreground'
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'flex-1 max-w-[80%]',
                        message.role === 'user' && 'flex flex-col items-end'
                      )}
                    >
                      <Card
                        className={cn(
                          'p-4',
                          message.role === 'user' && 'bg-primary text-primary-foreground border-primary'
                        )}
                      >
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {message.content.split('\n').map((line, i) => (
                            <p key={i} className="mb-2 last:mb-0">
                              {line}
                            </p>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="max-w-3xl mx-auto">
                {/* Quick Actions */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => setInput(action.prompt)}
                    >
                      <action.icon className="w-3.5 h-3.5" />
                      {action.label}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe what you want to build or ask a question..."
                    className="min-h-[52px] max-h-40 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button onClick={handleSend} disabled={!input.trim()} className="flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Context */}
          <div className="w-72 border-l border-border p-4 hidden lg:block">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  Tips
                </h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>• Be specific about your requirements</p>
                  <p>• Mention the tech stack you're using</p>
                  <p>• Attach relevant files for context</p>
                  <p>• Ask for explanations when needed</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">Active Context</h3>
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-start">
                    No project selected
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}