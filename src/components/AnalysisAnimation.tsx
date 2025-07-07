
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Thermometer, CloudRain, Leaf, FlaskConical } from 'lucide-react';

interface AnalysisAnimationProps {
  onComplete: () => void;
}

const AnalysisAnimation = ({ onComplete }: AnalysisAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    {
      icon: <Thermometer className="h-8 w-8 text-orange-500" />,
      title: "Analyzing Temperature Data",
      description: "Processing regional climate patterns and seasonal variations..."
    },
    {
      icon: <CloudRain className="h-8 w-8 text-blue-500" />,
      title: "Analyzing Rainfall Data",
      description: "Calculating precipitation patterns and watering needs..."
    },
    {
      icon: <FlaskConical className="h-8 w-8 text-purple-500" />,
      title: "Analyzing Soil Composition",
      description: "Evaluating soil pH, nutrients, and organic matter content..."
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: "Generating Growth Analysis",
      description: "Creating optimal growth potential timeline..."
    }
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        setTimeout(onComplete, 1000);
        return prev;
      });
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(progressInterval);
        return prev;
      });
    }, 80);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Analyzing Your Lawn Data
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're processing real environmental data to create your personalized plan
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Analysis Steps */}
            <div className="space-y-6">
              {analysisSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                    index === currentStep 
                      ? 'bg-green-50 border-2 border-green-200 animate-pulse' 
                      : index < currentStep 
                        ? 'bg-gray-50 opacity-60' 
                        : 'opacity-30'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index === currentStep && (
                    <div className="ml-auto">
                      <Loader2 className="h-5 w-5 text-green-600 animate-spin" />
                    </div>
                  )}
                  {index < currentStep && (
                    <div className="ml-auto">
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-sm text-gray-500">
              This process typically takes 10-15 seconds...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisAnimation;
