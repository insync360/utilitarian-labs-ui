import { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WizardStepProps {
  step: number;
  currentStep: number;
  title: string;
  description: string;
  children: ReactNode;
}

export function WizardStep({ step, currentStep, title, description, children }: WizardStepProps) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className={cn('transition-opacity', !isActive && 'hidden')}>
      {children}
    </div>
  );
}

interface WizardProgressProps {
  steps: { title: string; description: string }[];
  currentStep: number;
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={index} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  isCompleted && 'bg-success text-success-foreground',
                  isActive && 'bg-primary text-primary-foreground',
                  !isCompleted && !isActive && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <div className="hidden sm:block">
                <p
                  className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-12 h-0.5 mx-3',
                  stepNum < currentStep ? 'bg-success' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}