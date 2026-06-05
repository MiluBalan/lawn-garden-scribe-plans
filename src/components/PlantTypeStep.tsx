import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Flower, Carrot, Apple, Check, Sparkles } from 'lucide-react';

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
    gradient: 'from-pink-50 via-white to-rose-50/40',
    tile: 'from-pink-100 to-rose-200',
    iconColor: 'text-pink-600',
    accent: 'bg-pink-500',
    ring: 'peer-data-[state=checked]:ring-pink-400 peer-data-[state=checked]:border-pink-400',
  },
  {
    value: 'vegetables',
    label: 'Vegetables',
    description: 'Fresh produce and healthy greens',
    icon: Carrot,
    gradient: 'from-orange-50 via-white to-amber-50/40',
    tile: 'from-orange-100 to-amber-200',
    iconColor: 'text-orange-600',
    accent: 'bg-orange-500',
    ring: 'peer-data-[state=checked]:ring-orange-400 peer-data-[state=checked]:border-orange-400',
  },
  {
    value: 'fruits',
    label: 'Fruits',
    description: 'Delicious fruits and berry bushes',
    icon: Apple,
    gradient: 'from-red-50 via-white to-rose-50/40',
    tile: 'from-red-100 to-rose-200',
    iconColor: 'text-red-600',
    accent: 'bg-red-500',
    ring: 'peer-data-[state=checked]:ring-red-400 peer-data-[state=checked]:border-red-400',
  },
];

const PlantTypeStep = ({ selectedType, onTypeChange }: PlantTypeStepProps) => {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 py-12">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-12 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4" />
            Step 1 · Plant Type
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Select your{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              plant type
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the primary focus of your garden so we can tailor every recommendation
          </p>
        </div>
      </div>

      <RadioGroup
        value={selectedType}
        onValueChange={onTypeChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {plantTypes.map((plant) => {
          const Icon = plant.icon;
          const isSelected = selectedType === plant.value;
          return (
            <div key={plant.value} className="relative">
              <RadioGroupItem value={plant.value} id={plant.value} className="peer sr-only" />
              <Label
                htmlFor={plant.value}
                className={`group relative flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer overflow-hidden bg-gradient-to-br ${plant.gradient} border-2 border-gray-200 ring-2 ring-transparent ${plant.ring} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-10 min-h-[240px]`}
              >
                <div className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${plant.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <div className={`w-24 h-24 bg-gradient-to-br ${plant.tile} rounded-2xl flex items-center justify-center mb-5 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className={`h-12 w-12 ${plant.iconColor}`} />
                </div>
                <span className="text-2xl font-bold text-gray-900">{plant.label}</span>
                <span className="text-gray-600 text-center mt-2 text-sm">{plant.description}</span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default PlantTypeStep;
