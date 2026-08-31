import { getProductQuantityMultiplier } from "@/lib/garden";

export interface ILawnProduct {
  planName: string;
  productTitle: string;
  description: string;
  variantId: string;
  sellingPlanId: string;
  price: number;
  multiplier: number;
  deliveries: number;
  billingInterval: number;
  discountLabel: string;
  discountPercentage: number;
}

export interface ILawnSubscriptionPlan {
  name: string;
  description: string;
  products: ILawnProduct[];
  totalPrice: number;
  deliveries: number;
  billingInterval: number;
  discountLabel: string;
  discountPercentage: number;
}

export interface ISizeBucket {
  min: number;
  max: number;
}

/**
 * Resolve a stored lawn size value (range key, custom_<n>, or number) into
 * a representative square footage used for bucket matching.
 */
export function getNumericLawnSize(size: unknown): number | null {
  if (size === null || size === undefined || size === "") return null;

  if (typeof size === "number") return size;

  if (typeof size === "string") {
    if (size.startsWith("custom_")) {
      const parsed = parseInt(size.split("_")[1], 10);
      return Number.isFinite(parsed) ? parsed : null;
    }

    const mapping: Record<string, number> = {
      range_1000_2499: 2499,
      range_2500_3999: 3999,
      range_4000_5499: 5499,
      range_5500_6999: 6999,
      range_7000_plus: 7000,
    };

    if (mapping[size] !== undefined) return mapping[size];

    const numeric = parseInt(size, 10);
    return Number.isFinite(numeric) ? numeric : null;
  }

  return null;
}

/**
 * Parse a Shopify selling-plan description into a numeric square-footage range.
 * Handles: "Under 2499 sq.ft", "Under 5000 sq.ft",
 * "Medium Lawn (5,000 – 10,000 sq ft)", "Extra Large (20000 - 25000 sq.ft)",
 * "7,000+ sq ft".
 */
export function parseLawnSizeBucket(description: string): ISizeBucket | null {
  if (!description) return null;

  const normalized = description.toLowerCase().replace(/,/g, "");

  // Garden-tagged descriptions never belong to the lawn flow.
  if (normalized.includes("garden")) return null;

  const rangeMatch = normalized.match(/(\d{3,7})\s*(?:-|–|—|to)\s*(\d{3,7})/);
  if (rangeMatch) {
    return { min: Number(rangeMatch[1]), max: Number(rangeMatch[2]) };
  }

  const underMatch = normalized.match(/(?:under|below|up to|less than)\s*(\d{3,7})/);
  if (underMatch) {
    return { min: 0, max: Number(underMatch[1]) };
  }

  const plusMatch = normalized.match(/(\d{3,7})\s*\+/);
  if (plusMatch) {
    return { min: Number(plusMatch[1]), max: Number.POSITIVE_INFINITY };
  }

  const overMatch = normalized.match(/(?:over|above|more than)\s*(\d{3,7})/);
  if (overMatch) {
    return { min: Number(overMatch[1]), max: Number.POSITIVE_INFINITY };
  }

  return null;
}

const bucketWidth = (bucket: ISizeBucket) =>
  bucket.max === Number.POSITIVE_INFINITY ? Number.MAX_SAFE_INTEGER : bucket.max - bucket.min;

const bucketKey = (bucket: ISizeBucket) => `${bucket.min}:${bucket.max}`;

/**
 * Pick the best-fitting Shopify size bucket for a lawn size.
 * The narrowest bucket containing the size wins; if none contains it,
 * fall back to the largest available bucket.
 */
export function selectLawnSizeBucket(
  buckets: ISizeBucket[],
  size: number,
): ISizeBucket | null {
  if (!buckets.length) return null;

  const unique = new Map<string, ISizeBucket>();
  buckets.forEach((b) => unique.set(bucketKey(b), b));
  const list = Array.from(unique.values());

  const containing = list
    .filter((b) => size >= b.min && size <= b.max)
    .sort((a, b) => bucketWidth(a) - bucketWidth(b));

  if (containing.length) return containing[0];

  // Above every bucket → use the largest one available.
  return list.sort((a, b) => b.max - a.max || b.min - a.min)[0];
}

export function groupLawnSubscriptionPlans(
  products: ILawnProduct[],
): ILawnSubscriptionPlan[] {
  const groups = new Map<string, ILawnProduct[]>();

  for (const product of products) {
    const key = `${product.planName}::${product.description}`;
    const existing = groups.get(key);
    if (existing) existing.push(product);
    else groups.set(key, [product]);
  }

  return Array.from(groups.values()).map((groupProducts) => {
    const first = groupProducts[0];
    const totalPrice = groupProducts.reduce(
      (sum, p) => sum + p.price * p.multiplier,
      0,
    );

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

export { getProductQuantityMultiplier };
