import { Card, CardContent } from '@/components/ui/card';
import { Check, Sprout, Leaf, Wheat, HelpCircle, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface GrassTypeStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

type Grass = {
  name: string;
  value: string;
  description: string;
  icon: LucideIcon;
  season: 'Warm Season' | 'Cool Season' | 'Any Season';
  tile: string;
  color: string;
  accent: string;
  ring: string;
};

const grassTypes: Grass[] = [
  { name: 'Bermuda Grass', value: 'bermuda', description: 'Heat-tolerant, drought-resistant warm-season grass', icon: Sprout, season: 'Warm Season', tile: 'from-amber-100 to-yellow-200', color: 'text-amber-700', accent: 'bg-amber-500', ring: 'ring-amber-400 border-amber-400' },
  { name: 'Kentucky Bluegrass', value: 'kentucky_blue', description: 'Dense, lush cool-season grass perfect for northern climates', icon: Leaf, season: 'Cool Season', tile: 'from-sky-100 to-blue-200', color: 'text-sky-700', accent: 'bg-sky-500', ring: 'ring-sky-400 border-sky-400' },
  { name: 'Tall Fescue', value: 'tall_fescue', description: 'Hardy, drought-tolerant grass that works in many climates', icon: Wheat, season: 'Cool Season', tile: 'from-emerald-100 to-green-200', color: 'text-emerald-700', accent: 'bg-emerald-500', ring: 'ring-emerald-400 border-emerald-400' },
  { name: 'Zoysia Grass', value: 'zoysia', description: 'Thick, carpet-like warm-season grass', icon: Leaf, season: 'Warm Season', tile: 'from-orange-100 to-amber-200', color: 'text-orange-700', accent: 'bg-orange-500', ring: 'ring-orange-400 border-orange-400' },
  { name: 'St. Augustine', value: 'st_augustine', description: 'Popular warm-season grass for southern regions', icon: Leaf, season: 'Warm Season', tile: 'from-lime-100 to-emerald-200', color: 'text-lime-700', accent: 'bg-lime-500', ring: 'ring-lime-400 border-lime-400' },
  { name: 'Centipede Grass', value: 'centipede', description: 'Low-maintenance warm-season grass', icon: Sprout, season: 'Warm Season', tile: 'from-yellow-100 to-amber-200', color: 'text-yellow-700', accent: 'bg-yellow-500', ring: 'ring-yellow-400 border-yellow-400' },
  { name: 'Fine Fescue', value: 'fine_fescue', description: 'Shade-tolerant cool-season grass', icon: Leaf, season: 'Cool Season', tile: 'from-teal-100 to-cyan-200', color: 'text-teal-700', accent: 'bg-teal-500', ring: 'ring-teal-400 border-teal-400' },
  { name: "I'm not sure", value: 'unknown', description: "We'll help identify your grass type based on your location", icon: HelpCircle, season: 'Any Season', tile: 'from-gray-100 to-slate-200', color: 'text-gray-600', accent: 'bg-gray-500', ring: 'ring-gray-400 border-gray-400' },
];

const seasonBadge = (season: string) =>
  season === 'Warm Season'
    ? 'bg-orange-100 text-orange-700 border border-orange-200'
    : season === 'Cool Season'
    ? 'bg-sky-100 text-sky-700 border border-sky-200'
    : 'bg-gray-100 text-gray-700 border border-gray-200';

const GrassTypeStep = ({ data, onUpdate }: GrassTypeStepProps) => {
  return (
    <div className="space-y-10 px-4 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-8 md:p-12 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4" />
            Grass Type
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What type of{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              grass
            </span>{' '}
            do you have? <span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Identifying your grass type is crucial for proper care. Different grasses have unique needs for fertilization, watering, and maintenance.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {grassTypes.map((grass) => {
          const Icon = grass.icon;
          const isSelected = data.grassType === grass.value;
          return (
            <Card
              key={grass.value}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
                isSelected ? `bg-gradient-to-br from-white to-gray-50 ${grass.ring}` : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onUpdate({ grassType: grass.value })}
            >
              <CardContent className="p-5 relative">
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${grass.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${grass.tile} flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${grass.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{grass.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${seasonBadge(grass.season)} flex-shrink-0`}>
                        {grass.season}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{grass.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-6 rounded-2xl border border-sky-200 shadow-sm">
        <h4 className="font-semibold text-sky-900 mb-2">Need Help Identifying Your Grass?</h4>
        <p className="text-sky-800 text-sm leading-relaxed">
          Look at your grass blades: Are they wide or narrow? Feel the texture: Is it coarse or fine? Consider your climate: Do you live in a warm or cool region? If you're still unsure, select "I'm not sure" and we'll provide recommendations based on your location.
        </p>
      </div>
    </div>
  );
};

export default GrassTypeStep;
