import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Leaf, Sprout, ArrowRight, Users, Star, Shield } from 'lucide-react';

interface PlanTypeStepProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const PlanTypeStep = ({ selectedType, onTypeChange }: PlanTypeStepProps) => {
  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-900 overflow-hidden -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12">
        <div className="absolute inset-0 opacity-10 pattern-dots-yellow-green" />
        <div className="relative grid md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-6 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              Trusted by 50,000+ homeowners
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Your custom plan<br />
              starts <span className="italic text-green-200">here</span>
            </h1>
            <p className="text-lg text-green-100/90 max-w-md">
              Whether you want a lush green lawn or a thriving garden, we'll build a personalized care program just for you.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2 text-green-200 text-sm">
                <Shield className="h-4 w-4" />
                Science-backed
              </div>
              <div className="flex items-center gap-2 text-green-200 text-sm">
                <Users className="h-4 w-4" />
                Expert-curated
              </div>
            </div>
          </div>
          <div className="hidden md:block h-full">
            <img
              src={lawnCareIllustration}
              alt="Lawn care illustration"
              className="w-full h-full object-contain p-8"
            />
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-10 max-w-7xl mx-auto mb-20">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-foreground">
            What can we help with? <span className="text-destructive">*</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Select the type of plan you'd like to create
          </p>
        </div>

        <RadioGroup value={selectedType} onValueChange={onTypeChange} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Lawn Card */}
          <div className="space-y-2">
            <RadioGroupItem value="lawn" id="lawn" className="peer sr-only" />
            <Label
              htmlFor="lawn"
              className="group flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer bg-card border-2 border-border shadow-[var(--shadow-card)] peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:shadow-[var(--shadow-card-selected)] hover:border-green-300 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 p-10"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <Leaf className="h-12 w-12 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-foreground">Lawn</span>
              <span className="text-muted-foreground text-center mt-2 text-sm">Get a custom lawn care plan tailored to your soil & climate</span>
              <div className="mt-5 flex items-center gap-1.5 text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 peer-data-[state=checked]:opacity-100 transition-opacity">
                Get Started <ArrowRight className="h-4 w-4" />
              </div>
            </Label>
          </div>

          {/* Garden Card */}
          <div className="space-y-2">
            <RadioGroupItem value="garden" id="garden" className="peer sr-only" />
            <Label
              htmlFor="garden"
              className="group flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer bg-card border-2 border-border shadow-[var(--shadow-card)] peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:shadow-[var(--shadow-card-selected)] hover:border-green-300 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 p-10"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <Sprout className="h-12 w-12 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-foreground">Garden</span>
              <span className="text-muted-foreground text-center mt-2 text-sm">Get a custom garden plan for flowers, vegetables & more</span>
              <div className="mt-5 flex items-center gap-1.5 text-green-600 text-sm font-medium opacity-0 group-hover:opacity-100 peer-data-[state=checked]:opacity-100 transition-opacity">
                Get Started <ArrowRight className="h-4 w-4" />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PlanTypeStep;