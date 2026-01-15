"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Calendar, DollarSign, ChevronRight, MoreVertical, Map, Clock } from "lucide-react";
import { getDashboardStats, getBookings, getTours, DashboardStats } from "@/lib/supabase/client";
import { Booking, Tour } from "@/lib/supabase/types";

export default function AdminPage() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalBookings: 0,
    totalRevenue: 0,
    activeTours: 0,
    newCustomers: 0,
    bookingChange: '+0%',
    revenueChange: '+0%',
    toursChange: '+0',
    customersChange: '+0%',
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [topTours, setTopTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, bookings, tours] = await Promise.all([
          getDashboardStats(),
          getBookings(),
          getTours(),
        ]);
        setDashboardStats(stats);
        setRecentBookings(bookings.slice(0, 5));
        setTopTours(tours.filter(t => t.is_active).slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    { label: "Total Bookings", value: dashboardStats.totalBookings.toString(), change: dashboardStats.bookingChange, icon: <Calendar size={24} />, color: "bg-blue-50 text-blue-600" },
    { label: "Total Revenue", value: formatCurrency(dashboardStats.totalRevenue), change: dashboardStats.revenueChange, icon: <DollarSign size={24} />, color: "bg-emerald-50 text-emerald-600" },
    { label: "Active Tours", value: dashboardStats.activeTours.toString(), change: dashboardStats.toursChange, icon: <Map size={24} />, color: "bg-amber-50 text-amber-600" },
    { label: "New Customers", value: dashboardStats.newCustomers.toString(), change: dashboardStats.customersChange, icon: <Users size={24} />, color: "bg-purple-50 text-purple-600" },
  ];

  const categoryColors: Record<string, string> = {
    'cultural': 'bg-emerald-500',
    'adventure': 'bg-blue-500',
    'nature': 'bg-amber-500',
    'wildlife': 'bg-purple-500',
    'beach': 'bg-orange-500',
    'luxury': 'bg-pink-500',
    'safari': 'bg-green-600',
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Welcome back, Hamza</h1>
        <p className="text-gray-500 text-sm">Here&apos;s what&apos;s happening with Zanzstar today.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    stat.change.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                <h3 className="text-3xl font-serif text-gray-900">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Recent Bookings Table */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-xl font-serif">Recent Bookings</h3>
                <Link href="/admin/bookings" className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    View All <ChevronRight size={16} />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      <th className="px-8 py-6">Reference</th>
                      <th className="px-8 py-6">Customer</th>
                      <th className="px-8 py-6">Tour</th>
                      <th className="px-8 py-6">Status</th>
                      <th className="px-8 py-6 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-5 text-xs font-bold text-gray-400">#{booking.reference}</td>
                        <td className="px-8 py-5 font-medium text-sm">{booking.customer?.first_name} {booking.customer?.last_name}</td>
                        <td className="px-8 py-5 text-sm">{booking.tour?.title || 'N/A'}</td>
                        <td className="px-8 py-5">
                          <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${
                            booking.status === "confirmed" ? "bg-green-50 text-green-600" :
                            booking.status === "pending" ? "bg-amber-50 text-amber-600" :
                            booking.status === "completed" ? "bg-blue-50 text-blue-600" :
                            "bg-red-50 text-red-600"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right font-serif text-gray-900">{formatCurrency(booking.total_amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Tours */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
              <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-serif">Active Tours</h3>
                  <Link href="/admin/tours">
                    <MoreVertical size={20} className="text-gray-400 cursor-pointer hover:text-primary" />
                  </Link>
              </div>
              
              <div className="space-y-8">
                  {topTours.map((tour) => (
                    <div key={tour.id} className="flex items-center gap-4">
                      <div className={`w-2 h-10 rounded-full ${categoryColors[tour.category] || 'bg-gray-500'}`}></div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-gray-800">{tour.title}</h4>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{tour.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-serif text-primary">{formatCurrency(tour.price)}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 justify-end">
                          <Clock size={10} /> {tour.duration}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              <Link 
                href="/admin/tours"
                className="block w-full mt-12 py-4 border border-gray-100 rounded-2xl text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all text-center"
              >
                  Manage All Tours
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
