import React from 'react';
import { CafeProvider, useCafe } from './context/CafeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { SignatureDrinks } from './components/SignatureDrinks';
import { MenuSection } from './components/MenuSection';
import { ReservationSection } from './components/ReservationSection';
import { EventsSection } from './components/EventsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ReservationModal } from './components/ReservationModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalModals } from './components/LegalModals';
import { Toast } from './components/Toast';

const MainAppContent: React.FC = () => {
  const { setIsCartOpen, setIsReservationModalOpen, lastCompletedOrder } = useCafe();

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'order') {
      setIsCartOpen(true);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4ED] text-[#35261F] flex flex-col font-sans selection:bg-[#A7B39A]/30 selection:text-[#35483A]">
      {/* Sticky Navigation */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          onExploreMenu={() => handleNavigate('menu')}
          onOrderOnline={() => handleNavigate('menu')}
          onReserve={() => setIsReservationModalOpen(true)}
        />

        {/* Our Story & Single-Origin Terroir */}
        <Story />

        {/* Signature Botanical Experiences */}
        <SignatureDrinks />

        {/* Digital Menu & Ordering System */}
        <MenuSection />

        {/* Table Reservation Interface */}
        <ReservationSection />

        {/* Private Events & Mobile Coffee Cart */}
        <EventsSection />

        {/* Guestbook Reviews */}
        <ReviewsSection />

        {/* Hours, Directions, Transit & FAQ */}
        <ContactSection />

        {/* Newsletter & Bloom Society Welcome */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Dynamic Views */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal onSuccess={() => {}} />
      <OrderConfirmationModal />
      <ReservationModal />
      <LoyaltyModal />
      <AdminDashboard />
      <LegalModals />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <CafeProvider>
      <MainAppContent />
    </CafeProvider>
  );
}
