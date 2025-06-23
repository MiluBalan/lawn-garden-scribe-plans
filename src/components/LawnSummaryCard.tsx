
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import RegionalSoilProfile from './RegionalSoilProfile';

interface LawnSummaryCardProps {
  lawnData: any;
  soilData: any;
}

const LawnSummaryCard = ({ lawnData, soilData }: LawnSummaryCardProps) => {
  const getSizeDisplay = () => {
    if (lawnData.size.startsWith('custom_')) {
      return `${lawnData.size.split('_')[1]} sq ft`;
    }
    switch (lawnData.size) {
      case 'small': return 'Small (Under 5,000 sq ft)';
      case 'medium': return 'Medium (5,000-10,000 sq ft)';
      case 'large': return 'Large (10,000-20,000 sq ft)';
      case 'xlarge': return 'Extra Large (20,000+ sq ft)';
      default: return 'Unknown size';
    }
  };

  const getGrassDisplay = () => {
    const grassMap: { [key: string]: string } = {
      'bermuda': 'Bermuda Grass',
      'kentucky_blue': 'Kentucky Bluegrass',
      'tall_fescue': 'Tall Fescue',
      'zoysia': 'Zoysia Grass',
      'st_augustine': 'St. Augustine',
      'centipede': 'Centipede Grass',
      'fine_fescue': 'Fine Fescue',
      'unknown': 'Mixed/Unknown'
    };
    return grassMap[lawnData.grassType] || 'Unknown';
  };

  if (!soilData) return null;

  return (
    <div className="mb-8">
      <RegionalSoilProfile
        location={lawnData.location}
        soilComposition={soilData.composition}
        grassType={getGrassDisplay()}
        lawnSize={getSizeDisplay()}
      />
    </div>
  );
};

export default LawnSummaryCard;
