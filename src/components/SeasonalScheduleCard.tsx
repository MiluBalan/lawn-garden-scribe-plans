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
        icon: <Leaf className="h-5 w-5 text-brand" />
      },
      {
        month: 'Late Spring',
        tasks: [
          'Increase mowing frequency',
          'Apply summer fertilizer',
          'Treat any visible weeds'
        ],
        icon: <Scissors className="h-5 w-5 text-brand-accent" />
      },
      {
        month: 'Summer',
        tasks: [
          'Deep watering 2-3 times per week',
          'Raise mowing height',
          'Monitor for pests and disease'
        ],
        icon: <Droplets className="h-5 w-5 text-sky-500" />
      },
      {
        month: 'Fall',
        tasks: [
          'Apply winterizer fertilizer',
          'Overseed thin areas',
          'Continue regular watering'
        ],
        icon: <Calendar className="h-5 w-5 text-purple-500" />
      }
    ];
  };

  return (
    <Card className="mb-8 md:mb-12 border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
      <CardHeader>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="h-6 w-6 text-brand" />
          <CardTitle className="text-xl md:text-2xl text-center">Seasonal Care Schedule</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {generateSchedule().map((season, index) => (
            <div key={index} className="bg-surface-green p-6 rounded-2xl border border-border/60 hover:shadow-[var(--shadow-card-hover)] transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  {season.icon}
                </div>
                <h4 className="font-semibold text-foreground ml-3">{season.month}</h4>
              </div>
              <ul className="space-y-2">
                {season.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-center text-foreground/80">
                    <div className="w-2 h-2 bg-brand rounded-full mr-3"></div>
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
