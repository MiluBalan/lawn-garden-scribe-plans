
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface SoilComposition {
  name: string;
  value: number;
  color: string;
}

interface RegionalSoilProfileProps {
  location: string;
  soilComposition: SoilComposition[];
  grassType: string;
  lawnSize: string;
}

const RegionalSoilProfile = ({ location, soilComposition, grassType, lawnSize }: RegionalSoilProfileProps) => {
  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-bold text-lg">🌍</span>
          </div>
          <div>
            <CardTitle className="text-xl">Your Lawn</CardTitle>
            <p className="text-gray-600">{location}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lawn Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                <span className="text-green-600">🌱</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{grassType}</p>
                <p className="text-sm text-gray-600">grass</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                <span className="text-orange-600">🏡</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{lawnSize}</p>
                <p className="text-sm text-gray-600">soil</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-blue-600">📏</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">5,000 sq. ft</p>
                <p className="text-sm text-gray-600">size</p>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="font-semibold text-green-800">Plan ready!</span>
              </div>
            </div>
          </div>

          {/* Regional Soil Profile Chart */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-center">Regional Soil Profile</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={soilComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {soilComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => `${value} (${entry.payload.value}%)`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalSoilProfile;
