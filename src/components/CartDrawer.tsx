import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { X, Trash2, Plus, Minus, Tag, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
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
    tipPercent,
    setTipPercent,
    total,
    setIsCheckoutOpen
  } = useCafe();

  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const res = applyPromoCode(promoCodeInput);
    if (!res.success) {
      setPromoError(res.message);
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#35261F]/60 backdrop-blur-sm flex justify-end">
      <div className="bg-[#F7F4ED] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E7DCCB] animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E7DCCB] flex items-center justify-between bg-[#F4EFE7]">
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#35261F]">
              Your Café Order
            </h2>
            <span className="text-xs text-[#5D463B]">
              {cart.length === 0 ? 'Your basket is empty' : `${cart.reduce((s, i) => s + i.quantity, 0)} items ready for brewing`}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#5D463B] hover:text-[#35261F] rounded-full hover:bg-[#E7DCCB]/40 transition-colors cursor-pointer"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#E7DCCB] flex items-center justify-center text-[#5D463B]">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-xl text-[#35261F]">No items in order</h3>
              <p className="text-xs text-[#5D463B] max-w-xs leading-relaxed">
                Explore our signature botanical espresso drinks, Kyoto matcha, or dawn-baked pastries.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-[#35261F] text-[#F7F4ED] text-xs font-medium rounded-md hover:bg-[#223126] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="p-3.5 bg-white rounded-xl border border-[#E7DCCB] space-y-2 relative shadow-sm"
              >
                <div className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-[#E7DCCB]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base font-medium text-[#35261F] leading-snug truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#35261F]">
                        ${(item.itemPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#5D463B] mt-0.5 leading-tight">
                      {item.size} {item.milk !== 'None' && `· ${item.milk}`} {item.sweetLevel !== 'Standard' && `· ${item.sweetLevel}`}
                    </p>

                    {item.selectedExtras.length > 0 && (
                      <p className="text-[10px] text-[#6D7F60] mt-0.5">
                        +{item.selectedExtras.map(e => e.name).join(', ')}
                      </p>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[10px] italic text-[#5D463B]/80 mt-0.5">
                        Note: "{item.specialInstructions}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E7DCCB]/60">
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>

                  <div className="flex items-center border border-[#E7DCCB] rounded p-0.5 bg-[#F7F4ED]">
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                      className="p-1 text-[#35261F] hover:bg-white rounded cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-medium text-[#35261F]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                      className="p-1 text-[#35261F] hover:bg-white rounded cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Billing Breakdown */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E7DCCB] bg-[#F4EFE7] space-y-4">
            
            {/* Promo Code Input */}
            <div>
              {appliedPromoCode ? (
                <div className="flex items-center justify-between bg-[#A7B39A]/20 border border-[#A7B39A] px-3 py-2 rounded-lg text-xs text-[#35483A]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#35483A]" />
                    <span className="font-semibold">{appliedPromoCode}</span>
                    <span>(-${discount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5D463B]" />
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Promo code (e.g. BLOOM15)"
                      className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E7DCCB] rounded-lg text-xs text-[#35261F] uppercase focus:outline-none focus:border-[#35483A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#35261F] text-[#F7F4ED] text-xs font-medium rounded-lg hover:bg-[#223126] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-600 mt-1">{promoError}</p>
              )}
            </div>

            {/* Tip Selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-[#5D463B]">
                <span>Barista Gratuity</span>
                <span className="font-medium text-[#35261F]">${tipAmount.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[15, 18, 20, 0].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      setTipPercent(pct);
                    }}
                    className={`py-1 text-center rounded text-xs transition-colors cursor-pointer ${
                      tipPercent === pct
                        ? 'bg-[#35483A] text-white font-medium'
                        : 'bg-white border border-[#E7DCCB] text-[#5D463B] hover:text-[#35261F]'
                    }`}
                  >
                    {pct === 0 ? 'None' : `${pct}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#5D463B] pt-2 border-t border-[#E7DCCB]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#35261F]">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#6D7F60] font-medium">
                  <span>Promotional Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Local Estimated Tax (8.25%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Pickup Prep & Packaging</span>
                <span className="text-[#35483A] font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#35261F] pt-2 border-t border-[#E7DCCB]">
                <span className="font-serif text-lg">Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 bg-[#35483A] hover:bg-[#223126] text-[#F7F4ED] font-medium text-sm rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
