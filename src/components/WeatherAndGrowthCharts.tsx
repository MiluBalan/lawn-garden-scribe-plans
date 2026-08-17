import { Card, CardContent } from '@/components/ui/card';
import { CloudSun } from 'lucide-react';
import GrowthPotentialChart from './GrowthPotentialChart';
import WeatherChart from './WeatherChart';

interface WeatherAndGrowthChartsProps {
  weatherData: any;
  location: string;
}

const WeatherAndGrowthCharts = ({ weatherData, location }: WeatherAndGrowthChartsProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8 md:mb-12">
      <GrowthPotentialChart data={weatherData.growthPotential} />
      <WeatherChart
        title="Temperature"
        data={weatherData.temperature}
        color="hsl(var(--brand))"
        unit="°F"
      />
      <WeatherChart
        title="Rainfall"
        data={weatherData.rainfall}
        color="hsl(var(--brand-accent))"
        unit="inches"
      />
      <Card className="border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur h-full rounded-3xl">
        <CardContent className="p-6 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-light rounded-2xl mb-3">
              <CloudSun className="h-6 w-6 text-brand" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Climate Summary</h4>
            <p className="text-muted-foreground text-sm">
              Based on regional climate data for {location}, your lawn experiences optimal
              growing conditions in spring and fall with moderate summer stress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherAndGrowthCharts;
