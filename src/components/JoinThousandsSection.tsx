import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';
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
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light/80 to-surface-green/60 backdrop-blur-[2px]"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            Join 10,000+ Homeowners
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
            Smarter, Safer Lawn Care Starts Here
          </h2>
          <p className="text-lg md:text-xl text-brand-dark/70 mb-10 leading-relaxed">
            Transform your lawn with BioGrowth Organics' science-backed, family-safe approach to lawn care.
          </p>
          <Button 
            onClick={onStartPlan}
            className="bg-brand hover:bg-brand-dark text-brand-foreground px-12 py-7 text-xl rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            Start My Custom Plan
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinThousandsSection;
