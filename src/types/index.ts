export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  unit: string;
  isOffer?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
