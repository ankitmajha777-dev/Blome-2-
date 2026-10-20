import React, { useState } from 'react';
import { useCafe } from '../context/CafeContext';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview } = useCafe();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState(5);
  const [favoriteItem, setFavoriteItem] = useState('Blossom Vanilla Latte');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    addReview({
      author,
      role: role || 'Café Patron',
      rating,
      favoriteItem,
      comment
    });

    setIsModalOpen(false);
    setAuthor('');
    setRole('');
    setComment('');
  };

  return (
    <section id="reviews" className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6D7F60] font-semibold">
              The Living Guestbook
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#35261F] font-normal">
              Words from Our Patrons
            </h2>
            <p className="text-sm sm:text-base text-[#5D463B] leading-relaxed">
              From neighborhood architects to international coffee travelers, read what brings people back to our sanctuary every morning.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-lg border border-[#35261F] text-[#35261F] hover:bg-[#35261F] hover:text-[#F7F4ED] text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#F4EFE7] rounded-2xl p-6 border border-[#E7DCCB] flex flex-col justify-between space-y-4 hover:border-[#A7B39A] transition-colors"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#35483A]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-[#35483A]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-[#5D463B] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Favorite item */}
              <div className="pt-4 border-t border-[#E7DCCB]/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-semibold text-[#35261F]">
                    {rev.author}
                  </h4>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-[#6D7F60] font-medium" title="Verified Table or Counter Visit">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Visit</span>
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#5D463B]">{rev.role}</p>
                <p className="text-[10px] text-[#35483A] font-medium pt-0.5">
                  Favorite: {rev.favoriteItem}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Submitting a Review */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#35261F]/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#F7F4ED] rounded-2xl max-w-md w-full p-6 sm:p-8 border border-[#E7DCCB] shadow-2xl relative space-y-4 animate-fade-in">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-[#5D463B] hover:text-[#35261F]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl text-[#35261F]">Share Your Experience</h3>
                <p className="text-xs text-[#5D463B]">Your feedback helps us continuously cultivate our hospitality.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Julian Reynolds"
                    className="w-full p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Profession or Neighborhood</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. SoHo Resident / Coffee Enthusiast"
                    className="w-full p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                    >
                      <option value={5}>5 Stars - Exquisite</option>
                      <option value={4}>4 Stars - Great</option>
                      <option value={3}>3 Stars - Good</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Favorite Item</label>
                    <input
                      type="text"
                      value={favoriteItem}
                      onChange={(e) => setFavoriteItem(e.target.value)}
                      placeholder="e.g. Rose Matcha"
                      className="w-full p-2 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#35261F] block mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the coffee, atmosphere, or pastries..."
                    className="w-full p-2.5 bg-white border border-[#E7DCCB] rounded-lg text-[#35261F] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#35261F] text-[#F7F4ED] text-xs font-semibold rounded-lg hover:bg-[#223126] transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
