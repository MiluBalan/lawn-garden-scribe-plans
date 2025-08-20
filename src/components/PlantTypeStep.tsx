import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Flower, Carrot, Apple } from 'lucide-react';

interface PlantTypeStepProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const PlantTypeStep = ({ selectedType, onTypeChange }: PlantTypeStepProps) => {
  return (
    <div className="space-y-16 px-4">
      {/* Banner Section */}
      <div className="bg-background rounded-2xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Select Your Plant Type
            </h1>
            <p className="text-xl text-gray-700">
              From colorful flowers to fresh vegetables and delicious fruits, we have specialized organic solutions for every garden.
            </p>
            <p className="text-gray-600">
              Choose your plant type below to get personalized recommendations and care tips.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Before/After Garden Image</span>
          </div>
        </div>
      </div>

      {/* Plant Type Selection */}
      <div className="space-y-12 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            What type of plants can we help with?
          </h2>
          <p className="text-gray-600 text-lg">
            Choose the primary focus of your garden
          </p>
        </div>

        <RadioGroup value={selectedType} onValueChange={onTypeChange} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-2">
            <RadioGroupItem value="flowers" id="flowers" className="peer sr-only" />
            <Label
              htmlFor="flowers"
              className="flex flex-col items-center justify-center w-full h-48 rounded-2xl cursor-pointer bg-white peer-data-[state=checked]:bg-pink-50 hover:bg-gray-50 transition-all"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Flower className="h-10 w-10 text-pink-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Flowers</span>
                <span className="text-gray-500 text-center mt-2">Beautiful blooms and ornamental plants</span>
              </div>
            </Label>
          </div>

          <div className="space-y-2">
            <RadioGroupItem value="vegetables" id="vegetables" className="peer sr-only" />
            <Label
              htmlFor="vegetables"
              className="flex flex-col items-center justify-center w-full h-48 rounded-2xl cursor-pointer bg-white peer-data-[state=checked]:bg-orange-50 hover:bg-gray-50 transition-all"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Carrot className="h-10 w-10 text-orange-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Vegetables</span>
                <span className="text-gray-500 text-center mt-2">Fresh produce and healthy greens</span>
              </div>
            </Label>
          </div>

          <div className="space-y-2">
            <RadioGroupItem value="fruits" id="fruits" className="peer sr-only" />
            <Label
              htmlFor="fruits"
              className="flex flex-col items-center justify-center w-full h-48 rounded-2xl cursor-pointer bg-white peer-data-[state=checked]:bg-red-50 hover:bg-gray-50 transition-all"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Apple className="h-10 w-10 text-red-600" />
                </div>
                <span className="text-2xl font-semibold text-gray-900">Fruits</span>
                <span className="text-gray-500 text-center mt-2">Delicious fruits and berry bushes</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PlantTypeStep;