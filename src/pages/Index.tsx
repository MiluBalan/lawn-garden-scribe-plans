
import { useState } from 'react';
import LawnQuestionnaire from '@/components/LawnQuestionnaire';
import HeroSection from '@/components/HeroSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import HowItWorksSection from '@/components/HowItWorksSection';
import SoilScienceSection from '@/components/SoilScienceSection';
import WhyBioGrowthSection from '@/components/WhyBioGrowthSection';
import JoinThousandsSection from '@/components/JoinThousandsSection';

interface IndexProps {
  onStartPlan?: () => void;
}

const Index = ({ onStartPlan }: IndexProps) => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const handleStartPlan = () => {
    if (onStartPlan) {
      onStartPlan();
    } else {
      setShowQuestionnaire(true);
    }
  };

  if (showQuestionnaire) {
    return <LawnQuestionnaire onBack={() => setShowQuestionnaire(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <HeroSection onStartPlan={handleStartPlan} />
        <FeaturesGrid />
        <HowItWorksSection />
        <SoilScienceSection />
        <WhyBioGrowthSection />
      </div>
      <JoinThousandsSection onStartPlan={handleStartPlan} />
    </div>
  );
};

export default Index;
