import React from 'react';
import { useCafe } from '../context/CafeContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCafe();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in pointer-events-none">
      <div className="bg-[#35261F] text-[#F7F4ED] px-4 py-3 rounded-lg shadow-xl border border-[#5D463B]/40 flex items-center gap-3 backdrop-blur-sm pointer-events-auto">
        <div className="w-6 h-6 rounded-full bg-[#A7B39A]/20 flex items-center justify-center shrink-0 text-[#A7B39A]">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <p className="text-xs font-medium tracking-wide">{toastMessage}</p>
      </div>
    </div>
  );
};
