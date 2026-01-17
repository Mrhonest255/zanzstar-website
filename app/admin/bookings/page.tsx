"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Search, Filter, ChevronDown, Eye, Edit, Trash2, Check, X, Clock, Calendar, Users, DollarSign, MoreVertical, Download, RefreshCw, Loader2 } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
}

interface Tour {
  id: string;
  title: string;
  slug: string;
  location: string;
}

interface Booking {
  id: string;
  reference: string;
  tour_id: string;
  customer_id: string;
  date: string;
  time: string;
  guests: number;
  total_amount: number;
  status: BookingStatus;
  notes?: string;
  special_requests?: string;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  tour?: Tour;
}

const statusColors: Record<BookingStatus, { bg: string; text: string }> = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-600' },
  confirmed: { bg: 'bg-green-50', text: 'text-green-600' },
  completed: { bg: 'bg-blue-50', text: 'text-blue-600' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600' },
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showStatusMenu, setShowStatusMenu] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // Fetch bookings from Supabase
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          tour:tours(id, title, slug, location)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer?.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer?.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tour?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setBookings(bookings.map(b => 
        b.id === id ? { ...b, status, updated_at: new Date().toISOString() } : b
      ));
      setShowStatusMenu(null);
    } catch (error) {
      console.error('Error updating booking status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + (b.total_amount || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-500">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage customer reservations</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Total</p>
          <p className="text-2xl font-serif mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Pending</p>
          <p className="text-2xl font-serif mt-1 text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Confirmed</p>
          <p className="text-2xl font-serif mt-1 text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Completed</p>
          <p className="text-2xl font-serif mt-1 text-blue-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Cancelled</p>
          <p className="text-2xl font-serif mt-1 text-red-600">{stats.cancelled}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Revenue</p>
          <p className="text-xl font-serif mt-1 text-primary">{formatCurrency(stats.totalRevenue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by reference, customer or tour..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-primary bg-gray-50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                statusFilter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <th className="text-left px-6 py-4">Reference</th>
                <th className="text-left px-6 py-4">Customer</th>
                <th className="text-left px-6 py-4">Tour</th>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">Guests</th>
                <th className="text-left px-6 py-4">Amount</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-bold text-primary">{booking.reference}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm">{booking.customer?.first_name} {booking.customer?.last_name}</p>
                      <p className="text-xs text-gray-400">{booking.customer?.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{booking.tour?.title || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p>{formatDate(booking.date)}</p>
                      <p className="text-xs text-gray-400">{booking.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{booking.guests}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-serif">{formatCurrency(booking.total_amount || 0)}</span>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => setShowStatusMenu(showStatusMenu === booking.id ? null : booking.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${statusColors[booking.status]?.bg || 'bg-gray-50'} ${statusColors[booking.status]?.text || 'text-gray-600'}`}
                    >
                      {booking.status}
                      <ChevronDown size={12} />
                    </button>
                    
                    {/* Status Dropdown */}
                    {showStatusMenu === booking.id && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 min-w-[140px]">
                        {(['pending', 'confirmed', 'completed', 'cancelled'] as BookingStatus[]).map(status => (
                          <button
                            key={status}
                            onClick={() => updateBookingStatus(booking.id, status)}
                            disabled={updating}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 capitalize disabled:opacity-50 ${
                              booking.status === status ? 'font-bold text-primary' : ''
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 text-sm">
              {bookings.length === 0 
                ? "You haven't received any bookings yet. Once customers book tours, they will appear here."
                : "Try adjusting your search or filters"
              }
            </p>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Booking Reference</p>
                <h2 className="text-2xl font-serif">{selectedBooking.reference}</h2>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${statusColors[selectedBooking.status]?.bg || 'bg-gray-50'} ${statusColors[selectedBooking.status]?.text || 'text-gray-600'}`}>
                  {selectedBooking.status}
                </span>
                <p className="text-sm text-gray-400">
                  Created {formatDate(selectedBooking.created_at)}
                </p>
              </div>

              {/* Tour Info */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tour</p>
                <h3 className="font-serif text-lg">{selectedBooking.tour?.title || 'N/A'}</h3>
                <p className="text-sm text-gray-500">{selectedBooking.tour?.location}</p>
              </div>

              {/* Booking Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <Calendar size={20} className="text-primary mb-2" />
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="font-medium">{formatDate(selectedBooking.date)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <Clock size={20} className="text-primary mb-2" />
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="font-medium">{selectedBooking.time || 'TBD'}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <Users size={20} className="text-primary mb-2" />
                  <p className="text-xs text-gray-400">Guests</p>
                  <p className="font-medium">{selectedBooking.guests}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <DollarSign size={20} className="text-primary mb-2" />
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="font-serif text-lg">{formatCurrency(selectedBooking.total_amount || 0)}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Customer Information</p>
                <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                  <p className="font-medium">{selectedBooking.customer?.first_name} {selectedBooking.customer?.last_name}</p>
                  <p className="text-sm text-gray-600">{selectedBooking.customer?.email}</p>
                  <p className="text-sm text-gray-600">{selectedBooking.customer?.phone}</p>
                  <p className="text-sm text-gray-600">{selectedBooking.customer?.country}</p>
                </div>
              </div>

              {/* Notes */}
              {(selectedBooking.notes || selectedBooking.special_requests) && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Notes & Requests</p>
                  <div className="bg-amber-50 rounded-2xl p-4 space-y-2">
                    {selectedBooking.notes && <p className="text-sm">{selectedBooking.notes}</p>}
                    {selectedBooking.special_requests && (
                      <p className="text-sm font-medium text-amber-700">Special: {selectedBooking.special_requests}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => { updateBookingStatus(selectedBooking.id, 'confirmed'); setSelectedBooking(null); }}
                      disabled={updating}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      <Check size={18} /> Confirm Booking
                    </button>
                    <button
                      onClick={() => { updateBookingStatus(selectedBooking.id, 'cancelled'); setSelectedBooking(null); }}
                      disabled={updating}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      <X size={18} /> Cancel
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    onClick={() => { updateBookingStatus(selectedBooking.id, 'completed'); setSelectedBooking(null); }}
                    disabled={updating}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Check size={18} /> Mark as Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
