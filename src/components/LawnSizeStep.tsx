import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useZipcodeAutocomplete } from "@/hooks/useZipcodeAutocomplete";
import LocationMapPreview from "./LocationMapPreview";

interface LawnSizeStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

type KnowledgeMode = "known" | "unknown" | null;

const LawnSizeStep = ({ data, onUpdate }: LawnSizeStepProps) => {
  const [customSize, setCustomSize] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(data.location || "");
  const [knowledgeMode, setKnowledgeMode] = useState<KnowledgeMode>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { suggestions } = useZipcodeAutocomplete(inputValue);

  useEffect(() => {
    setInputValue(data.location || "");
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    { label: "Small (Under 5,000 sq ft)", value: "small", icon: "🏠" },
    { label: "Medium (5,000 - 10,000 sq ft)", value: "medium", icon: "🏡" },
    { label: "Large (10,000 - 20,000 sq ft)", value: "large", icon: "🏘️" },
    { label: "Extra Large (Over 20,000 sq ft)", value: "xlarge", icon: "🏞️" },
  ];

  // 🔢 Calculator
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
      {/* HEADER */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How big is your lawn? <span className="text-red-500">*</span>
        </h2>
        <p className="text-lg text-gray-600">
          Let's start by understanding the size of your lawn.
        </p>
      </div>

      {/* STEP 1: KNOWLEDGE */}
      <div className="text-center mb-6">
        <p className="text-lg font-medium text-gray-800 mb-4">
          Do you know your lawn size?
        </p>

        <div className="flex justify-center gap-4">
          <Button
            variant={knowledgeMode === "known" ? "default" : "outline"}
            onClick={() => {
              setKnowledgeMode("known");
              setCustomSize("");
              onUpdate({ size: null });
            }}
          >
            Yes
          </Button>

          <Button
            variant={knowledgeMode === "unknown" ? "default" : "outline"}
            onClick={() => {
              setKnowledgeMode("unknown");
              setCustomSize("");
              onUpdate({ size: null });
            }}
          >
            No
          </Button>
        </div>
      </div>

      {/* ZIPCODE + MAP (ONLY IF UNKNOWN) */}
      {knowledgeMode === "unknown" && (
        <div className="space-y-4 relative mb-8">
          <Label className="text-lg font-semibold">
            Zip code <span className="text-red-500">*</span>
          </Label>

          <div className="relative">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => handleLocationChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g., Austin, TX or 78701"
              className="text-lg p-4"
            />

            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50"
              >
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s.formatted)}
                    className="w-full px-4 py-3 text-left hover:bg-green-50 flex gap-2"
                  >
                    <MapPin className="w-4 h-4 text-green-600" />
                    {s.formatted}
                  </button>
                ))}
              </div>
            )}
          </div>

          <LocationMapPreview
            location={inputValue}
            onAreaChange={(area) => {
              setCustomSize(area.toString());
              onUpdate({ size: `custom_${area}` });
            }}
          />
        </div>
      )}

      {/* SIZE CARDS (ONLY IF KNOWN) */}
      {knowledgeMode === "known" && (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {sizeOptions.map((option) => (
            <Card
              key={option.value}
              className={`cursor-pointer border-2 ${
                data.size === option.value
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
              onClick={() => onUpdate({ size: option.value })}
            >
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{option.icon}</div>
                <h3 className="font-semibold text-gray-900">{option.label}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* CALCULATOR (ONLY IF KNOWN) */}
      {knowledgeMode === "known" && (
        <div className="border-t pt-6">
          <div className="text-center mb-4">
            <Button
              variant="outline"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Use Size Calculator
            </Button>
          </div>

          {showCalculator && (
            <Card className="mt-4 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Length (ft)"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                  <Input
                    placeholder="Width (ft)"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                </div>

                <Button
                  onClick={calculateArea}
                  disabled={!length || !width}
                  className="w-full"
                >
                  Calculate Area
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* MANUAL INPUT (ONLY IF UNKNOWN) */}
      {knowledgeMode === "unknown" && (
        <div className="border-t pt-6">
          <div className="text-center">
            <Label>Lawn Size (square feet)</Label>
            <Input
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
      )}
    </div>
  );
};

export default LawnSizeStep;
