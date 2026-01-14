"use client";
import Link from "next/link";
import { LayoutDashboard, Calendar, Map, Users, Settings, LogOut, Search, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
    { icon: <Calendar size={20} />, label: "Bookings", href: "/admin/bookings" },
    { icon: <Map size={20} />, label: "Tours & Safaris", href: "/admin/tours" },
    { icon: <Users size={20} />, label: "Customers", href: "/admin/customers" },
    { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#232d2b] text-white flex flex-col items-center py-10 shadow-2xl">
        <div className="mb-12 text-center">
          <div className="border-t border-b border-white/20 py-2 px-4 mb-2">
            <span className="text-xl font-serif tracking-[0.2em] font-bold">ZANZSTAR</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Admin Panel</p>
        </div>

        <nav className="w-full flex-grow px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto w-full px-4 border-t border-white/10 pt-8">
           <button className="flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 transition-colors w-full">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 flex-shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search bookings, tours or customers..." 
              className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
               <Bell size={20} className="text-gray-500" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-sm font-bold">Hamza Issa</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Global Admin</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                  HI
               </div>
            </div>
          </div>
        </header>

        {/* Dynamic Area */}
        <div className="flex-grow overflow-y-auto p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
