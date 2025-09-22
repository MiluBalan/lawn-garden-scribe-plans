
import { Card, CardContent } from '@/components/ui/card';

interface GrassTypeStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const GrassTypeStep = ({ data, onUpdate }: GrassTypeStepProps) => {
  const grassTypes = [
    {
      name: 'Bermuda Grass',
      value: 'bermuda',
      description: 'Heat-tolerant, drought-resistant warm-season grass',
      image: '🌱',
      season: 'Warm Season'
    },
    {
      name: 'Kentucky Bluegrass',
      value: 'kentucky_blue',
      description: 'Dense, lush cool-season grass perfect for northern climates',
      image: '🌿',
      season: 'Cool Season'
    },
    {
      name: 'Tall Fescue',
      value: 'tall_fescue',
      description: 'Hardy, drought-tolerant grass that works in many climates',
      image: '🌾',
      season: 'Cool Season'
    },
    {
      name: 'Zoysia Grass',
      value: 'zoysia',
      description: 'Thick, carpet-like warm-season grass',
      image: '🍃',
      season: 'Warm Season'
    },
    {
      name: 'St. Augustine',
      value: 'st_augustine',
      description: 'Popular warm-season grass for southern regions',
      image: '🌿',
      season: 'Warm Season'
    },
    {
      name: 'Centipede Grass',
      value: 'centipede',
      description: 'Low-maintenance warm-season grass',
      image: '🌱',
      season: 'Warm Season'
    },
    {
      name: 'Fine Fescue',
      value: 'fine_fescue',
      description: 'Shade-tolerant cool-season grass',
      image: '🌿',
      season: 'Cool Season'
    },
    {
      name: "I'm not sure",
      value: 'unknown',
      description: 'We\'ll help identify your grass type based on your location',
      image: '❓',
      season: 'Any Season'
    }
  ];

  return (
    <div className="space-y-6 px-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600">
          Identifying your grass type is crucial for proper care. Different grasses have unique needs for fertilization, watering, and maintenance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {grassTypes.map((grass) => (
          <Card 
            key={grass.value}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
              data.grassType === grass.value 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => onUpdate({ grassType: grass.value })}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{grass.image}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{grass.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      grass.season === 'Warm Season' 
                        ? 'bg-orange-100 text-orange-700' 
                        : grass.season === 'Cool Season'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {grass.season}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{grass.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Need Help Identifying Your Grass?</h4>
        <p className="text-blue-800 text-sm">
          Look at your grass blades: Are they wide or narrow? Feel the texture: Is it coarse or fine? 
          Consider your climate: Do you live in a warm or cool region? If you're still unsure, select "I'm not sure" 
          and we'll provide recommendations based on your location.
        </p>
      </div>
    </div>
  );
};

export default GrassTypeStep;
