import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Droplets, Sun, Package, ArrowLeft } from 'lucide-react';

interface GardenData {
  planType: string;
  plantType: string;
  gardenSize: string;
  location: string;
}

interface GardenPlanResultsProps {
  gardenData: GardenData;
  onBack: () => void;
  onRestart: () => void;
}

const GardenPlanResults = ({ gardenData, onBack, onRestart }: GardenPlanResultsProps) => {
  const getProductRecommendations = () => {
    const baseProducts = [
      {
        name: "Vivid Liquid Organic Plant Vitamin for Flowers & Lawns",
        description: "Perfect for flowering plants and ornamental gardens",
        price: "$24.99",
        suitable: gardenData.plantType === 'flowers',
        features: ["Promotes vibrant blooms", "Organic formula", "Easy application"]
      },
      {
        name: "Catalyst Liquid Organic Plant Vitamin for Veggies & Fruits",
        description: "Specialized nutrition for edible plants",
        price: "$26.99",
        suitable: gardenData.plantType === 'vegetables' || gardenData.plantType === 'fruits',
        features: ["Boosts yield", "Safe for edibles", "Rich in micronutrients"]
      },
      {
        name: "Thrive Liquid Organic Plant Vitamin for Cannabis",
        description: "Premium formula for specialized growing",
        price: "$29.99",
        suitable: false, // Not recommending for general garden use
        features: ["High potency", "Organic certified", "Professional grade"]
      }
    ];

    return baseProducts.filter(product => product.suitable || gardenData.plantType === 'vegetables');
  };

  const recommendations = getProductRecommendations();

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
            variant="outline"
            onClick={onBack}
            className="mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Results</span>
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
                  <p className="font-medium">{gardenData.gardenSize.replace('-', ' ')}</p>
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

          {/* Product Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span>Recommended Products</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {recommendations.map((product, index) => (
                  <div key={index} className="border rounded-lg p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">{product.price}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRestart}
              variant="outline"
              className="px-8 py-3"
            >
              Create Another Plan
            </Button>
            <Button 
              className="px-8 py-3 bg-green-600 hover:bg-green-700"
            >
              Save My Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenPlanResults;