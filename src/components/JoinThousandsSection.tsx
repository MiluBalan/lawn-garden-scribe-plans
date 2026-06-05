import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Sparkles } from 'lucide-react';
import backgroundPattern from '@/assets/background-pattern.webp';

interface JoinThousandsSectionProps {
  onStartPlan: () => void;
}

const JoinThousandsSection = ({ onStartPlan }: JoinThousandsSectionProps) => {
  return (
    <div
      className="relative py-28 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${backgroundPattern})` }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/90 via-white/80 to-amber-100/80 backdrop-blur-[2px]"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <Users className="h-4 w-4" />
            Join 10,000+ Homeowners
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Smarter, Safer{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              Lawn Care
            </span>{' '}
            Starts Here
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            Transform your lawn with BioGrowth Organics' science-backed, family-safe approach to lawn care.
          </p>
          <Button
            onClick={onStartPlan}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-7 text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group ring-1 ring-white/30"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Start My Custom Plan
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinThousandsSection;
