"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plane, Ship, Car, Compass, Globe, Map } from "lucide-react";

export default function ArrangementsPage() {
  const steps = [
    {
      title: "Safari Planning",
      icon: <Compass size={32} />,
      desc: "Fly-in safaris to Selous, Serengeti, or Ngorongoro directly from Zanzibar."
    },
    {
      title: "Inter-Island Logistics",
      icon: <Ship size={32} />,
      desc: "Private boat transfers to Pemba, Mafia, or remote sandbanks."
    },
    {
      title: "Flight Bookings",
      icon: <Plane size={32} />,
      desc: "Chartered and scheduled flights across East Africa and the Islands."
    },
    {
      title: "Ground Support",
      icon: <Car size={32} />,
      desc: "24/7 dedicated chauffeurs and meet-and-greet services."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-mint">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4">Logistics</p>
          <h1 className="text-4xl md:text-7xl font-serif text-primary mb-6">Seamless Travel</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light italic text-[15px] leading-relaxed">
            From the moment you touch down in East Africa, we handle every detail of your movement and comfort.
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-3xl font-serif text-gray-900 mb-8">Mainland Safaris <br/> & Game Drives</h2>
                 <p className="text-gray-500 font-light leading-relaxed mb-10 text-lg">
                    Zanzibar is the perfect gateway to the great African parks. We specialize in fly-in safaris that allow you to breakfast in the islands and be on a game drive by lunch.
                 </p>
                 <div className="space-y-6">
                    {steps.map((step, i) => (
                      <div key={i} className="flex gap-6 items-start">
                         <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center text-primary flex-shrink-0">
                            {step.icon}
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                            <p className="text-sm text-gray-500 font-light">{step.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 h-[600px]">
                 <div className="space-y-4">
                    <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800" loading="lazy" decoding="async" className="h-2/3 w-full object-cover rounded-3xl" alt="Safari" />
                    <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800" loading="lazy" decoding="async" className="h-1/3 w-full object-cover rounded-3xl" alt="Lions" />
                 </div>
                 <div className="space-y-4 pt-12">
                    <img src="https://images.unsplash.com/photo-1523805081730-614449274e7d?q=80&w=800" loading="lazy" decoding="async" className="h-1/3 w-full object-cover rounded-3xl" alt="Elephant" />
                    <img src="https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=800" loading="lazy" decoding="async" className="h-2/3 w-full object-cover rounded-3xl" alt="Landscape" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
