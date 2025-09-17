
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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

  return (
    <div className="space-y-8 px-24">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Do you have an automated sprinkler system?
        </h3>
        <RadioGroup 
          value={data.sprinklerSystem || ''} 
          onValueChange={handleSprinklerSystemChange}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="yes" id="sprinkler-yes" />
            <Label htmlFor="sprinkler-yes" className="text-lg cursor-pointer">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="no" id="sprinkler-no" />
            <Label htmlFor="sprinkler-no" className="text-lg cursor-pointer">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      {data.sprinklerSystem === 'yes' && (
        <div className="animate-fade-in">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            How frequently is it working?
          </h3>
          <RadioGroup 
            value={data.sprinklerFrequency || ''} 
            onValueChange={handleFrequencyChange}
            className="space-y-3"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((frequency) => (
              <div key={frequency} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value={frequency.toString()} id={`frequency-${frequency}`} />
                <Label htmlFor={`frequency-${frequency}`} className="text-base cursor-pointer">
                  {frequency} time{frequency > 1 ? 's' : ''} a week
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default SprinklerSystemStep;
