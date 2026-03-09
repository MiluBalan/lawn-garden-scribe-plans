import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Shield, Star } from 'lucide-react';
import heroLawn from '@/assets/hero-lawn-new.jpg';

interface HeroSectionProps {
  onStartPlan: () => void;
}

const HeroSection = ({ onStartPlan }: HeroSectionProps) => {
  return (
    <div 
      className="relative text-center pt-44 pb-36 md:pt-52 md:pb-44 bg-cover bg-center overflow-hidden -mt-16"
      style={{ backgroundImage: `url(${heroLawn})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-brand/80 backdrop-blur-sm text-brand-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Leaf className="h-4 w-4" />
          Organic · Science-Backed · Family-Safe
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto">
          Your Lawn Deserves a <span className="text-brand-accent">Custom Plan</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Answer a few questions about your yard and receive a personalized, 
          science-backed care plan tailored to your soil, climate, and grass type.
        </p>
        
        <Button 
          onClick={onStartPlan}
          className="bg-brand hover:bg-brand-dark text-brand-foreground px-10 py-7 text-lg rounded-full shadow-2xl transition-all duration-300 hover:shadow-brand/30 hover:scale-105 group"
        >
          Start Your Lawn Plan
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>100% Organic</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            <span>10,000+ Happy Lawns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
