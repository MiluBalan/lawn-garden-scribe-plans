import type { IGardenProduct, IGardenSubscriptionPlan } from "@/interfaces/garden";

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

// Selling plan descriptions follow "<GrowingSetup>-<PlantType>-<Variety>-<Stage>",
// e.g. "Hydroponics-Flowers-IndoorFlowering-InitialStage" or "Null-Trees-CitrusTrees-Secondary".
// "Null" for GrowingSetup means that dimension is a wildcard for the plan.
export interface GardenSellingPlanDescription {
  growingSetup: string;
  plantType: string;
  variety: string;
  stage: string;
}

const PLANT_TYPE_DESCRIPTION_TOKENS: Record<string, string> = {
  flowers: "Flowers",
  "vegetables-fruits": "Vegetables&Fruits",
  trees: "Trees",
};

const INITIAL_GARDEN_STAGES = new Set(["preparing", "just-planted"]);
const SECONDARY_GARDEN_STAGES = new Set(["establishing", "established-growing"]);

function normalizeGardenToken(value?: string): string {
  return (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Descriptions aren't derived from our option values/labels by one fixed rule
// (e.g. "IndoorFlowering" matches the value "indoor-flowering", while "CitrusTrees"
// matches the label "Citrus Trees"), so match against both, allowing either side
// to be a truncated/extended variant of the other.
function gardenTokenMatches(apiSegment: string, ...candidates: (string | undefined)[]): boolean {
  const normalizedApi = normalizeGardenToken(apiSegment);
  if (!normalizedApi) return false;

  return candidates.some((candidate) => {
    const normalized = normalizeGardenToken(candidate);
    return (
      !!normalized &&
      (normalized === normalizedApi ||
        normalized.startsWith(normalizedApi) ||
        normalizedApi.startsWith(normalized))
    );
  });
}

export function parseGardenSellingPlanDescription(description: string): GardenSellingPlanDescription | null {
  const allParts = (description || "").split("-");
  // Descriptions carry a leading "Garden-" prefix (needed for the API call) before
  // the actual "<GrowingSetup>-<PlantType>-<Variety>-<Stage>" segments.
  const parts = allParts[0] === "Garden" ? allParts.slice(1) : allParts;
  if (parts.length !== 4) return null;

  const [growingSetup, plantType, variety, stage] = parts;
  return { growingSetup, plantType, variety, stage };
}

export interface GardenSellingPlanMatchInput {
  growingSetup?: string;
  growingSetupLabel?: string;
  plantType?: string;
  plantSubtype?: string;
  plantSubtypeLabel?: string;
  gardenStage?: string;
}

export function matchesGardenSellingPlan(
  parsed: GardenSellingPlanDescription,
  gardenData: GardenSellingPlanMatchInput,
): boolean {
  const isGrowingSetupWildcard = normalizeGardenToken(parsed.growingSetup) === "null";
  if (
    !isGrowingSetupWildcard &&
    !gardenTokenMatches(parsed.growingSetup, gardenData.growingSetup, gardenData.growingSetupLabel)
  ) {
    return false;
  }

  const plantTypeToken = PLANT_TYPE_DESCRIPTION_TOKENS[gardenData.plantType || ""];
  if (!plantTypeToken || normalizeGardenToken(parsed.plantType) !== normalizeGardenToken(plantTypeToken)) {
    return false;
  }

  if (!gardenTokenMatches(parsed.variety, gardenData.plantSubtype, gardenData.plantSubtypeLabel)) {
    return false;
  }

  if (INITIAL_GARDEN_STAGES.has(gardenData.gardenStage || "")) {
    return normalizeGardenToken(parsed.stage) === "initialstage";
  }
  if (SECONDARY_GARDEN_STAGES.has(gardenData.gardenStage || "")) {
    return normalizeGardenToken(parsed.stage) === "secondary";
  }
  return false;
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
