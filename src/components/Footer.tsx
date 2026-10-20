import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CAFÉ_DETAILS } from '../data/initialData';
import { Sparkles, Calendar, Lock } from 'lucide-react';

export const Footer: React.FC<{
  onNavigate: (sectionId: string) => void;
}> = ({ onNavigate }) => {
  const { setActiveLegalModal, setIsAdminOpen, setIsReservationModalOpen, setIsLoyaltyModalOpen } = useCafe();

  return (
    <footer className="bg-[#35261F] text-[#F7F4ED] border-t border-[#5D463B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10 text-xs">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                <svg className="w-5 h-5 text-[#A7B39A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4Z" />
                  <path d="M12 12c-3 0-6 4-6 4s3 4 6 4 6-4 6-4-3-4-6-4Z" />
                  <path d="M2 12a4 4 0 0 0 4 4c3 0 6-4 6-4s-3-4-6-4a4 4 0 0 0-4 4Z" />
                  <path d="M22 12a4 4 0 0 0-4-4c-3 0-6 4-6 4s3 4 6 4a4 4 0 0 0 4-4Z" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </div>
              <div>
                <span className="font-serif text-2xl tracking-[0.08em] font-semibold text-white block">
                  BEANE & BLOSSOM
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#A7B39A] uppercase block font-medium">
                  Where Every Cup Finds Its Bloom
                </span>
              </div>
            </div>

            <p className="text-[#E7DCCB]/80 max-w-sm leading-relaxed">
              A boutique specialty coffee roastery and living conservatory dedicated to single-origin agriculture, botanical distillations, and unhurried hospitality in SoHo.
            </p>

            <div className="pt-2 flex items-center gap-4 text-[#A7B39A]">
              <span>Instagram</span>
              <span>·</span>
              <span>Substack Journal</span>
              <span>·</span>
              <span>Spotify Vinyl Radio</span>
            </div>
          </div>

          {/* Experience Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-[#E7DCCB]/80">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer">
                  Home Sanctuary
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors cursor-pointer">
                  Our Story & Terroir
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('signature')} className="hover:text-white transition-colors cursor-pointer">
                  Signature Botanicals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('menu')} className="hover:text-white transition-colors cursor-pointer">
                  Digital Menu & Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reservations')} className="hover:text-white transition-colors cursor-pointer">
                  Table Reservations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors cursor-pointer">
                  Private Events & Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Visit */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wider">
              Flagship Hours
            </h4>
            <div className="space-y-1.5 text-[#E7DCCB]/80">
              <p>
                <strong className="text-white block">Monday – Friday:</strong>
                {CAFÉ_DETAILS.hours.weekdays}
              </p>
              <p>
                <strong className="text-white block">Saturday – Sunday:</strong>
                {CAFÉ_DETAILS.hours.weekends}
              </p>
              <p className="pt-2 text-[11px] text-[#A7B39A]">
                {CAFÉ_DETAILS.address}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wider">
              Hospitality
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="w-full py-2 px-3 border border-white/20 hover:border-white rounded text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#A7B39A]" />
                <span>Book Table</span>
              </button>

              <button
                onClick={() => setIsLoyaltyModalOpen(true)}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A7B39A]" />
                <span>Blossom Society</span>
              </button>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="w-full py-1.5 text-[11px] text-[#E7DCCB]/60 hover:text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E7DCCB]/60">
          <p>© {new Date().getFullYear()} Beane & Blossom LLC. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white underline cursor-pointer"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveLegalModal('accessibility')}
              className="hover:text-white underline cursor-pointer"
            >
              Accessibility Statement
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
