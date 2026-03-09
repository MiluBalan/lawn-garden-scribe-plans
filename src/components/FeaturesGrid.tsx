import { Card, CardContent } from '@/components/ui/card';
import featureGrass from '@/assets/feature-grass-type.png';
import featureLocation from '@/assets/feature-location.png';
import featureProblems from '@/assets/feature-problems.png';
import featureWatering from '@/assets/feature-watering.png';

const features = [
  {
    image: featureGrass,
    title: 'Grass Type Analysis',
    description: 'Identify your grass type for targeted care recommendations',
    bg: 'bg-surface-green',
  },
  {
    image: featureLocation,
    title: 'Location Based',
    description: 'Climate-specific recommendations for your region',
    bg: 'bg-blue-50',
  },
  {
    image: featureProblems,
    title: 'Problem Areas',
    description: 'Target weeds, pests, and disease issues effectively',
    bg: 'bg-orange-50',
  },
  {
    image: featureWatering,
    title: 'Watering Schedule',
    description: 'Optimal watering times and frequency for your lawn',
    bg: 'bg-sky-50',
  },
];

const FeaturesGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card overflow-hidden group"
        >
          <CardContent className="p-6 text-center">
            <div className={`w-24 h-24 mx-auto mb-5 rounded-2xl ${feature.bg} flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300`}>
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturesGrid;
