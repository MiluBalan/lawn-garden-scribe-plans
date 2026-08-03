import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Check, Sprout, Boxes, Flower2, Home, ArrowUpNarrowWide, Droplets, Frame, Tent } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useZipcodeAutocomplete } from '@/hooks/useZipcodeAutocomplete';
import LocationMapPreview from './LocationMapPreview';

interface GardenSizeStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const GROWING_SETUP_OPTIONS = [
  { value: 'in-ground', label: 'In-ground Garden', description: 'Planted directly in native soil', icon: Sprout, tile: 'from-emerald-100 to-green-200', color: 'text-emerald-700', accent: 'bg-emerald-500', ring: 'ring-emerald-400 border-emerald-400' },
  { value: 'raised-beds', label: 'Raised Beds', description: 'Framed beds filled with mix', icon: Boxes, tile: 'from-amber-100 to-orange-200', color: 'text-amber-700', accent: 'bg-amber-500', ring: 'ring-amber-400 border-amber-400' },
  { value: 'containers', label: 'Container Gardening', description: 'Pots, planters and grow bags', icon: Flower2, tile: 'from-rose-100 to-pink-200', color: 'text-rose-700', accent: 'bg-rose-500', ring: 'ring-rose-400 border-rose-400' },
  { value: 'greenhouse', label: 'Green House', description: 'Fully enclosed growing structure', icon: Home, tile: 'from-sky-100 to-blue-200', color: 'text-sky-700', accent: 'bg-sky-500', ring: 'ring-sky-400 border-sky-400' },
  { value: 'vertical', label: 'Vertical Garden', description: 'Wall-mounted or stacked systems', icon: ArrowUpNarrowWide, tile: 'from-lime-100 to-emerald-200', color: 'text-lime-700', accent: 'bg-lime-500', ring: 'ring-lime-400 border-lime-400' },
  { value: 'hydroponics', label: 'Hydroponics', description: 'Soilless, water-based growing', icon: Droplets, tile: 'from-cyan-100 to-sky-200', color: 'text-cyan-700', accent: 'bg-cyan-500', ring: 'ring-cyan-400 border-cyan-400' },
  { value: 'cold-frames', label: 'Cold Frames', description: 'Low covered beds for season extension', icon: Frame, tile: 'from-slate-100 to-gray-200', color: 'text-slate-700', accent: 'bg-slate-500', ring: 'ring-slate-400 border-slate-400' },
  { value: 'high-tunnels', label: 'High Tunnels', description: 'Hoop houses and poly tunnels', icon: Tent, tile: 'from-violet-100 to-purple-200', color: 'text-violet-700', accent: 'bg-violet-500', ring: 'ring-violet-400 border-violet-400' },
];

const GardenSizeStep = ({ data, onUpdate }: GardenSizeStepProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(data.location || '');

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { suggestions, loading } = useZipcodeAutocomplete(inputValue);

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

  return (
    <div className="space-y-10 px-4 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-12 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
            <Sprout className="h-4 w-4" />
            Growing Setup
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What type of{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              growing setup
            </span>{' '}
            do you have?&nbsp;<span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Tell us about your growing space so we can tailor every recommendation.
          </p>
        </div>
      </div>

      {/* Setup options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GROWING_SETUP_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = data.growingSetup === option.value;
          return (
            <Card
              key={option.value}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
                isSelected ? `bg-gradient-to-br from-white to-gray-50 ${option.ring}` : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onUpdate({ growingSetup: option.value })}
            >
              <CardContent className="p-5 relative">
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${option.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.tile} flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex-shrink-0`}>
                    <Icon className={`h-7 w-7 ${option.color}`} />
                  </div>
                  <div className="flex-1 pr-6">
                    <h4 className="font-semibold text-gray-900">{option.label}</h4>
                    <p className="text-gray-600 text-sm">{option.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Location */}
      <div className="space-y-4 relative">
        <Label className="text-lg font-semibold">
          Address or zip code&nbsp;<span className="text-red-500">*</span>
        </Label>

        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500 z-10" />
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleLocationChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="e.g., 123 Main St, Austin TX  •  Austin, TX  •  78701"
            className="text-lg p-4 pl-12 rounded-xl border-2 focus-visible:ring-emerald-400"
          />

          {showSuggestions && (suggestions.length > 0 || loading) && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-emerald-100 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {loading && suggestions.length === 0 && (
                <div className="px-4 py-3 text-gray-500 text-sm">Searching…</div>
              )}
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s.formatted)}
                  className="w-full px-4 py-3 text-left hover:bg-emerald-50 flex gap-2 items-center transition-colors"
                >
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {s.formatted}
                </button>
              ))}
            </div>
          )}
        </div>

        <LocationMapPreview location={inputValue} onAreaChange={() => {}} />
      </div>
    </div>
  );
};

export default GardenSizeStep;
