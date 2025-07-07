
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import LawnSizeStep from './LawnSizeStep';
import GrassTypeStep from './GrassTypeStep';
import ProblemAreasStep from './ProblemAreasStep';
import LocationStep from './LocationStep';
import SprinklerSystemStep from './SprinklerSystemStep';
import AnalysisAnimation from './AnalysisAnimation';
import LawnPlanResults from './LawnPlanResults';

interface LawnQuestionnaireProps {
  onBack: () => void;
}

const LawnQuestionnaire = ({ onBack }: LawnQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [lawnData, setLawnData] = useState({
    size: '',
    grassType: '',
    location: '',
    problems: [] as string[],
    sunlight: '',
    soilType: '',
    sprinklerSystem: '',
    sprinklerFrequency: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateLawnData = (data: Partial<typeof lawnData>) => {
    setLawnData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowAnalysis(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnalysisComplete = () => {
    setShowAnalysis(false);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowResults(false);
    setShowAnalysis(false);
    setCurrentStep(1);
    setLawnData({
      size: '',
      grassType: '',
      location: '',
      problems: [],
      sunlight: '',
      soilType: '',
      sprinklerSystem: '',
      sprinklerFrequency: ''
    });
  };

  if (showResults) {
    return <LawnPlanResults lawnData={lawnData} onRestart={handleRestart} />;
  }

  if (showAnalysis) {
    return <AnalysisAnimation onComplete={handleAnalysisComplete} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <LawnSizeStep data={lawnData} onUpdate={updateLawnData} />;
      case 2:
        return <GrassTypeStep data={lawnData} onUpdate={updateLawnData} />;
      case 3:
        return <LocationStep data={lawnData} onUpdate={updateLawnData} />;
      case 4:
        return <ProblemAreasStep data={lawnData} onUpdate={updateLawnData} />;
      case 5:
        return <SprinklerSystemStep data={lawnData} onUpdate={updateLawnData} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Lawn Size';
      case 2: return 'Grass Type';
      case 3: return 'Location & Conditions';
      case 4: return 'Problem Areas';
      case 5: return 'Watering System';
      default: return '';
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return lawnData.size !== '';
      case 2: return lawnData.grassType !== '';
      case 3: return lawnData.location !== '' && lawnData.sunlight !== '';
      case 4: return true; // Problems are optional
      case 5: return lawnData.sprinklerSystem !== '' && (lawnData.sprinklerSystem === 'no' || lawnData.sprinklerFrequency !== '');
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={currentStep === 1 ? onBack : prevStep}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Custom Lawn Plan</h1>
            <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="w-16"></div> {/* Spacer for alignment */}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-gray-200" />
        </div>

        {/* Step Content */}
        <Card className="mb-8 border shadow-xl bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-gray-900">{getStepTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-end">
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps ? 'Generate Plan' : 'Next Step'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LawnQuestionnaire;
