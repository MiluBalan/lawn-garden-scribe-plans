
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Sprout } from 'lucide-react';

interface SprinklerSystemStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const SprinklerSystemStep = ({ data, onUpdate }: SprinklerSystemStepProps) => {
  const handleSprinklerSystemChange = (value: string) => {
    onUpdate({ 
      sprinklerSystem: value,
      sprinklerFrequency: value === 'no' ? '' : data.sprinklerFrequency || ''
    });
  };

  const handleFrequencyChange = (value: string) => {
    onUpdate({ sprinklerFrequency: value });
  };

  const sprinklerOptions = [
    { value: 'yes', label: 'Yes, I have one', icon: '💧', description: 'My lawn has an automated irrigation system' },
    { value: 'no', label: 'No, I don\'t', icon: '🚿', description: 'I water manually or rely on rainfall' },
  ];

  const frequencyLabels: Record<number, string> = {
    1: 'Once a week — Light watering',
    2: 'Twice a week — Standard care',
    3: '3 times a week — Active growth',
    4: '4 times a week — High maintenance',
    5: '5 times a week — Intensive care',
    6: '6 times a week — Near-daily',
    7: 'Every day — Maximum hydration',
  };

  return (
    <div className="space-y-8 px-8 max-w-[60rem] mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Automated Sprinkler System <span className="text-red-500">*</span>
        </h2>
        <p className="text-base text-muted-foreground">
          Knowing your irrigation setup helps us tailor watering recommendations for your lawn.
        </p>
      </div>

      {/* Yes / No Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {sprinklerOptions.map((option) => {
          const isSelected = data.sprinklerSystem === option.value;
          return (
            <Card
              key={option.value}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                isSelected
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => handleSprinklerSystemChange(option.value)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{option.icon}</div>
                <h4 className="font-semibold text-foreground text-lg mb-1">{option.label}</h4>
                <p className="text-muted-foreground text-sm">{option.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Frequency selection */}
      {data.sprinklerSystem === 'yes' && (
        <div className="animate-fade-in space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Droplets className="h-5 w-5 text-green-600" />
            How frequently does it run?
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((frequency) => {
              const isSelected = data.sprinklerFrequency === frequency.toString();
              return (
                <Card
                  key={frequency}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    isSelected
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleFrequencyChange(frequency.toString())}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold ${
                      isSelected ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      {frequency}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {frequencyLabels[frequency]}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Info tip */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <Sprout className="h-4 w-4" /> Watering Tip
        </h4>
        <p className="text-blue-800 text-sm">
          Most lawns thrive with deep, infrequent watering (2–3 times per week) rather than shallow daily watering. This encourages deeper root growth and better drought tolerance.
        </p>
      </div>
    </div>
  );
};

export default SprinklerSystemStep;
