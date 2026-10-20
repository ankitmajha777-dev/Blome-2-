import React from 'react';
import { TIMELINE_MILESTONES } from '../data/initialData';
import { Sprout, Flame } from 'lucide-react';

export const Story: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-[#F4EFE7] border-y border-[#E7DCCB]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6D7F60] font-semibold">
            Our Philosophy & Terroir
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#35261F] font-normal leading-tight">
            Rooted in Nature. <br />
            <span className="italic text-[#35483A]">Crafted with Intention.</span>
          </h2>
          <p className="text-base text-[#5D463B] leading-relaxed pt-2">
            We believe coffee is more than morning fuel. It is an agricultural ritual, an intimate communion between fertile mountain soils, patient sun, and thoughtful hands.
          </p>
        </div>

        {/* Narrative Chapter 1: Sourcing with Dignity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div className="order-2 lg:order-1 space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#E7DCCB] flex items-center justify-center text-[#35483A] mb-2">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#5D463B] font-semibold block">
              Chapter 01 · Single-Origin Agriculture
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#35261F]">
              Direct Relationships with Generational Growers
            </h3>
            <p className="text-[#5D463B] leading-relaxed">
              Every bean that graces our grinders is sourced through direct-trade relationships with smallholder family farms in Huila (Colombia), Guji (Ethiopia), and Tarrazú (Costa Rica).
            </p>
            <p className="text-[#5D463B] leading-relaxed">
              By paying an average of 42% above standard Fair Trade pricing, we help protect heirloom Arabica varietals, finance organic composting, and ensure generational livelihood for harvesting families.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#35483A] font-semibold uppercase tracking-wider">
              <span>Shade-Grown</span>
              <span>·</span>
              <span>100% Traceable</span>
              <span>·</span>
              <span>Regenerative Soil</span>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#E7DCCB]">
              <img
                src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=1000&q=80"
                alt="Ripe coffee cherries drying under highland sun at single-origin partner farm"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#F7F4ED]/90 backdrop-blur-md p-3 rounded text-xs text-[#5D463B]">
                <strong className="text-[#35261F] font-serif text-sm block">Huila Valley Micro-Station, Colombia</strong>
                Elevation: 1,850m · Natural Fermentation · Caturra & Castillo
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Chapter 2: Roasting & Botanical Infusions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#E7DCCB]">
              <img
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1000&q=80"
                alt="Barista precisely steaming silky microfoam at Beane and Blossom café"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#F7F4ED]/90 backdrop-blur-md p-3 rounded text-xs text-[#5D463B]">
                <strong className="text-[#35261F] font-serif text-sm block">Micro-Batch Roastery & Herbal Alchemistry</strong>
                Profile Roasted on Cast-Iron Loring S15 Kestrel
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#E7DCCB] flex items-center justify-center text-[#35483A] mb-2">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#5D463B] font-semibold block">
              Chapter 02 · The Botanical Alchemy
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#35261F]">
              Where Floral Distillations Meet Specialty Espresso
            </h3>
            <p className="text-[#5D463B] leading-relaxed">
              Traditional coffee shops mask average beans with heavy artificial syrups. At Beane & Blossom, we approach flavor like master perfumers and herbalists.
            </p>
            <p className="text-[#5D463B] leading-relaxed">
              We simmer Madagascar bourbon vanilla pods, cold-steep dried Seville orange blossoms, and infuse culinary French lavender into light unrefined cane nectar. The result is pure, aromatic harmony.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-[#35483A] font-semibold uppercase tracking-wider">
              <span>Zero Artificial Additives</span>
              <span>·</span>
              <span>Cold Distilled</span>
              <span>·</span>
              <span>Pure Botanicals</span>
            </div>
          </div>
        </div>

        {/* Narrative Chapter 3: The Sanctuary & Space */}
        <div className="bg-[#F7F4ED] rounded-2xl p-8 sm:p-12 border border-[#E7DCCB] mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <span className="font-serif text-xl font-medium text-[#35261F] block">Zero Waste Bar</span>
              <p className="text-xs text-[#5D463B] leading-relaxed">
                Used coffee grounds are collected daily for local community garden composting, and all takeout ware is 100% plant-based compostable.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-xl font-medium text-[#35261F] block">House Plant-Based Milks</span>
              <p className="text-xs text-[#5D463B] leading-relaxed">
                In addition to certified organic oat and almond, we press our signature Roasted Pistachio Milk in-house every morning without gums or oils.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-xl font-medium text-[#35261F] block">Warm Hospitality</span>
              <p className="text-xs text-[#5D463B] leading-relaxed">
                Whether you stop in for a 90-second espresso pull or spend the afternoon writing under our ficus tree, you are always welcome here.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#5D463B] font-semibold block">
              Chronicle
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#35261F] mt-1">
              The Journey of Beane & Blossom
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINE_MILESTONES.map((item, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-[#F7F4ED] border border-[#E7DCCB] space-y-2 hover:border-[#A7B39A] transition-colors"
              >
                <span className="font-serif text-2xl font-semibold text-[#35483A] block">
                  {item.year}
                </span>
                <h4 className="font-serif text-lg font-medium text-[#35261F]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#5D463B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-[#5D463B]/70 mt-8 italic">
            * Milestone dates, farm cooperatives, and origin profiles are customizable via the Café Admin Dashboard.
          </p>
        </div>

      </div>
    </section>
  );
};
