export interface IGardenProduct {
  planName: string;
  sellingPlanName: string;
  productTitle: string;
  description: string;
  variantId: string;
  sellingPlanId: string;
  price: number;
  deliveries: number;
  billingInterval: number;
  discountLabel: string;
  discountPercentage: number;
}

export interface IGardenSubscriptionPlan {
  name: string;
  description: string;
  products: IGardenProduct[];
  totalPrice: number;
  deliveries: number;
  billingInterval: number;
  discountLabel: string;
  discountPercentage: number;
}
