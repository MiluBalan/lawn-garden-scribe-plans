import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroLawn from '@/assets/hero-lawn.jpg';

interface HeroSectionProps {
  onStartPlan: () => void;
}

const HeroSection = ({ onStartPlan }: HeroSectionProps) => {
  return (
    <div 
      className="relative text-center mb-16 py-32 bg-cover bg-center rounded-2xl overflow-hidden"
      style={{ backgroundImage: `url(${heroLawn})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-white mb-6">
          Get Your Custom Plan
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Answer a few questions about your lawn and receive a personalized care plan 
          tailored specifically to your yard's needs.
        </p>
        <Button 
          onClick={onStartPlan}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          Start Your Lawn Plan
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;