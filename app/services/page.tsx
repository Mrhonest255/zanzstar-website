"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Ship, Car, Home as HomeIcon, LayoutList, Shield, Music, Utensils, Zap } from "lucide-react";

export default function ServicesPage() {
  const allServices = [
    {
      icon: <Ship size={40} />,
      title: "Yacht Charters",
      description: "From modern motor yachts to traditional wooden dhows, we provide exclusive access to Zanzibar's finest private vessels."
    },
    {
      icon: <Car size={40} />,
      title: "Private Transfers",
      description: "Professional drivers and comfortable vehicles for airport transfers, island explorations, and executive travel."
    },
    {
      icon: <HomeIcon size={40} />,
      title: "Villa Rentals",
      description: "Access to private estates and premium villas that aren't listed on public booking platforms."
    },
    {
      icon: <LayoutList size={40} />,
      title: "Custom Itineraries",
      description: "Bespoke travel planning tailored to your specific interests and pace."
    },
    {
      icon: <Shield size={40} />,
      title: "Security & Protection",
      description: "Discrete and professional security services for VIP guests and high-profile delegations."
    },
    {
      icon: <Music size={40} />,
      title: "Event Planning",
      description: "Exclusive weddings, anniversaries, and corporate retreats set against the stunning backdrop of the Indian Ocean."
    },
    {
      icon: <Utensils size={40} />,
      title: "Private Chefs",
      description: "World-class culinary experiences delivered in the privacy of your villa or on a remote sandbank."
    },
    {
      icon: <Zap size={40} />,
      title: "Fast-Track Services",
      description: "Seamless airport VIP handling and fast-track immigration services for a stress-free arrival."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-mint">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-4">Services</p>
          <h1 className="text-4xl md:text-7xl font-serif text-primary mb-6">Expertly Curated</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light italic text-[15px] leading-relaxed">
            Our travel services ensure that every aspect of your Zanzibar stay is handled with precision and local expertise.
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {allServices.map((service, index) => (
              <div key={index} className="group p-10 bg-white border border-gray-100 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                <div className="w-20 h-20 bg-mint rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif mb-4 text-gray-900 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed font-light italic">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-950 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif mb-10">Need a bespoke <br/> arrangement?</h2>
          <a href="/contact" className="inline-block bg-primary text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
             Start a Conversation
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
