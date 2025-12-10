import { useState } from 'react';
import { ChatMessage } from '@/types/project';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Paperclip, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockChatMessages } from '@/data/mockData';

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I understand. Let me analyze the request and generate a plan...',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-card-foreground text-sm">AI Assistant</h3>
          <p className="text-xs text-muted-foreground">Context-aware code generation</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' && 'flex-row-reverse'
              )}
            >
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
                  message.role === 'assistant' && 'bg-primary/10 text-primary',
                  message.role === 'user' && 'bg-secondary text-secondary-foreground',
                  message.role === 'system' && 'bg-muted text-muted-foreground'
                )}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4" />
                ) : message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
              </div>
              <div
                className={cn(
                  'flex-1 max-w-[80%]',
                  message.role === 'user' && 'flex flex-col items-end'
                )}
              >
                <div
                  className={cn(
                    'rounded-lg p-3 text-sm',
                    message.role === 'assistant' && 'bg-card border border-border',
                    message.role === 'user' && 'bg-primary text-primary-foreground',
                    message.role === 'system' && 'bg-muted/50 text-muted-foreground text-xs'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.context && (
                  <div className="flex gap-1 mt-1">
                    {message.context.map((ctx) => (
                      <Badge key={ctx} variant="outline" className="text-[10px]">
                        {ctx}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            className="min-h-[44px] max-h-32 resize-none"
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
    </Card>
  );
}