import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import grassTexture from '@/assets/grass-texture.jpg';
import locationMap from '@/assets/location-map.jpg';
import wateringSprinkler from '@/assets/watering-sprinkler.jpg';
import problemAreas from '@/assets/problem-areas.jpg';

const FeaturesGrid = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-green-100">
            <img 
              src={grassTexture} 
              alt="Grass texture" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-lg text-gray-900">Grass Type Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Identify your grass type for targeted care recommendations
          </p>
        </CardContent>
      </Card>

      <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-blue-100">
            <img 
              src={locationMap} 
              alt="Location map" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-lg text-gray-900">Location Based</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Climate-specific recommendations for your region
          </p>
        </CardContent>
      </Card>

      <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-orange-100">
            <img 
              src={problemAreas} 
              alt="Problem areas in plants" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="text-lg text-gray-900">Problem Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center">
            Target weeds, pests, and disease issues effectively
          </p>
        </CardContent>
      </Card>

      <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-purple-100">
            <img 
              src={wateringSprinkler} 
              alt="Watering sprinkler" 
              className="w-full h-full object-cover"
            />
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