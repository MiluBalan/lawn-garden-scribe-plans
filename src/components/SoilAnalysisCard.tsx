import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beaker, Droplets } from 'lucide-react';

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
      case 'sufficient': return 'bg-green-100 text-green-800 border-green-200';
      case 'needs_more': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'optimal': return 'bg-brand-light text-brand-dark border-brand/20';
      default: return 'bg-muted text-foreground border-border';
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
    <Card className="border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
      <CardHeader>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Beaker className="h-6 w-6 text-brand" />
          <CardTitle className="text-xl md:text-2xl text-center">Predicted Soil Analysis</CardTitle>
        </div>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Every new plan comes with a free lab soil analysis. While you're waiting for your results,
          we can predict your soil health.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Soil Properties */}
        <div className="bg-surface-green/50 rounded-2xl p-6 border border-border/60">
          <h4 className="font-semibold text-foreground mb-5 flex items-center gap-2">
            <Droplets className="h-4 w-4 text-brand" />
            Projected Soil Properties
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Organic Matter</span>
                <span className="text-sm text-muted-foreground">{soilProperties.organicMatter}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-brand-accent h-2.5 rounded-full"
                  style={{ width: `${Math.min((soilProperties.organicMatter / 10) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Soil pH</span>
                <span className="text-sm text-muted-foreground">{soilProperties.pH}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-brand h-2.5 rounded-full"
                  style={{ width: `${Math.min(((soilProperties.pH - 4) / 6) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrient Levels */}
        <div>
          <h4 className="font-semibold text-foreground mb-5">Projected Nutrient Levels</h4>
          <div className="space-y-3">
            {nutrients.map((nutrient, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-surface-green/50 rounded-2xl border border-border/60">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                    style={{ backgroundColor: nutrient.color }}
                  >
                    {nutrient.letter}
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">{nutrient.name}</h5>
                    <p className="text-sm text-muted-foreground">{nutrient.description}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(nutrient.status)} border`}>
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
