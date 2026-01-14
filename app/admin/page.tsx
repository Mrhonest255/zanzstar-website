"use client";
import { TrendingUp, Users, Calendar, DollarSign, ChevronRight, MoreVertical } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { label: "Total Bookings", value: "128", change: "+12%", icon: <Calendar size={24} />, color: "bg-blue-50 text-blue-600" },
    { label: "Total Revenue", value: "$45,280", change: "+8.4%", icon: <DollarSign size={24} />, color: "bg-emerald-50 text-emerald-600" },
    { label: "Active Tours", value: "24", change: "+4", icon: <TrendingUp size={24} />, color: "bg-amber-50 text-amber-600" },
    { label: "New Customers", value: "48", change: "+14.2%", icon: <Users size={24} />, color: "bg-purple-50 text-purple-600" },
  ];

  const recentBookings = [
    { id: "#BK-8421", customer: "Sarah Johnson", tour: "Stone Town Heritage", date: "Jan 15, 2026", amount: "$150.00", status: "Confirmed" },
    { id: "#BK-8422", customer: "Michael Chen", tour: "Serengeti Fly-in", date: "Jan 18, 2026", amount: "$2,900.00", status: "Pending" },
    { id: "#BK-8423", customer: "Elena Rossi", tour: "Sunset Dhow Cruise", date: "Jan 14, 2026", amount: "$210.00", status: "Completed" },
    { id: "#BK-8424", customer: "David Miller", tour: "Spice Plantation", date: "Jan 20, 2026", amount: "$90.00", status: "Cancelled" },
    { id: "#BK-8425", customer: "The Browns", tour: "Villa Luxury Rental", date: "Feb 02, 2026", amount: "$4,500.00", status: "Confirmed" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Welcome back, Hamza</h1>
        <p className="text-gray-500 text-sm">Here&apos;s what&apos;s happening with Zanzstar today.</p>
      </div>

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
             <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                View All <ChevronRight size={16} />
             </button>
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
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 text-xs font-bold text-gray-400">{booking.id}</td>
                    <td className="px-8 py-5 font-medium text-sm">{booking.customer}</td>
                    <td className="px-8 py-5 text-sm">{booking.tour}</td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${
                        booking.status === "Confirmed" ? "bg-green-50 text-green-600" :
                        booking.status === "Pending" ? "bg-amber-50 text-amber-600" :
                        booking.status === "Completed" ? "bg-blue-50 text-blue-600" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right font-serif text-gray-900">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Tours */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-serif">Trending Tours</h3>
              <MoreVertical size={20} className="text-gray-400 cursor-pointer" />
           </div>
           
           <div className="space-y-8">
              {[
                { name: "Stone Town Walk", category: "Culture", price: "$50", count: 42, color: "bg-emerald-500" },
                { name: "Mnemba Snorkeling", category: "Wildlife", price: "$85", count: 38, color: "bg-blue-500" },
                { name: "Sunset Cruise", category: "Nature", price: "$70", count: 31, color: "bg-amber-500" },
                { name: "Prison Island", category: "Adventure", price: "$40", count: 25, color: "bg-purple-500" },
                { name: "Spice Tour", category: "Agro", price: "$45", count: 18, color: "bg-orange-500" },
              ].map((tour, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${tour.color}`}></div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-gray-800">{tour.name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{tour.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">{tour.count} Bookings</p>
                    <p className="text-[10px] text-gray-400">{tour.price}</p>
                  </div>
                </div>
              ))}
           </div>

           <button className="w-full mt-12 py-4 border border-gray-100 rounded-2xl text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all">
              Download Full Report
           </button>
        </div>
      </div>
    </div>
  );
}
