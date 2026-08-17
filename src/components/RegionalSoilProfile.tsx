import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { MapPin, Sprout, Layers, Ruler, CheckCircle2 } from 'lucide-react';

interface SoilComposition {
  name: string;
  value: number;
  color: string;
}

interface RegionalSoilProfileProps {
  location: string;
  soilComposition: SoilComposition[];
  grassType: string;
  soilType: string;
  lawnSize: string;
}

const RegionalSoilProfile = ({ location, soilComposition, grassType, soilType, lawnSize }: RegionalSoilProfileProps) => {
  return (
    <Card className="border-0 shadow-[var(--shadow-card)] bg-white/90 backdrop-blur rounded-3xl overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center">
            <MapPin className="h-6 w-6 text-brand" />
          </div>
          <div>
            <CardTitle className="text-xl md:text-2xl">Your Lawn</CardTitle>
            <p className="text-muted-foreground text-sm">{location}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Lawn Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-surface-green border border-border/60">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Sprout className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{grassType}</p>
                <p className="text-sm text-muted-foreground">grass</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-surface-warm border border-border/60">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Layers className="h-5 w-5 text-brand-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{soilType}</p>
                <p className="text-sm text-muted-foreground">soil</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-surface-green border border-border/60">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Ruler className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{lawnSize}</p>
                <p className="text-sm text-muted-foreground">size</p>
              </div>
            </div>

            <div className="bg-brand-light p-4 rounded-2xl border border-brand/20 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-brand-dark">Plan ready!</span>
              </div>
            </div>
          </div>

          {/* Regional Soil Profile Chart */}
          <div className="bg-surface-green/50 rounded-3xl p-6 border border-border/60">
            <h4 className="font-semibold text-foreground mb-4 text-center">Regional Soil Profile</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={soilComposition}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={85}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {soilComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={40}
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
