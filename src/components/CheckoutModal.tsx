import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { X, Lock, CreditCard, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

export const CheckoutModal: React.FC<{
  onSuccess: () => void;
}> = ({ onSuccess }) => {
  const {
    cart,
    subtotal,
    discount,
    tax,
    tipAmount,
    total,
    appliedPromoCode,
    isCheckoutOpen,
    setIsCheckoutOpen,
    createOrder
  } = useCafe();

  const [name, setName] = useState('Elena Vance');
  const [email, setEmail] = useState('elena.vance@example.com');
  const [phone, setPhone] = useState('(555) 438-9210');
  const [pickupTime, setPickupTime] = useState('In 15 minutes (ASAP)');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please provide your full name, email, and phone number for pickup notifications.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      createOrder(
        {
          name,
          email,
          phone,
          pickupTime,
          orderType: pickupTime.includes('ASAP') ? 'pickup_now' : 'scheduled'
        },
        paymentMethod === 'apple_pay' ? 'Apple Pay (Demo)' : 'Stripe Simulated Card (•••• 4242)'
      );
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F7F4ED] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E7DCCB] my-8 animate-fade-in">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#F4EFE7] border-b border-[#E7DCCB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#35483A] text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#35261F]">
                Secure Express Checkout
              </h3>
              <span className="text-[11px] text-[#5D463B] block">
                Counter Pickup at Beane & Blossom, SoHo Flagship
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#5D463B] hover:text-[#35261F] rounded-full hover:bg-[#E7DCCB]/40 cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Mode Notice Requirement */}
        <div className="bg-[#A7B39A]/20 px-6 py-2.5 border-b border-[#A7B39A]/40 flex items-center gap-2 text-xs text-[#35483A]">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#35483A]" />
          <span>
            <strong>Simulated Stripe Environment:</strong> Connect production Stripe API keys via server proxy for live charges.
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#35261F]">
              1. Guest Information for Order Pickup
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-[#5D463B] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                  placeholder="e.g. Julian Reynolds"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#5D463B] block mb-1">Mobile Phone (for pickup SMS)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[11px] text-[#5D463B] block mb-1">Email (for digital receipt)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                  placeholder="julian@example.com"
                />
              </div>
            </div>
          </div>

          {/* Pickup Window */}
          <div className="space-y-3 pt-2 border-t border-[#E7DCCB]/80">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#35261F] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#35483A]" />
              2. Pickup Preparation Window
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                'In 15 minutes (ASAP)',
                'In 30 minutes',
                'In 45 minutes'
              ].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setPickupTime(time)}
                  className={`p-2.5 text-center rounded-lg border text-xs cursor-pointer transition-colors ${
                    pickupTime === time
                      ? 'border-[#35483A] bg-[#35483A] text-white font-medium'
                      : 'border-[#E7DCCB] bg-white text-[#5D463B] hover:border-[#A7B39A]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-[#E7DCCB]/80">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#35261F]">
              3. Payment Method
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#35483A] bg-[#E7DCCB]/30 text-[#35261F] font-semibold'
                    : 'border-[#E7DCCB] bg-white text-[#5D463B]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit Card</span>
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-lg border text-xs flex items-center justify-center gap-2 cursor-pointer ${
                  paymentMethod === 'apple_pay'
                    ? 'border-[#35483A] bg-[#E7DCCB]/30 text-[#35261F] font-semibold'
                    : 'border-[#E7DCCB] bg-white text-[#5D463B]'
                }`}
              >
                <span>Apple Pay / G-Pay</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E7DCCB]">
                <div>
                  <label className="text-[10px] text-[#5D463B] block uppercase tracking-wider font-semibold mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs p-2 bg-[#F7F4ED] border border-[#E7DCCB] rounded text-[#35261F] font-mono outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-[#5D463B] block uppercase tracking-wider font-semibold mb-1">
                      Expires
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs p-2 bg-[#F7F4ED] border border-[#E7DCCB] rounded text-[#35261F] font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#5D463B] block uppercase tracking-wider font-semibold mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full text-xs p-2 bg-[#F7F4ED] border border-[#E7DCCB] rounded text-[#35261F] font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Final Order Review & Submit */}
          <div className="pt-4 border-t border-[#E7DCCB] space-y-3">
            <div className="flex items-center justify-between text-xs text-[#5D463B]">
              <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-xs text-[#6D7F60] font-medium">
                <span>Discount ({appliedPromoCode})</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-[#5D463B]">
              <span>Tax & Tip</span>
              <span>${(tax + tipAmount).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-[#35261F] pt-2 border-t border-[#E7DCCB]">
              <span className="font-serif text-lg">Total Due</span>
              <span className="text-xl">${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#35483A] hover:bg-[#223126] disabled:bg-gray-400 text-[#F7F4ED] font-semibold text-sm rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Place Order (${total.toFixed(2)})</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-[#5D463B]">
              256-Bit SSL Encrypted. Confirmation and live counter tracking will appear instantly.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
