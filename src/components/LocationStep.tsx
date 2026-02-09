
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useZipcodeAutocomplete } from '@/hooks/useZipcodeAutocomplete';
import { MapPin } from 'lucide-react';
import LocationMapPreview from './LocationMapPreview';

interface LocationStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const LocationStep = ({ data, onUpdate }: LocationStepProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(data.location || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { suggestions } = useZipcodeAutocomplete(inputValue);

  useEffect(() => {
    setInputValue(data.location || '');
  }, [data.location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onUpdate({ location: value });
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onUpdate({ location: suggestion });
    setShowSuggestions(false);
  };

  const sunlightOptions = [
    {
      value: 'full_sun',
      label: 'Full Sun',
      description: '6+ hours of direct sunlight daily',
      icon: '☀️'
    },
    {
      value: 'partial_sun',
      label: 'Partial Sun',
      description: '4-6 hours of direct sunlight daily',
      icon: '⛅'
    },
    {
      value: 'partial_shade',
      label: 'Partial Shade',
      description: '2-4 hours of direct sunlight daily',
      icon: '🌤️'
    },
    {
      value: 'full_shade',
      label: 'Full Shade',
      description: 'Less than 2 hours of direct sunlight daily',
      icon: '🌳'
    }
  ];

  const soilTypes = [
    {
      value: 'clay',
      label: 'Clay Soil',
      description: 'Heavy, dense soil that retains water',
      icon: '🧱'
    },
    {
      value: 'sandy',
      label: 'Sandy Soil',
      description: 'Light, well-draining soil',
      icon: '🏖️'
    },
    {
      value: 'loamy',
      label: 'Loamy Soil',
      description: 'Balanced mix of sand, silt, and clay',
      icon: '🌱'
    },
    {
      value: 'unknown',
      label: 'Not Sure',
      description: 'We\'ll provide general recommendations',
      icon: '❓'
    }
  ];

  return (
    <div className="space-y-8 px-8 max-w-[60rem] mx-auto">
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600">
          Your location and environmental conditions help us create the most accurate care plan for your specific situation.
        </p>
      </div>

      {/* Location Input */}
      <div className="space-y-4 relative">
        <Label htmlFor="location" className="text-lg font-semibold text-gray-900">
          Zip code <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            ref={inputRef}
            id="location"
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="e.g., Austin, TX or 78701"
            className="text-lg p-4"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion.formatted)}
                  className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-900">{suggestion.formatted}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500">
          This helps us provide climate-specific recommendations and timing for your lawn care activities.
        </p>
        <LocationMapPreview location={inputValue} />
      </div>

      {/* Sunlight Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">How much sunlight does your lawn receive? <span className="text-red-500">*</span></h3>
        <div className="grid md:grid-cols-2 gap-4">
          {sunlightOptions.map((option) => (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                data.sunlight === option.value 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => onUpdate({ sunlight: option.value })}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{option.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{option.label}</h4>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Soil Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">What type of soil do you have?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {soilTypes.map((soil) => (
            <Card 
              key={soil.value}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                data.soilType === soil.value 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => onUpdate({ soilType: soil.value })}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{soil.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{soil.label}</h4>
                    <p className="text-gray-600 text-sm">{soil.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-900 mb-2">Soil Test Tip</h4>
        <p className="text-yellow-800 text-sm">
          For the most accurate soil recommendations, consider getting a soil test from your local extension office. 
          This will tell you the exact pH and nutrient levels in your soil.
        </p>
      </div>
    </div>
  );
};

export default LocationStep;
