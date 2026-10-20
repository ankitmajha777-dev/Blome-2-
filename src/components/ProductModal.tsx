import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { ProductExtra, ProductSize, CartItem } from '../types/cafe';
import { calculateItemUnitPrice } from '../utils/pricing';
import { X, Plus, Minus, Check } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, closeProductModal, addToCart } = useCafe();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<string>('');
  const [selectedSweet, setSelectedSweet] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Sync state whenever selectedProductForModal changes
  useEffect(() => {
    if (selectedProductForModal) {
      setSelectedSize(selectedProductForModal.sizes && selectedProductForModal.sizes.length > 0 ? selectedProductForModal.sizes[0] : null);
      setSelectedMilk(selectedProductForModal.milkOptions && selectedProductForModal.milkOptions.length > 0 ? selectedProductForModal.milkOptions[0] : '');
      setSelectedSweet(selectedProductForModal.sweetLevels && selectedProductForModal.sweetLevels.length > 0 ? selectedProductForModal.sweetLevels[0] : '');
      setSelectedExtras([]);
      setSpecialInstructions('');
      setQuantity(1);
    }
  }, [selectedProductForModal]);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const milkPrice = selectedMilk.includes('+$0.80') ? 0.80 : 0;
  const sizePrice = selectedSize?.extraPrice || 0;

  const unitPrice = calculateItemUnitPrice(product.price, sizePrice, milkPrice, selectedExtras);
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const toggleExtra = (extra: ProductExtra) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.name === extra.name);
      if (exists) {
        return prev.filter(e => e.name !== extra.name);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      cartId: `${product.id}-${Date.now()}`,
      product,
      size: selectedSize ? `${selectedSize.name} (${selectedSize.volume})` : 'Standard',
      sizePrice,
      milk: selectedMilk || 'None',
      milkPrice,
      sweetLevel: selectedSweet || 'Standard',
      selectedExtras,
      quantity,
      itemPrice: unitPrice,
      specialInstructions: specialInstructions.trim() || undefined
    };

    addToCart(cartItem);
    closeProductModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F7F4ED] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E7DCCB] my-8 animate-fade-in">
        
        {/* Header Bar */}
        <div className="relative h-64 bg-[#E7DCCB]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#35261F]/80 via-transparent to-black/30" />
          
          <button
            onClick={closeProductModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#35261F] flex items-center justify-center transition-colors shadow cursor-pointer"
            aria-label="Close customizer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] uppercase tracking-wider text-[#CBD6C1] font-semibold block">
              {product.origin || 'Signature House Craft'}
            </span>
            <h2 className="font-serif text-3xl font-medium leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-[#F7F4ED]/90 mt-1 line-clamp-1">
              {product.tagline || product.description}
            </p>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block">
                Select Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`p-3 text-center rounded-lg border text-xs transition-all cursor-pointer ${
                      selectedSize?.name === s.name
                        ? 'border-[#35483A] bg-[#35483A] text-[#F7F4ED]'
                        : 'border-[#E7DCCB] bg-white text-[#35261F] hover:border-[#A7B39A]'
                    }`}
                  >
                    <span className="font-medium block">{s.name}</span>
                    <span className="text-[10px] opacity-80 block">{s.volume}</span>
                    {s.extraPrice > 0 && (
                      <span className="text-[10px] block mt-0.5">
                        +${s.extraPrice.toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.milkOptions && product.milkOptions.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block">
                Milk Selection
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.milkOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMilk(m)}
                    className={`px-3 py-2 text-left rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      selectedMilk === m
                        ? 'border-[#35483A] bg-[#35483A] text-[#F7F4ED]'
                        : 'border-[#E7DCCB] bg-white text-[#35261F] hover:border-[#A7B39A]'
                    }`}
                  >
                    <span>{m}</span>
                    {selectedMilk === m && <Check className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sweetLevels && product.sweetLevels.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block">
                Sweetness Intensity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.sweetLevels.map((sw) => (
                  <button
                    key={sw}
                    type="button"
                    onClick={() => setSelectedSweet(sw)}
                    className={`py-2 px-2 text-center rounded-lg border text-xs transition-colors cursor-pointer ${
                      selectedSweet === sw
                        ? 'border-[#35483A] bg-[#35483A] text-[#F7F4ED]'
                        : 'border-[#E7DCCB] bg-white text-[#5D463B] hover:text-[#35261F]'
                    }`}
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.extras && product.extras.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block">
                Handcrafted Add-Ons
              </label>
              <div className="space-y-2">
                {product.extras.map((extra) => {
                  const isChecked = selectedExtras.some(e => e.name === extra.name);
                  return (
                    <button
                      key={extra.name}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isChecked
                          ? 'border-[#35483A] bg-[#E7DCCB]/40 text-[#35261F]'
                          : 'border-[#E7DCCB] bg-white text-[#5D463B] hover:border-[#A7B39A]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-[#35483A] border-[#35483A] text-white' : 'border-[#A7B39A]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span>{extra.name}</span>
                      </div>
                      <span className="font-medium">+${extra.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block">
              Special Instructions for Barista (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra hot, splash of room on top, decaf bean switch..."
              className="w-full text-xs p-3 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:outline-none focus:border-[#35483A]"
              maxLength={120}
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#F4EFE7] border-t border-[#E7DCCB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center border border-[#E7DCCB] bg-white rounded-lg p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 text-[#35261F] disabled:opacity-30 hover:bg-[#F7F4ED] rounded cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center text-sm font-semibold text-[#35261F]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 text-[#35261F] hover:bg-[#F7F4ED] rounded cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto px-8 py-3 bg-[#35483A] hover:bg-[#223126] text-[#F7F4ED] text-sm font-medium rounded-lg shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Add to Order</span>
            <span className="text-[#CBD6C1] font-semibold">·</span>
            <span>${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
