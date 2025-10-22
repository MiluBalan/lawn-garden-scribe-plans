import { CheckCircle } from 'lucide-react';
import AnimatedSoilChart from '@/components/AnimatedSoilChart';

const SoilScienceSection = () => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 shadow-lg mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Backed by Soil Science, Not Just Guesswork
        </h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-6">
          Your lawn is only as good as the soil beneath it. That's why we don't guess - we analyze.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-gray-600 mb-6">
            We use advanced soil and climate data from your ZIP code to create a tailored plan for stronger grass, healthy roots, and lasting soil health.
          </p>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Why it matters:</h3>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">We consider your soil's pH, texture, organic matter, and nutrients.</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-600">We match products to your region's rainfall, temperature, and growing conditions.</p>
            </div>
          </div>
          
          <p className="text-gray-800 font-medium mt-6">
            This is lawn care that works with nature, not against it.
          </p>
        </div>
        
        <AnimatedSoilChart />
      </div>
    </div>
  );
};

export default SoilScienceSection;