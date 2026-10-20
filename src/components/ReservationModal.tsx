import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { X, Calendar as CalendarIcon, CheckCircle2, Clock, Users, Download } from 'lucide-react';

export const ReservationModal: React.FC = () => {
  const { isReservationModalOpen, setIsReservationModalOpen, addReservation } = useCafe();

  const [date, setDate] = useState('2026-10-22');
  const [time, setTime] = useState('11:00 AM');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<'Garden Patio' | 'Main Bar' | 'Sunlit Atrium' | 'Library Nook'>('Sunlit Atrium');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  if (!isReservationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const res = addReservation({
      date,
      time,
      guests,
      seatingPreference,
      name,
      email,
      phone,
      specialRequests: specialRequests.trim() || undefined
    });
    setConfirmedReservation(res);
  };

  const handleClose = () => {
    setConfirmedReservation(null);
    setIsReservationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F7F4ED] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E7DCCB] my-8 animate-fade-in">
        
        {/* Header */}
        <div className="p-6 bg-[#F4EFE7] border-b border-[#E7DCCB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#35483A] text-white flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#35261F]">
                Reserve a Table
              </h3>
              <span className="text-[11px] text-[#5D463B] block">
                Beane & Blossom SoHo Conservatory
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#5D463B] hover:text-[#35261F] rounded-full hover:bg-[#E7DCCB]/40"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedReservation ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#A7B39A]/20 text-[#35483A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-2xl text-[#35261F]">
              Table Confirmed #{confirmedReservation.id}
            </h4>
            <p className="text-xs text-[#5D463B] leading-relaxed">
              We look forward to hosting {confirmedReservation.guests} guests on {confirmedReservation.date} at {confirmedReservation.time} in our {confirmedReservation.seatingPreference}.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-[#35261F] text-white text-xs rounded-lg hover:bg-[#223126] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  min="2026-10-20"
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                >
                  {['08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(g => (
                    <option key={g} value={g}>{g} {g === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Seating Area</label>
                <select
                  value={seatingPreference}
                  onChange={(e) => setSeatingPreference(e.target.value as any)}
                  className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                >
                  <option value="Sunlit Atrium">Sunlit Atrium</option>
                  <option value="Garden Patio">Garden Patio</option>
                  <option value="Main Bar">Main Bar</option>
                  <option value="Library Nook">Library Nook</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#E7DCCB]">
              <div>
                <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Reynolds"
                  className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@email.com"
                    className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Special Occasion Note (Optional)</label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Anniversary, work meeting, dietary note..."
                  className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#35261F] hover:bg-[#223126] text-[#F7F4ED] font-medium text-xs rounded-lg transition-colors cursor-pointer mt-4"
            >
              Confirm Reservation
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
