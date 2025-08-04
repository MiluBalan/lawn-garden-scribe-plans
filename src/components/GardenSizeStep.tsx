import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Square, SquareCheck, SquareCheckBig } from 'lucide-react';

interface GardenSizeStepProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

const GardenSizeStep = ({ selectedSize, onSizeChange }: GardenSizeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          How big is your garden?
        </h2>
        <p className="text-gray-600">
          This helps us recommend the right amount of products
        </p>
      </div>

      <RadioGroup value={selectedSize} onValueChange={onSizeChange} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <RadioGroupItem value="extra-small" id="extra-small" className="peer sr-only" />
          <Label
            htmlFor="extra-small"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Square className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Extra Small</span>
              <span className="text-sm text-gray-500 text-center px-4">Container gardens, small raised beds</span>
              <span className="text-xs text-gray-400 mt-1">Under 25 sq ft</span>
            </Card>
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="small-medium" id="small-medium" className="peer sr-only" />
          <Label
            htmlFor="small-medium"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <SquareCheck className="h-7 w-7 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Small to Medium</span>
              <span className="text-sm text-gray-500 text-center px-4">Backyard garden beds</span>
              <span className="text-xs text-gray-400 mt-1">25-200 sq ft</span>
            </Card>
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="large" id="large" className="peer sr-only" />
          <Label
            htmlFor="large"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <SquareCheckBig className="h-8 w-8 text-purple-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Large</span>
              <span className="text-sm text-gray-500 text-center px-4">Extensive gardens, multiple beds</span>
              <span className="text-xs text-gray-400 mt-1">200+ sq ft</span>
            </Card>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default GardenSizeStep;