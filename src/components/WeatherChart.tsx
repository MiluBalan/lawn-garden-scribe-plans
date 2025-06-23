
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherChartProps {
  title: string;
  data: Array<{ month: string; value: number; historical?: number }>;
  color: string;
  unit: string;
}

const WeatherChart = ({ title, data, color, unit }: WeatherChartProps) => {
  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }}></div>
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
              label={{ value: unit, angle: -90, position: 'insideLeft' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;
