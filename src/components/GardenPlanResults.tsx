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
  ListChecks,
  Beaker,
  Shovel,
  Layers,
  MapPin,
} from 'lucide-react';
import GardenSubscriptionPlans from './GardenSubscriptionPlans';
import WeatherAndGrowthCharts from './WeatherAndGrowthCharts';
import SoilAnalysisCard from './SoilAnalysisCard';
import DataSourceNotice from './DataSourceNotice';
import { useWeatherData } from '../hooks/useWeatherData';
import { useSoilData } from '../hooks/useSoilData';
import {
  SETUP_LABELS,
  PLANT_TYPE_LABELS,
  VARIETY_LABELS,
  STAGE_LABELS,
  SUNLIGHT_LABELS,
  SOIL_LABELS,
  label,
  getStageActions,
  getFeedingPlan,
  getGardenRecommendationGroups,
} from '@/lib/gardenReport';

const RECOMMENDATION_THEMES: Record<string, { icon: typeof Leaf; tile: string; color: string }> = {
  plants: { icon: Sprout, tile: 'from-emerald-50 to-green-100', color: 'text-emerald-700' },
  setup: { icon: Shovel, tile: 'from-amber-50 to-orange-100', color: 'text-amber-700' },
  light: { icon: Sun, tile: 'from-yellow-50 to-amber-100', color: 'text-yellow-700' },
  soil: { icon: Layers, tile: 'from-cyan-50 to-sky-100', color: 'text-cyan-700' },
};

interface GardenData {
  planType: string;
  plantType: string;
  gardenSize: string;
  location: string;
  growingSetup?: string;
  gardenStage?: string;
  sunlight?: string;
  soilType?: string;
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
  const { soilData, error: soilError } = useSoilData(gardenData.location, gardenData.plantType);

  if (showPlans) {
    return <GardenSubscriptionPlans gardenData={gardenData} onBack={() => setShowPlans(false)} />;
  }

  const stageActions = getStageActions(gardenData);
  const feeding = getFeedingPlan(gardenData);
  const recommendationGroups = getGardenRecommendationGroups(gardenData, soilData?.properties.pH);

  const summaryItems = [
    {
      label: 'Growing Setup',
      value: label(SETUP_LABELS, gardenData.growingSetup),
      icon: Shovel,
      tile: 'from-amber-100 to-orange-200',
      color: 'text-amber-700',
      ring: 'hover:ring-amber-300',
    },
    {
      label: 'Plant Type',
      value: label(PLANT_TYPE_LABELS, gardenData.plantType),
      icon: Sprout,
      tile: 'from-emerald-100 to-green-200',
      color: 'text-emerald-700',
      ring: 'hover:ring-emerald-300',
    },
    {
      label: 'Variety',
      value: label(VARIETY_LABELS, gardenData.plantSubtype),
      icon: Flower,
      tile: 'from-rose-100 to-pink-200',
      color: 'text-rose-700',
      ring: 'hover:ring-rose-300',
    },
    {
      label: 'Garden Stage',
      value: label(STAGE_LABELS, gardenData.gardenStage),
      icon: Leaf,
      tile: 'from-lime-100 to-emerald-200',
      color: 'text-lime-700',
      ring: 'hover:ring-lime-300',
    },
    {
      label: 'Sunlight',
      value: label(SUNLIGHT_LABELS, gardenData.sunlight),
      icon: Sun,
      tile: 'from-yellow-100 to-amber-200',
      color: 'text-yellow-700',
      ring: 'hover:ring-yellow-300',
    },
    {
      label: 'Growing Medium',
      value: label(SOIL_LABELS, gardenData.soilType),
      icon: Layers,
      tile: 'from-cyan-100 to-sky-200',
      color: 'text-cyan-700',
      ring: 'hover:ring-cyan-300',
    },
    {
      label: 'Location',
      value: gardenData.location || '—',
      icon: MapPin,
      tile: 'from-sky-100 to-blue-200',
      color: 'text-sky-700',
      ring: 'hover:ring-sky-300',
    },
  ];

  const plantIcon =
    gardenData.plantType === 'flowers' ? <Flower className="h-5 w-5 text-pink-500" /> :
    gardenData.plantType === 'trees' ? <Leaf className="h-5 w-5 text-brand" /> :
    gardenData.plantType === 'vegetables-fruits' ? <Apple className="h-5 w-5 text-orange-500" /> :
    <Sprout className="h-5 w-5 text-brand-accent" />;

  const getSeasonalSchedule = () => {
    const type = gardenData.plantType;
    if (type === 'flowers') {
      return [
        { month: 'Early Spring', icon: <Leaf className="h-5 w-5 text-brand" />, tasks: ['Prep beds & amend with compost', 'Plant cool-season annuals', 'Apply balanced fertilizer'] },
        { month: 'Late Spring', icon: <Sun className="h-5 w-5 text-amber-500" />, tasks: ['Transplant warm-season blooms', 'Mulch to retain moisture', 'Begin deadheading regularly'] },
        { month: 'Summer', icon: <Droplets className="h-5 w-5 text-sky-500" />, tasks: ['Water deeply in early morning', 'Deadhead to extend bloom', 'Watch for aphids & mildew'] },
        { month: 'Fall', icon: <Calendar className="h-5 w-5 text-purple-500" />, tasks: ['Plant spring-blooming bulbs', 'Divide perennials', 'Cut back & mulch for winter'] },
      ];
    }
    if (type === 'trees') {
      return [
        { month: 'Early Spring', icon: <Scissors className="h-5 w-5 text-brand" />, tasks: ['Prune dead and crossing branches', 'Apply slow-release feed at the drip line', 'Refresh mulch ring, clear of trunk'] },
        { month: 'Late Spring', icon: <Sun className="h-5 w-5 text-amber-500" />, tasks: ['Deep water new plantings weekly', 'Check stakes and ties', 'Watch for early leaf pests'] },
        { month: 'Summer', icon: <Droplets className="h-5 w-5 text-sky-500" />, tasks: ['Monthly deep soaking in heat', 'Monitor for scorch and borers', 'Avoid heavy pruning'] },
        { month: 'Fall', icon: <Calendar className="h-5 w-5 text-purple-500" />, tasks: ['Final deep watering before freeze', 'Apply autumn root feed', 'Wrap young trunks for winter'] },
      ];
    }
    return [
      { month: 'Early Spring', icon: <Leaf className="h-5 w-5 text-brand" />, tasks: ['Start cool-season crops', 'Amend soil with compost', 'Direct-sow peas & greens'] },
      { month: 'Late Spring', icon: <Sun className="h-5 w-5 text-amber-500" />, tasks: ['Transplant warm-season veggies', 'Mulch to suppress weeds', 'Set up trellises & supports'] },
      { month: 'Summer', icon: <Droplets className="h-5 w-5 text-sky-500" />, tasks: ['Water 1-2 inches per week', 'Harvest frequently', 'Scout for pests & disease'] },
      { month: 'Fall', icon: <Calendar className="h-5 w-5 text-purple-500" />, tasks: ['Plant fall greens & garlic', 'Cover crop empty beds', 'Compost spent plants'] },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-green via-background to-surface-warm py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-5">
          <Button
            variant="secondary"
            onClick={onBackToSteps}
            className="bg-white border border-border hover:bg-muted text-foreground shadow-sm rounded-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Edit</span>
          </Button>
        </div>

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
                Garden Plan
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Built for {label(VARIETY_LABELS, gardenData.plantSubtype).toLowerCase()} in a{' '}
              {label(SETUP_LABELS, gardenData.growingSetup).toLowerCase()} — using your answers plus real climate and soil data
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

        {/* Garden Summary */}
        <Card className="mb-8 md:mb-12 border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl md:text-2xl">
              {plantIcon}
              <span>Garden Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {summaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`group text-center p-4 rounded-2xl bg-white border border-border/60 ring-2 ring-transparent ${item.ring} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default`}
                  >
                    <div className={`w-11 h-11 mx-auto mb-3 rounded-xl bg-gradient-to-br ${item.tile} flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <Badge variant="secondary" className="mb-2 bg-muted/60">{item.label}</Badge>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Stage-based Action Plan */}
        <Card className="mb-8 md:mb-12 border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <ListChecks className="h-5 w-5 text-brand" />
              <span>{stageActions.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {stageActions.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-surface-green border border-border/60">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-foreground/80">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feeding & Watering Plan */}
        <Card className="mb-8 md:mb-12 border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
              <Beaker className="h-5 w-5 text-brand-accent" />
              <span>Feeding &amp; Watering Plan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-surface-warm border border-border/60">
              <p className="text-sm text-brand-dark font-medium mb-1">Feeding Cadence</p>
              <p className="text-xl font-bold text-foreground">{feeding.cadence}</p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/40 border border-border/60 md:col-span-2">
              <p className="text-sm text-muted-foreground font-medium mb-1">Why this rhythm</p>
              <p className="text-foreground/80">{feeding.note}</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-green border border-border/60 md:col-span-3 flex items-start gap-3">
              <Droplets className="h-5 w-5 text-brand mt-0.5 flex-shrink-0" />
              <p className="text-foreground/80">{feeding.water}</p>
            </div>
          </CardContent>
        </Card>

        {/* Climate Charts */}
        {!weatherLoading && weatherData && (
          <WeatherAndGrowthCharts weatherData={weatherData} location={gardenData.location} />
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
        <Card className="mb-8 md:mb-12 border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-center">Seasonal Care Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {getSeasonalSchedule().map((season, index) => (
                <div key={index} className="bg-surface-green p-6 rounded-2xl border border-border/60">
                  <div className="flex items-center mb-4">
                    {season.icon}
                    <h4 className="font-semibold text-foreground ml-3">{season.month}</h4>
                  </div>
                  <ul className="space-y-2">
                    {season.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-foreground/80">
                        <div className="w-2 h-2 bg-brand rounded-full mr-3"></div>
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
        <Card className="mb-8 md:mb-12 border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl md:text-2xl">What To Do Next</CardTitle>
            <p className="text-muted-foreground mt-2">
              {recommendationGroups.reduce((n, g) => n + g.items.length, 0)} tips, grouped so you can act on one area at a time
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-5">
              {recommendationGroups.map((group) => {
                const theme = RECOMMENDATION_THEMES[group.key] ?? RECOMMENDATION_THEMES.plants;
                const Icon = theme.icon;
                return (
                  <div
                    key={group.key}
                    className="rounded-2xl border border-border/60 bg-white overflow-hidden transition-shadow hover:shadow-[var(--shadow-card)]"
                  >
                    <div className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${theme.tile}`}>
                      <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-inner flex-shrink-0">
                        <Icon className={`h-5 w-5 ${theme.color}`} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground leading-tight">{group.title}</p>
                        <p className="text-xs text-foreground/60">{group.subtitle}</p>
                      </div>
                    </div>
                    <ul className="p-5 space-y-3">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className={`h-4 w-4 mt-1 flex-shrink-0 ${theme.color}`} />
                          <span className="text-sm md:text-base text-foreground/80 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Data Source Notice */}
        <DataSourceNotice />

        {/* Bottom Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={onRestart}
            variant="secondary"
            className="bg-muted hover:bg-muted/80 text-foreground px-8 py-3 rounded-full"
          >
            Create Another Plan
          </Button>
          <div>
            <Button
              onClick={() => setShowPlans(true)}
              className="bg-brand hover:bg-brand-dark text-white px-8 py-3 text-lg rounded-full shadow-lg"
            >
              Get Your Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenPlanResults;
