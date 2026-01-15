"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Users, Check, X, MapPin, Calendar, Smartphone, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { tours } from "@/lib/tours";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function TourDetailPage({ params }: { params: { tourSlug: string } }) {
  const tour = tours.find(t => t.slug === params.tourSlug);
  const [currentImage, setCurrentImage] = useState(0);

  if (!tour) {
    return notFound();
  }

  const gallery = tour.gallery || [tour.headerImage];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <main className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={gallery[currentImage]} 
            alt={tour.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Gallery Navigation */}
          {gallery.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-20"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all z-20"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image Dots */}
              <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pb-20 text-white">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-4xl"
           >
             <div className="inline-block bg-primary/30 backdrop-blur-md px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold mb-6 border border-white/20">
               {tour.category}
             </div>
             <h1 className="text-4xl md:text-7xl font-serif mb-8 leading-tight">{tour.title}</h1>
             <div className="flex flex-wrap gap-8 text-xs uppercase tracking-[0.2em] font-medium opacity-90">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock size={16} className="text-primary-light" />
                  </div>
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Users size={16} className="text-primary-light" />
                  </div>
                  <span>{tour.groupSize}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <MapPin size={16} className="text-primary-light" />
                  </div>
                  <span>{tour.location}</span>
                </div>
             </div>
           </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
             <div className="mb-20">
               <h2 className="text-3xl font-serif mb-8 text-primary tracking-tight">Experience Overview</h2>
               <p className="text-[#666] leading-relaxed text-lg font-light italic">{tour.description}</p>
             </div>

             <div className="mb-20">
               <h2 className="text-3xl font-serif mb-10 text-primary tracking-tight">The Journey</h2>
               <div className="space-y-12 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100">
                 {tour.itinerary.map((item: any, idx: number) => (
                   <div key={idx} className="relative pl-12">
                     <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-mint border-4 border-white flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">{item.time}</span>
                     <p className="text-gray-700 text-lg font-light">{item.event}</p>
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
                 <h3 className="text-xl font-serif mb-6 text-gray-900 flex items-center gap-3">
                  <Check size={20} className="text-green-600" /> What&apos;s Included
                 </h3>
                 <ul className="space-y-4">
                   {tour.inclusions.map((inc, i) => (
                     <li key={i} className="flex gap-3 text-sm text-gray-600 font-light italic leading-relaxed">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-200 mt-2 flex-shrink-0"></div>
                       {inc}
                     </li>
                   ))}
                 </ul>
               </div>
               
               <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
                 <h3 className="text-xl font-serif mb-6 text-gray-900 flex items-center gap-3">
                    <X size={20} className="text-red-400" /> Not Included
                 </h3>
                 <ul className="space-y-4">
                   {tour.exclusions.map((exc, i) => (
                     <li key={i} className="flex gap-3 text-sm text-gray-600 font-light italic leading-relaxed">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-100 mt-2 flex-shrink-0"></div>
                       {exc}
                     </li>
                   ))}
                 </ul>
               </div>
             </div>

             {/* Photo Gallery */}
             {gallery.length > 1 && (
               <div className="mt-20">
                 <h2 className="text-3xl font-serif mb-10 text-primary tracking-tight">Photo Gallery</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {gallery.map((img, idx) => (
                     <motion.div
                       key={idx}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
                       onClick={() => setCurrentImage(idx)}
                     >
                       <img 
                         src={img} 
                         alt={`${tour.title} - Photo ${idx + 1}`}
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                     </motion.div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          {/* Sidebar Booking */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 space-y-8">
               <div className="bg-primary p-10 rounded-[2rem] text-white shadow-2xl">
                 <p className="text-white/60 text-xs uppercase tracking-widest font-bold mb-2">Price per person</p>
                 <div className="text-5xl font-serif mb-8">{tour.price}</div>
                 
                 <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center py-4 border-b border-white/10">
                     <span className="text-xs uppercase tracking-widest text-white/50">Duration</span>
                     <span className="text-sm font-medium">{tour.duration}</span>
                   </div>
                   <div className="flex justify-between items-center py-4 border-b border-white/10">
                     <span className="text-xs uppercase tracking-widest text-white/50">Transport</span>
                     <span className="text-sm font-medium">Included</span>
                   </div>
                 </div>

                 <a 
                   href={`https://wa.me/255776654215?text=Hello, I would like to book the ${tour.title} experience.`}
                   className="w-full bg-white text-primary py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all"
                 >
                   Book via WhatsApp
                 </a>
                 
                 <p className="text-center mt-6 text-[10px] text-white/40 uppercase tracking-widest">Instant response guaranteed</p>
               </div>

               <div className="border border-gray-100 p-8 rounded-[2rem] bg-white">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Why Book With Us?</h4>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center text-primary flex-shrink-0">
                        <Smartphone size={14} />
                      </div>
                      <p className="text-[11px] leading-relaxed text-gray-500 italic">24/7 Concierge Support during your entire stay.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center text-primary flex-shrink-0">
                        <Users size={14} />
                      </div>
                      <p className="text-[11px] leading-relaxed text-gray-500 italic">Highly experienced and licensed private guides.</p>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
