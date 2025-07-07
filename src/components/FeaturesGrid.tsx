import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, MapPin, Bug, Droplets } from 'lucide-react';

const FeaturesGrid = () => {
  return (
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
  );
};

export default FeaturesGrid;