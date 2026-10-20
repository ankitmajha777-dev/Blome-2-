import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { CheckCircle2, Clock, MapPin, QrCode, X } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { lastCompletedOrder, setLastCompletedOrder, updateOrderStatus } = useCafe();

  const [counterMinutes, setCounterMinutes] = useState(14);

  useEffect(() => {
    if (!lastCompletedOrder) return;
    const interval = setInterval(() => {
      setCounterMinutes(prev => (prev > 1 ? prev - 1 : 1));
    }, 60000);
    return () => clearInterval(interval);
  }, [lastCompletedOrder]);

  if (!lastCompletedOrder) return null;

  const order = lastCompletedOrder;

  const steps = [
    { key: 'received', label: 'Order Received', desc: 'Sent to barista espresso queue' },
    { key: 'crafting', label: 'Brewing & Crafting', desc: 'Pulling shots & steaming milk' },
    { key: 'ready', label: 'Ready at Counter', desc: 'At 418 Blossom Lane pickup zone' },
    { key: 'completed', label: 'Picked Up', desc: 'Order enjoyed' }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === order.status);

  const advanceDemoStatus = () => {
    if (order.status === 'received') updateOrderStatus(order.id, 'crafting');
    else if (order.status === 'crafting') updateOrderStatus(order.id, 'ready');
    else if (order.status === 'ready') updateOrderStatus(order.id, 'completed');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F7F4ED] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E7DCCB] my-8 animate-fade-in">
        
        {/* Header Confirmation Banner */}
        <div className="p-8 bg-[#35483A] text-[#F7F4ED] text-center relative">
          <button
            onClick={() => setLastCompletedOrder(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Close confirmation"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#A7B39A]/20 border border-[#A7B39A]/40 flex items-center justify-center mx-auto mb-3 text-[#A7B39A]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#CBD6C1] font-semibold block">
            Order Confirmed & Sent to Barista
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal mt-1">
            Thank you, {order.customer.name.split(' ')[0]}!
          </h2>
          <p className="text-xs text-[#CBD6C1] mt-2">
            Order Number: <strong className="text-white font-mono text-sm">#{order.id}</strong> · Receipt sent to {order.customer.email}
          </p>
        </div>

        {/* Live Order Tracker */}
        <div className="p-6 bg-[#F4EFE7] border-b border-[#E7DCCB]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#35261F] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#35483A]" />
              Live Preparation Tracker
            </span>
            <span className="text-xs font-semibold text-[#6D7F60] bg-[#CBD6C1]/40 px-2.5 py-1 rounded">
              Ready in ~{counterMinutes} mins
            </span>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-4 gap-2 relative">
            {steps.map((step, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={step.key} className="text-center space-y-1">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isPast || isCurrent ? 'bg-[#35483A]' : 'bg-[#E7DCCB]'
                    }`}
                  />
                  <span className={`text-[10px] font-medium block leading-tight ${
                    isCurrent ? 'text-[#35483A] font-bold' : isPast ? 'text-[#35261F]' : 'text-[#5D463B]/60'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Demo Barista Simulator Trigger */}
          <div className="mt-4 pt-3 border-t border-[#E7DCCB]/60 flex items-center justify-between text-xs text-[#5D463B]">
            <span>Simulation Testing:</span>
            <button
              onClick={advanceDemoStatus}
              disabled={order.status === 'completed'}
              className="text-[11px] underline text-[#35483A] font-medium hover:text-[#223126] cursor-pointer"
            >
              Advance Order Status ({order.status}) →
            </button>
          </div>
        </div>

        {/* Counter Pickup Instructions & QR Code */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-5 rounded-xl border border-[#E7DCCB]">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#6D7F60] font-semibold block">
                Pickup Destination
              </span>
              <h4 className="font-serif text-lg font-medium text-[#35261F]">
                Beane & Blossom SoHo Counter
              </h4>
              <p className="text-xs text-[#5D463B] flex items-center gap-1 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 text-[#35483A]" />
                418 Blossom Lane, SoHo, NY 10012
              </p>
              <p className="text-xs text-[#5D463B] pt-1">
                Show this barcode or your name to the barista at the mobile pickup station.
              </p>
            </div>

            {/* Simulated QR Barcode */}
            <div className="p-3 bg-[#F7F4ED] border border-[#E7DCCB] rounded-lg text-center shrink-0">
              <QrCode className="w-20 h-20 text-[#35261F] mx-auto" />
              <span className="font-mono text-[10px] text-[#5D463B] block mt-1">#{order.id}</span>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#35261F]">
              Itemized Receipt
            </h4>
            <div className="space-y-2 bg-white p-4 rounded-xl border border-[#E7DCCB] text-xs">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-start pb-2 border-b border-[#E7DCCB]/40 last:border-0 last:pb-0">
                  <div>
                    <span className="font-medium text-[#35261F]">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="text-[11px] text-[#5D463B] block">
                      {item.size} {item.milk !== 'None' && `· ${item.milk}`}
                    </span>
                    {item.selectedExtras.length > 0 && (
                      <span className="text-[10px] text-[#6D7F60] block">
                        +{item.selectedExtras.map(e => e.name).join(', ')}
                      </span>
                    )}
                  </div>
                  <span className="font-medium text-[#35261F]">
                    ${(item.itemPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-[#E7DCCB] space-y-1 text-xs text-[#5D463B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#6D7F60]">
                    <span>Discount ({order.promoCode})</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (8.25%)</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Barista Gratuity</span>
                  <span>${order.tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#35261F] pt-2 border-t border-[#E7DCCB]">
                  <span>Total Paid</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Close Action */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              onClick={() => {
                window.print();
              }}
              className="px-4 py-2 text-xs border border-[#35261F] text-[#35261F] rounded-md hover:bg-[#E7DCCB]/40 transition-colors cursor-pointer"
            >
              Print / Save Receipt
            </button>
            <button
              onClick={() => setLastCompletedOrder(null)}
              className="px-6 py-2.5 bg-[#35261F] text-[#F7F4ED] text-xs font-semibold rounded-md hover:bg-[#223126] transition-colors cursor-pointer"
            >
              Back to Café
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
