import { CheckCircle, FlaskConical } from 'lucide-react';
import AnimatedSoilChart from '@/components/AnimatedSoilChart';

const SoilScienceSection = () => {
  return (
    <div className="bg-surface-warm rounded-3xl p-8 md:p-12 shadow-sm mb-20 border border-border/50">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-brand-light text-brand-dark px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FlaskConical className="h-4 w-4" />
          Science-Backed
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Backed by Soil Science, Not Guesswork
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Your lawn is only as good as the soil beneath it. We analyze real data from your ZIP code to create a tailored plan.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-muted-foreground mb-8 text-base leading-relaxed">
            We use advanced soil and climate data from your ZIP code to create a tailored plan for stronger grass, healthy roots, and lasting soil health.
          </p>
          
          <div className="space-y-5">
            <h3 className="font-semibold text-foreground text-lg">Why it matters:</h3>
            <div className="flex items-start space-x-4 bg-card p-4 rounded-xl shadow-sm border border-border/40">
              <CheckCircle className="h-5 w-5 text-brand-accent mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">We consider your soil's pH, texture, organic matter, and nutrients.</p>
            </div>
            <div className="flex items-start space-x-4 bg-card p-4 rounded-xl shadow-sm border border-border/40">
              <CheckCircle className="h-5 w-5 text-brand-accent mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">We match products to your region's rainfall, temperature, and growing conditions.</p>
            </div>
          </div>
          
          <p className="text-foreground font-semibold mt-8 text-lg">
            Lawn care that works <span className="text-brand-accent">with</span> nature, not against it.
          </p>
        </div>
        
        <AnimatedSoilChart />
      </div>
    </div>
  );
};

export default SoilScienceSection;
