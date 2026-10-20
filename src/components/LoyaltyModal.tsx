import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { X, Sparkles, Gift, Award, LogOut, CheckCircle2, History } from 'lucide-react';

export const LoyaltyModal: React.FC = () => {
  const {
    isLoyaltyModalOpen,
    setIsLoyaltyModalOpen,
    loyaltyUser,
    loginLoyalty,
    logoutLoyalty,
    redeemPoints
  } = useCafe();

  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');

  if (!isLoyaltyModalOpen) return null;

  const rewards = [
    { points: 75, name: 'Complimentary Morning Pastry', desc: 'Any fresh artisan croissant, morning bun, or tart' },
    { points: 100, name: 'Free Handcrafted Beverage', desc: 'Any signature latte, cold brew, or single-origin pour over' },
    { points: 250, name: '12oz Whole Bean Specialty Bag', desc: 'Rotating microlot from Colombia Huila or Ethiopia Guji' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    loginLoyalty(authEmail, authName || 'Patron');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F7F4ED] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E7DCCB] my-8 animate-fade-in">
        
        {/* Header */}
        <div className="p-6 bg-[#35483A] text-[#F7F4ED] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#A7B39A]/20 flex items-center justify-center text-[#A7B39A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium">
                The Blossom Society
              </h3>
              <span className="text-[11px] text-[#CBD6C1] block">
                Artisan Coffee Rewards & Sensory Perks
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsLoyaltyModalOpen(false)}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10"
            aria-label="Close rewards modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {!loyaltyUser ? (
            /* Sign in / Join form */
            <div className="space-y-6 text-center">
              <div className="space-y-2 max-w-sm mx-auto">
                <h4 className="font-serif text-2xl text-[#35261F]">
                  Earn 1 Point for Every $1 Spent
                </h4>
                <p className="text-xs text-[#5D463B] leading-relaxed">
                  Join our community of specialty coffee lovers. Unlock complimentary drinks, dawn bakery pairings, and invitations to private seasonal cupping sessions.
                </p>
              </div>

              <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-3 text-left">
                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Julian Reynolds"
                    className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="julian@example.com"
                    className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#35261F] text-[#F7F4ED] text-xs font-semibold rounded-lg hover:bg-[#223126] transition-colors cursor-pointer mt-2"
                >
                  Join / Access Account (75 Bonus Pts)
                </button>
              </form>
            </div>
          ) : (
            /* Logged in member view */
            <div className="space-y-6">
              
              {/* Member Card */}
              <div className="p-6 bg-white rounded-xl border border-[#E7DCCB] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#6D7F60] font-bold block">
                    {loyaltyUser.tier} Tier Member
                  </span>
                  <h4 className="font-serif text-xl font-medium text-[#35261F]">
                    {loyaltyUser.name}
                  </h4>
                  <p className="text-xs text-[#5D463B]">{loyaltyUser.email}</p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-serif font-bold text-[#35483A] block">
                    {loyaltyUser.points}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#5D463B] font-semibold">
                    Points Available
                  </span>
                </div>
              </div>

              {/* Tier Progress Bar */}
              <div className="space-y-2 bg-[#F4EFE7] p-4 rounded-xl border border-[#E7DCCB]">
                <div className="flex justify-between text-xs text-[#5D463B]">
                  <span>Tier Progress</span>
                  <span>{loyaltyUser.points >= 300 ? 'Florist VIP' : `${300 - loyaltyUser.points} pts to Florist VIP`}</span>
                </div>
                <div className="w-full h-2 bg-[#E7DCCB] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#35483A] transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (loyaltyUser.points / 300) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Redeemable Rewards */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-wider font-semibold text-[#35261F] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#35483A]" />
                  Available Rewards
                </h5>

                <div className="space-y-2.5">
                  {rewards.map((reward) => {
                    const canAfford = loyaltyUser.points >= reward.points;
                    return (
                      <div
                        key={reward.name}
                        className="p-3.5 bg-white rounded-xl border border-[#E7DCCB] flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h6 className="font-serif text-sm font-medium text-[#35261F]">
                              {reward.name}
                            </h6>
                            <span className="text-xs font-semibold text-[#35483A]">
                              ({reward.points} pts)
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5D463B] mt-0.5">
                            {reward.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => redeemPoints(reward.points, reward.name)}
                          disabled={!canAfford}
                          className="px-3 py-1.5 rounded text-xs font-medium shrink-0 disabled:opacity-40 disabled:cursor-not-allowed bg-[#35483A] text-white hover:bg-[#223126] transition-colors cursor-pointer"
                        >
                          Redeem
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transaction History Ledger */}
              <div className="space-y-2 pt-2 border-t border-[#E7DCCB]">
                <h5 className="text-xs uppercase tracking-wider font-semibold text-[#35261F] flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-[#5D463B]" />
                  Activity History
                </h5>
                <div className="space-y-1.5 text-xs bg-white p-3 rounded-lg border border-[#E7DCCB]">
                  {loyaltyUser.history.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center py-1 border-b border-[#E7DCCB]/40 last:border-0">
                      <div>
                        <span className="text-[#35261F] font-medium">{tx.description}</span>
                        <span className="text-[10px] text-[#5D463B] block">{tx.date}</span>
                      </div>
                      <span className={`font-semibold ${tx.points > 0 ? 'text-[#35483A]' : 'text-red-700'}`}>
                        {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sign out */}
              <div className="pt-2 text-right">
                <button
                  onClick={logoutLoyalty}
                  className="text-xs text-[#5D463B] hover:text-red-700 flex items-center gap-1 ml-auto cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Sign Out</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
