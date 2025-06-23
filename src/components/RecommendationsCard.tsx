
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface RecommendationsCardProps {
  lawnData: any;
}

const RecommendationsCard = ({ lawnData }: RecommendationsCardProps) => {
  const getRecommendations = () => {
    const recs = [];
    
    // Size-based recommendations
    if (lawnData.size === 'small' || (lawnData.size.includes('custom_') && parseInt(lawnData.size.split('_')[1]) < 5000)) {
      recs.push('Consider organic fertilizers for small lawn areas');
    }
    
    // Grass type recommendations
    if (['bermuda', 'zoysia'].includes(lawnData.grassType)) {
      recs.push('Warm-season grass: Focus care from late spring through early fall');
    } else if (['kentucky_blue', 'tall_fescue', 'fine_fescue'].includes(lawnData.grassType)) {
      recs.push('Cool-season grass: Peak growing seasons are spring and fall');
    }
    
    // Sunlight recommendations
    if (lawnData.sunlight === 'partial_shade' || lawnData.sunlight === 'full_shade') {
      recs.push('Shade-tolerant fertilizer and reduced mowing frequency recommended');
    }
    
    // Problem-specific recommendations
    if (lawnData.problems?.includes('weeds')) {
      recs.push('Pre-emergent herbicide application in early spring is crucial');
    }
    if (lawnData.problems?.includes('thin_patches')) {
      recs.push('Overseed thin areas in fall for cool-season grass, spring for warm-season');
    }
    if (lawnData.problems?.includes('compaction')) {
      recs.push('Core aeration recommended in spring or fall');
    }
    
    return recs;
  };

  return (
    <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Key Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {getRecommendations().map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
