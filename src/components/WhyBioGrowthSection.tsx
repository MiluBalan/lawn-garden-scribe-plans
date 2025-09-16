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
        <p className="text-gray-600 max-w-4xl mx-auto">
          At BioGrowth Organics, we believe a truly healthy lawn starts below the surface. That's why every plan, 
          product, and process we use is designed to improve soil health, promote sustainable growth, and protect 
          the people and pets who enjoy your yard most.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 place-items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Family-Safe, Pet-Safe Formulas</h3>
          <p className="text-gray-600">
            Our products are made with natural, non-toxic ingredients that are safe for your kids, pets, and the planet. 
            No synthetic chemicals, no harsh residues—just effective, earth-friendly care.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sprout className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Soil-First, Always</h3>
          <p className="text-gray-600">
            We don't just treat the grass—we nurture the living ecosystem beneath it. Our plan is built to enhance 
            microbial activity, improve organic matter, and restore long-term soil balance, naturally.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible, Hassle-Free Subscriptions</h3>
          <p className="text-gray-600">
            Whether you're starting from scratch or maintaining your lawn year-round, our customizable plans adapt to 
            your needs. Pause, skip, or adjust your shipments anytime with ease—no hidden fees, no stress.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Satisfaction Guarantee</h3>
          <p className="text-gray-600">
            We stand behind our products and your results. If you're not satisfied, we'll make it right—no questions asked. 
            Your lawn's success is our top priority.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-green-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Better for the Environment</h3>
          <p className="text-gray-600">
            We're proud to offer a greener alternative to traditional lawn care. Our carbon-conscious packaging, 
            reduced nitrogen runoff, and eco-friendly formulas all support a healthier planet—one yard at a time.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Science-Backed Results</h3>
          <p className="text-gray-600">
            Our formulations are developed with leading soil scientists and backed by years of research. Every product 
            is tested and proven to deliver consistent, measurable improvements to your lawn's health and appearance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyBioGrowthSection;