import { Product } from '../types';

export const CATEGORIES = [
  "Fruits & Vegetables",
  "Dairy & Bakery",
  "Pantry Staples",
  "Beverages",
  "Snacks & Sweets",
  "Household Essentials",
  "Personal Care",
  "Instant Food"
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Farm Fresh Tomatoes",
    description: "Picked fresh from our local farms in Maharashtra.",
    price: 45,
    originalPrice: 60,
    category: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1546473427-e1bc155481b2?auto=format&fit=crop&q=80&w=400",
    unit: "1 kg",
    isOffer: true
  },
  {
    id: "2",
    name: "Alphonso Mangoes",
    description: "The King of Mangoes, sweet and aromatic.",
    price: 599,
    originalPrice: 799,
    category: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400",
    unit: "1 dozen",
    isOffer: true
  },
  {
    id: "3",
    name: "Desi Ghee",
    description: "Pure cow ghee made with traditional methods.",
    price: 650,
    category: "Dairy & Bakery",
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&q=80&w=400",
    unit: "500 ml"
  },
  {
    id: "4",
    name: "Basmati Rice",
    description: "Extra long grain basmati rice for festive meals.",
    price: 180,
    originalPrice: 220,
    category: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400",
    unit: "1 kg",
    isOffer: true
  },
  {
    id: "5",
    name: "Tata Tea Gold",
    description: "Rich taste and irresistible aroma.",
    price: 320,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1544787210-22c1eb53dfbc?auto=format&fit=crop&q=80&w=400",
    unit: "500 g"
  },
  {
    id: "6",
    name: "Masala Dosa Batter",
    description: "Freshly ground batter, ready to cook.",
    price: 75,
    category: "Instant Food",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
    unit: "1 kg"
  },
  {
    id: "7",
    name: "Paneer (Cottage Cheese)",
    description: "Soft and creamy malai paneer.",
    price: 110,
    category: "Dairy & Bakery",
    image: "https://images.unsplash.com/photo-1631452180519-c01372ba962d?auto=format&fit=crop&q=80&w=400",
    unit: "200 g"
  },
  {
    id: "8",
    name: "Aashirvaad Shudh Chakki Atta",
    description: "Whole wheat flour for soft rotis.",
    price: 240,
    category: "Pantry Staples",
    image: "https://images.unsplash.com/photo-1627485750541-b842939988a8?auto=format&fit=crop&q=80&w=400",
    unit: "5 kg"
  }
];
