
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Home, MapPin } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useZipcodeAutocomplete } from '@/hooks/useZipcodeAutocomplete';
import LocationMapPreview from './LocationMapPreview';

interface LawnSizeStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const LawnSizeStep = ({ data, onUpdate }: LawnSizeStepProps) => {
  const [customSize, setCustomSize] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
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

  const sizeOptions = [
    { label: 'Small (Under 5,000 sq ft)', value: 'small', icon: '🏠' },
    { label: 'Medium (5,000 - 10,000 sq ft)', value: 'medium', icon: '🏡' },
    { label: 'Large (10,000 - 20,000 sq ft)', value: 'large', icon: '🏘️' },
    { label: 'Extra Large (Over 20,000 sq ft)', value: 'xlarge', icon: '🏞️' }
  ];

  const calculateArea = () => {
    if (length && width) {
      const area = parseInt(length) * parseInt(width);
      setCustomSize(area.toString());
      onUpdate({ size: `custom_${area}` });
      setShowCalculator(false);
    }
  };

  return (
    <div className="space-y-6 px-8 max-w-[60rem] mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How big is your lawn? <span className="text-red-500">*</span>
        </h2>
        <p className="text-lg text-gray-600">
          Let's start by understanding the size of your lawn. This helps us recommend the right amount of products and care.
        </p>
      </div>

      {/* Zip Code Input */}
      <div className="space-y-4 relative mb-8">
        <Label htmlFor="location" className="text-lg font-semibold text-gray-900">
          Zip code <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            ref={inputRef}
            id="location"
            type="text"
            value={inputValue}
            onChange={(e) => handleLocationChange(e.target.value)}
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

      {/* Size Options */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {sizeOptions.map((option) => (
          <Card 
            key={option.value}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
              data.size === option.value 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => onUpdate({ size: option.value })}
          >
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">{option.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{option.label}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calculator Option */}
      <div className="border-t pt-6">
        <div className="text-center mb-4">
          <p className="text-gray-600 mb-4">Don't know your lawn size?</p>
          <Button
            variant="outline"
            onClick={() => setShowCalculator(!showCalculator)}
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Use Size Calculator
          </Button>
        </div>

        {showCalculator && (
          <Card className="mt-4 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 text-gray-900">Calculate Your Lawn Size</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="length">Length (feet)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Enter length"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="width">Width (feet)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Enter width"
                    className="mt-1"
                  />
                </div>
              </div>
              <Button 
                onClick={calculateArea}
                disabled={!length || !width}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Calculate Area
              </Button>
              {customSize && (
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <p className="text-center">
                    <span className="font-semibold">Your lawn size:</span> {customSize} square feet
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Manual Input */}
      <div className="border-t pt-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Or enter your lawn size manually:</p>
          <div className="max-w-md mx-auto">
            <Label htmlFor="manual-size">Lawn Size (square feet)</Label>
            <Input
              id="manual-size"
              type="number"
              value={customSize}
              onChange={(e) => {
                setCustomSize(e.target.value);
                onUpdate({ size: `custom_${e.target.value}` });
              }}
              placeholder="Enter square footage"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawnSizeStep;
