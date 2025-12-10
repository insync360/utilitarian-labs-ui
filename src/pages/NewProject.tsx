import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { WizardStep, WizardProgress } from '@/components/wizard/WizardStep';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  Loader2,
  FileCode2,
  Database,
  Shield,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { title: 'Requirements', description: 'Define your project' },
  { title: 'Architecture', description: 'Design the structure' },
  { title: 'Planning', description: 'Create task breakdown' },
  { title: 'Generate', description: 'Start building' },
];

const techOptions = [
  { id: 'react', label: 'React', category: 'Frontend' },
  { id: 'vue', label: 'Vue.js', category: 'Frontend' },
  { id: 'next', label: 'Next.js', category: 'Frontend' },
  { id: 'node', label: 'Node.js', category: 'Backend' },
  { id: 'python', label: 'Python', category: 'Backend' },
  { id: 'go', label: 'Go', category: 'Backend' },
  { id: 'postgres', label: 'PostgreSQL', category: 'Database' },
  { id: 'mongodb', label: 'MongoDB', category: 'Database' },
  { id: 'redis', label: 'Redis', category: 'Cache' },
];

const architecturePatterns = [
  {
    id: 'monolith',
    title: 'Monolithic',
    description: 'Single deployable unit, simpler to develop and deploy',
    icon: Layers,
  },
  {
    id: 'microservices',
    title: 'Microservices',
    description: 'Distributed services, scalable and independent',
    icon: Database,
  },
  {
    id: 'serverless',
    title: 'Serverless',
    description: 'Event-driven, auto-scaling cloud functions',
    icon: FileCode2,
  },
];

export default function NewProject() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form state
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [architecture, setArchitecture] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<string[]>([]);

  const handleNext = () => {
    if (currentStep === 2) {
      // Generate AI plan
      setIsGenerating(true);
      setTimeout(() => {
        setGeneratedPlan([
          '1. Set up project structure and configuration',
          '2. Design database schema with migrations',
          '3. Implement user authentication module',
          '4. Create core API endpoints',
          '5. Build frontend components and pages',
          '6. Add unit and integration tests',
          '7. Configure CI/CD pipeline',
          '8. Security audit and optimization',
        ]);
        setIsGenerating(false);
        setCurrentStep(3);
      }, 2000);
    } else if (currentStep === 4) {
      // Complete wizard
      navigate('/project/1');
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const toggleTech = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-1">Create New Project</h1>
          <p className="text-muted-foreground">
            Let AI help you plan and scaffold your project
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <WizardProgress steps={steps} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <Card className="p-6">
          {/* Step 1: Requirements */}
          <WizardStep
            step={1}
            currentStep={currentStep}
            title="Requirements"
            description="Define your project"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., E-Commerce Platform"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project goals, features, and requirements..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-3">
                <Label>Tech Stack</Label>
                <div className="flex flex-wrap gap-2">
                  {techOptions.map((tech) => (
                    <Badge
                      key={tech.id}
                      variant={selectedTech.includes(tech.id) ? 'default' : 'outline'}
                      className={cn(
                        'cursor-pointer transition-colors',
                        selectedTech.includes(tech.id) && 'bg-primary'
                      )}
                      onClick={() => toggleTech(tech.id)}
                    >
                      {tech.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </WizardStep>

          {/* Step 2: Architecture */}
          <WizardStep
            step={2}
            currentStep={currentStep}
            title="Architecture"
            description="Choose your architecture pattern"
          >
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Architecture Pattern</Label>
                <div className="grid gap-4">
                  {architecturePatterns.map((pattern) => (
                    <Card
                      key={pattern.id}
                      className={cn(
                        'p-4 cursor-pointer transition-all',
                        architecture === pattern.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-muted-foreground/30'
                      )}
                      onClick={() => setArchitecture(pattern.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            architecture === pattern.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          )}
                        >
                          <pattern.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-card-foreground">{pattern.title}</h3>
                          <p className="text-sm text-muted-foreground">{pattern.description}</p>
                        </div>
                        {architecture === pattern.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">
                  AI will generate detailed architecture diagrams and component designs based on your selection.
                </span>
              </div>
            </div>
          </WizardStep>

          {/* Step 3: Planning */}
          <WizardStep
            step={3}
            currentStep={currentStep}
            title="Planning"
            description="Review AI-generated plan"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-medium text-card-foreground">Plan Generated</h3>
                  <p className="text-sm text-muted-foreground">
                    Review and customize the task breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {generatedPlan.map((task, index) => (
                  <Card key={index} className="p-3 flex items-center gap-3">
                    <Checkbox id={`task-${index}`} defaultChecked />
                    <Label htmlFor={`task-${index}`} className="flex-1 cursor-pointer">
                      {task}
                    </Label>
                  </Card>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm text-foreground">
                  Security best practices and code review will be enforced at each step.
                </span>
              </div>
            </div>
          </WizardStep>

          {/* Step 4: Generate */}
          <WizardStep
            step={4}
            currentStep={currentStep}
            title="Generate"
            description="Start building your project"
          >
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Ready to Generate
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                AI will start generating your project structure, database schema, and initial code files based on your plan.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary">{projectName || 'New Project'}</Badge>
                {selectedTech.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="outline">
                    {techOptions.find((t) => t.id === tech)?.label}
                  </Badge>
                ))}
                <Badge variant="outline" className="capitalize">
                  {architecture || 'monolith'}
                </Badge>
              </div>
            </div>
          </WizardStep>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Plan...
                </>
              ) : currentStep === 4 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Building
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}