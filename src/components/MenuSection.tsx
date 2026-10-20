import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { MenuCategory, DietaryTag, Product } from '../types/cafe';
import { Search, Plus, X, Check } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { products, openProductModal } = useCafe();

  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [activeDietary, setActiveDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: MenuCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'signature', label: 'Signatures' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'tea', label: 'Matcha & Botanicals' },
    { id: 'cold', label: 'Chilled & Nitro' },
    { id: 'pastry', label: 'Artisan Bakery' },
    { id: 'seasonal', label: 'Seasonal Lots' }
  ];

  const dietaryOptions: { id: DietaryTag; label: string }[] = [
    { id: 'vegan', label: 'Plant-Based' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'organic', label: 'Certified Organic' },
    { id: 'decaf', label: 'Decaf / Herbal' }
  ];

  const toggleDietary = (tag: DietaryTag) => {
    setActiveDietary(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = products.filter(product => {
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }

    if (activeDietary.length > 0) {
      const hasAllDietary = activeDietary.every(d => product.dietary?.includes(d));
      if (!hasAllDietary) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchOrigin = product.origin?.toLowerCase().includes(q) || false;
      const matchNotes = product.tastingNotes?.some(n => n.toLowerCase().includes(q)) || false;
      if (!matchName && !matchDesc && !matchOrigin && !matchNotes) {
        return false;
      }
    }

    return true;
  });

  return (
    <section id="menu" className="py-24 bg-[#F4EFE7] border-t border-[#E7DCCB]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6D7F60] font-semibold">
            Freshly Roasted & Baked Every Dawn
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#35261F] font-normal">
            The Digital Menu
          </h2>
          <p className="text-sm sm:text-base text-[#5D463B] leading-relaxed">
            Order ahead for express counter pickup in 15 minutes, or reserve a table to dine in our sunlit atrium.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-6 mb-12">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#35261F] text-[#F7F4ED] shadow-sm'
                    : 'bg-[#F7F4ED] text-[#5D463B] hover:text-[#35261F] border border-[#E7DCCB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Dietary Filters Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#F7F4ED] p-4 rounded-xl border border-[#E7DCCB]">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5D463B]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search beans, teas, origins, pastries..."
                className="w-full pl-10 pr-8 py-2 text-xs bg-transparent border-0 focus:ring-0 text-[#35261F] placeholder-[#5D463B]/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D463B]/60 hover:text-[#35261F] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex items-center flex-wrap gap-2 text-xs border-t md:border-t-0 md:border-l border-[#E7DCCB] pt-3 md:pt-0 md:pl-4">
              <span className="text-[11px] uppercase tracking-wider text-[#5D463B] font-semibold mr-1">
                Filter:
              </span>
              {dietaryOptions.map(opt => {
                const isSelected = activeDietary.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleDietary(opt.id)}
                    className={`px-3 py-1 text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#35483A] text-[#F7F4ED]'
                        : 'bg-[#E7DCCB]/50 text-[#5D463B] hover:text-[#35261F]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* Menu Items Count & Notice */}
        <div className="flex items-center justify-between mb-8 text-xs text-[#5D463B]">
          <span>Showing {filteredProducts.length} handcrafted offerings</span>
          {activeDietary.length > 0 && (
            <button
              onClick={() => setActiveDietary([])}
              className="text-[#35483A] underline cursor-pointer"
            >
              Clear dietary filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#F7F4ED] rounded-xl border border-[#E7DCCB] space-y-3">
            <p className="font-serif text-xl text-[#35261F]">No offerings match your search.</p>
            <p className="text-xs text-[#5D463B]">Try searching for "matcha", "pastry", or clearing dietary filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDietary([]);
                setActiveCategory('all');
              }}
              className="mt-2 px-4 py-2 bg-[#35261F] text-[#F7F4ED] text-xs rounded-md cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className={`bg-[#F7F4ED] rounded-xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                  product.available 
                    ? 'border-[#E7DCCB] hover:border-[#A7B39A] hover:shadow-md' 
                    : 'border-[#E7DCCB]/60 opacity-60'
                }`}
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#E7DCCB]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    <div className="absolute top-3 right-3 bg-[#F7F4ED]/95 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-semibold text-[#35261F] shadow-sm">
                      ${product.price.toFixed(2)}
                    </div>

                    {!product.available && (
                      <div className="absolute inset-0 bg-[#35261F]/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-xs font-semibold uppercase tracking-wider text-white bg-[#35261F] px-3 py-1 rounded">
                          Sold Out Today
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-[#6D7F60] font-medium">
                      <span>{product.origin || 'House Specialty'}</span>
                      {product.calories && <span>{product.calories} kcal</span>}
                    </div>

                    <h3 className="font-serif text-xl font-medium text-[#35261F]">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#5D463B] leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {product.tastingNotes && product.tastingNotes.length > 0 && (
                      <div className="pt-1 text-[11px] text-[#5D463B] flex flex-wrap items-center gap-1.5 font-medium">
                        {product.tastingNotes.map((note, idx) => (
                          <React.Fragment key={idx}>
                            <span>{note}</span>
                            {idx < product.tastingNotes!.length - 1 && <span className="text-[#A7B39A]">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#E7DCCB]/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] text-[#5D463B] uppercase font-semibold">
                      {product.dietary && product.dietary.slice(0, 2).map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </div>

                    <button
                      onClick={() => openProductModal(product)}
                      disabled={!product.available}
                      className="px-3.5 py-1.5 bg-[#35483A] text-[#F7F4ED] hover:bg-[#223126] disabled:bg-gray-300 disabled:cursor-not-allowed text-xs font-medium rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Customize</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
