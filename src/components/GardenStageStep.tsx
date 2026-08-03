import { Card, CardContent } from '@/components/ui/card';
import { Check, Shovel, Sprout, Leaf, TreeDeciduous } from 'lucide-react';

interface GardenStageStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const stageOptions = [
  {
    value: 'preparing-soil',
    label: "I'm preparing my soil before planting",
    description: 'Building a healthy foundation first',
    icon: Shovel,
    tile: 'from-amber-100 to-orange-200',
    color: 'text-amber-700',
    accent: 'bg-amber-500',
    ring: 'ring-amber-400 border-amber-400',
  },
  {
    value: 'planted-seeds',
    label: 'I just planted seeds',
    description: 'Germination stage care',
    icon: Sprout,
    tile: 'from-emerald-100 to-green-200',
    color: 'text-emerald-700',
    accent: 'bg-emerald-500',
    ring: 'ring-emerald-400 border-emerald-400',
  },
  {
    value: 'planted-seedlings',
    label: 'I recently planted seedlings or saplings',
    description: 'Young plants establishing roots',
    icon: Leaf,
    tile: 'from-lime-100 to-emerald-200',
    color: 'text-lime-700',
    accent: 'bg-lime-500',
    ring: 'ring-lime-400 border-lime-400',
  },
  {
    value: 'actively-growing',
    label: 'My plants are actively growing and need regular feeding',
    description: 'Ongoing nutrition and maintenance',
    icon: TreeDeciduous,
    tile: 'from-sky-100 to-emerald-200',
    color: 'text-sky-700',
    accent: 'bg-sky-500',
    ring: 'ring-sky-400 border-sky-400',
  },
];

const GardenStageStep = ({ data, onUpdate }: GardenStageStepProps) => {
  return (
    <div className="space-y-10 px-4 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 md:p-12 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
            <Sprout className="h-4 w-4" />
            Garden Stage
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What stage is your{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
              garden
            </span>{' '}
            currently in?&nbsp;<span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Timing matters — we'll match your feeding schedule to where you are right now.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stageOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = data.gardenStage === option.value;
          return (
            <Card
              key={option.value}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
                isSelected ? `bg-gradient-to-br from-white to-gray-50 ${option.ring}` : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onUpdate({ gardenStage: option.value })}
            >
              <CardContent className="p-5 relative">
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${option.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.tile} flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className={`h-7 w-7 ${option.color}`} />
                  </div>
                  <div className="flex-1 pr-6">
                    <h4 className="font-semibold text-gray-900">{option.label}</h4>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GardenStageStep;
