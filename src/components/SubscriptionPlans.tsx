import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Leaf, Sprout, Trees } from "lucide-react";
import { useEffect, useState } from "react";

interface SubscriptionPlansProps {
  lawnData: any;
  onBack: () => void;
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
  { name: "Basic", icon: Sprout, tag: "Great Value", xlargeOnly: false },
  { name: "Advanced", icon: Leaf, tag: "Most Popular", xlargeOnly: false },
  { name: "Premium", icon: Trees, tag: "Best Results", xlargeOnly: false },
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

  if (loading)
    return <div className="text-center py-20 text-lg">Loading plans...</div>;

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button variant="ghost" onClick={onBack} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Lawn Plan
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const shopify = getPlan(plan.name);
            if (!shopify) return null;

            return (
              <Card
                key={shopify.subscriptionName}
                className="rounded-2xl shadow-lg"
              >
                <CardContent className="p-8 flex flex-col">
                  <div className="mb-5">
                    <div className="flex items-center gap-3 mb-2">
                      <plan.icon className="h-6 w-6 text-green-600" />
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
                    <span className="text-4xl font-bold text-green-600">
                      ${shopify.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">
                    {shopify.deliveries} delivery every{" "}
                    {shopify.billingInterval} months
                  </p>

                  <p className="text-sm text-green-600 mb-6">
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
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
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
        </div>
      </div>
    </div>
  );
}