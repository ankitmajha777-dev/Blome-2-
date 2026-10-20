import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Reservation, Order, EventInquiry, LoyaltyAccount, Review } from '../types/cafe';
import {
  INITIAL_PRODUCTS,
  INITIAL_RESERVATIONS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS
} from '../data/initialData';
import {
  calculateItemUnitPrice,
  calculateSubtotal,
  calculateDiscount,
  calculateOrderTotal,
  calculatePointsEarned,
  generateOrderId,
  generateReservationId
} from '../utils/pricing';

interface CafeContextType {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  toggleProductAvailability: (id: string) => void;

  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCartQuantity: (cartId: string, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  promoCodeInput: string;
  setPromoCodeInput: (code: string) => void;
  appliedPromoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  discount: number;
  tax: number;
  tipAmount: number;
  setTipAmount: (tip: number) => void;
  tipPercent: number | 'custom';
  setTipPercent: (percent: number | 'custom') => void;
  total: number;

  selectedProductForModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isReservationModalOpen: boolean;
  setIsReservationModalOpen: (open: boolean) => void;

  isLoyaltyModalOpen: boolean;
  setIsLoyaltyModalOpen: (open: boolean) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  activeLegalModal: 'privacy' | 'terms' | 'accessibility' | null;
  setActiveLegalModal: (type: 'privacy' | 'terms' | 'accessibility' | null) => void;

  orders: Order[];
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
  createOrder: (customer: Order['customer'], paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  reservations: Reservation[];
  addReservation: (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;
  cancelReservation: (id: string) => void;

  eventInquiries: EventInquiry[];
  submitEventInquiry: (data: Omit<EventInquiry, 'id' | 'createdAt' | 'status'>) => EventInquiry;
  updateEventInquiryStatus: (id: string, status: EventInquiry['status']) => void;

  loyaltyUser: LoyaltyAccount | null;
  loginLoyalty: (email: string, name: string) => void;
  logoutLoyalty: () => void;
  redeemPoints: (points: number, rewardName: string) => boolean;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;

  newsletterEmails: string[];
  subscribeNewsletter: (email: string) => { success: boolean; message: string };

  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bb_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bb_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [tipPercent, setTipPercent] = useState<number | 'custom'>(18);
  const [tipAmount, setTipAmount] = useState<number>(0);

  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'accessibility' | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('bb_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('bb_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [eventInquiries, setEventInquiries] = useState<EventInquiry[]>(() => {
    const saved = localStorage.getItem('bb_inquiries');
    return saved ? JSON.parse(saved) : [
      {
        id: 'INQ-104',
        name: 'Avery Morgan',
        email: 'avery@designguild.org',
        phone: '(555) 782-9012',
        date: '2026-11-15',
        guests: 45,
        packageType: 'The Botanical Coffee Cart Experience',
        budgetRange: '$1,000 - $2,500',
        notes: 'Annual design agency gathering, would love iced rose matcha included.',
        status: 'quoted',
        createdAt: '2026-10-18T16:30:00Z'
      }
    ];
  });

  const [loyaltyUser, setLoyaltyUser] = useState<LoyaltyAccount | null>(() => {
    const saved = localStorage.getItem('bb_loyalty');
    return saved ? JSON.parse(saved) : {
      name: 'Eleanor Sterling',
      email: 'eleanor@bloom.com',
      phone: '(555) 349-2810',
      points: 135,
      tier: 'Bloom',
      memberSince: 'March 2025',
      history: [
        { id: 'tx-1', date: '2026-10-12', description: 'Blossom Vanilla Latte + Pastry', points: 14 },
        { id: 'tx-2', date: '2026-10-04', description: 'Single-Origin Coffee Box Set', points: 45 }
      ]
    };
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('bb_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [newsletterEmails, setNewsletterEmails] = useState<string[]>(() => {
    const saved = localStorage.getItem('bb_newsletter');
    return saved ? JSON.parse(saved) : ['patron@studio.org'];
  });

  useEffect(() => {
    localStorage.setItem('bb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bb_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bb_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('bb_inquiries', JSON.stringify(eventInquiries));
  }, [eventInquiries]);

  useEffect(() => {
    if (loyaltyUser) {
      localStorage.setItem('bb_loyalty', JSON.stringify(loyaltyUser));
    }
  }, [loyaltyUser]);

  useEffect(() => {
    localStorage.setItem('bb_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('bb_newsletter', JSON.stringify(newsletterEmails));
  }, [newsletterEmails]);

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast(`Updated "${updated.name}"`);
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts(prev => [product, ...prev]);
    showToast(`Added new item "${product.name}"`);
  };

  const toggleProductAvailability = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const next = !p.available;
        showToast(`Marked "${p.name}" as ${next ? 'Available' : 'Out of Stock'}`);
        return { ...p, available: next };
      }
      return p;
    }));
  };

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === newItem.product.id &&
        item.size === newItem.size &&
        item.milk === newItem.milk &&
        item.sweetLevel === newItem.sweetLevel &&
        JSON.stringify(item.selectedExtras) === JSON.stringify(newItem.selectedExtras)
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });
    showToast(`Added ${newItem.quantity}x ${newItem.product.name} to cart`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = calculateSubtotal(cart);
  const promoRes = calculateDiscount(subtotal, appliedPromoCode);
  const discount = promoRes.discount;

  useEffect(() => {
    if (typeof tipPercent === 'number') {
      const netSub = Math.max(0, subtotal - discount);
      const calculatedTip = Math.round(((netSub * tipPercent) / 100) * 100) / 100;
      setTipAmount(calculatedTip);
    }
  }, [subtotal, discount, tipPercent]);

  const totals = calculateOrderTotal(subtotal, discount, 0.0825, tipAmount);
  const tax = totals.tax;
  const total = totals.total;

  const applyPromoCode = (code: string) => {
    const res = calculateDiscount(subtotal, code);
    if (res.error) {
      return { success: false, message: res.error };
    }
    setAppliedPromoCode(code.trim().toUpperCase());
    setPromoCodeInput('');
    return { success: true, message: `Promo code ${code.toUpperCase()} applied!` };
  };

  const removePromoCode = () => {
    setAppliedPromoCode('');
  };

  const openProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  const createOrder = (customer: Order['customer'], paymentMethod: string): Order => {
    const orderId = generateOrderId();
    const newOrder: Order = {
      id: orderId,
      customer,
      items: [...cart],
      subtotal,
      discount,
      promoCode: appliedPromoCode || undefined,
      tax,
      tip: tipAmount,
      total,
      paymentMethod,
      status: 'received',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);

    if (loyaltyUser) {
      const points = calculatePointsEarned(subtotal);
      setLoyaltyUser(prev => prev ? {
        ...prev,
        points: prev.points + points,
        history: [
          {
            id: `tx-${Date.now()}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            description: `Order #${orderId}`,
            points
          },
          ...prev.history
        ]
      } : null);
    }

    clearCart();
    setAppliedPromoCode('');
    setIsCheckoutOpen(false);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (lastCompletedOrder && lastCompletedOrder.id === orderId) {
      setLastCompletedOrder(prev => prev ? { ...prev, status } : null);
    }
    showToast(`Order #${orderId} marked as ${status}`);
  };

  const addReservation = (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
    const reservation: Reservation = {
      ...data,
      id: generateReservationId(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [reservation, ...prev]);
    showToast(`Reservation confirmed for ${reservation.name} on ${reservation.date}!`);
    return reservation;
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
    showToast(`Reservation ${id} has been cancelled.`);
  };

  const submitEventInquiry = (data: Omit<EventInquiry, 'id' | 'createdAt' | 'status'>): EventInquiry => {
    const inquiry: EventInquiry = {
      ...data,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setEventInquiries(prev => [inquiry, ...prev]);
    showToast(`Thank you, ${inquiry.name}! Your private event inquiry has been received.`);
    return inquiry;
  };

  const updateEventInquiryStatus = (id: string, status: EventInquiry['status']) => {
    setEventInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    showToast(`Inquiry ${id} updated to ${status}`);
  };

  const loginLoyalty = (email: string, name: string) => {
    const existing = loyaltyUser && loyaltyUser.email === email ? loyaltyUser : {
      name: name || 'Patron',
      email,
      phone: '(555) 000-0000',
      points: 75,
      tier: 'Seedling' as const,
      memberSince: 'October 2026',
      history: [
        { id: `tx-${Date.now()}`, date: 'Welcome Bonus', description: 'Welcome to Blossom Society', points: 75 }
      ]
    };
    setLoyaltyUser(existing);
    showToast(`Welcome back, ${existing.name}!`);
  };

  const logoutLoyalty = () => {
    setLoyaltyUser(null);
    showToast('Signed out of The Blossom Society');
  };

  const redeemPoints = (pointsRequired: number, rewardName: string): boolean => {
    if (!loyaltyUser || loyaltyUser.points < pointsRequired) {
      showToast('Insufficient loyalty points for this perk');
      return false;
    }

    setLoyaltyUser({
      ...loyaltyUser,
      points: loyaltyUser.points - pointsRequired,
      history: [
        {
          id: `tx-${Date.now()}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          description: `Redeemed: ${rewardName}`,
          points: -pointsRequired
        },
        ...loyaltyUser.history
      ]
    });

    if (rewardName.includes('Free Handcrafted Beverage')) {
      setAppliedPromoCode('FIRSTCUP');
    }

    showToast(`Redeemed ${rewardName}! Reward applied to your account.`);
    return true;
  };

  const addReview = (newReview: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const review: Review = {
      ...newReview,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true
    };
    setReviews(prev => [review, ...prev]);
    showToast('Thank you for sharing your Beane & Blossom experience!');
  };

  const subscribeNewsletter = (email: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (newsletterEmails.includes(email.toLowerCase())) {
      return { success: false, message: 'You are already a member of The Bloom Society!' };
    }
    setNewsletterEmails(prev => [...prev, email.toLowerCase()]);
    setAppliedPromoCode('BLOOM15');
    showToast('Welcome to The Bloom Society! Promo code BLOOM15 activated.');
    return { success: true, message: 'Welcome to The Bloom Society! 15% off code BLOOM15 has been unlocked.' };
  };

  return (
    <CafeContext.Provider
      value={{
        products,
        updateProduct,
        addProduct,
        toggleProductAvailability,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,

        promoCodeInput,
        setPromoCodeInput,
        appliedPromoCode,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discount,
        tax,
        tipAmount,
        setTipAmount,
        tipPercent,
        setTipPercent,
        total,

        selectedProductForModal,
        openProductModal,
        closeProductModal,

        isCheckoutOpen,
        setIsCheckoutOpen,

        isReservationModalOpen,
        setIsReservationModalOpen,

        isLoyaltyModalOpen,
        setIsLoyaltyModalOpen,

        isAdminOpen,
        setIsAdminOpen,

        activeLegalModal,
        setActiveLegalModal,

        orders,
        lastCompletedOrder,
        setLastCompletedOrder,
        createOrder,
        updateOrderStatus,

        reservations,
        addReservation,
        cancelReservation,

        eventInquiries,
        submitEventInquiry,
        updateEventInquiryStatus,

        loyaltyUser,
        loginLoyalty,
        logoutLoyalty,
        redeemPoints,

        reviews,
        addReview,

        newsletterEmails,
        subscribeNewsletter,

        toastMessage,
        showToast
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
