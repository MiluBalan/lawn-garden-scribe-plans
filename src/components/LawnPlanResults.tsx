
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Droplets, Scissors, Leaf, Bug, CheckCircle } from 'lucide-react';

interface LawnPlanResultsProps {
  lawnData: any;
  onRestart: () => void;
}

const LawnPlanResults = ({ lawnData, onRestart }: LawnPlanResultsProps) => {
  const getSizeDisplay = () => {
    if (lawnData.size.startsWith('custom_')) {
      return `${lawnData.size.split('_')[1]} sq ft`;
    }
    switch (lawnData.size) {
      case 'small': return 'Small (Under 5,000 sq ft)';
      case 'medium': return 'Medium (5,000-10,000 sq ft)';
      case 'large': return 'Large (10,000-20,000 sq ft)';
      case 'xlarge': return 'Extra Large (20,000+ sq ft)';
      default: return 'Unknown size';
    }
  };

  const getGrassDisplay = () => {
    const grassMap: { [key: string]: string } = {
      'bermuda': 'Bermuda Grass',
      'kentucky_blue': 'Kentucky Bluegrass',
      'tall_fescue': 'Tall Fescue',
      'zoysia': 'Zoysia Grass',
      'st_augustine': 'St. Augustine',
      'centipede': 'Centipede Grass',
      'fine_fescue': 'Fine Fescue',
      'unknown': 'Mixed/Unknown'
    };
    return grassMap[lawnData.grassType] || 'Unknown';
  };

  const generateSchedule = () => {
    const isWarmSeason = ['bermuda', 'zoysia', 'st_augustine', 'centipede'].includes(lawnData.grassType);
    
    return [
      {
        month: 'Early Spring',
        tasks: [
          'Apply pre-emergent herbicide',
          'First fertilizer application',
          'Begin regular watering schedule'
        ],
        icon: <Leaf className="h-5 w-5 text-green-600" />
      },
      {
        month: 'Late Spring',
        tasks: [
          'Increase mowing frequency',
          'Apply summer fertilizer',
          'Treat any visible weeds'
        ],
        icon: <Scissors className="h-5 w-5 text-blue-600" />
      },
      {
        month: 'Summer',
        tasks: [
          'Deep watering 2-3 times per week',
          'Raise mowing height',
          'Monitor for pests and disease'
        ],
        icon: <Droplets className="h-5 w-5 text-orange-600" />
      },
      {
        month: 'Fall',
        tasks: [
          'Apply winterizer fertilizer',
          'Overseed thin areas',
          'Continue regular watering'
        ],
        icon: <Calendar className="h-5 w-5 text-purple-600" />
      }
    ];
  };

  const getRecommendations = () => {
    const recs = [];
    
    // Size-based recommendations
    if (lawnData.size === 'small' || lawnData.size.includes('custom_') && parseInt(lawnData.size.split('_')[1]) < 5000) {
      recs.push('Consider organic fertilizers for small lawn areas');
    }
    
    // Grass type recommendations
    if (['bermuda', 'zoysia'].includes(lawnData.grassType)) {
      recs.push('Warm-season grass: Focus care from late spring through early fall');
    } else if (['kentucky_blue', 'tall_fescue', 'fine_fescue'].includes(lawnData.grassType)) {
      recs.push('Cool-season grass: Peak growing seasons are spring and fall');
    }
    
    // Sunlight recommendations
    if (lawnData.sunlight === 'partial_shade' || lawnData.sunlight === 'full_shade') {
      recs.push('Shade-tolerant fertilizer and reduced mowing frequency recommended');
    }
    
    // Problem-specific recommendations
    if (lawnData.problems?.includes('weeds')) {
      recs.push('Pre-emergent herbicide application in early spring is crucial');
    }
    if (lawnData.problems?.includes('thin_patches')) {
      recs.push('Overseed thin areas in fall for cool-season grass, spring for warm-season');
    }
    if (lawnData.problems?.includes('compaction')) {
      recs.push('Core aeration recommended in spring or fall');
    }
    
    return recs;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Custom Lawn Plan</h1>
          <p className="text-xl text-gray-600">
            Here's your personalized lawn care plan based on your specific needs
          </p>
        </div>

        {/* Lawn Summary */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Lawn Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Size</h4>
                <p className="text-gray-600">{getSizeDisplay()}</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Grass Type</h4>
                <p className="text-gray-600">{getGrassDisplay()}</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <p className="text-gray-600">{lawnData.location}</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-2">Sunlight</h4>
                <p className="text-gray-600 capitalize">{lawnData.sunlight?.replace('_', ' ')}</p>
              </div>
            </div>
            
            {lawnData.problems && lawnData.problems.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Issues to Address:</h4>
                <div className="flex flex-wrap gap-2">
                  {lawnData.problems.map((problem: string) => (
                    <Badge key={problem} variant="outline" className="capitalize">
                      {problem.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seasonal Schedule */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Seasonal Care Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {generateSchedule().map((season, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    {season.icon}
                    <h4 className="font-semibold text-gray-900 ml-3">{season.month}</h4>
                  </div>
                  <ul className="space-y-2">
                    {season.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Recommendations */}
        <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Key Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {getRecommendations().map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-3"
          >
            Create Another Plan
          </Button>
          <div>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg">
              Get Your Products
            </Button>
          </div>
          <p className="text-gray-600 text-sm">
            Ready to transform your lawn? Get the recommended products delivered to your door.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LawnPlanResults;
