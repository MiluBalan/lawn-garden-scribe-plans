
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

// Map ZIP code to regional soil profile
const mapZipCodeToRegion = (zipCode: number): string => {
  // Northeast: 00000-14999
  if (zipCode >= 0 && zipCode <= 14999) {
    return 'northeast';
  }
  // Southeast: 20000-39999 (including VA, WV, DC down to FL)
  else if (zipCode >= 20000 && zipCode <= 39999) {
    return 'southeast';
  }
  // Midwest: 40000-56999, 60000-62999 (OH, IN, MI, IL, WI, MN, IA, MO, ND, SD, NE)
  else if ((zipCode >= 40000 && zipCode <= 56999) || (zipCode >= 60000 && zipCode <= 62999)) {
    return 'midwest';
  }
  // South Central: 63000-79999 (KS, OK, TX, AR)
  else if (zipCode >= 63000 && zipCode <= 79999) {
    return 'southcentral';
  }
  // Southwest: 80000-89999 (CO, UT, AZ, NM, NV)
  else if (zipCode >= 80000 && zipCode <= 89999) {
    return 'southwest';
  }
  // Northwest: 97000-99999 (OR, WA)
  else if (zipCode >= 97000 && zipCode <= 99999) {
    return 'northwest';
  }
  // California: 90000-96999
  else if (zipCode >= 90000 && zipCode <= 96999) {
    return 'southwest';
  }
  // Default to midwest for any other ranges
  return 'midwest';
};

// Generate realistic soil data based on geographic region and grass type
const getRegionalSoilData = (location: string, grassType: string): SoilData => {
  const locationLower = location.toLowerCase();
  
  // Determine soil region
  let soilRegion = 'midwest'; // default
  
  // Check if location is a ZIP code (5-digit number)
  const zipMatch = location.match(/\b(\d{5})\b/);
  
  if (zipMatch) {
    const zipCode = parseInt(zipMatch[1]);
    soilRegion = mapZipCodeToRegion(zipCode);
  } else {
    // Use state name matching for non-ZIP inputs
    if (locationLower.includes('florida') || locationLower.includes('georgia') || 
        locationLower.includes('alabama') || locationLower.includes('mississippi') || 
        locationLower.includes('south carolina') || locationLower.includes('north carolina') ||
        locationLower.includes('louisiana')) {
      soilRegion = 'southeast';
    } else if (locationLower.includes('texas') || locationLower.includes('oklahoma') || 
               locationLower.includes('kansas') || locationLower.includes('arkansas')) {
      soilRegion = 'southcentral';
    } else if (locationLower.includes('california') || locationLower.includes('arizona') || 
               locationLower.includes('nevada') || locationLower.includes('new mexico') ||
               locationLower.includes('utah')) {
      soilRegion = 'southwest';
    } else if (locationLower.includes('oregon') || locationLower.includes('washington') || 
               locationLower.includes('idaho') || locationLower.includes('montana') ||
               locationLower.includes('wyoming')) {
      soilRegion = 'northwest';
    } else if (locationLower.includes('maine') || locationLower.includes('vermont') || 
               locationLower.includes('new hampshire') || locationLower.includes('massachusetts') ||
               locationLower.includes('connecticut') || locationLower.includes('rhode island') ||
               locationLower.includes('new york') || locationLower.includes('pennsylvania') ||
               locationLower.includes('new jersey')) {
      soilRegion = 'northeast';
    }
  }

  const soilProfiles = {
    southeast: {
      composition: [
        { name: 'Sand', value: 60, color: '#2687A0' },
        { name: 'Silt', value: 25, color: '#E17765' },
        { name: 'Clay', value: 15, color: '#347856' }
      ],
      ph: 5.8,
      organicMatter: 2.1
    },
    southwest: {
      composition: [
        { name: 'Sand', value: 45, color: '#2687A0' },
        { name: 'Silt', value: 35, color: '#E17765' },
        { name: 'Clay', value: 20, color: '#65a30d' }
      ],
      ph: 7.2,
      organicMatter: 1.8
    },
    midwest: {
      composition: [
        { name: 'Silt', value: 45, color: '#E17765' },
        { name: 'Sand', value: 35, color: '#2687A0' },
        { name: 'Clay', value: 20, color: '#65a30d' }
      ],
      ph: 6.8,
      organicMatter: 3.2
    },
    northeast: {
      composition: [
        { name: 'Silt', value: 40, color: '#E17765' },
        { name: 'Sand', value: 35, color: '#2687A0' },
        { name: 'Clay', value: 25, color: '#65a30d' }
      ],
      ph: 6.5,
      organicMatter: 3.8
    },
    northwest: {
      composition: [
        { name: 'Silt', value: 50, color: '#E17765' },
        { name: 'Clay', value: 30, color: '#65a30d' },
        { name: 'Sand', value: 20, color: '#2687A0' }
      ],
      ph: 6.2,
      organicMatter: 4.1
    },
    southcentral: {
      composition: [
        { name: 'Clay', value: 45, color: '#65a30d' },
        { name: 'Silt', value: 35, color: '#E17765' },
        { name: 'Sand', value: 20, color: '#2687A0' }
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
