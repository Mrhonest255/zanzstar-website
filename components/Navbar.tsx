"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { useSettings } from "@/lib/settings-context";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-white py-6"}`}>
      <div className="container mx-auto px-10 flex justify-between items-center">
        <Link href="/" className="flex flex-col items-center group">
          <div className="border-t border-b border-gray-800 py-1 px-4">
             <span className="text-xl font-serif tracking-[0.3em] font-bold text-gray-900">{settings.site_name}</span>
          </div>
           <span className="text-[8px] uppercase tracking-[0.5em] mt-1 text-gray-500">{settings.tagline}</span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-8 text-[10px] tracking-[0.15em] font-medium uppercase">
          {[
            { name: "Home", href: "/" },
            { name: "What To Do", href: "/tours" },
            { name: "Arrangements", href: "/arrangements" },
            { name: "Where To Stay", href: "/villas" },
            { name: "Concierge", href: "/services" },
            { name: "Track Booking", href: "/track-booking" }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-gray-800 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link 
             href="/contact" 
             className="px-6 py-3 border border-gray-300 text-gray-900 hover:border-gray-900 transition-all duration-300 ml-4 font-semibold"
          >
            Contact Us
          </Link>
        </div>

        <button 
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="text-gray-900" /> : <Menu className="text-gray-900" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-8 flex flex-col space-y-4 shadow-xl">
          {[
            { name: "Home", href: "/" },
            { name: "What To Do", href: "/tours" },
            { name: "Arrangements", href: "/arrangements" },
            { name: "Where To Stay", href: "/villas" },
            { name: "Concierge", href: "/services" },
            { name: "Track Booking", href: "/track-booking" },
            { name: "Contact Us", href: "/contact" }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-gray-700 text-lg font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
