import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Leaf, Sprout, Trees, Building2 } from "lucide-react";
import { useEffect, useState } from "react";

interface SubscriptionPlansProps {
  lawnData: any;
  onBack: () => void;
  onRestart?: () => void;
}

interface Plan {
  subscriptionName: string;
  productTitle: string;
  planName: string;
  description: string;
  variantId: string;
  sellingPlanId: string;
  price: number;
  deliveries: number;
  billingInterval: number;
  discountLabel: string;
}

const allPlans = [
  { name: "Basic", icon: Sprout, tag: "Great Value", xlargeOnly: false, colors: { badge: "bg-blue-500", button: "bg-blue-500 hover:bg-blue-600", border: "hover:border-blue-500", text: "text-blue-500", check: "text-blue-500" } },
  { name: "Advanced", icon: Leaf, tag: "Most Popular", xlargeOnly: false, colors: { badge: "bg-green-600", button: "bg-green-600 hover:bg-green-700", border: "hover:border-green-600", text: "text-green-600", check: "text-green-600" } },
  { name: "Premium", icon: Trees, tag: "Best Results", xlargeOnly: false, colors: { badge: "bg-purple-600", button: "bg-purple-600 hover:bg-purple-700", border: "hover:border-purple-600", text: "text-purple-600", check: "text-purple-600" } },
];

const planMap: Record<string, string> = {
  Basic: "Basic Green Plan",
  Advanced: "Eco Saver Plan",
  Premium: "Year Round Care Plan",
};

const extractId = (gid: string) => gid.split("/").pop();

export default function SubscriptionPlans({
  lawnData,
  onBack,
}: SubscriptionPlansProps) {
  const [shopifyPlans, setShopifyPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Normalize size → number
  const getNumericSize = (size: any): number | null => {
    if (!size) return null;

    if (typeof size === "string" && size.startsWith("custom_")) {
      return parseInt(size.split("_")[1]);
    }

    const mapping: Record<string, number> = {
      small: 3000,
      medium: 7500,
      large: 15000,
      xlarge: 25000,
    };

    if (mapping[size]) return mapping[size];

    if (typeof size === "number") return size;

    return null;
  };

  // ✅ Check plan matches size
  const matchesSize = (desc: string, size: number) => {
    const normalized = desc.replace(/,/g, "").toLowerCase();

    if (size < 5000) {
      return normalized.includes("under 5000") || normalized.includes("< 5000");
    }

    if (size >= 5000 && size < 10000) {
      return (
        normalized.includes("5000") &&
        normalized.includes("10000")
      );
    }

    if (size >= 10000 && size < 20000) {
      return (
        normalized.includes("10000") &&
        normalized.includes("20000")
      );
    }

    if (size >= 20000) {
      return normalized.includes("20000");
    }

    return false;
  };

  useEffect(() => {
    fetch(
      "https://api.dev.anarix.ai/api/integrations/shopify/subscription-products"
    )
      .then((res) => res.json())
      .then((res) => {
        const edges = res?.data?.data?.products?.edges || [];

        const size = getNumericSize(lawnData?.size);

        console.log("📏 Normalized size:", size);

        const extracted: Plan[] = edges.flatMap((product: any) => {
          const variant = product.node.variants.edges?.[0]?.node;
          if (!variant) return [];

          if (!product.node.sellingPlanGroups?.edges?.length) return [];

          return product.node.sellingPlanGroups.edges.flatMap((group: any) =>
            group.node.sellingPlans.edges.map((plan: any) => {
              const price = Number(variant.price);

              const billingInterval =
                plan.node.billingPolicy?.intervalCount || 1;

              const deliveryInterval =
                plan.node.deliveryPolicy?.intervalCount || 1;

              const deliveries = billingInterval / deliveryInterval;

              const policy = plan.node.pricingPolicies?.[0];

              let discountLabel = "";
              let finalPrice = price * deliveries;

              if (policy?.adjustmentValue?.percentage) {
                const percentage = policy.adjustmentValue.percentage;
                finalPrice = finalPrice * (1 - percentage / 100);
                discountLabel = `${percentage}% discount`;
              }

              if (policy?.adjustmentValue?.amount) {
                const amount = Number(policy.adjustmentValue.amount);
                finalPrice = finalPrice - amount;
                discountLabel = `$${amount} discount`;
              }

              return {
                subscriptionName: group.node.name,
                productTitle: product.node.title,
                planName: group.node.name,
                description: plan.node.description || "",
                variantId: extractId(variant.id),
                sellingPlanId: extractId(plan.node.id),
                price: finalPrice,
                deliveries,
                billingInterval,
                discountLabel,
              };
            })
          );
        });

        // ✅ FILTER FIXED
        const filtered = extracted.filter((plan) => {
          if (!size) return false;
          return matchesSize(plan.description, size);
        });

        console.log("✅ Filtered Plans:", filtered);

        setShopifyPlans(filtered);
        setLoading(false);
      });
  }, [lawnData]);

  const getPlan = (name: string) =>
    shopifyPlans.find((p) =>
      p.planName.toLowerCase().includes(planMap[name].toLowerCase())
    );

  const isXlarge = lawnData?.size === "xlarge" || 
    (typeof lawnData?.size === "string" && lawnData?.size?.startsWith("custom_") && parseInt(lawnData?.size?.split("_")[1]) >= 20000);

  const visiblePlans = isXlarge
    ? allPlans.filter((p) => p.name !== "Basic")
    : allPlans;

  if (loading)
    return <div className="text-center py-20 text-lg">Loading plans...</div>;

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <Button variant="ghost" onClick={onBack} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Lawn Plan
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {visiblePlans.map((plan) => {
            const shopify = getPlan(plan.name);
            if (!shopify) return null;

            return (
              <Card
                key={shopify.subscriptionName}
                className={`rounded-2xl shadow-lg relative overflow-hidden border-2 border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${plan.colors.border}`}
              >
                {plan.tag && (
                  <div className={`absolute top-4 right-4 ${plan.colors.badge} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                    {plan.tag}
                  </div>
                )}
                <CardContent className="p-8 flex flex-col">
                  <div className="mb-5">
                    <div className="flex items-center gap-3 mb-2">
                      <plan.icon className={`h-6 w-6 ${plan.colors.text}`} />
                      <h2 className="text-lg font-bold">
                        {shopify.subscriptionName}
                      </h2>
                    </div>

                    <p className="text-xs font-medium text-gray-700 mb-1">
                      {shopify.productTitle}
                    </p>

                    <p className="text-xs text-gray-500">
                      {shopify.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className={`text-4xl font-bold ${plan.colors.text}`}>
                      ${shopify.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">
                    {shopify.deliveries} delivery every{" "}
                    {shopify.billingInterval} months
                  </p>

                  <p className={`text-sm ${plan.colors.text} mb-6`}>
                    {shopify.discountLabel}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "Custom nutrient formula",
                      "Climate optimized schedule",
                      "Organic lawn treatments",
                      "Pause or cancel anytime",
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className={`h-4 w-4 ${plan.colors.check}`} />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.colors.button} text-white`}
                    onClick={() =>
                      window.open(
                        `https://biogrowthorganics.com/cart/add?id=${shopify.variantId}&selling_plan=${shopify.sellingPlanId}&quantity=1`,
                        "_blank"
                      )
                    }
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            );
          })}

          {/* Enterprise / Bulk Purchase Card */}
          {isXlarge && (
            <Card className="rounded-2xl shadow-lg relative overflow-hidden border-2 border-green-600">
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Bulk Purchase
              </div>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-6 w-6 text-green-600" />
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
                  <span className="text-4xl font-bold text-green-600">
                    Custom
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-1">
                  Volume-based pricing
                </p>

                <p className="text-sm text-green-600 mb-6">
                  Bulk discounts available
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    "Custom nutrient formula",
                    "Dedicated account manager",
                    "Priority delivery schedule",
                    "Volume discounts",
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    window.open(
                      "https://biogrowthorganics.com/pages/contact-us",
                      "_blank"
                    )
                  }
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}