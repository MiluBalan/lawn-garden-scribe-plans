
import { useState, useEffect } from 'react';

interface SoilData {
  composition: Array<{ name: string; value: number; color: string }>;
  nutrients: Array<{
    name: string;
    level: number;
    status: 'sufficient' | 'needs_more' | 'optimal';
    description: string;
    letter: string;
    color: string;
  }>;
  properties: {
    organicMatter: number;
    pH: number;
  };
}

interface USDAResponse {
  // USDA Web Soil Survey API response structure
  soilData?: {
    texture: string;
    ph: number;
    organicMatter: number;
  };
}

export const useSoilData = (location: string, grassType: string) => {
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        setLoading(true);
        
        if (!location) {
          setError('Location is required');
          return;
        }

        // Try to fetch from USDA Web Soil Survey (requires coordinates)
        // For demo, we'll use realistic regional soil data
        const regionalSoilData = getRegionalSoilData(location, grassType);
        
        setSoilData(regionalSoilData);
        setError(null);
      } catch (err) {
        console.error('Soil data fetch error:', err);
        // Fallback to regional estimates
        const fallbackData = getRegionalSoilData(location, grassType);
        setSoilData(fallbackData);
        setError('Using estimated soil data for your region');
      } finally {
        setLoading(false);
      }
    };

    if (location && grassType) {
      fetchSoilData();
    }
  }, [location, grassType]);

  return { soilData, loading, error };
};

// Generate realistic soil data based on geographic region and grass type
const getRegionalSoilData = (location: string, grassType: string): SoilData => {
  const locationLower = location.toLowerCase();
  
  // Determine soil region
  let soilRegion = 'midwest'; // default
  
  if (locationLower.includes('florida') || locationLower.includes('georgia') || locationLower.includes('alabama')) {
    soilRegion = 'southeast';
  } else if (locationLower.includes('texas') || locationLower.includes('oklahoma') || locationLower.includes('kansas')) {
    soilRegion = 'southcentral';
  } else if (locationLower.includes('california') || locationLower.includes('arizona') || locationLower.includes('nevada')) {
    soilRegion = 'southwest';
  } else if (locationLower.includes('oregon') || locationLower.includes('washington') || locationLower.includes('idaho')) {
    soilRegion = 'northwest';
  } else if (locationLower.includes('maine') || locationLower.includes('vermont') || locationLower.includes('new hampshire')) {
    soilRegion = 'northeast';
  }

  const soilProfiles = {
    southeast: {
      composition: [
        { name: 'Sand', value: 60, color: '#f59e0b' },
        { name: 'Silt', value: 25, color: '#dc2626' },
        { name: 'Clay', value: 15, color: '#65a30d' }
      ],
      ph: 5.8,
      organicMatter: 2.1
    },
    southwest: {
      composition: [
        { name: 'Sand', value: 45, color: '#f59e0b' },
        { name: 'Silt', value: 35, color: '#dc2626' },
        { name: 'Clay', value: 20, color: '#65a30d' }
      ],
      ph: 7.2,
      organicMatter: 1.8
    },
    midwest: {
      composition: [
        { name: 'Silt', value: 45, color: '#dc2626' },
        { name: 'Sand', value: 35, color: '#f59e0b' },
        { name: 'Clay', value: 20, color: '#65a30d' }
      ],
      ph: 6.8,
      organicMatter: 3.2
    },
    northeast: {
      composition: [
        { name: 'Silt', value: 40, color: '#dc2626' },
        { name: 'Sand', value: 35, color: '#f59e0b' },
        { name: 'Clay', value: 25, color: '#65a30d' }
      ],
      ph: 6.5,
      organicMatter: 3.8
    },
    northwest: {
      composition: [
        { name: 'Silt', value: 50, color: '#dc2626' },
        { name: 'Clay', value: 30, color: '#65a30d' },
        { name: 'Sand', value: 20, color: '#f59e0b' }
      ],
      ph: 6.2,
      organicMatter: 4.1
    },
    southcentral: {
      composition: [
        { name: 'Clay', value: 45, color: '#65a30d' },
        { name: 'Silt', value: 35, color: '#dc2626' },
        { name: 'Sand', value: 20, color: '#f59e0b' }
      ],
      ph: 7.5,
      organicMatter: 2.5
    }
  };

  const profile = soilProfiles[soilRegion];
  
  // Adjust nutrients based on grass type requirements
  const nutrients = generateNutrientData(grassType, profile.ph, soilRegion);

  return {
    composition: profile.composition,
    properties: {
      pH: profile.ph,
      organicMatter: profile.organicMatter
    },
    nutrients
  };
};

const generateNutrientData = (grassType: string, pH: number, region: string) => {
  // Base nutrient levels vary by region and grass type
  const baseNutrients = [
    {
      name: 'Nitrogen',
      level: 0,
      status: 'needs_more' as const,
      description: 'Essential for green color and growth',
      letter: 'N',
      color: '#22c55e'
    },
    {
      name: 'Phosphorus',
      level: 45,
      status: 'needs_more' as const,
      description: 'An energy source in plant metabolism',
      letter: 'P',
      color: '#f59e0b'
    },
    {
      name: 'Potassium',
      level: 75,
      status: 'sufficient' as const,
      description: 'Vital to grass ability to endure stress',
      letter: 'K',
      color: '#8b5cf6'
    }
  ];

  // Adjust based on grass type needs
  const warmSeasonGrass = ['bermuda', 'zoysia', 'st_augustine', 'centipede'].includes(grassType);
  
  if (warmSeasonGrass) {
    baseNutrients[0].level = Math.min(85, baseNutrients[0].level + 20); // Higher N for warm season
    baseNutrients[2].level = Math.min(90, baseNutrients[2].level + 10); // Higher K for stress tolerance
  }

  // pH affects nutrient availability
  if (pH < 6.0) {
    baseNutrients[1].level = Math.max(20, baseNutrients[1].level - 15); // P less available in acidic soil
  } else if (pH > 7.5) {
    baseNutrients.forEach(nutrient => {
      if (nutrient.letter !== 'K') {
        nutrient.level = Math.max(20, nutrient.level - 10); // Most nutrients less available in alkaline soil
      }
    });
  }

  return baseNutrients;
};
