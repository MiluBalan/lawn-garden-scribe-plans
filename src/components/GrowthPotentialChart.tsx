import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface GrowthPotentialChartProps {
  data: Array<{ month: string; potential: number }>;
}

const GrowthPotentialChart = ({ data }: GrowthPotentialChartProps) => {
  return (
    <Card className="border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-brand" />
          <CardTitle className="text-lg">Growth Potential</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-3 h-3 bg-brand rounded-full"></div>
          <span>Historical</span>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="potential"
              stroke="hsl(var(--brand))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--brand))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GrowthPotentialChart;
