import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Sprout, Leaf, Trees, Package } from "lucide-react";
import EnterpriseCard from "./EnterpriseCard";
import { useEffect, useState } from "react";
import {
  PLANT_TYPE_MAP,
  parseGardenDescription,
  normalizeTag,
  groupGardenSubscriptionPlans,
  getProductQuantityMultiplier,
} from "@/lib/garden";
import type {
  IGardenProduct,
  IGardenSubscriptionPlan,
} from "@/interfaces/garden";

interface GardenSubscriptionPlansProps {
  gardenData: any;
  onBack: () => void;
}

const planTiers = [
  {
    name: "Essential",
    icon: Sprout,
    tag: "Great Value",
    features: [
      "Essential nutrient formula",
      "Seasonal feeding schedule",
      "Eco-friendly ingredients",
      "Pause or cancel anytime",
    ],
    colors: {
      badge: "bg-blue-500",
      button: "bg-blue-500 hover:bg-blue-600",
      border: "hover:border-blue-500",
      text: "text-blue-500",
      check: "text-blue-500",
    },
  },
  {
    name: "Plus",
    icon: Leaf,
    tag: "Most Popular",
    features: [
      "Custom nutrient formula",
      "Climate optimized schedule",
      "Weed & pest prevention",
      "Soil health monitoring",
    ],
    colors: {
      badge: "bg-green-600",
      button: "bg-green-600 hover:bg-green-700",
      border: "hover:border-green-600",
      text: "text-green-600",
      check: "text-green-600",
    },
  },
  {
    name: "Premium",
    icon: Trees,
    tag: "Best Results",
    features: [
      "Advanced bio-stimulant blend",
      "Year-round care program",
      "Disease & drought protection",
      "Priority expert support",
    ],
    colors: {
      badge: "bg-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      border: "hover:border-purple-600",
      text: "text-purple-600",
      check: "text-purple-600",
    },
  },
];

const extractId = (gid: string) => gid.split("/").pop();

export default function GardenSubscriptionPlans({
  gardenData,
  onBack,
}: GardenSubscriptionPlansProps) {
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    IGardenSubscriptionPlan[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.dev.anarix.ai/api/integrations/shopify/garden-subscription-products",
    )
      .then((res) => res.json())
      .then((res) => {
        const edges = res?.data?.data?.products?.edges || [];

        const extracted: IGardenProduct[] = edges.flatMap((product: any) => {
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
              let discountPercentage = 0;
              let finalPrice = price * deliveries;

              if (policy?.adjustmentValue?.percentage) {
                const pct = policy.adjustmentValue.percentage;
                discountPercentage = pct;
                finalPrice = finalPrice * (1 - pct / 100);
                discountLabel = `${pct}% discount`;
              }

              if (policy?.adjustmentValue?.amount) {
                const amount = Number(policy.adjustmentValue.amount);
                finalPrice = finalPrice - amount;
                discountLabel = `$${amount} discount`;
              }

              return {
                planName: group.node.name,
                sellingPlanName: plan.node.name,
                productTitle: product.node.title,
                description: plan.node.description || "",
                variantId: extractId(variant.id),
                sellingPlanId: extractId(plan.node.id),
                price: finalPrice,
                multiplier: getProductQuantityMultiplier(product.node.title),
                deliveries,
                billingInterval,
                discountLabel,
                discountPercentage,
              };
            }),
          );
        });

        const userPlantType = PLANT_TYPE_MAP[gardenData?.plantType] || "";
        const userSize = gardenData?.gardenSize || "";

        const normalizedUserPlantType = normalizeTag(userPlantType);
        const normalizedUserSize = normalizeTag(userSize);

        console.log("🔍 Garden subscription filter:", {
          selectedPlantType: gardenData?.plantType,
          selectedGardenSize: gardenData?.gardenSize,
          resolvedPlantType: userPlantType,
          resolvedGardenSize: userSize,
          normalizedPlantType: normalizedUserPlantType,
          normalizedSize: normalizedUserSize,
        });

        const filtered = extracted
          .filter((product) => {
            if (product.price <= 0) return false;

            const parsed = parseGardenDescription(product.description);
            if (!parsed) return false;

            const normalizedApiPlantType = normalizeTag(parsed.plantType);
            const normalizedApiSize = normalizeTag(parsed.sizeRange);

            console.log("  ├─ Product:", {
              name: product.planName,
              description: product.description,
              parsedPlantType: parsed.plantType,
              parsedSizeRange: parsed.sizeRange,
              normalizedApiPlantType,
              normalizedApiSize,
              plantMatch: normalizedApiPlantType === normalizedUserPlantType,
              sizeMatch: normalizedApiSize === normalizedUserSize,
            });

            return (
              normalizedApiPlantType === normalizedUserPlantType &&
              normalizedApiSize === normalizedUserSize
            );
          })
          .sort((a, b) => a.discountPercentage - b.discountPercentage);

        const grouped = groupGardenSubscriptionPlans(filtered);

        setSubscriptionPlans(grouped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [gardenData]);

  const handleSubscribe = (plan: IGardenSubscriptionPlan) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://biogrowthorganics.com/cart/add";
    form.target = "_blank";

    plan.products.forEach((p) => {
      const append = (name: string, value: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };
      append("items[][id]", p.variantId);
      append("items[][quantity]", String(p.multiplier));
      append("items[][selling_plan]", p.sellingPlanId);
    });

    document.body.appendChild(form);
    form.submit();
    setTimeout(() => document.body.removeChild(form), 1000);
  };

  const isExtraLarge = gardenData?.gardenSize === "extra-large";

  if (loading)
    return <div className="text-center py-20 text-lg">Loading plans...</div>;

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <Button variant="ghost" onClick={onBack} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-4xl font-bold text-center mb-12 capitalize">
          Choose Your {gardenData?.plantType || "Garden"} Plan
        </h1>

        {subscriptionPlans.length === 0 ? (
          isExtraLarge ? (
            <div className="text-center py-8 mb-8">
              <p className="text-gray-500 text-lg">
                No standard plans are available for this garden size, but we can
                create a custom enterprise solution for your property.
              </p>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No subscription plans available for your selection.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your plant type or garden size to see available
                plans.
              </p>
            </div>
          )
        ) : null}

        {(subscriptionPlans.length > 0 || isExtraLarge) && (
          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => {
              const tier = planTiers[index % planTiers.length];
              const productCount = plan.products.length;
              const isMultiProduct = productCount > 1;

              return (
                <Card
                  key={`${plan.name}::${plan.description}`}
                  className={`rounded-2xl shadow-lg relative overflow-hidden border-2 border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${tier.colors.border}`}
                >
                  {tier.tag && (
                    <div
                      className={`absolute top-4 right-4 ${tier.colors.badge} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      {tier.tag}
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col">
                    <div className="mb-5">
                      <div className="flex items-center gap-3 mb-2">
                        <tier.icon className={`h-6 w-6 ${tier.colors.text}`} />
                        <h2 className="text-lg font-bold">{plan.name}</h2>
                      </div>

                      {isMultiProduct ? (
                      <div className="space-y-1 mb-1">
                          {plan.products.map((p, i) => (
                            <p
                              key={i}
                              className={`text-sm font-bold ${tier.colors.text}`}
                            >
                              {p.productTitle}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className={`text-sm font-bold ${tier.colors.text} mb-1`}>
                          {plan.products[0].productTitle}
                        </p>
                      )}

                      <p className="text-xs text-gray-500">
                        {plan.description}
                      </p>

                      {isMultiProduct && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <Package className="h-3 w-3" />
                          <span>Contains {productCount} products</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <span
                        className={`text-4xl font-bold ${tier.colors.text}`}
                      >
                        ${plan.totalPrice.toFixed(2)}
                      </span>
                      {!isMultiProduct && plan.products[0].multiplier > 1 && (
                        <p className="text-xs text-gray-400 mt-1">
                          {plan.products[0].multiplier} × $
                          {plan.products[0].price.toFixed(2)}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mb-1">
                      {plan.deliveries} delivery every {plan.billingInterval}{" "}
                      months
                    </p>

                    <p className={`text-sm ${tier.colors.text} mb-6`}>
                      {plan.discountLabel}
                    </p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className={`h-4 w-4 ${tier.colors.check}`} />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${tier.colors.button} text-white`}
                      onClick={() => handleSubscribe(plan)}
                    >
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
            {isExtraLarge && <EnterpriseCard />}
          </div>
        )}
      </div>
    </div>
  );
}
