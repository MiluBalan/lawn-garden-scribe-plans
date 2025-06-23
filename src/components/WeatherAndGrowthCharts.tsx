
import { Card, CardContent } from '@/components/ui/card';
import GrowthPotentialChart from './GrowthPotentialChart';
import WeatherChart from './WeatherChart';

interface WeatherAndGrowthChartsProps {
  weatherData: any;
  location: string;
}

const WeatherAndGrowthCharts = ({ weatherData, location }: WeatherAndGrowthChartsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <GrowthPotentialChart data={weatherData.growthPotential} />
      <WeatherChart
        title="Temperature"
        data={weatherData.temperature}
        color="#dc2626"
        unit="°F"
      />
      <WeatherChart
        title="Rainfall"
        data={weatherData.rainfall}
        color="#0ea5e9"
        unit="inches"
      />
      <div className="md:col-span-1">
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur h-full">
          <CardContent className="p-6 flex items-center justify-center">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Climate Summary</h4>
              <p className="text-gray-600 text-sm">
                Based on regional climate data for {location}, your lawn experiences optimal 
                growing conditions in spring and fall with moderate summer stress.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherAndGrowthCharts;
