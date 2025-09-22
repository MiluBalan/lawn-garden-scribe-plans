
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuestionnaireNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canProceed: boolean;
}

const QuestionnaireNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onSubmit, 
  canProceed 
}: QuestionnaireNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3"
      >
        <span>Previous</span>
      </Button>

      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index + 1 <= currentStep ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {isLastStep ? (
        <Button
          onClick={onSubmit}
          disabled={!canProceed}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
        >
          Get My Plan
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default QuestionnaireNavigation;
