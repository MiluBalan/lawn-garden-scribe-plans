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
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          What type of plants can we help with?
        </h2>
        <p className="text-gray-600">
          Choose the primary focus of your garden
        </p>
      </div>

      <RadioGroup value={selectedType} onValueChange={onTypeChange} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <RadioGroupItem value="flowers" id="flowers" className="peer sr-only" />
          <Label
            htmlFor="flowers"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Flower className="h-8 w-8 text-pink-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Flowers</span>
              <span className="text-sm text-gray-500 text-center px-4">Beautiful blooms and ornamental plants</span>
            </Card>
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="vegetables" id="vegetables" className="peer sr-only" />
          <Label
            htmlFor="vegetables"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Carrot className="h-8 w-8 text-orange-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Vegetables</span>
              <span className="text-sm text-gray-500 text-center px-4">Fresh produce and healthy greens</span>
            </Card>
          </Label>
        </div>

        <div className="space-y-2">
          <RadioGroupItem value="fruits" id="fruits" className="peer sr-only" />
          <Label
            htmlFor="fruits"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-200 rounded-lg cursor-pointer bg-white peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:bg-gray-50 transition-all"
          >
            <Card className="w-full h-full flex flex-col items-center justify-center border-none shadow-none bg-transparent">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Apple className="h-8 w-8 text-red-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Fruits</span>
              <span className="text-sm text-gray-500 text-center px-4">Delicious fruits and berry bushes</span>
            </Card>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PlantTypeStep;