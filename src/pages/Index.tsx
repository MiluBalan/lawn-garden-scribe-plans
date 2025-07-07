
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Leaf, MapPin, Bug, Droplets, Shield, Sprout, Package, Award, Globe, CheckCircle } from 'lucide-react';
import LawnQuestionnaire from '@/components/LawnQuestionnaire';
import AnimatedSoilChart from '@/components/AnimatedSoilChart';

const Index = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  if (showQuestionnaire) {
    return <LawnQuestionnaire onBack={() => setShowQuestionnaire(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
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
            onClick={() => setShowQuestionnaire(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Start Your Lawn Plan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Grass Type Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Identify your grass type for targeted care recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Location Based</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Climate-specific recommendations for your region
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bug className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Problem Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Target weeds, pests, and disease issues effectively
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg text-gray-900">Watering Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Optimal watering times and frequency for your lawn
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Answer Questions</h3>
              <p className="text-gray-600">
                Tell us about your lawn size, grass type, and current challenges
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Get Your Plan</h3>
              <p className="text-gray-600">
                Receive a customized lawn care plan with specific recommendations
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Achieve Results</h3>
              <p className="text-gray-600">
                Follow your plan and watch your lawn transform into its best version
              </p>
            </div>
          </div>
        </div>

        {/* Powered by Real Soil Data Section */}
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
                Using advanced soil datasets (like SoilGrids and USDA soil maps) combined with climate insights from your ZIP code, 
                we build a tailored plan that supports healthy roots, stronger grass, and long-term soil improvement.
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
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">We make sure every treatment serves a purpose—not just surface green.</p>
                </div>
              </div>
              
              <p className="text-gray-800 font-medium mt-6">
                This is lawn care that works with nature, not against it.
              </p>
            </div>
            
            <AnimatedSoilChart />
          </div>
        </div>

        {/* Why BioGrowth Organics Section */}
        <div className="bg-green-50 rounded-2xl p-8 shadow-lg mb-16">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
          </div>
        </div>
      </div>

      {/* Join Thousands Section with Lush Lawn Background */}
      <div 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiIGZpbGw9IiMyMmM1NWUiLz48cGF0aCBkPSJNMCAxMDgwSDk2MEw5NjAgNTQwSDEwODBIMTA4MFYxMDgwSDE5MjBWMEg5NjBWNTQwSDkwMFY0MDBIMTMyMFY2MDBIMTkwMFYxMDgwWiIgZmlsbD0iIzE2YTM0YSIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Thousands of Homeowners Switching to Smarter, Safer Lawn Care
            </h2>
            <p className="text-xl text-white mb-8 opacity-90">
              Transform your lawn with BioGrowth Organics' science-backed, family-safe approach to lawn care.
            </p>
            <Button 
              onClick={() => setShowQuestionnaire(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-xl rounded-xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105"
            >
              Start My Custom Plan
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
