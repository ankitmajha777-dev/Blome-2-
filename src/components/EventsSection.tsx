import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { INITIAL_EVENT_PACKAGES } from '../data/initialData';
import { EventPackage } from '../types/cafe';
import { Calendar, Users, DollarSign, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const { submitEventInquiry } = useCafe();

  const [selectedPackage, setSelectedPackage] = useState<string>(INITIAL_EVENT_PACKAGES[0].name);
  const [guests, setGuests] = useState<number>(40);
  const [date, setDate] = useState('2026-11-20');
  const [budgetRange, setBudgetRange] = useState('$1,000 - $2,500');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    submitEventInquiry({
      name,
      email,
      phone,
      date,
      guests,
      packageType: selectedPackage,
      budgetRange,
      notes: notes.trim() || undefined
    });

    setInquirySubmitted(true);
  };

  return (
    <section id="events" className="py-24 bg-[#F4EFE7] border-t border-[#E7DCCB]/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6D7F60] font-semibold">
            Bespoke Gatherings & Roastery Catering
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#35261F] font-normal">
            Private Events & Catering
          </h2>
          <p className="text-sm sm:text-base text-[#5D463B] leading-relaxed">
            From our custom brass mobile espresso cart at gallery openings to exclusive evening buyouts of our SoHo conservatory, we bring botanical hospitality to your most memorable occasions.
          </p>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {INITIAL_EVENT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-[#F7F4ED] rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                selectedPackage === pkg.name
                  ? 'border-[#35483A] ring-2 ring-[#35483A] shadow-lg'
                  : 'border-[#E7DCCB] hover:border-[#A7B39A]'
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E7DCCB]">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-[#F7F4ED]/95 px-3 py-1 rounded text-xs font-semibold text-[#35261F]">
                    From ${pkg.basePrice}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-[#6D7F60] font-semibold block">
                    {pkg.guestCapacity}
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#35261F]">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#5D463B] leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="pt-2 border-t border-[#E7DCCB]/60 space-y-1.5">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-[#35261F]">
                        <span className="text-[#6D7F60] font-bold">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(pkg.name)}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                    selectedPackage === pkg.name
                      ? 'bg-[#35483A] text-white'
                      : 'border border-[#35261F] text-[#35261F] hover:bg-[#35261F] hover:text-white'
                  }`}
                >
                  {selectedPackage === pkg.name ? 'Selected Package' : 'Select Package'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Event Inquiry Form */}
        <div className="max-w-3xl mx-auto bg-[#F7F4ED] rounded-2xl border border-[#E7DCCB] p-8 sm:p-12 shadow-sm">
          {inquirySubmitted ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-full bg-[#A7B39A]/20 text-[#35483A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl font-medium text-[#35261F]">
                Event Proposal Request Received
              </h3>
              <p className="text-xs text-[#5D463B] max-w-md mx-auto leading-relaxed">
                Our hospitality director will review your event requirements for <strong>{selectedPackage}</strong> on <strong>{date}</strong> and reach out with a tailored proposal within 24 hours.
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#35261F] text-[#F7F4ED] text-xs rounded-md"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center space-y-1 mb-6">
                <h3 className="font-serif text-2xl font-medium text-[#35261F]">
                  Inquire for Your Date
                </h3>
                <p className="text-xs text-[#5D463B]">
                  Selected Package: <strong className="text-[#35483A]">{selectedPackage}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Target Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    min="2026-10-25"
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Estimated Guests ({guests})</label>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full accent-[#35483A] mt-2 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  >
                    <option value="Under $1,000">Under $1,000</option>
                    <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Avery Morgan"
                    className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="avery@example.com"
                    className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Event Concept & Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about the venue, dietary needs, whether you'd like custom branded cups or matcha bar..."
                  className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#35261F] hover:bg-[#223126] text-[#F7F4ED] font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Submit Event Inquiry
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
