import { useEffect, useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import usMapBg from '@/assets/us-map-bg.jpg';

const AnimatedSoilChart = () => {
  const [animatedValues, setAnimatedValues] = useState({ ph: 0, organic: 0, nitrogen: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => {
              setAnimatedValues({ ph: 68, organic: 32, nitrogen: 60 });
            }, 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div 
      ref={chartRef} 
      className="relative rounded-lg p-6 shadow-md bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${usMapBg})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
      <div className="text-center mb-6">
        <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h4 className="font-semibold text-gray-900 mb-2">Soil Data Analysis</h4>
        <p className="text-sm text-gray-600 mb-4">
          Real soil composition data from your location
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">pH Level:</span>
            <span className="text-sm font-medium">6.8 (Optimal)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${animatedValues.ph}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Organic Matter:</span>
            <span className="text-sm font-medium">3.2%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out delay-200"
              style={{ width: `${animatedValues.organic}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Nitrogen:</span>
            <span className="text-sm font-medium">Medium</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-1000 ease-out delay-400"
              style={{ width: `${animatedValues.nitrogen}%` }}
            ></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AnimatedSoilChart;
