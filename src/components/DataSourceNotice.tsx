
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DataSourceNotice = () => {
  return (
    <Card className="mb-8 border-0 shadow-xl bg-blue-50 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl text-center text-blue-900">Data Sources</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-blue-800 text-sm mb-2">
          This plan uses regional climate data and soil estimates based on your location.
        </p>
        <p className="text-blue-700 text-xs">
          For the most accurate soil analysis, we recommend getting a professional soil test from your local extension office.
          Weather data is estimated based on regional climate patterns.
        </p>
      </CardContent>
    </Card>
  );
};

export default DataSourceNotice;
