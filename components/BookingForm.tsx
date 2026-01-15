"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, CheckCircle, Loader2, X, User, Mail, Phone, Globe, MessageSquare } from 'lucide-react';

interface BookingFormProps {
  tourName: string;
  tourSlug: string;
  tourPrice: number;
  tourDuration: string;
  tourLocation: string;
  isOpen: boolean;
  onClose: () => void;
}

const countries = [
  "United States", "United Kingdom", "Germany", "France", "Italy", "Spain",
  "Netherlands", "Belgium", "Switzerland", "Austria", "Australia", "Canada",
  "South Africa", "Kenya", "Tanzania", "Uganda", "India", "China", "Japan",
  "Brazil", "Argentina", "Mexico", "Russia", "Poland", "Sweden", "Norway",
  "Denmark", "Finland", "Ireland", "Portugal", "Greece", "Czech Republic",
  "Israel", "United Arab Emirates", "Saudi Arabia", "Singapore", "Malaysia",
  "Thailand", "Vietnam", "Philippines", "Indonesia", "New Zealand", "Other"
];

export default function BookingForm({ 
  tourName, 
  tourSlug, 
  tourPrice, 
  tourDuration,
  tourLocation,
  isOpen, 
  onClose 
}: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    date: '',
    guests: '2',
    message: ''
  });

  const totalAmount = tourPrice * parseInt(formData.guests || '1');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone && formData.country;
  };

  const validateStep2 = () => {
    return formData.date && formData.guests;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourName,
          tourSlug,
          ...formData,
          totalAmount
        })
      });

      const data = await response.json();

      if (data.success) {
        setBookingRef(data.bookingReference);
        setIsSuccess(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setBookingRef('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      date: '',
      guests: '2',
      message: ''
    });
    onClose();
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-2">Book Your Experience</h2>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {tourLocation}
              </span>
              <span>|</span>
              <span>{tourDuration}</span>
            </div>
            <p className="text-lg font-semibold mt-2">{tourName}</p>
          </div>

          {/* Progress Steps */}
          {!isSuccess && (
            <div className="flex items-center justify-center gap-2 py-4 bg-gray-50">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s ? <CheckCircle size={16} /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-16 h-1 mx-2 rounded ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Submitted!</h3>
                <p className="text-gray-600 mb-6">Your booking reference is:</p>
                <div className="bg-gray-100 py-4 px-8 rounded-lg inline-block mb-6">
                  <span className="text-2xl font-mono font-bold text-primary">{bookingRef}</span>
                </div>
                <p className="text-gray-600 mb-8">
                  We&apos;ve sent a confirmation email to <strong>{formData.email}</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`/track-booking?ref=${bookingRef}`}
                    className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition"
                  >
                    Track Your Booking
                  </a>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="John"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                        >
                          <option value="">Select your country</option>
                          {countries.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Tour Details */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tour Details</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={minDate}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                        >
                          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                          ))}
                          <option value="15+">15+ (Group)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review & Confirm */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Review Your Booking</h3>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tour</span>
                        <span className="font-semibold">{tourName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-semibold">
                          {formData.date ? new Date(formData.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }) : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests</span>
                        <span className="font-semibold">{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name</span>
                        <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-semibold">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone</span>
                        <span className="font-semibold">{formData.phone}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per person</span>
                        <span className="font-semibold">${tourPrice}</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Total Amount</span>
                        <span className="font-bold text-primary">${totalAmount}</span>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {error}
                      </div>
                    )}

                    <p className="text-sm text-gray-500">
                      By submitting this booking, you agree to our terms and conditions. 
                      Payment will be arranged after confirmation.
                    </p>
                  </motion.div>
                )}
              </form>
            )}
          </div>

          {/* Footer Actions */}
          {!isSuccess && (
            <div className="border-t p-4 flex justify-between bg-gray-50">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !validateStep1() : !validateStep2()}
                  className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
