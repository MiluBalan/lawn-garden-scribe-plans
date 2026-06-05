import { Card, CardContent } from '@/components/ui/card';
import { Droplets, Sprout, Check, ShowerHead, Sparkles } from 'lucide-react';

interface SprinklerSystemStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const SprinklerSystemStep = ({ data, onUpdate }: SprinklerSystemStepProps) => {
  const handleSprinklerSystemChange = (value: string) => {
    onUpdate({
      sprinklerSystem: value,
      sprinklerFrequency: value === 'no' ? '' : data.sprinklerFrequency || '',
    });
  };

  const handleFrequencyChange = (value: string) => {
    onUpdate({ sprinklerFrequency: value });
  };

  const sprinklerOptions = [
    { value: 'yes', label: 'Yes, I have one', icon: Droplets, description: 'My lawn has an automated irrigation system', tile: 'from-sky-100 to-blue-200', color: 'text-sky-700', accent: 'bg-sky-500', ring: 'ring-sky-400 border-sky-400' },
    { value: 'no', label: "No, I don't", icon: ShowerHead, description: 'I water manually or rely on rainfall', tile: 'from-amber-100 to-yellow-200', color: 'text-amber-700', accent: 'bg-amber-500', ring: 'ring-amber-400 border-amber-400' },
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
    <div className="space-y-10 px-4 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-8 md:p-12 shadow-sm border border-sky-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-sky-200 text-sky-700 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4" />
            Irrigation Setup
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Automated{' '}
            <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
              Sprinkler System
            </span>{' '}
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Knowing your irrigation setup helps us tailor watering recommendations for your lawn.
          </p>
        </div>
      </div>

      {/* Yes / No Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {sprinklerOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = data.sprinklerSystem === option.value;
          return (
            <Card
              key={option.value}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50 ${
                isSelected ? option.ring : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSprinklerSystemChange(option.value)}
            >
              <CardContent className="p-8 text-center relative">
                <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${option.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                  <Check className="h-4 w-4 text-white" strokeWidth={3} />
                </div>
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${option.tile} flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className={`h-10 w-10 ${option.color}`} />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{option.label}</h4>
                <p className="text-gray-600 text-sm">{option.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Frequency selection */}
      {data.sprinklerSystem === 'yes' && (
        <div className="animate-fade-in space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-sky-600" />
            How frequently does it run?
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((frequency) => {
              const isSelected = data.sprinklerFrequency === frequency.toString();
              return (
                <Card
                  key={frequency}
                  className={`cursor-pointer transition-all duration-200 border-2 rounded-xl hover:shadow-md hover:-translate-y-0.5 ${
                    isSelected ? 'border-sky-400 bg-gradient-to-br from-sky-50 to-white ring-2 ring-sky-200' : 'border-gray-200 hover:border-sky-300'
                  }`}
                  onClick={() => handleFrequencyChange(frequency.toString())}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className={`flex items-center justify-center h-9 w-9 rounded-full text-sm font-bold transition-all ${
                      isSelected ? 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {frequency}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
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
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-200 shadow-sm">
        <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
          <Sprout className="h-4 w-4" /> Watering Tip
        </h4>
        <p className="text-emerald-800 text-sm leading-relaxed">
          Most lawns thrive with deep, infrequent watering (2–3 times per week) rather than shallow daily watering. This encourages deeper root growth and better drought tolerance.
        </p>
      </div>
    </div>
  );
};

export default SprinklerSystemStep;
