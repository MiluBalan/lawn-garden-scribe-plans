import { useState } from 'react';
import { CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import LawnSummaryCard from './LawnSummaryCard';
import WeatherAndGrowthCharts from './WeatherAndGrowthCharts';
import SoilAnalysisCard from './SoilAnalysisCard';
import SeasonalScheduleCard from './SeasonalScheduleCard';
import RecommendationsCard from './RecommendationsCard';
import DataSourceNotice from './DataSourceNotice';
import LawnPlanActions from './LawnPlanActions';
import SubscriptionPlans from './SubscriptionPlans';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen bg-gradient-to-b from-surface-green via-background to-surface-warm py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-[2rem] bg-white p-8 md:p-12 shadow-[var(--shadow-card)] border border-border/60 mb-8 md:mb-12">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand rounded-full mb-5 shadow-lg ring-4 ring-brand-light">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Your Custom{' '}
              <span className="bg-gradient-to-r from-brand to-brand-accent bg-clip-text text-transparent">
                Lawn Plan
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Here's your personalized lawn care plan based on real climate and soil data
            </p>

            {(weatherError || soilError) && (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm mb-6">
                <AlertTriangle className="h-4 w-4" />
                <span>Using regional estimates — for more accuracy, get a soil test</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                onClick={() => setShowPlans(true)}
                className="bg-brand hover:bg-brand-dark text-white px-8 py-3 text-base rounded-full shadow-lg transition-transform hover:scale-[1.02]"
              >
                Get Your Products
              </Button>
              <Button
                onClick={onRestart}
                variant="outline"
                className="rounded-full px-6 py-3 border-border hover:bg-muted"
              >
                Create Another Plan
              </Button>
            </div>
          </div>
        </section>

        {/* Lawn Summary */}
        <LawnSummaryCard lawnData={lawnData} soilData={soilData} />

        {/* Weather and Growth Charts */}
        {!weatherLoading && weatherData && (
          <WeatherAndGrowthCharts weatherData={weatherData} location={lawnData.location} />
        )}

        {/* Soil Analysis */}
        {soilData && (
          <div className="mb-8 md:mb-12">
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

        {/* Data Source Notice */}
        <DataSourceNotice />

        {/* Action Buttons */}
        <LawnPlanActions onRestart={onRestart} onGetProducts={() => setShowPlans(true)} />
      </div>
    </div>
  );
};

export default LawnPlanResults;
