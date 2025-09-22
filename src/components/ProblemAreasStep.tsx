
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface ProblemAreasStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ProblemAreasStep = ({ data, onUpdate }: ProblemAreasStepProps) => {
  const problems = [
    {
      value: 'weeds',
      label: 'Weeds',
      description: 'Dandelions, crabgrass, or other unwanted plants',
      icon: '🌿',
      severity: 'Common'
    },
    {
      value: 'thin_patches',
      label: 'Thin or Bare Patches',
      description: 'Areas where grass is sparse or missing',
      icon: '🕳️',
      severity: 'Common'
    },
    {
      value: 'brown_spots',
      label: 'Brown or Dead Spots',
      description: 'Circular or irregular brown areas',
      icon: '🟤',
      severity: 'Moderate'
    },
    {
      value: 'insects',
      label: 'Insect Damage',
      description: 'Grubs, chinch bugs, or other pest issues',
      icon: '🐛',
      severity: 'Moderate'
    },
    {
      value: 'disease',
      label: 'Fungal Disease',
      description: 'Mushrooms, mold, or other fungal issues',
      icon: '🍄',
      severity: 'Serious'
    },
    {
      value: 'moss',
      label: 'Moss Growth',
      description: 'Green moss growing in lawn areas',
      icon: '🌿',
      severity: 'Moderate'
    },
    {
      value: 'compaction',
      label: 'Soil Compaction',
      description: 'Hard, dense soil that water runs off',
      icon: '🧱',
      severity: 'Common'
    },
    {
      value: 'drainage',
      label: 'Poor Drainage',
      description: 'Water pools or stays soggy after rain',
      icon: '💧',
      severity: 'Serious'
    }
  ];

  const toggleProblem = (problemValue: string) => {
    const currentProblems = data.problems || [];
    const updatedProblems = currentProblems.includes(problemValue)
      ? currentProblems.filter((p: string) => p !== problemValue)
      : [...currentProblems, problemValue];
    
    onUpdate({ problems: updatedProblems });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Common': return 'bg-green-100 text-green-700';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700';
      case 'Serious': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 px-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600">
          Select any issues you're currently experiencing with your lawn. Don't worry if you don't have any problems - we'll still create a maintenance plan to keep your lawn healthy!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {problems.map((problem) => {
          const isSelected = (data.problems || []).includes(problem.value);
          return (
            <Card 
              key={problem.value}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                isSelected 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => toggleProblem(problem.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    checked={isSelected}
                    onChange={() => toggleProblem(problem.value)}
                    className="mt-1"
                  />
                  <div className="text-2xl">{problem.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{problem.label}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getSeverityColor(problem.severity)}`}>
                        {problem.severity}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{problem.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Problems Option */}
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
          (data.problems || []).length === 0 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-200 hover:border-green-300'
        }`}
        onClick={() => onUpdate({ problems: [] })}
      >
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-3">✅</div>
          <h4 className="font-semibold text-gray-900 mb-2">No Major Issues</h4>
          <p className="text-gray-600">My lawn is healthy, I just want a maintenance plan</p>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Identifying Lawn Problems</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Look for patterns in damage (circular spots often indicate disease)</li>
          <li>• Check for insects by examining grass roots and soil</li>
          <li>• Note if problems occur in specific areas (shade, traffic, wet spots)</li>
          <li>• Consider recent weather patterns and lawn care activities</li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemAreasStep;
