import React from 'react';
import { useCafe } from '../context/CafeContext';
import { Sparkles, Plus } from 'lucide-react';

export const SignatureDrinks: React.FC = () => {
  const { products, openProductModal } = useCafe();

  const signatureItems = products.filter(p => p.category === 'signature' || p.category === 'seasonal');

  return (
    <section id="signature" className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6D7F60] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#A7B39A]" />
              Artisan Extractions & Botanical Nectar
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#35261F] font-normal leading-tight">
              Signature Experiences
            </h2>
            <p className="text-sm sm:text-base text-[#5D463B] leading-relaxed">
              Formulated in our test kitchen. Each drink balances terroir-specific espresso with organic blossoms, unrefined sugars, and bespoke plant milks.
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs text-[#5D463B] block">Available for Counter Pickup & Dining In</span>
            <span className="text-xs font-semibold text-[#35483A]">Customizable with House Milks & Sweetness</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureItems.map(item => (
            <div 
              key={item.id}
              className="group bg-[#F4EFE7] rounded-xl overflow-hidden border border-[#E7DCCB] hover:border-[#A7B39A] transition-all duration-300 flex flex-col justify-between hover:shadow-lg"
            >
              <div>
                {/* Image Container with Zoom */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#E7DCCB]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#F7F4ED]/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-[#35261F] shadow-sm">
                    ${item.price.toFixed(2)}
                  </div>
                  {item.isSeasonal && (
                    <div className="absolute top-3 left-3 bg-[#35483A] text-[#F7F4ED] px-2.5 py-1 rounded text-[11px] font-medium tracking-wide">
                      Spring Seasonal
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  {item.origin && (
                    <span className="text-[11px] uppercase tracking-wider text-[#6D7F60] font-semibold block">
                      {item.origin}
                    </span>
                  )}
                  
                  <h3 className="font-serif text-2xl font-medium text-[#35261F] group-hover:text-[#35483A] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5D463B] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {item.tastingNotes && item.tastingNotes.length > 0 && (
                    <div className="pt-2 text-[11px] text-[#5D463B] flex flex-wrap items-center gap-1.5 font-medium">
                      <span className="text-[#35261F]">Notes:</span>
                      {item.tastingNotes.map((note, idx) => (
                        <React.Fragment key={idx}>
                          <span>{note}</span>
                          {idx < item.tastingNotes!.length - 1 && <span className="text-[#A7B39A]">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openProductModal(item)}
                  className="w-full py-2.5 px-4 rounded-md border border-[#35261F] text-[#35261F] group-hover:bg-[#35261F] group-hover:text-[#F7F4ED] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Customize & Order</span>
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
