import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Mail, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { subscribeNewsletter } = useCafe();
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    const res = subscribeNewsletter(email);
    setStatusMsg({ success: res.success, text: res.message });
    if (res.success) {
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-[#35483A] text-[#F7F4ED] relative overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#A7B39A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-widest text-[#CBD6C1]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Bloom Society Journal</span>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
            Slow Down with Us. <br />
            <span className="italic text-[#CBD6C1]">Receive 15% Off Your First Order.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F4ED]/80 max-w-xl mx-auto leading-relaxed">
            Receive early access to limited micro-lot harvests, botanical recipe disclosures, and invitations to our monthly community coffee cuppings.
          </p>
        </div>

        {statusMsg ? (
          <div className="p-4 bg-white/10 rounded-xl max-w-md mx-auto border border-white/20 text-xs text-[#CBD6C1] flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#A7B39A]" />
            <span>{statusMsg.text}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-xs text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#F7F4ED] text-[#35261F] font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-white transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-white/50">
          We honor your privacy. Unsubscribe anytime with one tap. Zero marketing spam.
        </p>

      </div>
    </section>
  );
};
