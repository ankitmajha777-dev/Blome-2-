import React, { useState } from 'react';
import { CAFÉ_DETAILS, INITIAL_FAQS } from '../data/initialData';
import { MapPin, Phone, Mail, Clock, Compass, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => prev === idx ? null : idx);
  };

  return (
    <section id="contact" className="py-24 bg-[#F4EFE7] border-t border-[#E7DCCB]/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6D7F60] font-semibold">
            Visit Our SoHo Sanctuary
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#35261F] font-normal">
            Hours, Location & Transit
          </h2>
          <p className="text-sm sm:text-base text-[#5D463B] leading-relaxed">
            Conveniently nestled in historic SoHo between cobbled brick lanes and sunlit cast-iron lofts.
          </p>
        </div>

        {/* Location & Hours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left Column: Hours & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hours Card */}
            <div className="bg-[#F7F4ED] rounded-2xl p-6 sm:p-8 border border-[#E7DCCB] space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7DCCB]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#35483A]" />
                  <h3 className="font-serif text-lg font-semibold text-[#35261F]">
                    Hours of Hospitality
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#35483A] bg-[#CBD6C1]/40 px-2.5 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#35483A]"></span>
                  Open Today
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#5D463B]">
                <div className="flex justify-between">
                  <span className="font-medium text-[#35261F]">Monday – Friday</span>
                  <span>{CAFÉ_DETAILS.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-[#35261F]">Saturday – Sunday</span>
                  <span>{CAFÉ_DETAILS.hours.weekends}</span>
                </div>
                <p className="text-[11px] text-[#5D463B]/80 pt-2 border-t border-[#E7DCCB]/60">
                  * Scratch bakery items pull fresh at 5:30 AM. Espresso bar opens promptly at 6:30 AM.
                </p>
              </div>
            </div>

            {/* Address & Communication */}
            <div className="bg-[#F7F4ED] rounded-2xl p-6 sm:p-8 border border-[#E7DCCB] space-y-4 shadow-sm text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#35483A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#35261F] text-sm mb-0.5">Address</h4>
                  <p className="text-[#5D463B]">{CAFÉ_DETAILS.address}</p>
                  <p className="text-[11px] text-[#6D7F60] mt-1 font-medium">
                    Transit: N, R, W at Prince St · 6 at Spring St · B, D, F, M at Broadway-Lafayette
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E7DCCB]/60">
                <Phone className="w-4 h-4 text-[#35483A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#35261F] text-sm mb-0.5">Telephone</h4>
                  <p className="text-[#5D463B]">{CAFÉ_DETAILS.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E7DCCB]/60">
                <Mail className="w-4 h-4 text-[#35483A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#35261F] text-sm mb-0.5">Direct Inquiries</h4>
                  <p className="text-[#5D463B]">{CAFÉ_DETAILS.email}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Map & Conservatory Visual */}
          <div className="lg:col-span-7">
            <div className="bg-[#F7F4ED] rounded-2xl overflow-hidden border border-[#E7DCCB] shadow-sm">
              <div className="relative aspect-[16/10] bg-[#E7DCCB]">
                <img
                  src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80"
                  alt="Beane and Blossom SoHo café exterior and conservatory street entrance"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#35261F]/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#CBD6C1] font-semibold block">
                      Architectural Conservatory
                    </span>
                    <h4 className="font-serif text-2xl font-medium">
                      Beane & Blossom SoHo Flagship
                    </h4>
                    <p className="text-xs text-white/80 mt-0.5">
                      Indoor Ficus Conservatory · Outdoor Brick Courtyard · Hi-Fi Vinyl Bar
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=SoHo+New+York"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-[#35261F] text-xs font-semibold rounded-lg hover:bg-[#F7F4ED] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Transit & Accessibility Guide */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5D463B]">
                <div>
                  <strong className="text-[#35261F] block mb-1">Accessibility</strong>
                  <p>Step-free ramp entry on Blossom Lane, wide interior aisles, ADA-compliant restrooms, and quiet sensory seating in the Library Nook.</p>
                </div>
                <div>
                  <strong className="text-[#35261F] block mb-1">Bicycle & Pet Policy</strong>
                  <p>Dedicated brass bicycle racks at front entrance. Well-behaved leashed dogs are warmly welcomed in our outdoor Garden Patio.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#6D7F60] font-semibold">
              Frequently Inquired
            </span>
            <h3 className="font-serif text-3xl font-medium text-[#35261F]">
              Common Questions
            </h3>
          </div>

          <div className="space-y-3">
            {INITIAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F4ED] rounded-xl border border-[#E7DCCB] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#E7DCCB]/20 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#35261F]">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#35483A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#5D463B] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs text-[#5D463B] leading-relaxed border-t border-[#E7DCCB]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
