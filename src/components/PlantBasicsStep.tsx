import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Sprout, Leaf, TreePine, Shuffle, Sun, Cloud, CloudSnow, Home, Flower2, Carrot, Apple, Grape, Salad, Wheat } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PlantBasicsData {
  plantType: string;
  growthStage: string;
  plantingSeason: string;
  plantSubtype: string;
}

interface PlantBasicsStepProps {
  data: PlantBasicsData;
  onUpdate: (data: Partial<PlantBasicsData>) => void;
}

type Option = { value: string; label: string; icon: LucideIcon; description?: string };

const growthStageOptions: Option[] = [
  { value: "seeds", label: "Seeds", icon: Sprout, description: "Starting from scratch" },
  { value: "seedlings", label: "Seedlings / starts", icon: Leaf, description: "Young transplants" },
  { value: "established", label: "Established plants", icon: TreePine, description: "Already growing" },
  { value: "mix", label: "Mix of these", icon: Shuffle, description: "A bit of everything" },
];

const seasonOptions: Option[] = [
  { value: "spring", label: "Spring", icon: Flower2, description: "Mar – May" },
  { value: "summer", label: "Summer", icon: Sun, description: "Jun – Aug" },
  { value: "fall", label: "Fall", icon: Cloud, description: "Sep – Nov" },
  { value: "year-round", label: "Year-round / indoor", icon: Home, description: "Anytime" },
];

const subtypeOptionsByPlant: Record<string, { question: string; options: Option[] }> = {
  flowers: {
    question: "What type of flowers are you growing?",
    options: [
      { value: "annuals", label: "Annuals", icon: Flower2, description: "Bloom one season" },
      { value: "perennials", label: "Perennials", icon: Leaf, description: "Return each year" },
      { value: "bulbs", label: "Bulbs", icon: Sprout, description: "Tulips, daffodils…" },
      { value: "mix", label: "Mix", icon: Shuffle, description: "Combination" },
    ],
  },
  vegetables: {
    question: "What vegetables are you primarily growing?",
    options: [
      { value: "leafy-greens", label: "Leafy greens", icon: Salad, description: "Lettuce, kale, spinach" },
      { value: "root-vegetables", label: "Root vegetables", icon: Carrot, description: "Carrots, beets, radishes" },
      { value: "fruiting", label: "Fruiting vegetables", icon: Apple, description: "Tomatoes, peppers" },
      { value: "herbs", label: "Herbs", icon: Wheat, description: "Basil, mint, parsley" },
      { value: "mix", label: "Mix", icon: Shuffle, description: "A bit of everything" },
    ],
  },
  fruits: {
    question: "What type of fruit plants?",
    options: [
      { value: "berry-bushes", label: "Berry bushes", icon: Sprout, description: "Blueberries, raspberries" },
      { value: "fruit-trees", label: "Fruit trees", icon: TreePine, description: "Apple, peach, citrus" },
      { value: "vines", label: "Vines", icon: Grape, description: "Grapes, melons" },
      { value: "mix", label: "Mix", icon: Shuffle, description: "Combination" },
    ],
  },
};

const QuestionBlock = ({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: Option[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-4 animate-fade-in">
    <h3 className="text-xl font-semibold text-foreground">
      {title} <span className="text-destructive">*</span>
    </h3>
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = value === opt.value;
        return (
          <div key={opt.value}>
            <RadioGroupItem value={opt.value} id={`${title}-${opt.value}`} className="peer sr-only" />
            <Label
              htmlFor={`${title}-${opt.value}`}
              className={`group relative flex items-center gap-4 w-full rounded-xl cursor-pointer bg-card border-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                selected
                  ? "border-green-500 bg-green-50 shadow-sm"
                  : "border-border hover:border-green-300"
              }`}
            >
              <div
                className={`flex items-center justify-center h-11 w-11 rounded-lg transition-all ${
                  selected
                    ? "bg-green-500 text-white scale-110"
                    : "bg-muted text-muted-foreground group-hover:bg-green-100 group-hover:text-green-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-medium text-foreground">{opt.label}</div>
                {opt.description && (
                  <div className="text-xs text-muted-foreground mt-0.5">{opt.description}</div>
                )}
              </div>
              {selected && (
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white animate-scale-in">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  </div>
);

const PlantBasicsStep = ({ data, onUpdate }: PlantBasicsStepProps) => {
  const subtype = subtypeOptionsByPlant[data.plantType];

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-8 px-4">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-10 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
            <Sprout className="h-4 w-4" />
            Step 4 · Plant Basics
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tell us about your{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              plants
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">A few details to tailor your plan</p>
        </div>
      </div>

      <QuestionBlock
        title="Are you growing from seeds, seedlings, or established plants?"
        options={growthStageOptions}
        value={data.growthStage}
        onChange={(v) => onUpdate({ growthStage: v })}
      />

      <QuestionBlock
        title="Which season are you planting in?"
        options={seasonOptions}
        value={data.plantingSeason}
        onChange={(v) => onUpdate({ plantingSeason: v })}
      />

      {subtype && (
        <QuestionBlock
          title={subtype.question}
          options={subtype.options}
          value={data.plantSubtype}
          onChange={(v) => onUpdate({ plantSubtype: v })}
        />
      )}
    </div>
  );
};

export default PlantBasicsStep;
