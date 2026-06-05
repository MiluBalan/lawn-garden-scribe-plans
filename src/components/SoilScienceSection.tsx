import { CheckCircle, FlaskConical } from 'lucide-react';
import AnimatedSoilChart from '@/components/AnimatedSoilChart';

const SoilScienceSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-white to-emerald-50/40 rounded-3xl p-8 md:p-12 shadow-sm mb-20 border border-amber-100/60 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
          <FlaskConical className="h-4 w-4" />
          Science-Backed
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Backed by{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
            Soil Science
          </span>
          , Not Guesswork
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Your lawn is only as good as the soil beneath it. We analyze real data from your ZIP code to create a tailored plan.
        </p>
      </div>

      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-muted-foreground mb-8 text-base leading-relaxed">
            We use advanced soil and climate data from your ZIP code to create a tailored plan for stronger grass, healthy roots, and lasting soil health.
          </p>

          <div className="space-y-5">
            <h3 className="font-semibold text-foreground text-lg">Why it matters:</h3>
            <div className="flex items-start space-x-4 bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-emerald-100/60 hover:-translate-y-0.5 hover:shadow-md transition-all">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">We consider your soil's pH, texture, organic matter, and nutrients.</p>
            </div>
            <div className="flex items-start space-x-4 bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-emerald-100/60 hover:-translate-y-0.5 hover:shadow-md transition-all">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">We match products to your region's rainfall, temperature, and growing conditions.</p>
            </div>
          </div>

          <p className="text-foreground font-semibold mt-8 text-lg">
            Lawn care that works <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">with</span> nature, not against it.
          </p>
        </div>

        <AnimatedSoilChart />
      </div>
    </div>
  );
};

export default SoilScienceSection;
