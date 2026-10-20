export interface CartCustomization {
  size: string;
  sizePrice: number;
  milk: string;
  milkPrice: number;
  sweetLevel: string;
  extras: { name: string; price: number }[];
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  amount: number;
  minOrder: number;
  description: string;
}

export const VALID_PROMO_CODES: Record<string, PromoCode> = {
  'BLOOM15': {
    code: 'BLOOM15',
    discountType: 'percentage',
    amount: 15,
    minOrder: 10,
    description: '15% off orders over $10'
  },
  'FIRSTCUP': {
    code: 'FIRSTCUP',
    discountType: 'fixed',
    amount: 3.50,
    minOrder: 8,
    description: '$3.50 off your first handcrafted cup'
  },
  'COFFEELOVER': {
    code: 'COFFEELOVER',
    discountType: 'percentage',
    amount: 10,
    minOrder: 0,
    description: '10% off any order'
  }
};

export function calculateItemUnitPrice(
  basePrice: number,
  sizePrice: number = 0,
  milkPrice: number = 0,
  extras: { price: number }[] = []
): number {
  const extrasTotal = extras.reduce((sum, item) => sum + item.price, 0);
  const total = basePrice + sizePrice + milkPrice + extrasTotal;
  return Math.round(total * 100) / 100;
}

export function calculateSubtotal(items: { itemPrice: number; quantity: number }[]): number {
  const subtotal = items.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  return Math.round(subtotal * 100) / 100;
}

export function calculateDiscount(subtotal: number, promoCodeString?: string): { discount: number; appliedPromo?: PromoCode; error?: string } {
  if (!promoCodeString || !promoCodeString.trim()) {
    return { discount: 0 };
  }
  
  const cleanCode = promoCodeString.trim().toUpperCase();
  const promo = VALID_PROMO_CODES[cleanCode];

  if (!promo) {
    return { discount: 0, error: 'Invalid promotional code.' };
  }

  if (subtotal < promo.minOrder) {
    return { discount: 0, error: `Minimum order of $${promo.minOrder.toFixed(2)} required for code ${promo.code}.` };
  }

  let discount = 0;
  if (promo.discountType === 'percentage') {
    discount = (subtotal * promo.amount) / 100;
  } else {
    discount = promo.amount;
  }

  discount = Math.min(discount, subtotal);
  return {
    discount: Math.round(discount * 100) / 100,
    appliedPromo: promo
  };
}

export function calculateTax(taxableAmount: number, taxRate: number = 0.0825): number {
  const tax = Math.max(0, taxableAmount) * taxRate;
  return Math.round(tax * 100) / 100;
}

export function calculateOrderTotal(
  subtotal: number,
  discount: number,
  taxRate: number = 0.0825,
  tip: number = 0
): { subtotal: number; discount: number; tax: number; tip: number; total: number } {
  const netSubtotal = Math.max(0, subtotal - discount);
  const tax = calculateTax(netSubtotal, taxRate);
  const total = Math.round((netSubtotal + tax + tip) * 100) / 100;
  return {
    subtotal,
    discount,
    tax,
    tip,
    total
  };
}

export function calculatePointsEarned(subtotal: number, multiplier: number = 1): number {
  return Math.floor(Math.max(0, subtotal) * multiplier);
}

export function generateOrderId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BB-${num}`;
}

export function generateReservationId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `RSV-${num}`;
}
