import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Leaf, Sprout } from 'lucide-react';

interface PlanTypeStepProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const PlanTypeStep = ({ selectedType, onTypeChange }: PlanTypeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          What can we help with?
        </h2>
        <p className="text-gray-600">
          Select the type of plan you'd like to create
        </p>
      </div>

      <RadioGroup value={selectedType} onValueChange={onTypeChange} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <RadioGroupItem value="lawn" id="lawn" className="peer sr-only" />
          <Label
            htmlFor="lawn"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Lawn</span>
              <span className="text-sm text-gray-500 text-center">Get a custom lawn care plan</span>
            </Card>
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="garden" id="garden" className="peer sr-only" />
          <Label
            htmlFor="garden"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Garden</span>
              <span className="text-sm text-gray-500 text-center">Get a custom garden plan</span>
            </Card>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PlanTypeStep;