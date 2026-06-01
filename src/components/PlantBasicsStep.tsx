import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

const growthStageOptions = [
  { value: "seeds", label: "Seeds" },
  { value: "seedlings", label: "Seedlings / starts" },
  { value: "established", label: "Established plants" },
  { value: "mix", label: "Mix of these" },
];

const seasonOptions = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "year-round", label: "Year-round / indoor" },
];

const subtypeOptionsByPlant: Record<string, { question: string; options: { value: string; label: string }[] }> = {
  flowers: {
    question: "What type of flowers are you growing?",
    options: [
      { value: "annuals", label: "Annuals" },
      { value: "perennials", label: "Perennials" },
      { value: "bulbs", label: "Bulbs" },
      { value: "mix", label: "Mix" },
    ],
  },
  vegetables: {
    question: "What vegetables are you primarily growing?",
    options: [
      { value: "leafy-greens", label: "Leafy greens" },
      { value: "root-vegetables", label: "Root vegetables" },
      { value: "fruiting", label: "Fruiting vegetables (tomatoes, peppers)" },
      { value: "herbs", label: "Herbs" },
      { value: "mix", label: "Mix" },
    ],
  },
  fruits: {
    question: "What type of fruit plants?",
    options: [
      { value: "berry-bushes", label: "Berry bushes" },
      { value: "fruit-trees", label: "Fruit trees" },
      { value: "vines", label: "Vines (grapes, melons)" },
      { value: "mix", label: "Mix" },
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
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-foreground">
      {title} <span className="text-destructive">*</span>
    </h3>
    <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options.map((opt) => (
        <div key={opt.value}>
          <RadioGroupItem value={opt.value} id={`${title}-${opt.value}`} className="peer sr-only" />
          <Label
            htmlFor={`${title}-${opt.value}`}
            className="flex items-center w-full rounded-xl cursor-pointer bg-card border-2 border-border peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 hover:border-green-300 transition-all p-4 text-base font-medium text-foreground"
          >
            {opt.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

const PlantBasicsStep = ({ data, onUpdate }: PlantBasicsStepProps) => {
  const subtype = subtypeOptionsByPlant[data.plantType];

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-12 px-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Tell us about your plants</h2>
        <p className="text-muted-foreground text-lg">A few details to tailor your plan</p>
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
