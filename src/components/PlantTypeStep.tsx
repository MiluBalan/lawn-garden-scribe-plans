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
    <div className="space-y-10 max-w-7xl mx-auto py-16 mb-20">
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
  );
};

export default PlantTypeStep;
