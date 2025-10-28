
import { CheckCircle, AlertTriangle } from 'lucide-react';
import LawnSummaryCard from './LawnSummaryCard';
import WeatherAndGrowthCharts from './WeatherAndGrowthCharts';
import SoilAnalysisCard from './SoilAnalysisCard';
import SeasonalScheduleCard from './SeasonalScheduleCard';
import RecommendationsCard from './RecommendationsCard';
import ProductRecommendationsCard from './ProductRecommendationsCard';
import DataSourceNotice from './DataSourceNotice';
import LawnPlanActions from './LawnPlanActions';
import { useWeatherData } from '../hooks/useWeatherData';
import { useSoilData } from '../hooks/useSoilData';

interface LawnPlanResultsProps {
  lawnData: any;
  onRestart: () => void;
}

const LawnPlanResults = ({ lawnData, onRestart }: LawnPlanResultsProps) => {
  const { weatherData, loading: weatherLoading, error: weatherError } = useWeatherData(lawnData.location);
  const { soilData, loading: soilLoading, error: soilError } = useSoilData(lawnData.location, lawnData.grassType);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Custom Lawn Plan</h1>
          <p className="text-xl text-gray-600">
            Here's your personalized lawn care plan based on real climate and soil data
          </p>
          
          {/* Data Source Information */}
          <div className="mt-4 space-y-2">
            {(weatherError || soilError) && (
              <div className="flex items-center justify-center space-x-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Using regional estimates - for more accuracy, get a soil test</span>
              </div>
            )}
          </div>
        </div>

        {/* Lawn Summary */}
        <LawnSummaryCard lawnData={lawnData} soilData={soilData} />

        {/* Weather and Growth Charts */}
        {!weatherLoading && weatherData && (
          <WeatherAndGrowthCharts weatherData={weatherData} location={lawnData.location} />
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
        <SeasonalScheduleCard grassType={lawnData.grassType} />

        {/* Key Recommendations */}
        <RecommendationsCard lawnData={lawnData} />

        {/* Product Recommendations from Shopify */}
        <ProductRecommendationsCard />

        {/* Data Source Notice */}
        <DataSourceNotice />

        {/* Action Buttons */}
        <LawnPlanActions onRestart={onRestart} />
      </div>
    </div>
  );
};

export default LawnPlanResults;
