import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

const spacingOptions = [
  { value: "dense", label: "Densely planted" },
  { value: "moderate", label: "Moderately spaced" },
  { value: "wide", label: "Widely spaced" },
];

const goalOptionsByPlant: Record<string, { question: string; options: { value: string; label: string }[] }> = {
  flowers: {
    question: "What's your main flower goal?",
    options: [
      { value: "more-blooms", label: "More blooms" },
      { value: "longer-season", label: "Longer bloom season" },
      { value: "bigger-fuller", label: "Bigger, fuller plants" },
      { value: "vibrant-colors", label: "Vibrant colors" },
    ],
  },
  vegetables: {
    question: "What's most important to you?",
    options: [
      { value: "higher-yield", label: "Higher yield" },
      { value: "faster-harvest", label: "Faster harvest" },
      { value: "better-flavor", label: "Better flavor" },
      { value: "pest-resistance", label: "Pest resistance" },
    ],
  },
  fruits: {
    question: "What's your main fruit goal?",
    options: [
      { value: "bigger-fruit", label: "Bigger fruit" },
      { value: "sweeter-taste", label: "Sweeter taste" },
      { value: "higher-yield", label: "Higher yield" },
      { value: "healthier-plants", label: "Healthier trees/bushes" },
    ],
  },
};

const issueOptionsByPlant: Record<string, { value: string; label: string }[]> = {
  flowers: [
    { value: "aphids", label: "Aphids / pests" },
    { value: "mildew", label: "Powdery mildew" },
    { value: "yellowing", label: "Yellowing leaves" },
    { value: "none", label: "None" },
  ],
  vegetables: [
    { value: "slow-growth", label: "Slow growth" },
    { value: "pests", label: "Pests" },
    { value: "yellow-leaves", label: "Yellow leaves" },
    { value: "poor-fruiting", label: "Poor fruiting" },
    { value: "none", label: "None" },
  ],
  fruits: [
    { value: "few-fruits", label: "Few fruits" },
    { value: "pests", label: "Pests" },
    { value: "leaf-disease", label: "Leaf disease" },
    { value: "dropping-fruit", label: "Dropping fruit" },
    { value: "none", label: "None" },
  ],
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
