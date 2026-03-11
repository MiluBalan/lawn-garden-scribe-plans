import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Flower, Carrot, Apple, Sparkles } from 'lucide-react';
import gardenPlantingImage from '@/assets/garden-planting.jpg';

interface PlantTypeStepProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const plantTypes = [
  {
    value: 'flowers',
    label: 'Flowers',
    description: 'Beautiful blooms and ornamental plants',
    icon: Flower,
    gradient: 'from-pink-100 to-rose-200',
    iconColor: 'text-pink-600',
    selectedBg: 'peer-data-[state=checked]:bg-pink-50',
    selectedBorder: 'peer-data-[state=checked]:border-pink-400',
    hoverBorder: 'hover:border-pink-300',
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    description: 'Fresh produce and healthy greens',
    icon: Carrot,
    gradient: 'from-orange-100 to-amber-200',
    iconColor: 'text-orange-600',
    selectedBg: 'peer-data-[state=checked]:bg-orange-50',
    selectedBorder: 'peer-data-[state=checked]:border-orange-400',
    hoverBorder: 'hover:border-orange-300',
  },
  {
    value: 'fruits',
    label: 'Fruits',
    description: 'Delicious fruits and berry bushes',
    icon: Apple,
    gradient: 'from-red-100 to-rose-200',
    iconColor: 'text-red-600',
    selectedBg: 'peer-data-[state=checked]:bg-red-50',
    selectedBorder: 'peer-data-[state=checked]:border-red-400',
    hoverBorder: 'hover:border-red-300',
  },
];

const PlantTypeStep = ({ selectedType, onTypeChange }: PlantTypeStepProps) => {
  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-emerald-800 via-green-700 to-teal-900 overflow-hidden -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
        <div className="relative grid md:grid-cols-2 gap-0 items-center max-w-7xl mx-auto">
          <div className="space-y-6 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
              Personalized garden recommendations
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              What would you<br />
              like to <span className="italic text-emerald-200">grow</span>?
            </h1>
            <p className="text-lg text-emerald-100/90 max-w-md">
              From colorful flowers to fresh vegetables and delicious fruits, we have specialized organic solutions for every garden.
            </p>
          </div>
          <div className="hidden md:block h-full">
            <img
              src={gardenPlantingImage}
              alt="Hands planting purple flowers with gardening tools and soil"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Plant Type Selection */}
      <div className="space-y-10 max-w-7xl mx-auto mb-20">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            Select your plant type <span className="text-destructive">*</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the primary focus of your garden
          </p>
        </div>

        <RadioGroup value={selectedType} onValueChange={onTypeChange} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {plantTypes.map((plant) => {
            const Icon = plant.icon;
            return (
              <div key={plant.value} className="space-y-2">
                <RadioGroupItem value={plant.value} id={plant.value} className="peer sr-only" />
                <Label
                  htmlFor={plant.value}
                  className={`group flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer bg-card border-2 border-border shadow-[var(--shadow-card)] ${plant.selectedBg} ${plant.selectedBorder} peer-data-[state=checked]:shadow-[var(--shadow-card-selected)] ${plant.hoverBorder} hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 p-10`}
                >
                  <div className={`w-24 h-24 bg-gradient-to-br ${plant.gradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className={`h-12 w-12 ${plant.iconColor}`} />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{plant.label}</span>
                  <span className="text-muted-foreground text-center mt-2 text-sm">{plant.description}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default PlantTypeStep;
