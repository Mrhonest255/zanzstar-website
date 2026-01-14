"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden pt-24">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/4K 60 fps.webm" type="video/webm" />
          <img src="https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=2670" className="w-full h-full object-cover" alt="Zanzibar" />
        </video>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Centered Logo Overlay */}
      <div className="relative z-10 flex flex-col items-center">
          <div className="border-t border-b border-white py-4 px-12 mb-2">
            <h1 className="text-5xl md:text-7xl font-serif tracking-[0.4em] font-bold text-white drop-shadow-2xl">
              ZANZSTAR
            </h1>
          </div>
          <p className="text-white text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-light drop-shadow-lg">Luxury Concierge</p>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white text-center z-10">
        <p className="text-[9px] uppercase tracking-[0.6em] mb-4 font-bold drop-shadow-md">Scroll</p>
        <div className="flex justify-center">
            <div className="w-5 h-5 border-b-2 border-r-2 border-white rotate-45 opacity-80" />
        </div>
      </div>
    </div>
  );
}
