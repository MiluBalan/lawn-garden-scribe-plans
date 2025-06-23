
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface NutrientLevel {
  name: string;
  level: number;
  status: 'sufficient' | 'needs_more' | 'optimal';
  description: string;
  letter: string;
  color: string;
}

interface SoilAnalysisCardProps {
  nutrients: NutrientLevel[];
  soilProperties: {
    organicMatter: number;
    pH: number;
  };
}

const SoilAnalysisCard = ({ nutrients, soilProperties }: SoilAnalysisCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sufficient': return 'bg-green-100 text-green-800';
      case 'needs_more': return 'bg-orange-100 text-orange-800';
      case 'optimal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'sufficient': return 'Soil is likely sufficient';
      case 'needs_more': return 'Likely needs more nutrients';
      case 'optimal': return 'Optimal level';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Predicted Soil Analysis</CardTitle>
        <p className="text-gray-600 text-center">
          Every new plan comes with a free lab soil analysis. While you're waiting for your results, 
          we can predict your soil health.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Soil Properties */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Projected Soil Properties</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Organic Matter</span>
                <span className="text-sm text-gray-600">{soilProperties.organicMatter}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${(soilProperties.organicMatter / 10) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Soil pH</span>
                <span className="text-sm text-gray-600">{soilProperties.pH}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${((soilProperties.pH - 4) / 6) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrient Levels */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Projected Nutrient Levels</h4>
          <div className="space-y-4">
            {nutrients.map((nutrient, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: nutrient.color }}
                  >
                    {nutrient.letter}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{nutrient.name}</h5>
                    <p className="text-sm text-gray-600">{nutrient.description}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(nutrient.status)}>
                  {getStatusText(nutrient.status)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilAnalysisCard;
