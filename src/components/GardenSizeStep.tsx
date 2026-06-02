import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sprout, Trees, TreePine, Mountain } from 'lucide-react';
import farmlandImage from '@/assets/gradenSize.jpg';
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

const sizeColors: Record<string, { bg: string; icon: string; checked: string; border: string }> = {
  small: { bg: 'bg-blue-100', icon: 'text-blue-600', checked: 'peer-data-[state=checked]:bg-blue-50', border: 'peer-data-[state=checked]:border-blue-200' },
  medium: { bg: 'bg-green-100', icon: 'text-green-600', checked: 'peer-data-[state=checked]:bg-green-50', border: 'peer-data-[state=checked]:border-green-200' },
  large: { bg: 'bg-orange-100', icon: 'text-orange-600', checked: 'peer-data-[state=checked]:bg-orange-50', border: 'peer-data-[state=checked]:border-orange-200' },
  xlarge: { bg: 'bg-purple-100', icon: 'text-purple-600', checked: 'peer-data-[state=checked]:bg-purple-50', border: 'peer-data-[state=checked]:border-purple-200' },
};

const GardenSizeStep = ({ selectedSize, onSizeChange }: GardenSizeStepProps) => {
  return (
    <div className="space-y-16 px-4">
      {/* Banner Section */}
      <div className="bg-background rounded-2xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Choose Your Garden Size
            </h1>
            <p className="text-xl text-gray-700">
              Understanding your garden size helps us recommend the right amount of products for optimal results.
            </p>
            <p className="text-gray-600">
              Select your garden size from the options below to get the perfect plan.
            </p>
          </div>
          <div className="rounded-lg h-full overflow-hidden">
            <img 
              src={farmlandImage} 
              alt="Aerial view of green farmland with red tractor spraying crops across vast agricultural fields" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="space-y-12 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            How big is your garden? <span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Select the size that best matches your garden
          </p>
        </div>

        <RadioGroup value={selectedSize} onValueChange={onSizeChange} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {GARDEN_SIZE_OPTIONS.map((option) => {
            const Icon = sizeIcons[option.icon] || Sprout;
            const colors = sizeColors[option.icon] || sizeColors.small;
            return (
              <div key={option.value} className="space-y-2">
                <RadioGroupItem value={option.value} id={option.value} className="peer sr-only" />
                <Label
                  htmlFor={option.value}
                  className={`flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer bg-card border border-border shadow-[var(--shadow-card)] ${colors.checked} ${colors.border} peer-data-[state=checked]:shadow-[var(--shadow-card-selected)] hover:bg-gray-50 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200 p-6`}
                >
                  <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-3`}>
                    <Icon className={`h-8 w-8 ${colors.icon}`} />
                  </div>
                  <span className="text-lg font-semibold text-gray-900 text-center">{option.label}</span>
                  <span className="text-gray-500 text-center text-sm mt-1">{option.description}</span>
                  <span className="text-gray-400 text-xs mt-1">{option.detail}</span>
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