import type { IGardenProduct, IGardenSubscriptionPlan } from "@/interfaces/garden";

export const PLANT_TYPE_MAP: Record<string, string> = {
  flowers: "Flower",
  vegetables: "Vegetable",
  fruits: "Fruit",
};

export const GARDEN_SIZE_OPTIONS = [
  {
    value: "under-5000",
    label: "Under 5,000 sq ft",
    description: "Small gardens, raised beds, and container gardens",
    detail: "Less than 5,000 sq ft",
    icon: "small",
  },
  {
    value: "under-10000",
    label: "Under 10,000 sq ft",
    description: "Medium gardens, large raised beds, and small plots",
    detail: "5,000 – 10,000 sq ft",
    icon: "medium",
  },
  {
    value: "under-20000",
    label: "Under 20,000 sq ft",
    description: "Large gardens, extensive beds, and multiple plots",
    detail: "10,000 – 20,000 sq ft",
    icon: "large",
  },
  {
    value: "extra-large",
    label: "Extra Large (20,000 – 25,000 sq ft)",
    description: "Estates, extensive gardens, and commercial spaces",
    detail: "20,000 – 25,000 sq ft",
    icon: "xlarge",
  },
];

export const GARDEN_SIZE_DISPLAY: Record<string, string> = {
  "under-5000": "Under 5,000 sq ft",
  "under-10000": "Under 10,000 sq ft",
  "under-20000": "Under 20,000 sq ft",
  "extra-large": "20,000 – 25,000 sq ft",
};

export function parseGardenDescription(description: string): { plantType: string; sizeRange: string } | null {
  const parts = description.split("-");
  if (parts.length < 3 || parts[0] !== "Garden") return null;

  const raw = parts.slice(2).join("-");
  const sizeRange = raw.split("(")[0].trim();

  return {
    plantType: parts[1] || "",
    sizeRange,
  };
}

export function normalizeTag(value: string): string {
  return value.toLowerCase().replace(/[\s_-]+/g, "-").replace(/^-|-$/g, "");
}

export function getProductQuantityMultiplier(productName: string): number {
  const match = productName.match(/[xX]\s*(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

export function groupGardenSubscriptionPlans(products: IGardenProduct[]): IGardenSubscriptionPlan[] {
  const groups = new Map<string, IGardenProduct[]>();

  for (const product of products) {
    const key = `${product.planName}::${product.description}`;
    const existing = groups.get(key);
    if (existing) {
      existing.push(product);
    } else {
      groups.set(key, [product]);
    }
  }

  return Array.from(groups.entries()).map(([, groupProducts]) => {
    const first = groupProducts[0];
    const totalPrice = groupProducts.reduce((sum, p) => sum + p.price * p.multiplier, 0);

    return {
      name: first.planName,
      description: first.description,
      products: groupProducts,
      totalPrice,
      deliveries: first.deliveries,
      billingInterval: first.billingInterval,
      discountLabel: first.discountLabel,
      discountPercentage: first.discountPercentage,
    };
  });
}
