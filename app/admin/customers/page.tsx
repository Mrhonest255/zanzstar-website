"use client";
import { useState } from "react";
import { Search, Plus, Eye, Edit, Star, Mail, Phone, MapPin, DollarSign, Calendar, MoreVertical, Download, User } from "lucide-react";
import { Customer } from "@/lib/supabase/types";

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    created_at: '2025-06-15T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z',
    email: 'sarah.johnson@example.com',
    first_name: 'Sarah',
    last_name: 'Johnson',
    phone: '+1 555-0123',
    country: 'United States',
    total_bookings: 3,
    total_spent: 650,
    is_vip: false,
  },
  {
    id: '2',
    created_at: '2025-03-20T14:30:00Z',
    updated_at: '2026-01-11T14:30:00Z',
    email: 'michael.chen@example.com',
    first_name: 'Michael',
    last_name: 'Chen',
    phone: '+44 20 7123 4567',
    country: 'United Kingdom',
    total_bookings: 8,
    total_spent: 15200,
    is_vip: true,
  },
  {
    id: '3',
    created_at: '2025-09-05T09:15:00Z',
    updated_at: '2026-01-14T18:00:00Z',
    email: 'elena.rossi@example.com',
    first_name: 'Elena',
    last_name: 'Rossi',
    phone: '+39 02 1234 5678',
    country: 'Italy',
    total_bookings: 2,
    total_spent: 420,
    is_vip: false,
  },
  {
    id: '4',
    created_at: '2025-11-01T11:00:00Z',
    updated_at: '2025-11-01T11:00:00Z',
    email: 'david.miller@example.com',
    first_name: 'David',
    last_name: 'Miller',
    phone: '+1 555-9876',
    country: 'United States',
    total_bookings: 1,
    total_spent: 90,
    is_vip: false,
  },
  {
    id: '5',
    created_at: '2025-08-22T16:45:00Z',
    updated_at: '2026-01-12T16:45:00Z',
    email: 'brown.family@example.com',
    first_name: 'James',
    last_name: 'Brown',
    phone: '+61 2 1234 5678',
    country: 'Australia',
    total_bookings: 5,
    total_spent: 8900,
    is_vip: true,
  },
  {
    id: '6',
    created_at: '2025-12-10T08:00:00Z',
    updated_at: '2025-12-10T08:00:00Z',
    email: 'akiko.tanaka@example.com',
    first_name: 'Akiko',
    last_name: 'Tanaka',
    phone: '+81 3 1234 5678',
    country: 'Japan',
    total_bookings: 4,
    total_spent: 3200,
    is_vip: false,
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVip, setFilterVip] = useState<'all' | 'vip' | 'regular'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVip = filterVip === 'all' || 
                       (filterVip === 'vip' && customer.is_vip) ||
                       (filterVip === 'regular' && !customer.is_vip);
    return matchesSearch && matchesVip;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const toggleVip = (id: string) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, is_vip: !c.is_vip } : c
    ));
  };

  // Stats
  const stats = {
    total: customers.length,
    vip: customers.filter(c => c.is_vip).length,
    totalSpent: customers.reduce((sum, c) => sum + c.total_spent, 0),
    avgSpent: customers.length ? customers.reduce((sum, c) => sum + c.total_spent, 0) / customers.length : 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your customer database</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Total Customers</p>
          <p className="text-2xl font-serif mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">VIP Customers</p>
          <p className="text-2xl font-serif mt-1 text-amber-600">{stats.vip}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Total Revenue</p>
          <p className="text-xl font-serif mt-1 text-primary">{formatCurrency(stats.totalSpent)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 uppercase tracking-widest">Avg. per Customer</p>
          <p className="text-xl font-serif mt-1">{formatCurrency(stats.avgSpent)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:border-primary bg-gray-50"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'vip', label: 'VIP Only' },
            { value: 'regular', label: 'Regular' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setFilterVip(option.value as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filterVip === option.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div 
            key={customer.id}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-serif text-xl">
                  {customer.first_name[0]}{customer.last_name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{customer.first_name} {customer.last_name}</h3>
                    {customer.is_vip && (
                      <Star size={16} className="text-amber-500 fill-amber-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>
              <button
                onClick={() => toggleVip(customer.id)}
                className={`p-2 rounded-lg transition-colors ${
                  customer.is_vip 
                    ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
                title={customer.is_vip ? 'Remove VIP' : 'Make VIP'}
              >
                <Star size={18} fill={customer.is_vip ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="space-y-2 text-sm">
              {customer.phone && (
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone size={14} />
                  <span>{customer.phone}</span>
                </div>
              )}
              {customer.country && (
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={14} />
                  <span>{customer.country}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase">Bookings</p>
                <p className="font-serif text-lg">{customer.total_bookings}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">Total Spent</p>
                <p className="font-serif text-lg text-primary">{formatCurrency(customer.total_spent)}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedCustomer(customer)}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Eye size={16} /> View
              </button>
              <a
                href={`mailto:${customer.email}`}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Mail size={16} /> Email
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-serif text-2xl">
                  {selectedCustomer.first_name[0]}{selectedCustomer.last_name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-serif">{selectedCustomer.first_name} {selectedCustomer.last_name}</h2>
                    {selectedCustomer.is_vip && (
                      <span className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">
                        <Star size={12} fill="currentColor" /> VIP
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">Customer since {formatDate(selectedCustomer.created_at)}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={18} className="text-gray-400" />
                  <a href={`mailto:${selectedCustomer.email}`} className="text-primary hover:underline">
                    {selectedCustomer.email}
                  </a>
                </div>
                {selectedCustomer.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={18} className="text-gray-400" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                )}
                {selectedCustomer.country && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={18} className="text-gray-400" />
                    <span>{selectedCustomer.country}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <Calendar size={20} className="text-primary mb-2" />
                  <p className="text-xs text-gray-400">Total Bookings</p>
                  <p className="text-2xl font-serif">{selectedCustomer.total_bookings}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <DollarSign size={20} className="text-primary mb-2" />
                  <p className="text-xs text-gray-400">Total Spent</p>
                  <p className="text-2xl font-serif">{formatCurrency(selectedCustomer.total_spent)}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <a
                  href={`mailto:${selectedCustomer.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <Mail size={18} /> Send Email
                </a>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
