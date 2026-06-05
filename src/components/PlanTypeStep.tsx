import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Leaf, Sprout, ArrowRight, Users, Star, Shield, Check, Sparkles } from 'lucide-react';

interface PlanTypeStepProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const PlanTypeStep = ({ selectedType, onTypeChange }: PlanTypeStepProps) => {
  return (
    <div className="space-y-16 px-4">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-8 md:p-12 shadow-xl">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full shadow">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              Trusted by 50,000+ homeowners
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Your custom plan<br />
              starts{' '}
              <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent italic">
                here
              </span>
            </h1>
            <p className="text-lg text-emerald-100/90 max-w-md">
              Whether you want a lush green lawn or a thriving garden, we'll build a personalized care program just for you.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 text-emerald-100 text-sm bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <Shield className="h-4 w-4" />
                Science-backed
              </span>
              <span className="inline-flex items-center gap-2 text-emerald-100 text-sm bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <Users className="h-4 w-4" />
                Expert-curated
              </span>
              <span className="inline-flex items-center gap-2 text-emerald-100 text-sm bg-white/10 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <Sparkles className="h-4 w-4" />
                Personalized
              </span>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/30 to-amber-400/30 rounded-3xl blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-500/30 to-emerald-700/30 backdrop-blur border border-white/20 flex items-center justify-center">
                <Leaf className="h-20 w-20 text-emerald-200" />
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-700/30 backdrop-blur border border-white/20 flex items-center justify-center mt-8">
                <Sprout className="h-20 w-20 text-amber-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-10 max-w-7xl mx-auto mb-20">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            What can we help with? <span className="text-destructive">*</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Select the type of plan you'd like to create
          </p>
        </div>

        <RadioGroup value={selectedType} onValueChange={onTypeChange} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { value: 'lawn', label: 'Lawn', desc: 'Get a custom lawn care plan tailored to your soil & climate', icon: Leaf, gradient: 'from-emerald-50 via-white to-emerald-50/40', tile: 'from-emerald-100 to-emerald-200', iconColor: 'text-emerald-700', accent: 'bg-emerald-500', ring: 'peer-data-[state=checked]:ring-emerald-400 peer-data-[state=checked]:border-emerald-400' },
            { value: 'garden', label: 'Garden', desc: 'Get a custom garden plan for flowers, vegetables & more', icon: Sprout, gradient: 'from-amber-50 via-white to-amber-50/40', tile: 'from-amber-100 to-amber-200', iconColor: 'text-amber-700', accent: 'bg-amber-500', ring: 'peer-data-[state=checked]:ring-amber-400 peer-data-[state=checked]:border-amber-400' },
          ].map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedType === opt.value;
            return (
              <div key={opt.value} className="relative">
                <RadioGroupItem value={opt.value} id={opt.value} className="peer sr-only" />
                <Label
                  htmlFor={opt.value}
                  className={`group relative flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer overflow-hidden bg-gradient-to-br ${opt.gradient} border-2 border-gray-200 ring-2 ring-transparent ${opt.ring} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-10 min-h-[260px]`}
                >
                  <div className={`absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${opt.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                  <div className={`w-24 h-24 bg-gradient-to-br ${opt.tile} rounded-2xl flex items-center justify-center mb-5 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className={`h-12 w-12 ${opt.iconColor}`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{opt.label}</span>
                  <span className="text-gray-600 text-center mt-2 text-sm max-w-xs">{opt.desc}</span>
                  <div className="mt-5 flex items-center gap-1.5 text-emerald-600 text-sm font-medium opacity-0 group-hover:opacity-100 peer-data-[state=checked]:opacity-100 transition-opacity">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default PlanTypeStep;
