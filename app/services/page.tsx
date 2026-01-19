"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function ServicesPage() {
  const allServices = [
    {
      image: "https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Yacht Charters",
      description: "From modern motor yachts to traditional wooden dhows, we provide exclusive access to Zanzibar's finest private vessels."
    },
    {
      image: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=center,quality=60,width=450,height=450,dpr=2/tour_img/b7692e2c172b4885e768ed2c7fd0f3e57777009f37560902411717afec2192b3.jpeg",
      title: "Private Transfers",
      description: "Professional drivers and comfortable vehicles for airport transfers, island explorations, and executive travel."
    },
    {
      image: "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Villa Rentals",
      description: "Access to private estates and premium villas that aren't listed on public booking platforms."
    },
    {
      image: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Custom Itineraries",
      description: "Bespoke travel planning tailored to your specific interests and pace."
    },
    {
      image: "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Event Planning",
      description: "Exclusive weddings, anniversaries, and corporate retreats set against the stunning backdrop of the Indian Ocean."
    },
    {
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Private Chefs",
      description: "World-class culinary experiences delivered in the privacy of your villa or on a remote sandbank."
    },
    {
      image: "https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Spice Tours",
      description: "Explore Zanzibar's famous spice farms and discover cloves, nutmeg, cinnamon and more."
    },
    {
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Beach Experiences",
      description: "Private beach setups, sandbank picnics, and exclusive coastal experiences."
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allServices.map((service, index) => (
              <div key={index} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-serif mb-3 text-primary tracking-tight">{service.title}</h3>
                  <p className="text-gray-500 text-[12px] leading-relaxed font-light">{service.description}</p>
                </div>
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
