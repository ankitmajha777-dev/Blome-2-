import React, { useState, useEffect } from 'react';
import { useCafe } from '../context/CafeContext';
import { ShoppingBag, Calendar, Sparkles, Menu as MenuIcon, X } from 'lucide-react';

export const Navbar: React.FC<{
  onNavigate: (sectionId: string) => void;
}> = ({ onNavigate }) => {
  const {
    cart,
    setIsCartOpen,
    setIsReservationModalOpen,
    setIsLoyaltyModalOpen,
    loyaltyUser,
    setIsAdminOpen,
    subtotal
  } = useCafe();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      {/* Top Botanical Announcement Banner */}
      <div className="bg-[#35483A] text-[#F7F4ED] text-[11px] py-2 px-4 tracking-wider text-center uppercase font-medium flex items-center justify-center gap-3">
        <span>Spring Seasonal Release: Organic Lavender & Damascus Rose Infusions</span>
        <span className="hidden sm:inline opacity-60">·</span>
        <button 
          onClick={() => handleNavClick('menu')}
          className="underline hover:text-[#A7B39A] transition-colors cursor-pointer hidden sm:inline"
        >
          Explore Limited Lot
        </button>
      </div>

      {/* Main Sticky Navbar */}
      <nav 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F7F4ED]/95 backdrop-blur-md shadow-sm border-b border-[#E7DCCB]' 
            : 'bg-[#F7F4ED] border-b border-[#E7DCCB]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('hero')} 
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-[#35261F]/20 flex items-center justify-center bg-[#F4EFE7] group-hover:border-[#A7B39A] transition-colors">
                <svg className="w-6 h-6 text-[#35483A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4Z" />
                  <path d="M12 12c-3 0-6 4-6 4s3 4 6 4 6-4 6-4-3-4-6-4Z" />
                  <path d="M2 12a4 4 0 0 0 4 4c3 0 6-4 6-4s-3-4-6-4a4 4 0 0 0-4 4Z" />
                  <path d="M22 12a4 4 0 0 0-4-4c-3 0-6 4-6 4s3 4 6 4a4 4 0 0 0 4-4Z" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl tracking-[0.08em] font-semibold text-[#35261F] block leading-none">
                  BEANE & BLOSSOM
                </span>
                <span className="text-[10px] tracking-[0.22em] text-[#5D463B] uppercase block mt-1 font-medium">
                  Specialty Café & Roastery
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#35261F]/90">
              <button 
                onClick={() => handleNavClick('hero')}
                className="hover:text-[#35483A] transition-colors py-1 hover:underline decoration-[#A7B39A] underline-offset-8 cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('story')}
                className="hover:text-[#35483A] transition-colors py-1 hover:underline decoration-[#A7B39A] underline-offset-8 cursor-pointer"
              >
                Our Story
              </button>
              <button 
                onClick={() => handleNavClick('signature')}
                className="hover:text-[#35483A] transition-colors py-1 hover:underline decoration-[#A7B39A] underline-offset-8 cursor-pointer"
              >
                Signatures
              </button>
              <button 
                onClick={() => handleNavClick('menu')}
                className="hover:text-[#35483A] transition-colors py-1 hover:underline decoration-[#A7B39A] underline-offset-8 cursor-pointer"
              >
                Digital Menu
              </button>
              <button 
                onClick={() => handleNavClick('reservations')}
                className="hover:text-[#35483A] transition-colors py-1 hover:underline decoration-[#A7B39A] underline-offset-8 cursor-pointer"
              >
                Reservations
              </button>
              <button 
                onClick={() => handleNavClick('events')}
                className="hover:text-[#35483A] transition-colors py-1 hover:underline decoration-[#A7B39A] underline-offset-8 cursor-pointer"
              >
                Private Events
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="hover:text-[#35483A] transition-colors py-1 hover:underline decoration-[#A7B39A] underline-offset-8 cursor-pointer"
              >
                Hours & SoHo
              </button>
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Loyalty Button */}
              <button
                onClick={() => setIsLoyaltyModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md border border-[#E7DCCB] text-[#35261F] hover:bg-[#E7DCCB]/40 transition-colors cursor-pointer"
                title="The Blossom Society Rewards"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A7B39A]" />
                <span>{loyaltyUser ? `${loyaltyUser.points} pts` : 'Rewards'}</span>
              </button>

              {/* Table Reservation CTA */}
              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-md border border-[#35261F] text-[#35261F] hover:bg-[#35261F] hover:text-[#F7F4ED] transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-md bg-[#35483A] text-[#F7F4ED] hover:bg-[#223126] transition-colors shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order ({totalCartCount})</span>
                {subtotal > 0 && (
                  <span className="border-l border-white/20 pl-2 text-[11px] font-semibold text-[#CBD6C1]">
                    ${subtotal.toFixed(2)}
                  </span>
                )}
              </button>

              {/* Admin Portal Toggle */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-xs p-2 text-[#5D463B] hover:text-[#35261F] border border-dashed border-[#5D463B]/30 rounded-md hover:bg-[#E7DCCB]/30 transition-colors cursor-pointer"
                title="Café Management Dashboard"
              >
                Admin
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#35261F] hover:bg-[#E7DCCB]/40 rounded-md cursor-pointer"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#35483A] text-[#F7F4ED] text-[10px] rounded-full flex items-center justify-center font-bold">
                    {totalCartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#35261F] hover:bg-[#E7DCCB]/40 rounded-md cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#E7DCCB] bg-[#F7F4ED] px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2 text-base font-medium text-[#35261F]">
              <button 
                onClick={() => handleNavClick('hero')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('story')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Our Story & Terroir
              </button>
              <button 
                onClick={() => handleNavClick('signature')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Signature Drinks
              </button>
              <button 
                onClick={() => handleNavClick('menu')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Digital Menu & Ordering
              </button>
              <button 
                onClick={() => handleNavClick('reservations')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Reserve a Table
              </button>
              <button 
                onClick={() => handleNavClick('events')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Private Events & Catering
              </button>
              <button 
                onClick={() => handleNavClick('reviews')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Patron Reviews
              </button>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="text-left py-2 px-3 rounded hover:bg-[#E7DCCB]/30 cursor-pointer"
              >
                Hours, Location & Transit
              </button>
            </div>

            <div className="pt-4 border-t border-[#E7DCCB] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#35261F] text-sm font-medium text-[#35261F] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Reserve Table
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoyaltyModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#E7DCCB]/60 text-sm font-medium text-[#35261F] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#A7B39A]" />
                Blossom Society Rewards ({loyaltyUser ? `${loyaltyUser.points} pts` : 'Join'})
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full text-center py-2 text-xs text-[#5D463B] font-medium border border-dashed border-[#5D463B]/30 rounded-md cursor-pointer"
              >
                Open Admin Management Dashboard
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
