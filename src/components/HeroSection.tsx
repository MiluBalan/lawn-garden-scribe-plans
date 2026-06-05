import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Shield, Star, Sparkles } from 'lucide-react';
import heroLawn from '@/assets/hero-lawn-new.jpg';

interface HeroSectionProps {
  onStartPlan: () => void;
}

const HeroSection = ({ onStartPlan }: HeroSectionProps) => {
  return (
    <div
      className="relative text-center pt-44 pb-36 md:pt-52 md:pb-44 bg-cover bg-center overflow-hidden -mt-16 rounded-none"
      style={{ backgroundImage: `url(${heroLawn})` }}
    >
      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-900/40 to-emerald-950/80"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 animate-fade-in">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Sparkles className="h-4 w-4 text-amber-300" />
          Organic · Science-Backed · Family-Safe
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto drop-shadow-lg">
          Your Lawn Deserves a{' '}
          <span className="bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
            Custom Plan
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Answer a few questions about your yard and receive a personalized,
          science-backed care plan tailored to your soil, climate, and grass type.
        </p>

        <Button
          onClick={onStartPlan}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-7 text-lg rounded-full shadow-2xl transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-105 group ring-1 ring-white/20"
        >
          Start Your Lawn Plan
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/80 text-sm">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            <Shield className="h-4 w-4 text-emerald-300" />
            <span>100% Organic</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            <Star className="h-4 w-4 text-amber-300 fill-amber-300" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            <Leaf className="h-4 w-4 text-emerald-300" />
            <span>10,000+ Happy Lawns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
