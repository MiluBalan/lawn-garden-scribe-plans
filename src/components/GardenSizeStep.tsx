import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sprout, Trees, TreePine } from 'lucide-react';

interface GardenSizeStepProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

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
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Gardener Image Placeholder</span>
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

        <RadioGroup value={selectedSize} onValueChange={onSizeChange} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="space-y-2">
            <RadioGroupItem value="extra-small" id="extra-small" className="peer sr-only" />
            <Label
              htmlFor="extra-small"
              className="flex flex-col items-center justify-center w-full h-48 rounded-2xl cursor-pointer bg-card border border-border shadow-[var(--shadow-card)] peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:border-blue-200 peer-data-[state=checked]:shadow-[var(--shadow-card-selected)] hover:bg-gray-50 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Sprout className="h-10 w-10 text-blue-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Extra Small</span>
                <span className="text-gray-500 text-center mt-2">Container gardens, small planters</span>
                <span className="text-sm text-gray-400 mt-1">Less than 50 sq ft</span>
              </div>
            </Label>
          </div>

          <div className="space-y-2">
            <RadioGroupItem value="small-medium" id="small-medium" className="peer sr-only" />
            <Label
              htmlFor="small-medium"
              className="flex flex-col items-center justify-center w-full h-48 rounded-2xl cursor-pointer bg-card border border-border shadow-[var(--shadow-card)] peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:border-green-200 peer-data-[state=checked]:shadow-[var(--shadow-card-selected)] hover:bg-gray-50 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Trees className="h-10 w-10 text-green-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Small to Medium</span>
                <span className="text-gray-500 text-center mt-2">Raised beds, small garden plots</span>
                <span className="text-sm text-gray-400 mt-1">50-500 sq ft</span>
              </div>
            </Label>
          </div>

          <div className="space-y-2">
            <RadioGroupItem value="large" id="large" className="peer sr-only" />
            <Label
              htmlFor="large"
              className="flex flex-col items-center justify-center w-full h-48 rounded-2xl cursor-pointer bg-card border border-border shadow-[var(--shadow-card)] peer-data-[state=checked]:bg-orange-50 peer-data-[state=checked]:border-orange-200 peer-data-[state=checked]:shadow-[var(--shadow-card-selected)] hover:bg-gray-50 hover:shadow-[var(--shadow-card-hover)] transition-all duration-200"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <TreePine className="h-10 w-10 text-orange-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Large</span>
                <span className="text-gray-500 text-center mt-2">Extensive gardens, multiple plots</span>
                <span className="text-sm text-gray-400 mt-1">500+ sq ft</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default GardenSizeStep;