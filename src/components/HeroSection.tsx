import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onStartPlan: () => void;
}

const HeroSection = ({ onStartPlan }: HeroSectionProps) => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        Get Your Custom
        <span className="text-green-600 block">Lawn Care Plan</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
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
  );
};

export default HeroSection;