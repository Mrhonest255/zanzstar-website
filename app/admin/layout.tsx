"use client";
import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Calendar, Map, Users, Settings, LogOut, Search, Bell, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/auth-client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createAuthClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show admin layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/admin" },
    { icon: <Calendar size={20} />, label: "Bookings", href: "/admin/bookings" },
    { icon: <Map size={20} />, label: "Tours & Safaris", href: "/admin/tours" },
    { icon: <Users size={20} />, label: "Customers", href: "/admin/customers" },
    { icon: <Settings size={20} />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#232d2b] text-white flex flex-col items-center py-6 lg:py-10 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white lg:hidden"
        >
          <X size={24} />
        </button>

        <div className="mb-8 lg:mb-12 text-center">
          <div className="border-t border-b border-white/20 py-2 px-4 mb-2">
            <span className="text-lg lg:text-xl font-serif tracking-[0.2em] font-bold">ZANZSTAR</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-white/40">Admin Panel</p>
        </div>

        <nav className="w-full flex-grow px-3 lg:px-4 space-y-1 lg:space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl transition-all ${
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

        <div className="mt-auto w-full px-3 lg:px-4 border-t border-white/10 pt-6 lg:pt-8">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-2.5 lg:py-3 text-red-400 hover:text-red-300 transition-colors w-full"
           >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-10 flex-shrink-0">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 lg:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Search - Hidden on small mobile */}
          <div className="hidden sm:block relative w-full max-w-xs lg:max-w-sm xl:max-w-md">
            <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-50 border border-gray-100 pl-10 lg:pl-12 pr-4 py-2 lg:py-2.5 rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>

          {/* Mobile Logo */}
          <div className="flex sm:hidden items-center">
            <span className="font-serif text-lg font-bold tracking-wider">ZANZSTAR</span>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <button className="relative p-2 lg:p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
               <Bell size={18} className="text-gray-500" />
               <span className="absolute top-1.5 lg:top-2 right-1.5 lg:right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="hidden md:flex items-center gap-3 pl-3 lg:pl-6 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-sm font-bold">Admin</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Manager</p>
               </div>
               <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm">
                  AD
               </div>
            </div>
            {/* Mobile Avatar */}
            <div className="md:hidden w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Area */}
        <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
