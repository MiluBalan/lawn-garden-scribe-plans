import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Grid3x3, LayoutGrid, Maximize, Flower2, Sparkles, TrendingUp, Palette, Wheat, Zap, Heart, Shield, Apple, Candy, TreePine, Bug, Droplet, Leaf, AlertCircle, CircleCheck, CloudRain } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface PlantCareData {
  plantType: string;
  plantSpacing: string;
  plantGoal: string;
  plantIssues: string;
}

interface PlantCareStepProps {
  data: PlantCareData;
  onUpdate: (data: Partial<PlantCareData>) => void;
}

type Option = { value: string; label: string; icon: LucideIcon; description?: string };

const spacingOptions: Option[] = [
  { value: "dense", label: "Densely planted", icon: Grid3x3, description: "Plants close together" },
  { value: "moderate", label: "Moderately spaced", icon: LayoutGrid, description: "Comfortable gaps" },
  { value: "wide", label: "Widely spaced", icon: Maximize, description: "Lots of room" },
];

const goalOptionsByPlant: Record<string, { question: string; options: Option[] }> = {
  flowers: {
    question: "What's your main flower goal?",
    options: [
      { value: "more-blooms", label: "More blooms", icon: Flower2, description: "Maximize flowers" },
      { value: "longer-season", label: "Longer bloom season", icon: Sparkles, description: "Extend the show" },
      { value: "bigger-fuller", label: "Bigger, fuller plants", icon: TrendingUp, description: "Lush growth" },
      { value: "vibrant-colors", label: "Vibrant colors", icon: Palette, description: "Bold & bright" },
    ],
  },
  vegetables: {
    question: "What's most important to you?",
    options: [
      { value: "higher-yield", label: "Higher yield", icon: Wheat, description: "More harvest" },
      { value: "faster-harvest", label: "Faster harvest", icon: Zap, description: "Quick turnaround" },
      { value: "better-flavor", label: "Better flavor", icon: Heart, description: "Tastes great" },
      { value: "pest-resistance", label: "Pest resistance", icon: Shield, description: "Healthy plants" },
    ],
  },
  fruits: {
    question: "What's your main fruit goal?",
    options: [
      { value: "bigger-fruit", label: "Bigger fruit", icon: Apple, description: "Larger size" },
      { value: "sweeter-taste", label: "Sweeter taste", icon: Candy, description: "More flavor" },
      { value: "higher-yield", label: "Higher yield", icon: TrendingUp, description: "More fruit" },
      { value: "healthier-plants", label: "Healthier trees/bushes", icon: TreePine, description: "Strong plants" },
    ],
  },
};

const issueOptionsByPlant: Record<string, Option[]> = {
  flowers: [
    { value: "aphids", label: "Aphids / pests", icon: Bug },
    { value: "mildew", label: "Powdery mildew", icon: CloudRain },
    { value: "yellowing", label: "Yellowing leaves", icon: Leaf },
    { value: "none", label: "None", icon: CircleCheck },
  ],
  vegetables: [
    { value: "slow-growth", label: "Slow growth", icon: AlertCircle },
    { value: "pests", label: "Pests", icon: Bug },
    { value: "yellow-leaves", label: "Yellow leaves", icon: Leaf },
    { value: "poor-fruiting", label: "Poor fruiting", icon: Droplet },
    { value: "none", label: "None", icon: CircleCheck },
  ],
  fruits: [
    { value: "few-fruits", label: "Few fruits", icon: AlertCircle },
    { value: "pests", label: "Pests", icon: Bug },
    { value: "leaf-disease", label: "Leaf disease", icon: Leaf },
    { value: "dropping-fruit", label: "Dropping fruit", icon: Droplet },
    { value: "none", label: "None", icon: CircleCheck },
  ],
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

const PlantCareStep = ({ data, onUpdate }: PlantCareStepProps) => {
  const goal = goalOptionsByPlant[data.plantType];
  const issues = issueOptionsByPlant[data.plantType];

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-12 px-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Your goals & current condition</h2>
        <p className="text-muted-foreground text-lg">Help us fine-tune your recommendations</p>
      </div>

      <QuestionBlock
        title="How would you describe the spacing of your plants?"
        options={spacingOptions}
        value={data.plantSpacing}
        onChange={(v) => onUpdate({ plantSpacing: v })}
      />

      {goal && (
        <QuestionBlock
          title={goal.question}
          options={goal.options}
          value={data.plantGoal}
          onChange={(v) => onUpdate({ plantGoal: v })}
        />
      )}

      {issues && (
        <QuestionBlock
          title="Any current issues?"
          options={issues}
          value={data.plantIssues}
          onChange={(v) => onUpdate({ plantIssues: v })}
        />
      )}
    </div>
  );
};

export default PlantCareStep;
