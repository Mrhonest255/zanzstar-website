"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, XCircle, Calendar, Users, MapPin, ArrowRight, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface BookingData {
  reference: string;
  status: string;
  statusInfo: {
    label: string;
    description: string;
    color: string;
    step: number;
  };
  date: string;
  time: string;
  guests: number;
  totalAmount: number;
  notes: string;
  createdAt: string;
  tour: {
    title: string;
    slug: string;
    image_url: string;
    duration: string;
    location: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

function TrackBookingContent() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get('ref');
  
  const [reference, setReference] = useState(refParam || '');
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (refParam) {
      handleSearch(refParam);
    }
  }, [refParam]);

  const handleSearch = async (ref?: string) => {
    const searchRef = ref || reference;
    if (!searchRef.trim()) {
      setError('Please enter a booking reference');
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await fetch(`/api/track-booking?ref=${searchRef.trim()}`);
      const data = await response.json();

      if (data.success) {
        setBooking(data.booking);
      } else {
        setError(data.error || 'Booking not found');
        setBooking(null);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setBooking(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={24} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <Clock className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-gray-900 text-white py-20 pt-32">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Track Your Booking
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl opacity-90"
          >
            Enter your booking reference to check your reservation status
          </motion.p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value.toUpperCase())}
                    placeholder="Enter booking reference (e.g., ZS-ABC123)"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-lg font-mono"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button
                  onClick={() => handleSearch()}
                  disabled={isLoading}
                  className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Search size={20} />
                      Search
                    </>
                  )}
                </button>
              </div>

              {error && hasSearched && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center"
                >
                  <XCircle className="inline mr-2" size={20} />
                  {error}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Details */}
      {booking && (
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Status Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="p-8 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Booking Reference</p>
                      <h2 className="text-3xl font-bold font-mono text-primary">{booking.reference}</h2>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="font-semibold">{booking.statusInfo.label}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">{booking.statusInfo.description}</p>
                </div>

                {/* Progress Timeline */}
                <div className="p-8 bg-gray-50">
                  <div className="flex items-center justify-between max-w-md mx-auto">
                    {['Submitted', 'Confirmed', 'Completed'].map((step, index) => (
                      <div key={step} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          booking.statusInfo.step > index ? 'bg-green-500 text-white' :
                          booking.statusInfo.step === index + 1 ? 'bg-primary text-white' :
                          'bg-gray-200 text-gray-500'
                        }`}>
                          {booking.statusInfo.step > index ? (
                            <CheckCircle size={20} />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <span className={`text-sm mt-2 ${
                          booking.statusInfo.step >= index + 1 ? 'text-gray-800 font-medium' : 'text-gray-400'
                        }`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Tour Details */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={booking.tour?.image_url || 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg'}
                      alt={booking.tour?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold">{booking.tour?.title}</h3>
                      <p className="text-sm opacity-90 flex items-center gap-1 mt-1">
                        <MapPin size={14} />
                        {booking.tour?.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Calendar size={18} />
                        Date
                      </span>
                      <span className="font-semibold">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Clock size={18} />
                        Duration
                      </span>
                      <span className="font-semibold">{booking.tour?.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Users size={18} />
                        Guests
                      </span>
                      <span className="font-semibold">{booking.guests}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-800 font-semibold">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">${booking.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Guest Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name</span>
                        <span className="font-medium">{booking.customer.firstName} {booking.customer.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-medium">{booking.customer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Booked On</span>
                        <span className="font-medium">
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Need Assistance?</h3>
                    <p className="opacity-90 mb-6">Our team is here to help with any questions about your booking.</p>
                    <div className="space-y-3">
                      <a
                        href="https://wa.me/255656443740"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] rounded-xl font-semibold hover:bg-[#20bd5a] transition"
                      >
                        <Phone size={20} />
                        WhatsApp Us
                      </a>
                      <a
                        href="tel:+255656443740"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/20 rounded-xl font-semibold hover:bg-white/30 transition"
                      >
                        <Phone size={20} />
                        Call +255 656 443 740
                      </a>
                    </div>
                  </div>

                  <Link
                    href={`/${booking.tour?.slug}`}
                    className="flex items-center justify-between w-full p-4 bg-white rounded-xl shadow hover:shadow-lg transition group"
                  >
                    <span className="font-medium">View Tour Details</span>
                    <ArrowRight className="text-primary group-hover:translate-x-1 transition" size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* No Search Yet */}
      {!booking && !hasSearched && (
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-lg p-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Find Your Booking</h3>
                <p className="text-gray-600 mb-6">
                  Enter your booking reference number above to view your reservation details and status.
                </p>
                <p className="text-sm text-gray-500">
                  Your reference number was sent to your email when you made the booking. 
                  It looks like: <span className="font-mono bg-gray-100 px-2 py-1 rounded">ZS-XXXXXXXX</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default function TrackBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    }>
      <TrackBookingContent />
    </Suspense>
  );
}
