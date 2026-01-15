"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Users, Bed, Maximize } from "lucide-react";

export default function VillasPage() {
  const villas = [
    {
      name: "The Ocean Oasis",
      location: "Nungwi, North Zanzibar",
      beds: 5,
      guests: 10,
      size: "450 sqm",
      image: "https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=1200",
      price: "$1,200 / night"
    },
    {
      name: "The Royal Reef",
      location: "Michamvi, East Coast",
      beds: 4,
      guests: 8,
      size: "380 sqm",
      image: "https://images.unsplash.com/photo-1620330101962-d35ed5f21223?q=80&w=1200",
      price: "$950 / night"
    },
    {
      name: "The Sunset Sanctuary",
      location: "Kigomani, North East",
      beds: 6,
      guests: 12,
      size: "600 sqm",
      image: "https://images.unsplash.com/photo-1606240724602-5b21f8963974?q=80&w=1200",
      price: "$2,100 / night"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-mint">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">Where To Stay</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light italic text-sm">
            Curated selection of the most private and luxurious villas in Zanzibar.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {villas.map((villa, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-80 overflow-hidden rounded-2xl mb-6 shadow-lg">
                  <img src={villa.image} alt={villa.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-serif text-primary font-bold shadow-sm">
                    {villa.price}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif text-gray-900 group-hover:text-primary transition-colors">{villa.name}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                        <MapPin size={12} className="text-primary-light" />
                        {villa.location}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                      <Bed size={14} className="text-primary-light" />
                      {villa.beds} Beds
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                      <Users size={14} className="text-primary-light" />
                      {villa.guests} Guests
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                      <Maximize size={14} className="text-primary-light" />
                      {villa.size}
                    </div>
                  </div>
                  <button className="w-full mt-4 py-3 border border-gray-200 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-white transition-all">
                    View Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
