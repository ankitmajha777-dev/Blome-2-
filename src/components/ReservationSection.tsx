import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Check, CheckCircle2, Download, X } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const { addReservation } = useCafe();

  const [date, setDate] = useState('2026-10-22');
  const [time, setTime] = useState('11:00 AM');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<'Garden Patio' | 'Main Bar' | 'Sunlit Atrium' | 'Library Nook'>('Sunlit Atrium');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null);

  const seatingOptions: { name: 'Garden Patio' | 'Main Bar' | 'Sunlit Atrium' | 'Library Nook'; desc: string }[] = [
    { name: 'Sunlit Atrium', desc: 'Glass-ceiling conservatory surrounded by ficus trees and morning sunlight' },
    { name: 'Garden Patio', desc: 'Heated outdoor brick courtyard with climbing jasmine and fountains' },
    { name: 'Main Bar', desc: 'Direct view of the custom brass La Marzocco and master barista craft' },
    { name: 'Library Nook', desc: 'Quiet velvet armchairs surrounded by architecture monographs and vinyl lounge' }
  ];

  const timeSlots = [
    '08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM'
  ];

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

  const handleDownloadCalendar = () => {
    if (!confirmedReservation) return;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Beane and Blossom//Table Reservation//EN\nBEGIN:VEVENT\nSUMMARY:Table Reservation at Beane & Blossom\nDESCRIPTION:Reservation for ${confirmedReservation.guests} guests in the ${confirmedReservation.seatingPreference}.\nLOCATION:418 Blossom Lane, SoHo, NY 10012\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `BeaneBlossom-${confirmedReservation.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reservations" className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6D7F60] font-semibold">
            An Unhurried Hospitality Experience
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#35261F] font-normal">
            Reserve Your Table
          </h2>
          <p className="text-sm sm:text-base text-[#5D463B] leading-relaxed">
            Reserve an intimate table in our sunlit botanical conservatory, garden courtyard, or quiet library nook for coffee tastings and thoughtful conversations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#F4EFE7] rounded-2xl border border-[#E7DCCB] shadow-xl overflow-hidden">
          {confirmedReservation ? (
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#A7B39A]/20 text-[#35483A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#6D7F60] font-semibold">
                  Table Confirmed
                </span>
                <h3 className="font-serif text-3xl font-medium text-[#35261F]">
                  We look forward to welcoming you, {confirmedReservation.name}!
                </h3>
                <p className="text-xs text-[#5D463B] max-w-md mx-auto">
                  A calendar invitation and confirmation receipt has been dispatched to <strong className="text-[#35261F]">{confirmedReservation.email}</strong>.
                </p>
              </div>

              {/* Reservation card */}
              <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-[#E7DCCB] text-left space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-[#E7DCCB]">
                  <span className="text-xs font-semibold text-[#5D463B]">Reservation ID</span>
                  <span className="font-mono text-sm font-bold text-[#35483A]">#{confirmedReservation.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#5D463B] block">Date & Time:</span>
                    <strong className="text-[#35261F]">{confirmedReservation.date} at {confirmedReservation.time}</strong>
                  </div>
                  <div>
                    <span className="text-[#5D463B] block">Guests:</span>
                    <strong className="text-[#35261F]">{confirmedReservation.guests} Persons</strong>
                  </div>
                  <div>
                    <span className="text-[#5D463B] block">Seating Area:</span>
                    <strong className="text-[#35261F]">{confirmedReservation.seatingPreference}</strong>
                  </div>
                  <div>
                    <span className="text-[#5D463B] block">Location:</span>
                    <strong className="text-[#35261F]">418 Blossom Lane, SoHo</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-6 py-2.5 bg-[#35483A] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-[#223126] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ICS Calendar Event</span>
                </button>
                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="px-6 py-2.5 border border-[#35261F] text-[#35261F] text-xs font-medium rounded-lg hover:bg-[#E7DCCB]/40 transition-colors cursor-pointer"
                >
                  Book Another Table
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              
              {/* Date & Time & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block mb-2">
                    Date of Visit
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    min="2026-10-20"
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block mb-2">
                    Party Size (Guests)
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-xs p-3 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(g => (
                      <option key={g} value={g}>{g} {g === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Preference Cards */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#35261F] block">
                  Select Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map(option => (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setSeatingPreference(option.name)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        seatingPreference === option.name
                          ? 'border-[#35483A] bg-white shadow-sm ring-1 ring-[#35483A]'
                          : 'border-[#E7DCCB] bg-white/60 hover:bg-white text-[#5D463B]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-base font-semibold text-[#35261F]">
                          {option.name}
                        </span>
                        {seatingPreference === option.name && (
                          <div className="w-5 h-5 rounded-full bg-[#35483A] text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5D463B] leading-relaxed">
                        {option.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-4 pt-2 border-t border-[#E7DCCB]">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#35261F]">
                  Contact & Special Occasion Notes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] text-[#5D463B] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Clara Dubois"
                      className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#5D463B] block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clara@example.com"
                      className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#5D463B] block mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="text-[11px] text-[#5D463B] block mb-1">Special Requests (Celebrations, allergies, quiet table)</label>
                    <input
                      type="text"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Anniversary celebration, quiet table for laptop writing..."
                      className="w-full text-xs p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] focus:border-[#35483A] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#35261F] hover:bg-[#223126] text-[#F7F4ED] font-medium text-sm rounded-lg shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span>Confirm Table Booking</span>
                </button>
                <p className="text-[11px] text-center text-[#5D463B] mt-2">
                  Complimentary reservation. Tables are held for 15 minutes past scheduled time.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
