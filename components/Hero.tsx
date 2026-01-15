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
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered Logo Overlay - Fixed for mobile */}
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-[90vw] md:max-w-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border-t border-b border-white py-3 md:py-4 px-4 sm:px-8 md:px-12 mb-2"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.4em] font-bold text-white drop-shadow-2xl text-center whitespace-nowrap">
              ZANZSTAR
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white text-[8px] sm:text-[10px] md:text-[12px] uppercase tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.8em] font-light drop-shadow-lg text-center"
          >
            Luxury Concierge
          </motion.p>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/80 text-xs sm:text-sm md:text-base mt-6 md:mt-8 text-center max-w-md px-4"
          >
            Discover the magic of Zanzibar &amp; Tanzania with bespoke tours and luxury experiences
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8"
          >
            <a 
              href="/tours" 
              className="px-6 sm:px-8 py-3 bg-primary text-white text-xs sm:text-sm uppercase tracking-widest font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 text-center"
            >
              Explore Tours
            </a>
            <a 
              href="/contact" 
              className="px-6 sm:px-8 py-3 border-2 border-white text-white text-xs sm:text-sm uppercase tracking-widest font-bold rounded-full hover:bg-white hover:text-primary transition-all text-center"
            >
              Get in Touch
            </a>
          </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-white text-center z-10"
      >
        <p className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-3 md:mb-4 font-bold drop-shadow-md">Scroll</p>
        <div className="flex justify-center animate-bounce">
            <div className="w-4 h-4 md:w-5 md:h-5 border-b-2 border-r-2 border-white rotate-45 opacity-80" />
        </div>
      </motion.div>
    </div>
  );
}
