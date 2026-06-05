import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Sun, CloudSun, CloudFog, Trees, Layers, Waves, Sprout, HelpCircle, Check, FlaskConical } from 'lucide-react';
import { useZipcodeAutocomplete } from '@/hooks/useZipcodeAutocomplete';

interface LocationStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const LocationStep = ({ data, onUpdate }: LocationStepProps) => {
  const [inputValue, setInputValue] = useState(data.location || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { suggestions } = useZipcodeAutocomplete(inputValue);

  useEffect(() => {
    setInputValue(data.location || '');
  }, [data.location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationChange = (value: string) => {
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
    { value: 'full_sun', label: 'Full Sun', description: '6+ hours of direct sunlight daily', icon: Sun, tile: 'from-amber-100 to-yellow-200', color: 'text-amber-600', accent: 'bg-amber-500', ring: 'ring-amber-400 border-amber-400' },
    { value: 'partial_sun', label: 'Partial Sun', description: '4-6 hours of direct sunlight daily', icon: CloudSun, tile: 'from-orange-100 to-amber-200', color: 'text-orange-600', accent: 'bg-orange-500', ring: 'ring-orange-400 border-orange-400' },
    { value: 'partial_shade', label: 'Partial Shade', description: '2-4 hours of direct sunlight daily', icon: CloudFog, tile: 'from-sky-100 to-blue-200', color: 'text-sky-600', accent: 'bg-sky-500', ring: 'ring-sky-400 border-sky-400' },
    { value: 'full_shade', label: 'Full Shade', description: 'Less than 2 hours of direct sunlight daily', icon: Trees, tile: 'from-emerald-100 to-green-200', color: 'text-emerald-700', accent: 'bg-emerald-500', ring: 'ring-emerald-400 border-emerald-400' },
  ];

  const soilTypes = [
    { value: 'clay', label: 'Clay Soil', description: 'Heavy, dense soil that retains water', icon: Layers, tile: 'from-orange-100 to-rose-200', color: 'text-orange-700', accent: 'bg-orange-500', ring: 'ring-orange-400 border-orange-400' },
    { value: 'sandy', label: 'Sandy Soil', description: 'Light, well-draining soil', icon: Waves, tile: 'from-amber-100 to-yellow-200', color: 'text-amber-700', accent: 'bg-amber-500', ring: 'ring-amber-400 border-amber-400' },
    { value: 'loamy', label: 'Loamy Soil', description: 'Balanced mix of sand, silt, and clay', icon: Sprout, tile: 'from-emerald-100 to-green-200', color: 'text-emerald-700', accent: 'bg-emerald-500', ring: 'ring-emerald-400 border-emerald-400' },
    { value: 'unknown', label: 'Not Sure', description: "We'll provide general recommendations", icon: HelpCircle, tile: 'from-gray-100 to-slate-200', color: 'text-gray-600', accent: 'bg-gray-500', ring: 'ring-gray-400 border-gray-400' },
  ];

  return (
    <div className="space-y-10 px-4 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-8 md:p-12 shadow-sm border border-sky-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-sky-200 text-sky-700 text-sm font-medium shadow-sm">
            <MapPin className="h-4 w-4" />
            Location & Environment
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Where is your{' '}
            <span className="bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              green space?
            </span>
          </h2>
          <p className="text-gray-700 text-lg">
            Your environmental conditions help us create the most accurate care plan for your specific situation.
          </p>
        </div>
      </div>

      {/* Location / Zip Code */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          What is your zip code or city? <span className="text-red-500">*</span>
        </h3>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-500" />
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleLocationChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="e.g., Austin, TX or 78701"
            className="text-lg p-4 pl-12 rounded-xl border-2 focus-visible:ring-sky-400"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-sky-100 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s.formatted)}
                  className="w-full px-4 py-3 text-left hover:bg-sky-50 flex gap-2 items-center transition-colors"
                >
                  <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
                  <span>{s.formatted}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sunlight Conditions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          How much sunlight does your lawn receive? <span className="text-red-500">*</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {sunlightOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = data.sunlight === option.value;
            return (
              <Card
                key={option.value}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
                  isSelected ? `bg-gradient-to-br from-white to-gray-50 ${option.ring}` : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onUpdate({ sunlight: option.value })}
              >
                <CardContent className="p-5 relative">
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${option.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.tile} flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 ${option.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{option.label}</h4>
                      <p className="text-gray-600 text-sm">{option.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Soil Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">What type of soil do you have?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {soilTypes.map((soil) => {
            const Icon = soil.icon;
            const isSelected = data.soilType === soil.value;
            return (
              <Card
                key={soil.value}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
                  isSelected ? `bg-gradient-to-br from-white to-gray-50 ${soil.ring}` : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onUpdate({ soilType: soil.value })}
              >
                <CardContent className="p-5 relative">
                  <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${soil.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${soil.tile} flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 ${soil.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{soil.label}</h4>
                      <p className="text-gray-600 text-sm">{soil.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 mb-1">Soil Test Tip</h4>
            <p className="text-amber-800 text-sm leading-relaxed">
              For the most accurate soil recommendations, consider getting a soil test from your local extension office. This will tell you the exact pH and nutrient levels in your soil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
