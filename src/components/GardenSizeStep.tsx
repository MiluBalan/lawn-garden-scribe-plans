import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sprout, Trees, TreePine, Mountain, Check, Ruler } from 'lucide-react';
import gardenSizeHero from '@/assets/gardenSizeHero.jpg';
import { GARDEN_SIZE_OPTIONS } from '@/lib/garden';

interface GardenSizeStepProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const sizeIcons: Record<string, React.ElementType> = {
  small: Sprout,
  medium: Trees,
  large: TreePine,
  xlarge: Mountain,
};

const sizeStyles: Record<
  string,
  { gradient: string; iconBg: string; iconColor: string; ring: string; accent: string }
> = {
  small: {
    gradient: 'from-sky-50 via-white to-sky-50/40',
    iconBg: 'bg-gradient-to-br from-sky-100 to-sky-200',
    iconColor: 'text-sky-700',
    ring: 'peer-data-[state=checked]:ring-sky-400 peer-data-[state=checked]:border-sky-400',
    accent: 'bg-sky-500',
  },
  medium: {
    gradient: 'from-emerald-50 via-white to-emerald-50/40',
    iconBg: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
    iconColor: 'text-emerald-700',
    ring: 'peer-data-[state=checked]:ring-emerald-400 peer-data-[state=checked]:border-emerald-400',
    accent: 'bg-emerald-500',
  },
  large: {
    gradient: 'from-amber-50 via-white to-amber-50/40',
    iconBg: 'bg-gradient-to-br from-amber-100 to-amber-200',
    iconColor: 'text-amber-700',
    ring: 'peer-data-[state=checked]:ring-amber-400 peer-data-[state=checked]:border-amber-400',
    accent: 'bg-amber-500',
  },
  xlarge: {
    gradient: 'from-violet-50 via-white to-violet-50/40',
    iconBg: 'bg-gradient-to-br from-violet-100 to-violet-200',
    iconColor: 'text-violet-700',
    ring: 'peer-data-[state=checked]:ring-violet-400 peer-data-[state=checked]:border-violet-400',
    accent: 'bg-violet-500',
  },
};

const GardenSizeStep = ({ selectedSize, onSizeChange }: GardenSizeStepProps) => {
  return (
    <div className="space-y-16 px-4">
      {/* Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-12 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
              <Ruler className="h-4 w-4" />
              Step 2 · Garden Size
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                Garden Size
              </span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Understanding your garden size helps us recommend the right amount of products for the healthiest, most beautiful results.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-sky-400 border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-violet-400 border-2 border-white" />
              </div>
              <span className="text-sm text-gray-600">Tailored for every plot size</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-amber-400/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 aspect-square">
              <img
                src={gardenSizeHero}
                alt="Overhead view of a vibrant garden with diverse plants, flowers and vegetables in neat beds"
                className="w-full h-full object-cover"
                width={1024}
                height={1024}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-10 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How big is your garden? <span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Select the size that best matches your space
          </p>
        </div>

        <RadioGroup
          value={selectedSize}
          onValueChange={onSizeChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {GARDEN_SIZE_OPTIONS.map((option) => {
            const Icon = sizeIcons[option.icon] || Sprout;
            const style = sizeStyles[option.icon] || sizeStyles.small;
            const isSelected = selectedSize === option.value;
            return (
              <div key={option.value} className="relative">
                <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                <Label
                  htmlFor={option.value}
                  className={`group relative flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer overflow-hidden bg-gradient-to-br ${style.gradient} border-2 border-gray-200 ring-2 ring-transparent ${style.ring} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 min-h-[220px]`}
                >
                  {/* Check badge */}
                  <div
                    className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected ? `${style.accent} scale-100 opacity-100` : 'scale-0 opacity-0'
                    }`}
                  >
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>

                  <div
                    className={`w-20 h-20 ${style.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                  >
                    <Icon className={`h-10 w-10 ${style.iconColor}`} />
                  </div>
                  <span className="text-xl font-bold text-gray-900 text-center">{option.label}</span>
                  <span className="text-gray-600 text-center text-sm mt-1.5">{option.description}</span>
                  <span className="text-gray-500 text-xs mt-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur border border-gray-200/60">
                    {option.detail}
                  </span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default GardenSizeStep;
