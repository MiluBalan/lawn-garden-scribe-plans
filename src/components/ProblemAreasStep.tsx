import { Card, CardContent } from '@/components/ui/card';
import { Check, Leaf, Sprout, Circle, Bug, Droplet, Layers, CloudRain, AlertCircle, CircleCheck, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProblemAreasStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

type Problem = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  severity: 'Common' | 'Moderate' | 'Serious';
  tile: string;
  color: string;
  accent: string;
  ring: string;
};

const problems: Problem[] = [
  { value: 'weeds', label: 'Weeds', description: 'Dandelions, crabgrass, or other unwanted plants', icon: Leaf, severity: 'Common', tile: 'from-emerald-100 to-green-200', color: 'text-emerald-700', accent: 'bg-emerald-500', ring: 'ring-emerald-400 border-emerald-400' },
  { value: 'thin_patches', label: 'Thin or Bare Patches', description: 'Areas where grass is sparse or missing', icon: Circle, severity: 'Common', tile: 'from-amber-100 to-yellow-200', color: 'text-amber-700', accent: 'bg-amber-500', ring: 'ring-amber-400 border-amber-400' },
  { value: 'brown_spots', label: 'Brown or Dead Spots', description: 'Circular or irregular brown areas', icon: AlertCircle, severity: 'Moderate', tile: 'from-orange-100 to-red-200', color: 'text-orange-700', accent: 'bg-orange-500', ring: 'ring-orange-400 border-orange-400' },
  { value: 'insects', label: 'Insect Damage', description: 'Grubs, chinch bugs, or other pest issues', icon: Bug, severity: 'Moderate', tile: 'from-rose-100 to-red-200', color: 'text-rose-700', accent: 'bg-rose-500', ring: 'ring-rose-400 border-rose-400' },
  { value: 'disease', label: 'Fungal Disease', description: 'Mushrooms, mold, or other fungal issues', icon: Sprout, severity: 'Serious', tile: 'from-purple-100 to-violet-200', color: 'text-purple-700', accent: 'bg-purple-500', ring: 'ring-purple-400 border-purple-400' },
  { value: 'moss', label: 'Moss Growth', description: 'Green moss growing in lawn areas', icon: Leaf, severity: 'Moderate', tile: 'from-teal-100 to-emerald-200', color: 'text-teal-700', accent: 'bg-teal-500', ring: 'ring-teal-400 border-teal-400' },
  { value: 'compaction', label: 'Soil Compaction', description: 'Hard, dense soil that water runs off', icon: Layers, severity: 'Common', tile: 'from-stone-100 to-amber-200', color: 'text-stone-700', accent: 'bg-stone-500', ring: 'ring-stone-400 border-stone-400' },
  { value: 'drainage', label: 'Poor Drainage', description: 'Water pools or stays soggy after rain', icon: CloudRain, severity: 'Serious', tile: 'from-sky-100 to-blue-200', color: 'text-sky-700', accent: 'bg-sky-500', ring: 'ring-sky-400 border-sky-400' },
];

const severityBadge = (s: string) =>
  s === 'Common'
    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    : s === 'Moderate'
    ? 'bg-amber-100 text-amber-700 border border-amber-200'
    : 'bg-rose-100 text-rose-700 border border-rose-200';

const ProblemAreasStep = ({ data, onUpdate }: ProblemAreasStepProps) => {
  const toggleProblem = (val: string) => {
    const current = data.problems || [];
    const updated = current.includes(val) ? current.filter((p: string) => p !== val) : [...current, val];
    onUpdate({ problems: updated });
  };

  const noneSelected = (data.problems || []).length === 0;

  return (
    <div className="space-y-10 px-4 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-white to-rose-50 p-8 md:p-12 shadow-sm border border-amber-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-amber-200 text-amber-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4" />
            Problem Areas
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Any{' '}
            <span className="bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              issues
            </span>{' '}
            we should know about?
          </h2>
          <p className="text-gray-700 text-lg">
            Select any issues you're currently experiencing with your lawn. Don't worry if you don't have any — we'll create a maintenance plan to keep it healthy!
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {problems.map((problem) => {
          const Icon = problem.icon;
          const isSelected = (data.problems || []).includes(problem.value);
          return (
            <Card
              key={problem.value}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
                isSelected ? `bg-gradient-to-br from-white to-gray-50 ${problem.ring}` : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleProblem(problem.value)}
            >
              <CardContent className="p-5 relative">
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${problem.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.tile} flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${problem.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 truncate">{problem.label}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${severityBadge(problem.severity)} flex-shrink-0`}>
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

      {/* None option */}
      <Card
        className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
          noneSelected ? 'bg-gradient-to-br from-emerald-50 to-white ring-emerald-400 border-emerald-400' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onUpdate({ problems: [] })}
      >
        <CardContent className="p-6 text-center relative">
          <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${noneSelected ? 'bg-emerald-500 scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </div>
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center mx-auto mb-3 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <CircleCheck className="h-7 w-7 text-emerald-700" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">No Major Issues</h4>
          <p className="text-gray-600 text-sm">My lawn is healthy, I just want a maintenance plan</p>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-2xl border border-sky-200 shadow-sm">
        <h4 className="font-semibold text-sky-900 mb-2 flex items-center gap-2">
          <Droplet className="h-4 w-4" />
          Identifying Lawn Problems
        </h4>
        <ul className="text-sky-800 text-sm space-y-1 leading-relaxed">
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
