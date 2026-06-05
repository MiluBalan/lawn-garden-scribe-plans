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
    gradient: 'from-emerald-50 via-white to-emerald-50/40',
    tileBg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
    ring: 'group-hover:ring-emerald-300/60',
  },
  {
    image: featureLocation,
    title: 'Location Based',
    description: 'Climate-specific recommendations for your region',
    gradient: 'from-sky-50 via-white to-sky-50/40',
    tileBg: 'bg-gradient-to-br from-sky-100 to-sky-200',
    ring: 'group-hover:ring-sky-300/60',
  },
  {
    image: featureProblems,
    title: 'Problem Areas',
    description: 'Target weeds, pests, and disease issues effectively',
    gradient: 'from-amber-50 via-white to-amber-50/40',
    tileBg: 'bg-gradient-to-br from-amber-100 to-amber-200',
    ring: 'group-hover:ring-amber-300/60',
  },
  {
    image: featureWatering,
    title: 'Watering Schedule',
    description: 'Optimal watering times and frequency for your lawn',
    gradient: 'from-cyan-50 via-white to-cyan-50/40',
    tileBg: 'bg-gradient-to-br from-cyan-100 to-cyan-200',
    ring: 'group-hover:ring-cyan-300/60',
  },
];

const FeaturesGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className={`border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${feature.gradient} overflow-hidden group ring-2 ring-transparent ${feature.ring} rounded-2xl`}
        >
          <CardContent className="p-6 text-center">
            <div className={`w-24 h-24 mx-auto mb-5 rounded-2xl ${feature.tileBg} flex items-center justify-center p-3 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner`}>
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
