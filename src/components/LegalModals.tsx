import React from 'react';
import { useCafe } from '../context/CafeContext';
import { X, Shield, FileText, Eye } from 'lucide-react';

export const LegalModals: React.FC = () => {
  const { activeLegalModal, setActiveLegalModal } = useCafe();

  if (!activeLegalModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F7F4ED] rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#E7DCCB] shadow-2xl relative my-8 animate-fade-in max-h-[85vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E7DCCB]">
          <div className="flex items-center gap-2.5">
            {activeLegalModal === 'privacy' && <Shield className="w-5 h-5 text-[#35483A]" />}
            {activeLegalModal === 'terms' && <FileText className="w-5 h-5 text-[#35483A]" />}
            {activeLegalModal === 'accessibility' && <Eye className="w-5 h-5 text-[#35483A]" />}
            <h3 className="font-serif text-2xl font-medium text-[#35261F]">
              {activeLegalModal === 'privacy' && 'Privacy Policy'}
              {activeLegalModal === 'terms' && 'Terms of Service'}
              {activeLegalModal === 'accessibility' && 'Accessibility Statement'}
            </h3>
          </div>

          <button
            onClick={() => setActiveLegalModal(null)}
            className="p-1.5 rounded-full text-[#5D463B] hover:text-[#35261F] hover:bg-[#E7DCCB]/40"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 overflow-y-auto text-xs text-[#5D463B] space-y-4 leading-relaxed flex-1">
          {activeLegalModal === 'privacy' && (
            <>
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                At Beane & Blossom, we respect your privacy and are committed to safeguarding personal information collected when you browse our website, place online pickup orders, join The Blossom Society, or make table reservations.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">1. Information We Collect</h4>
              <p>
                We collect your name, email address, and telephone number solely for order confirmation receipts, SMS pickup preparation notices, and reservation confirmations.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">2. Payment Security</h4>
              <p>
                We never store or handle raw credit card numbers. All payments are processed through tokenized, PCI-DSS Level 1 certified gateways (e.g. Stripe).
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">3. Email & Communications</h4>
              <p>
                Marketing emails (The Bloom Society) require explicit opt-in and may be unsubscribed from at any time with a single click.
              </p>
            </>
          )}

          {activeLegalModal === 'terms' && (
            <>
              <p>
                <strong>Last Updated: October 2026</strong>
              </p>
              <p>
                Welcome to Beane & Blossom. By using our website, ordering online, or booking reservations, you agree to comply with and be bound by the following terms.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">1. Online Orders & Counter Pickup</h4>
              <p>
                Beverages are freshly crafted to order based on selected preparation windows. Uncollected orders past 45 minutes may be discarded without refund to preserve food safety and quality standards.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">2. Table Reservations</h4>
              <p>
                Reservations are held for a 15-minute grace period. If you need to modify or cancel your booking, please notify us as early as possible so we may release the table to waiting patrons.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">3. Allergen Notice</h4>
              <p>
                While we take meticulous care to avoid cross-contact, our bakery and espresso bar handle dairy, tree nuts (almonds, pistachios), wheat, and soy.
              </p>
            </>
          )}

          {activeLegalModal === 'accessibility' && (
            <>
              <p>
                Beane & Blossom is committed to digital accessibility and to ensuring that all users, including individuals with disabilities, have an effortless and enjoyable experience on our platform.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">Conformance Standard</h4>
              <p>
                We strive to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA specifications. Our website supports screen reader software, keyboard navigation, high contrast typography, and respects <code>prefers-reduced-motion</code> settings.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">Physical Location Accessibility</h4>
              <p>
                Our flagship café at 418 Blossom Lane offers step-free accessible entrance, wide interior walkways, Braille signage, and ADA-compliant unisex restrooms.
              </p>
              <h4 className="font-semibold text-sm text-[#35261F] pt-2">Feedback & Assistance</h4>
              <p>
                If you encounter any difficulty accessing any element of this website, please email us at <strong>hello@beaneandblossom.com</strong> or call (555) 232-6325.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E7DCCB] text-right">
          <button
            onClick={() => setActiveLegalModal(null)}
            className="px-5 py-2 bg-[#35261F] text-[#F7F4ED] text-xs font-semibold rounded-md hover:bg-[#223126] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
