import { Card, CardContent } from '@/components/ui/card';
import { Check, Leaf, Sprout, Citrus, Cherry, Wheat, Apple, TreePine, Trees, Flower, Salad, Sparkles, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PlantVarietyStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

type Variety = { value: string; label: string; description: string; icon: LucideIcon };

export const VARIETIES_BY_PLANT_TYPE: Record<string, { question: string; options: Variety[] }> = {
  flowers: {
    question: 'Which flowers are you growing?',
    options: [
      { value: 'outdoor-flowers', label: 'Outdoor Flowers', description: 'Roses, hibiscus, hydrangeas, garden blooms', icon: Sun },
      { value: 'indoor-flowering', label: 'Indoor Flowering Plants', description: 'Orchids, African violets, peace lily', icon: Flower },
      { value: 'indoor-tropical', label: 'Indoor & Tropical Plants', description: 'Monstera, pothos, ferns, palms — grown for leaf/greenery', icon: Leaf },
      { value: 'other-ornamentals', label: 'Other Ornamentals', description: 'General plant care, multiple types, or others', icon: Sparkles },
    ],
  },
  'vegetables-fruits': {
    question: 'What are you growing?',
    options: [
      { value: 'tomato', label: 'Tomato', description: 'Heavy feeders, long season', icon: Cherry },
      { value: 'citrus-fruits', label: 'Citrus Fruits', description: 'Lemon, lime, orange, grapefruit', icon: Citrus },
      { value: 'tropical-fruits', label: 'Tropical Fruits', description: 'Avocado, mango, pineapple, banana, papaya', icon: Sun },
      { value: 'berries-grapes', label: 'Berries & Grapes', description: 'Strawberries, blueberries, mulberries, grapes', icon: Cherry },
      { value: 'hemp-herbs-greens', label: 'Hemp, Herbs & Leafy Greens', description: 'Cannabis, aromatic, medicinal & leafy greens', icon: Wheat },
      { value: 'general-veg-fruits', label: 'General Garden Vegetables & Fruits', description: 'Roots, brassicas, melons & more', icon: Salad },
    ],
  },
  trees: {
    question: 'What kind of trees are you growing?',
    options: [
      { value: 'citrus-tree', label: 'Citrus Trees', description: 'Lemon, orange, grapefruit', icon: Citrus },
      { value: 'tropical-trees', label: 'Tropical Trees', description: 'Mango, avocado, banana, palm', icon: Leaf },
      { value: 'fruit-trees', label: 'Fruit Trees', description: 'Apple, pear, pomegranate', icon: Apple },
      { value: 'berry-trees', label: 'Berry Trees', description: 'Mulberry, elderberry, fruiting vines', icon: Cherry },
      { value: 'shade-trees', label: 'Shade & Leafy Trees', description: 'Maple, oak, elm, magnolia', icon: Trees },
      { value: 'ornamental-trees', label: 'Ornamental & Flowering Trees', description: 'Decorative and general-purpose trees', icon: TreePine },
    ],
  },
};

const PlantVarietyStep = ({ data, onUpdate }: PlantVarietyStepProps) => {
  const config = VARIETIES_BY_PLANT_TYPE[data.plantType];

  return (
    <div className="space-y-10 px-4 max-w-5xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-8 md:p-12 shadow-sm border border-emerald-100/60">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 text-sm font-medium shadow-sm">
            <Sprout className="h-4 w-4" />
            Plant Variety
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {config?.question ?? 'Which plants are you growing?'}&nbsp;<span className="text-red-500">*</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Different plants need different nutrition — this helps us fine-tune your blend.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(config?.options ?? []).map((option) => {
          const Icon = option.icon;
          const isSelected = data.plantSubtype === option.value;
          return (
            <Card
              key={option.value}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ring-2 ring-transparent rounded-2xl overflow-hidden ${
                isSelected ? 'bg-gradient-to-br from-white to-emerald-50 ring-emerald-400 border-emerald-400' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onUpdate({ plantSubtype: option.value })}
            >
              <CardContent className="p-5 relative">
                <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-emerald-500 scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-emerald-700" />
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
  );
};

export default PlantVarietyStep;
