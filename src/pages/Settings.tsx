import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Key,
  Bell,
  Palette,
  GitBranch,
  Shield,
  Zap,
} from 'lucide-react';

export default function Settings() {
  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <GitBranch className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Zap className="w-4 h-4" />
              AI
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Developer" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <GitBranch className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground">GitHub</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect your repositories
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-success border-success">
                    Connected
                  </Badge>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <Key className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground">API Keys</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your API access tokens
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Manage Keys</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">AI Preferences</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Default Model</Label>
                  <Select defaultValue="gpt4">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt4">GPT-4o</SelectItem>
                      <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
                      <SelectItem value="gemini">Gemini Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-generate tests</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically create unit tests for generated code
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Security scanning</Label>
                    <p className="text-sm text-muted-foreground">
                      Run security analysis on all generated code
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Code review comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Add AI-generated review comments to PRs
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-card-foreground mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label>Pipeline completions</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when pipelines finish
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label>Code review alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for review comments
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label>Security issues</Label>
                    <p className="text-sm text-muted-foreground">
                      Critical security vulnerability alerts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <Label>Weekly digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Summary of all project activity
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}