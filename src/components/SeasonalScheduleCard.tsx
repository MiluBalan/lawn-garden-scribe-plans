
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Droplets, Scissors, Leaf } from 'lucide-react';

interface SeasonalScheduleCardProps {
  grassType: string;
}

const SeasonalScheduleCard = ({ grassType }: SeasonalScheduleCardProps) => {
  const generateSchedule = () => {
    const isWarmSeason = ['bermuda', 'zoysia', 'st_augustine', 'centipede'].includes(grassType);
    
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

  return (
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
  );
};

export default SeasonalScheduleCard;
