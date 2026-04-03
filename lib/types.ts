export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sustainabilityScore: number;
  plasticSaved: number; // in grams or bottles
  isSubscriptionEligible: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
}
