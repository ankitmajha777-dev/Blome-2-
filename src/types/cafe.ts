export type MenuCategory = 
  | 'espresso' 
  | 'signature' 
  | 'tea' 
  | 'cold' 
  | 'pastry' 
  | 'seasonal';

export type DietaryTag = 
  | 'vegan' 
  | 'gluten-free' 
  | 'dairy-free' 
  | 'organic' 
  | 'decaf';

export interface ProductExtra {
  name: string;
  price: number;
}

export interface ProductSize {
  name: string;
  volume: string;
  extraPrice: number;
}

export interface Product {
  id: string;
  name: string;
  category: MenuCategory;
  tagline: string;
  description: string;
  price: number;
  image: string;
  origin?: string;
  tastingNotes?: string[];
  dietary?: DietaryTag[];
  available: boolean;
  isPopular?: boolean;
  isSeasonal?: boolean;
  calories?: number;
  sizes?: ProductSize[];
  milkOptions?: string[];
  sweetLevels?: string[];
  extras?: ProductExtra[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  size: string;
  sizePrice: number;
  milk: string;
  milkPrice: number;
  sweetLevel: string;
  selectedExtras: ProductExtra[];
  quantity: number;
  itemPrice: number;
  specialInstructions?: string;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'Garden Patio' | 'Main Bar' | 'Sunlit Atrium' | 'Library Nook';
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled' | 'seated';
  createdAt: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  pickupTime: string;
  orderType: 'pickup_now' | 'scheduled';
}

export interface Order {
  id: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  tax: number;
  tip: number;
  total: number;
  paymentMethod: string;
  status: 'received' | 'crafting' | 'ready' | 'completed';
  createdAt: string;
}

export interface EventPackage {
  id: string;
  name: string;
  tagline: string;
  guestCapacity: string;
  basePrice: number;
  priceUnit: string;
  description: string;
  features: string[];
  image: string;
  recommendedFor: string;
}

export interface EventInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  packageType: string;
  budgetRange: string;
  notes?: string;
  status: 'new' | 'quoted' | 'confirmed';
  createdAt: string;
}

export interface LoyaltyAccount {
  name: string;
  email: string;
  phone: string;
  points: number;
  tier: 'Seedling' | 'Bloom' | 'Florist VIP';
  memberSince: string;
  history: {
    id: string;
    date: string;
    description: string;
    points: number;
  }[];
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  favoriteItem: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'coffee' | 'orders' | 'reservations' | 'events';
}
