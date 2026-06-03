import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Leaf,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Droplets,
  Scissors,
  Sun,
  Flower,
  Apple,
  Sprout,
} from 'lucide-react';
import GardenSubscriptionPlans from './GardenSubscriptionPlans';
import WeatherAndGrowthCharts from './WeatherAndGrowthCharts';
import SoilAnalysisCard from './SoilAnalysisCard';
import DataSourceNotice from './DataSourceNotice';
import { useWeatherData } from '../hooks/useWeatherData';
import { useSoilData } from '../hooks/useSoilData';
import { GARDEN_SIZE_DISPLAY } from '@/lib/garden';

interface GardenData {
  planType: string;
  plantType: string;
  gardenSize: string;
  location: string;
  growthStage?: string;
  plantingSeason?: string;
  plantSubtype?: string;
  plantSpacing?: string;
  plantGoal?: string;
  plantIssues?: string;
}

interface GardenPlanResultsProps {
  gardenData: GardenData;
  onBackToSteps: () => void;
  onRestart: () => void;
}

const GardenPlanResults = ({ gardenData, onBackToSteps, onRestart }: GardenPlanResultsProps) => {
  const [showPlans, setShowPlans] = useState(false);
  const { weatherData, loading: weatherLoading, error: weatherError } = useWeatherData(gardenData.location);
  // Reuse soil hook; pass plantType as the "grass" key (it only affects nutrient tuning)
  const { soilData, error: soilError } = useSoilData(gardenData.location, gardenData.plantType);

  if (showPlans) {
    return <GardenSubscriptionPlans gardenData={gardenData} onBack={() => setShowPlans(false)} />;
  }

  const plantIcon =
    gardenData.plantType === 'flowers' ? <Flower className="h-5 w-5 text-pink-600" /> :
    gardenData.plantType === 'fruits' ? <Apple className="h-5 w-5 text-red-600" /> :
    <Sprout className="h-5 w-5 text-green-600" />;

  const getSeasonalSchedule = () => {
    const type = gardenData.plantType;
    if (type === 'flowers') {
      return [
        { month: 'Early Spring', icon: <Leaf className="h-5 w-5 text-green-600" />, tasks: ['Prep beds & amend with compost', 'Plant cool-season annuals', 'Apply balanced fertilizer'] },
        { month: 'Late Spring', icon: <Sun className="h-5 w-5 text-yellow-600" />, tasks: ['Transplant warm-season blooms', 'Mulch to retain moisture', 'Begin deadheading regularly'] },
        { month: 'Summer', icon: <Droplets className="h-5 w-5 text-blue-600" />, tasks: ['Water deeply in early morning', 'Deadhead to extend bloom', 'Watch for aphids & mildew'] },
        { month: 'Fall', icon: <Calendar className="h-5 w-5 text-purple-600" />, tasks: ['Plant spring-blooming bulbs', 'Divide perennials', 'Cut back & mulch for winter'] },
      ];
    }
    if (type === 'fruits') {
      return [
        { month: 'Early Spring', icon: <Scissors className="h-5 w-5 text-green-600" />, tasks: ['Prune fruit trees & canes', 'Apply dormant oil spray', 'Top-dress with compost'] },
        { month: 'Late Spring', icon: <Sun className="h-5 w-5 text-yellow-600" />, tasks: ['Thin young fruit for size', 'Mulch around root zones', 'Install pollinator-friendly plants'] },
        { month: 'Summer', icon: <Droplets className="h-5 w-5 text-blue-600" />, tasks: ['Deep weekly watering', 'Monitor for fruit pests', 'Harvest as fruit ripens'] },
        { month: 'Fall', icon: <Calendar className="h-5 w-5 text-purple-600" />, tasks: ['Clean up fallen fruit', 'Apply autumn fertilizer', 'Wrap trunks for winter'] },
      ];
    }
    return [
      { month: 'Early Spring', icon: <Leaf className="h-5 w-5 text-green-600" />, tasks: ['Start cool-season crops', 'Amend soil with compost', 'Direct-sow peas & greens'] },
      { month: 'Late Spring', icon: <Sun className="h-5 w-5 text-yellow-600" />, tasks: ['Transplant warm-season veggies', 'Mulch to suppress weeds', 'Set up trellises & supports'] },
      { month: 'Summer', icon: <Droplets className="h-5 w-5 text-blue-600" />, tasks: ['Water 1-2 inches per week', 'Harvest frequently', 'Scout for pests & disease'] },
      { month: 'Fall', icon: <Calendar className="h-5 w-5 text-purple-600" />, tasks: ['Plant fall greens & garlic', 'Cover crop empty beds', 'Compost spent plants'] },
    ];
  };

  const getRecommendations = () => {
    const recs: string[] = [];
    const type = gardenData.plantType;

    if (type === 'flowers') {
      recs.push('Use a balanced bloom-boosting fertilizer (10-10-10) every 4-6 weeks');
      recs.push('Deadhead regularly to extend the blooming season');
    } else if (type === 'vegetables') {
      recs.push('Rotate crop families each season to prevent soil-borne disease');
      recs.push('Side-dress heavy feeders (tomatoes, squash) mid-season');
    } else if (type === 'fruits') {
      recs.push('Most fruiting plants need 6-8 hours of direct sun for best yields');
      recs.push('Prune annually for airflow and larger, healthier fruit');
    }

    if (soilData?.properties.pH && soilData.properties.pH < 6) {
      recs.push('Soil is acidic — add lime to bring pH closer to neutral');
    } else if (soilData?.properties.pH && soilData.properties.pH > 7.3) {
      recs.push('Soil is alkaline — incorporate sulfur or peat to lower pH');
    }

    if (gardenData.plantIssues && gardenData.plantIssues !== 'none') {
      const issueMap: Record<string, string> = {
        pests: 'Use integrated pest management — neem oil and beneficial insects',
        disease: 'Improve airflow and water at the base to reduce fungal pressure',
        weather: 'Add row covers or shade cloth to buffer extreme conditions',
        nutrients: 'Get a soil test and apply targeted amendments',
      };
      if (issueMap[gardenData.plantIssues]) recs.push(issueMap[gardenData.plantIssues]);
    }

    recs.push(`Mulch 2-3 inches around plants to retain moisture and regulate soil temperature`);
    return recs;
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={onBackToSteps}
            className="mb-4 bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Edit</span>
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Custom Garden Plan
          </h1>
          <p className="text-xl text-gray-600">
            Personalized for your {gardenData.plantType} garden based on real climate and soil data
          </p>
          {(weatherError || soilError) && (
            <div className="mt-4 flex items-center justify-center space-x-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Using regional estimates — for more accuracy, get a soil test</span>
            </div>
          )}
        </div>

        {/* Garden Summary */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {plantIcon}
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

        {/* Climate Charts */}
        {!weatherLoading && weatherData && (
          <WeatherAndGrowthCharts weatherData={weatherData} location={gardenData.location} />
        )}

        {/* Soil Analysis */}
        {soilData && (
          <div className="mb-8">
            <SoilAnalysisCard
              nutrients={soilData.nutrients}
              soilProperties={soilData.properties}
            />
          </div>
        )}

        {/* Seasonal Schedule */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Seasonal Care Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {getSeasonalSchedule().map((season, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    {season.icon}
                    <h4 className="font-semibold text-gray-900 ml-3">{season.month}</h4>
                  </div>
                  <ul className="space-y-2">
                    {season.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Recommendations */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Key Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {getRecommendations().map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Source Notice */}
        <DataSourceNotice />

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={onRestart}
            variant="secondary"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3"
          >
            Create Another Plan
          </Button>
          <div>
            <Button
              onClick={() => setShowPlans(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg"
            >
              Show Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenPlanResults;
