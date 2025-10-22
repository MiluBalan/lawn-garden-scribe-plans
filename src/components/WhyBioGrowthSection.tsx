import { Shield, Sprout, Package, Award, Globe } from 'lucide-react';

const WhyBioGrowthSection = () => {
  return (
    <div className="bg-white rounded-2xl p-8 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Why BioGrowth Organics?
        </h2>
        <p className="text-xl text-gray-700 mb-2">
          Organic Lawn Care You Can Trust—From the Ground Up
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Family-Safe, Pet-Safe Formulas</h3>
          <p className="text-gray-600">
            Safe, natural lawn care for kids, pets, and the planet-no harsh chemicals.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sprout className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Soil-First, Always</h3>
          <p className="text-gray-600">
           We nurture your lawn’s ecosystem, boosting microbes, organic matter, and long-term soil health naturally.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible, Hassle-Free Subscriptions</h3>
          <p className="text-gray-600">
           Our customizable plans adapt to your lawn year-round, with easy pause, skip, or adjust options-no hidden fees.
   </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Satisfaction Guarantee</h3>
          <p className="text-gray-600">
          We guarantee your lawn’s success—if you’re not satisfied, we’ll make it right, no questions asked.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-green-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Better for the Environment</h3>
          <p className="text-gray-600">
            We offer eco-friendly lawn care with sustainable packaging, reduced runoff, and planet-safe formulas.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Science-Backed Results</h3>
          <p className="text-gray-600">
           Our products, developed with top soil scientists, are proven to consistently improve your lawn’s health and appearance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyBioGrowthSection;