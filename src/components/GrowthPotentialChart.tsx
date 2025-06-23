
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GrowthPotentialChartProps {
  data: Array<{ month: string; potential: number }>;
}

const GrowthPotentialChart = ({ data }: GrowthPotentialChartProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Growth Potential</CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Historical</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, 100]}
            />
            <Line 
              type="monotone" 
              dataKey="potential" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GrowthPotentialChart;
