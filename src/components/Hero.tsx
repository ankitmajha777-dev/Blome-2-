import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Hero: React.FC<{
  onExploreMenu: () => void;
  onOrderOnline: () => void;
  onReserve: () => void;
}> = ({ onExploreMenu, onOrderOnline, onReserve }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
      
      {/* Background Subtle Botanical Vignettes */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-[#A7B39A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-96 h-96 bg-[#E7DCCB]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Live Status Pill & Heritage Note */}
            <div className="inline-flex items-center gap-3 text-xs tracking-wider uppercase font-medium text-[#5D463B] pb-1">
              <span className="inline-flex items-center gap-1.5 text-[#35483A] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#6D7F60] animate-pulse"></span>
                Open Today · 6:30 AM – 7:00 PM
              </span>
              <span className="text-[#A7B39A]" aria-hidden="true">·</span>
              <span className="text-[#5D463B]">418 Blossom Lane, SoHo</span>
            </div>

            {/* Editorial Serif Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-[#35261F] leading-[1.08]">
                Good Coffee. <br />
                <span className="italic font-light text-[#35483A]">Beautiful Moments.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#5D463B] font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed pt-2">
                Thoughtfully sourced beans, handcrafted drinks, and little moments worth slowing down for.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#35261F] text-[#F7F4ED] hover:bg-[#223126] font-medium text-sm tracking-wide rounded-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onOrderOnline}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#35483A] text-[#35483A] hover:bg-[#35483A]/10 font-medium text-sm tracking-wide rounded-md transition-all duration-200 cursor-pointer"
              >
                Order Your Favorite
              </button>

              <button
                onClick={onReserve}
                className="text-xs uppercase tracking-wider font-semibold text-[#5D463B] hover:text-[#35261F] underline decoration-[#A7B39A] underline-offset-4 px-2 py-2 cursor-pointer"
              >
                Reserve Table
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-[#E7DCCB]/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <span className="font-serif text-2xl font-medium text-[#35483A] block">100%</span>
                <span className="text-xs text-[#5D463B] leading-tight block">Direct-trade single origin lots</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-medium text-[#35483A] block">5:30 AM</span>
                <span className="text-xs text-[#5D463B] leading-tight block">Daily scratch bakery batches</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-medium text-[#35483A] block">Zero</span>
                <span className="text-xs text-[#5D463B] leading-tight block">Synthetic syrups or flavorings</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Art & Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Botanical Frame Outline */}
              <div className="absolute -inset-3 rounded-2xl border border-[#A7B39A]/40 -rotate-1 pointer-events-none" />

              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#E7DCCB] aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85"
                  alt="Artisanal pour over coffee with botanical flower petals at Beane & Blossom"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#35261F]/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Tasting Note Tag */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#F7F4ED]/95 backdrop-blur-md rounded-lg border border-[#E7DCCB] shadow-lg text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#6D7F60] font-semibold block">
                        Today’s Roaster Select
                      </span>
                      <h4 className="font-serif text-lg font-medium text-[#35261F]">
                        Ethiopia Yirgacheffe Microlot
                      </h4>
                      <p className="text-xs text-[#5D463B] mt-0.5">
                        Jasmine Blossom · Bergamot · Sun-dried Peach
                      </p>
                    </div>
                    <button 
                      onClick={onOrderOnline}
                      className="px-3 py-1.5 bg-[#35483A] text-[#F7F4ED] text-xs font-medium rounded hover:bg-[#223126] transition-colors cursor-pointer"
                    >
                      Taste
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Botanical Floating Card */}
              <div className="hidden sm:flex absolute -top-5 -left-8 bg-[#F7F4ED] border border-[#E7DCCB] rounded-lg p-3 shadow-md items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#A7B39A]/20 flex items-center justify-center text-[#35483A]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left pr-2">
                  <span className="text-[10px] uppercase font-semibold text-[#5D463B] block">House Recipe</span>
                  <span className="text-xs font-serif font-semibold text-[#35261F]">Damascus Rose Water Infusion</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex flex-col items-center justify-center text-[#5D463B] text-xs tracking-widest uppercase">
          <span className="mb-2">Scroll To Discover</span>
          <div className="w-5 h-8 border border-[#5D463B]/40 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-[#35483A] rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};
