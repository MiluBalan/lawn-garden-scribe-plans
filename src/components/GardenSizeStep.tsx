import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, MapPin, Check, Ruler, Sprout, Trees, TreePine, Mountain } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useZipcodeAutocomplete } from '@/hooks/useZipcodeAutocomplete';
import LocationMapPreview from './LocationMapPreview';
import { GARDEN_SIZE_OPTIONS } from '@/lib/garden';

interface GardenSizeStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

type KnowledgeMode = 'known' | 'unknown' | null;

const sizeIcons: Record<string, React.ElementType> = {
  small: Sprout,
  medium: Trees,
  large: TreePine,
  xlarge: Mountain,
};

const sizeStyles: Record<string, { gradient: string; tile: string; color: string; accent: string; ring: string }> = {
  small: { gradient: 'from-sky-50 via-white to-sky-50/40', tile: 'from-sky-100 to-sky-200', color: 'text-sky-700', accent: 'bg-sky-500', ring: 'ring-sky-400 border-sky-400' },
  medium: { gradient: 'from-emerald-50 via-white to-emerald-50/40', tile: 'from-emerald-100 to-emerald-200', color: 'text-emerald-700', accent: 'bg-emerald-500', ring: 'ring-emerald-400 border-emerald-400' },
  large: { gradient: 'from-amber-50 via-white to-amber-50/40', tile: 'from-amber-100 to-amber-200', color: 'text-amber-700', accent: 'bg-amber-500', ring: 'ring-amber-400 border-amber-400' },
  xlarge: { gradient: 'from-violet-50 via-white to-violet-50/40', tile: 'from-violet-100 to-violet-200', color: 'text-violet-700', accent: 'bg-violet-500', ring: 'ring-violet-400 border-violet-400' },
};

const GardenSizeStep = ({ data, onUpdate }: GardenSizeStepProps) => {
  const [customSize, setCustomSize] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(data.location || '');
  const [knowledgeMode, setKnowledgeMode] = useState<KnowledgeMode>(
    data.gardenSize ? 'known' : null
  );

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

  const calculateArea = () => {
    if (length && width) {
      const area = parseInt(length) * parseInt(width);
      setCustomSize(area.toString());
      onUpdate({ gardenSize: `custom_${area}` });
      setShowCalculator(false);
    }
  };

  return (
    <div className="space-y-10 px-4 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-12 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
            <Ruler className="h-4 w-4" />
            Garden Size
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How big is your{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              garden?
            </span>{' '}
            <span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Let's start by understanding the size of your garden.
          </p>
        </div>
      </div>

      {/* Knowledge toggle */}
      <div className="text-center">
        <p className="text-lg font-medium text-gray-800 mb-4">Do you know your garden size?</p>
        <div className="inline-flex gap-3 p-1 bg-gray-100 rounded-full">
          <Button
            variant={knowledgeMode === 'known' ? 'default' : 'ghost'}
            className={`rounded-full px-6 ${knowledgeMode === 'known' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow' : ''}`}
            onClick={() => {
              setKnowledgeMode('known');
              setCustomSize('');
              onUpdate({ gardenSize: '' });
            }}
          >
            Yes
          </Button>
          <Button
            variant={knowledgeMode === 'unknown' ? 'default' : 'ghost'}
            className={`rounded-full px-6 ${knowledgeMode === 'unknown' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow' : ''}`}
            onClick={() => {
              setKnowledgeMode('unknown');
              setCustomSize('');
              onUpdate({ gardenSize: '' });
            }}
          >
            No
          </Button>
        </div>
      </div>

      {/* Location */}
      {knowledgeMode && (
        <div className="space-y-4 relative animate-fade-in">
          <Label className="text-lg font-semibold">
            Address or zip code <span className="text-red-500">*</span>
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

          <LocationMapPreview
            location={inputValue}
            isActive={knowledgeMode === 'unknown'}
            onAreaChange={(area) => {
              if (knowledgeMode !== 'unknown') return;
              onUpdate({ gardenSize: `custom_${area}` });
            }}
          />
        </div>
      )}

      {/* Known mode → cards */}
      {knowledgeMode === 'known' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
          {GARDEN_SIZE_OPTIONS.map((option) => {
            const Icon = sizeIcons[option.icon] || Sprout;
            const style = sizeStyles[option.icon] || sizeStyles.small;
            const isSelected = data.gardenSize === option.value;
            return (
              <Card
                key={option.value}
                className={`group relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden bg-gradient-to-br ${style.gradient} ${isSelected ? style.ring : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => {
                  setCustomSize('');
                  onUpdate({ gardenSize: option.value });
                }}
              >
                <CardContent className="p-8 text-center relative">
                  <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? `${style.accent} scale-100 opacity-100` : 'scale-0 opacity-0'}`}>
                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                  </div>
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${style.tile} flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon className={`h-10 w-10 ${style.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{option.label}</h3>
                  <p className="text-gray-600 text-sm mt-1">{option.detail}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Calculator */}
      {knowledgeMode === 'known' && (
        <div className="border-t border-gray-200 pt-6">
          <div className="text-center mb-4">
            <Button
              variant="outline"
              onClick={() => setShowCalculator(!showCalculator)}
              className="rounded-full border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
            >
              <Calculator className="mr-2 h-4 w-4 text-emerald-600" />
              Use Size Calculator
            </Button>
          </div>

          {showCalculator && (
            <Card className="mt-4 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-md animate-fade-in">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Length (ft)"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="rounded-xl border-2 focus-visible:ring-emerald-400"
                  />
                  <Input
                    placeholder="Width (ft)"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="rounded-xl border-2 focus-visible:ring-emerald-400"
                  />
                </div>
                <Button
                  onClick={calculateArea}
                  disabled={!length || !width}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow"
                >
                  Calculate Area
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Unknown mode */}
      {knowledgeMode === 'unknown' && (
        <div className="border-t border-gray-200 pt-6 animate-fade-in">
          <div className="text-center max-w-md mx-auto">
            <Label className="text-base font-medium text-gray-900">Garden Size (square feet)</Label>
            <Input
              type="number"
              value={customSize}
              onChange={(e) => {
                setCustomSize(e.target.value);
                onUpdate({ gardenSize: `custom_${e.target.value}` });
              }}
              placeholder="Enter square footage"
              className="mt-2 rounded-xl border-2 focus-visible:ring-emerald-400 text-center text-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GardenSizeStep;
