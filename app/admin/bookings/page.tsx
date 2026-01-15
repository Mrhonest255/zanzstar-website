"use client";
import { useState } from "react";
import { Search, Filter, ChevronDown, Eye, Edit, Trash2, Check, X, Clock, Calendar, Users, DollarSign, MoreVertical, Download } from "lucide-react";
import { Booking, BookingStatus } from "@/lib/supabase/types";

// Mock data - will be replaced with Supabase
const mockBookings: Booking[] = [
  {
    id: '1',
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    reference: 'BK-8421',
    tour_id: '1',
    customer_id: '1',
    date: '2026-01-15',
    time: '09:00',
    guests: 2,
    total_amount: 150,
    status: 'confirmed',
    notes: 'Anniversary trip',
    special_requests: 'Please arrange flowers',
    customer: { id: '1', email: 'sarah@example.com', first_name: 'Sarah', last_name: 'Johnson', phone: '+1 555-0123', country: 'USA' } as any,
    tour: { id: '1', title: 'Stone Town Heritage Walk', slug: 'tour-stone-town', location: 'Stone Town' } as any,
  },
  {
    id: '2',
    created_at: '2026-01-11T14:30:00Z',
    updated_at: '2026-01-11T14:30:00Z',
    reference: 'BK-8422',
    tour_id: '3',
    customer_id: '2',
    date: '2026-01-18',
    time: '06:00',
    guests: 4,
    total_amount: 10000,
    status: 'pending',
    customer: { id: '2', email: 'michael@example.com', first_name: 'Michael', last_name: 'Chen', phone: '+44 20 7123 4567', country: 'UK' } as any,
    tour: { id: '3', title: 'Serengeti Fly-in Safari', slug: 'serengeti-fly-in-safari', location: 'Serengeti' } as any,
  },
  {
    id: '3',
    created_at: '2026-01-08T09:15:00Z',
    updated_at: '2026-01-14T18:00:00Z',
    reference: 'BK-8423',
    tour_id: '2',
    customer_id: '3',
    date: '2026-01-14',
    time: '16:30',
    guests: 2,
    total_amount: 210,
    status: 'completed',
    customer: { id: '3', email: 'elena@example.com', first_name: 'Elena', last_name: 'Rossi', phone: '+39 02 1234 5678', country: 'Italy' } as any,
    tour: { id: '2', title: 'Private Sunset Cruise', slug: 'tour-sunset-cruise', location: 'Stone Town Waterfront' } as any,
  },
  {
    id: '4',
    created_at: '2026-01-09T11:00:00Z',
    updated_at: '2026-01-12T10:00:00Z',
    reference: 'BK-8424',
    tour_id: '1',
    customer_id: '4',
    date: '2026-01-20',
    time: '09:00',
    guests: 1,
    total_amount: 90,
    status: 'cancelled',
    notes: 'Customer requested cancellation due to flight change',
    customer: { id: '4', email: 'david@example.com', first_name: 'David', last_name: 'Miller', phone: '+1 555-9876', country: 'USA' } as any,
    tour: { id: '1', title: 'Spice Plantation Tour', slug: 'spice-plantation', location: 'Zanzibar' } as any,
  },
  {
    id: '5',
    created_at: '2026-01-12T16:45:00Z',
    updated_at: '2026-01-12T16:45:00Z',
    reference: 'BK-8425',
    tour_id: '4',
    customer_id: '5',
    date: '2026-02-02',
    time: '10:00',
    guests: 6,
    total_amount: 4500,
    status: 'confirmed',
    special_requests: 'Vegetarian meals for 2 guests',
    customer: { id: '5', email: 'brown.family@example.com', first_name: 'James', last_name: 'Brown', phone: '+61 2 1234 5678', country: 'Australia' } as any,
    tour: { id: '4', title: 'Prison Island Adventure', slug: 'prison-island', location: 'Prison Island' } as any,
  },
];

const statusColors: Record<BookingStatus, { bg: string; text: string }> = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-600' },
  confirmed: { bg: 'bg-green-50', text: 'text-green-600' },
  completed: { bg: 'bg-blue-50', text: 'text-blue-600' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600' },
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showStatusMenu, setShowStatusMenu] = useState<string | null>(null);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer?.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer?.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tour?.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status, updated_at: new Date().toISOString() } : b
    ));
    setShowStatusMenu(null);
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
    totalRevenue: bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.total_amount, 0),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage customer reservations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm">
          <Download size={18} />
          Export CSV
        </button>
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
        <div className="flex gap-2">
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
                    <p className="text-sm">{booking.tour?.title}</p>
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
                    <span className="font-serif">{formatCurrency(booking.total_amount)}</span>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => setShowStatusMenu(showStatusMenu === booking.id ? null : booking.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold ${statusColors[booking.status].bg} ${statusColors[booking.status].text}`}
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
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 capitalize ${
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
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
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
                <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${statusColors[selectedBooking.status].bg} ${statusColors[selectedBooking.status].text}`}>
                  {selectedBooking.status}
                </span>
                <p className="text-sm text-gray-400">
                  Created {formatDate(selectedBooking.created_at)}
                </p>
              </div>

              {/* Tour Info */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tour</p>
                <h3 className="font-serif text-lg">{selectedBooking.tour?.title}</h3>
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
                  <p className="font-serif text-lg">{formatCurrency(selectedBooking.total_amount)}</p>
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
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <Check size={18} /> Confirm Booking
                    </button>
                    <button
                      onClick={() => { updateBookingStatus(selectedBooking.id, 'cancelled'); setSelectedBooking(null); }}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      <X size={18} /> Cancel
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button
                    onClick={() => { updateBookingStatus(selectedBooking.id, 'completed'); setSelectedBooking(null); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
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
