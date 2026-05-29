import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Building2 } from "lucide-react";

const features = [
  "Custom nutrient formula",
  "Dedicated account manager",
  "Priority delivery schedule",
  "Volume discounts",
];

export default function EnterpriseCard() {
  return (
    <Card className="rounded-2xl shadow-lg relative overflow-hidden border-2 border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-amber-500">
      <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
        Bulk Purchase
      </div>
      <CardContent className="p-8 flex flex-col h-full">
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-6 w-6 text-amber-500" />
            <h2 className="text-lg font-bold">Enterprise</h2>
          </div>
          <p className="text-xs font-medium text-gray-700 mb-1">
            Custom Bulk Solution
          </p>
          <p className="text-xs text-gray-500">
            Tailored plans for large properties and commercial spaces
          </p>
        </div>

        <div className="mb-4">
          <span className="text-4xl font-bold text-amber-500">Custom</span>
        </div>

        <p className="text-sm text-gray-500 mb-1">Volume-based pricing</p>

        <p className="text-sm text-amber-500 mb-6">Bulk discounts available</p>

        <ul className="space-y-3 mb-8 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-amber-500" />
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() =>
            window.open(
              "https://biogrowthorganics.com/pages/contact-us",
              "_blank",
            )
          }
        >
          Contact Us
        </Button>
      </CardContent>
    </Card>
  );
}
