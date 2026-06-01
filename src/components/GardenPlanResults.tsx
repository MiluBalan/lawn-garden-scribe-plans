import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Sun, ArrowLeft } from 'lucide-react';
import GardenSubscriptionPlans from './GardenSubscriptionPlans';
import { GARDEN_SIZE_DISPLAY } from '@/lib/garden';

interface GardenData {
  planType: string;
  plantType: string;
  gardenSize: string;
  location: string;
}

interface GardenPlanResultsProps {
  gardenData: GardenData;
  onBackToSteps: () => void;
  onRestart: () => void;
}

const GardenPlanResults = ({ gardenData, onBackToSteps, onRestart }: GardenPlanResultsProps) => {
  const [showPlans, setShowPlans] = useState(false);

  if (showPlans) {
    return <GardenSubscriptionPlans gardenData={gardenData} onBack={() => setShowPlans(false)} />;
  }



  const getGardenTips = () => {
    switch (gardenData.plantType) {
      case 'flowers':
        return [
          "Plant in well-draining soil with 6+ hours of sunlight",
          "Deadhead spent blooms to encourage more flowers",
          "Water early morning to prevent fungal diseases"
        ];
      case 'vegetables':
        return [
          "Rotate crops each season to maintain soil health",
          "Companion plant to maximize space and deter pests",
          "Harvest regularly to encourage continued production"
        ];
      case 'fruits':
        return [
          "Most fruit plants need full sun (6-8 hours daily)",
          "Prune annually for better air circulation",
          "Mulch around plants to retain moisture"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="secondary"
            onClick={onBackToSteps}
            className="mb-4 bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Edit</span>
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Custom Garden Plan
            </h1>
            <p className="text-gray-600 text-lg">
              Based on your {gardenData.plantType} garden in {gardenData.location}
            </p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Garden Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <span>Garden Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Plant Type</Badge>
                  <p className="font-medium capitalize">{gardenData.plantType}</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Garden Size</Badge>
                  <p className="font-medium">{GARDEN_SIZE_DISPLAY[gardenData.gardenSize] || gardenData.gardenSize.replace('-', ' ')}</p>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Location</Badge>
                  <p className="font-medium">{gardenData.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Care Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-yellow-600" />
                <span>Essential Care Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {getGardenTips().map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onRestart}
                variant="secondary"
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Create Another Plan
              </Button>
              <Button 
                onClick={() => setShowPlans(true)}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl shadow-lg"
              >
                Show Products
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              Ready to nurture your garden? Get the recommended products delivered to your door.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenPlanResults;