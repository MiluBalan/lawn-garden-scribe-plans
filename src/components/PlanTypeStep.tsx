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
    <div className="space-y-16 px-4">
      {/* Banner Section */}
      <div className="bg-background rounded-2xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-green-600">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-gray-700">
              Whether you want a lush green lawn or a thriving garden, we have the perfect organic solution for you.
            </p>
            <p className="text-gray-600">
              Select your plan type below to get started with your personalized care program.
            </p>
          </div>
          <div className="rounded-lg h-full overflow-hidden">
            <img 
              src="/lovable-uploads/db85985e-15ff-4e59-ae15-aabef79078ef.png" 
              alt="Professional lawn care specialist applying BioGrowth organic treatment" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-12 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            What can we help with?
          </h2>
          <p className="text-gray-600 text-lg">
            Select the type of plan you'd like to create
          </p>
        </div>

        <RadioGroup value={selectedType} onValueChange={onTypeChange} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-2">
            <RadioGroupItem value="lawn" id="lawn" className="peer sr-only" />
            <Label
              htmlFor="lawn"
              className="flex flex-col items-center justify-center w-full h-40 rounded-2xl cursor-pointer bg-white peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-10 w-10 text-green-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Lawn</span>
                <span className="text-gray-500 text-center mt-2">Get a custom lawn care plan</span>
              </div>
            </Label>
          </div>

          <div className="space-y-2">
            <RadioGroupItem value="garden" id="garden" className="peer sr-only" />
            <Label
              htmlFor="garden"
              className="flex flex-col items-center justify-center w-full h-40 rounded-2xl cursor-pointer bg-white peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Sprout className="h-10 w-10 text-green-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Garden</span>
                <span className="text-gray-500 text-center mt-2">Get a custom garden plan</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PlanTypeStep;