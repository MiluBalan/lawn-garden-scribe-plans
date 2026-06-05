
import { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import LawnSummaryCard from './LawnSummaryCard';
import WeatherAndGrowthCharts from './WeatherAndGrowthCharts';
import SoilAnalysisCard from './SoilAnalysisCard';
import SeasonalScheduleCard from './SeasonalScheduleCard';
import RecommendationsCard from './RecommendationsCard';
import DataSourceNotice from './DataSourceNotice';
import LawnPlanActions from './LawnPlanActions';
import SubscriptionPlans from './SubscriptionPlans';
import { useWeatherData } from '../hooks/useWeatherData';
import { useSoilData } from '../hooks/useSoilData';

interface LawnPlanResultsProps {
  lawnData: any;
  onRestart: () => void;
}

const LawnPlanResults = ({ lawnData, onRestart }: LawnPlanResultsProps) => {
  const [showPlans, setShowPlans] = useState(false);
  const { weatherData, loading: weatherLoading, error: weatherError } = useWeatherData(lawnData.location);
  const { soilData, loading: soilLoading, error: soilError } = useSoilData(lawnData.location, lawnData.grassType);

  if (showPlans) {
    return <SubscriptionPlans lawnData={lawnData} onBack={() => setShowPlans(false)} onRestart={onRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-amber-50/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-12 shadow-sm border border-emerald-100/60 mb-8">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mb-4 shadow-lg ring-4 ring-white">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Custom{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                Lawn Plan
              </span>
            </h1>
            <p className="text-xl text-gray-700">
              Here's your personalized lawn care plan based on real climate and soil data
            </p>
            {(weatherError || soilError) && (
              <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Using regional estimates - for more accuracy, get a soil test</span>
              </div>
            )}
          </div>
        </div>

        {/* Lawn Summary */}
        <LawnSummaryCard lawnData={lawnData} soilData={soilData} />

        {/* Weather and Growth Charts */}
        {!weatherLoading && weatherData &&
        <WeatherAndGrowthCharts weatherData={weatherData} location={lawnData.location} />
        }

        {/* Soil Analysis */}
        {soilData &&
        <div className="mb-8">
            <SoilAnalysisCard
            nutrients={soilData.nutrients}
            soilProperties={soilData.properties} />
          
          </div>
        }

        {/* Seasonal Schedule */}
        <SeasonalScheduleCard grassType={lawnData.grassType} />

        {/* Key Recommendations */}
        <RecommendationsCard lawnData={lawnData} />

        {/* Data Source Notice */}
        <DataSourceNotice />

        {/* Action Buttons */}
        <LawnPlanActions onRestart={onRestart} onGetProducts={() => setShowPlans(true)} />
      </div>
    </div>);

};

export default LawnPlanResults;