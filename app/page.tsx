import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import Footer from "@/components/Footer";
import { Ship, Car, Home as HomeIcon, LayoutList } from "lucide-react";
import { tours } from "@/lib/tours";

export default function Home() {
  const featuredTours = tours.slice(0, 3); // Get first 3 tours

  const services = [
    {
      icon: <Ship size={32} />,
      title: "Yacht Charters",
      description: "Exclusive access to the finest vessels in Zanzibar for private cruises."
    },
    {
      icon: <Car size={32} />,
      title: "Luxury Transfers",
      description: "Arrive in style with our premium fleet and professional chauffeurs."
    },
    {
      icon: <HomeIcon size={32} />,
      title: "Villa Rentals",
      description: "Curated selection of the most private and luxurious stays on the coast."
    },
    {
      icon: <LayoutList size={32} />,
      title: "Custom Itineraries",
      description: "Bespoke planning for your entire stay, down to the smallest detail."
    }
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Intro Section - Matching RIYA exactly */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-16 tracking-tight">
            ZANZSTAR... <br/><span className="italic opacity-80 decoration-1 font-light">and so much more</span>
          </h2>
          <div className="space-y-8 text-[#777] font-light leading-relaxed text-[17px] max-w-4xl mx-auto italic">
            <p>
              Our concierge specialists ensure our clients a reliable method for all logistical services in Zanzibar, leaving you free to enjoy the very best of the Island. Zanzstar is a one stop shop for all Zanz related enquiries, connecting our clients to the most comprehensive service directory for all types of requests in Zanzibar. 
            </p>
            <p className="not-italic text-gray-400 text-sm tracking-wide">
              Whether you are looking for the full VIP Luxury Zanzibar experience, access to the most popular island spots or secure the best value bookings, Zanzstar are here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Why Section - Mint Background Matching RIYA */}
      <section className="py-40 bg-mint">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-20 tracking-tight">
            Why Zanzstar?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#2d5a52]">Unrivaled Local Access</h3>
              <p className="text-[#666] text-[13px] leading-relaxed font-light italic">
                Our deep-rooted connections across Zanzibar allow us to secure the most exclusive experiences that others simply cannot reach.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#2d5a52]">Premium Standards</h3>
              <p className="text-[#666] text-[13px] leading-relaxed font-light italic">
                Every yacht, villa, and vehicle in our portfolio is meticulously vetted to ensure it meets our rigorous luxury benchmarks.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-[#2d5a52]">24/7 Concierge Support</h3>
              <p className="text-[#666] text-[13px] leading-relaxed font-light italic">
                From the moment you arrive until your departure, our team is on hand to handle every request, no matter how small.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Matching RIYA */}
      <section id="services" className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-10 tracking-tight">
            Our Zanzibar Concierge Services
          </h2>
          <p className="text-[#888] font-light italic text-[15px] mb-24 max-w-3xl mx-auto leading-relaxed">
            Zanzstar specialists have the knowledge and resources to make your request a reality with constant transparency and support. We make sure expectations are exceeded with every request, no matter the size.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {services.map((service, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center text-primary mx-auto mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-lg font-serif mb-3 text-gray-800 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 text-[11px] leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section id="tours" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-4">Discovery</p>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">Luxury Experiences</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto opacity-30 mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featuredTours.map((tour, index) => (
              <TourCard key={index} {...tour} link={`/${tour.slug}`} />
            ))}
          </div>
          
          <div className="text-center mt-20">
            <a href="/tours" className="inline-block border-b-2 border-primary pb-2 text-[10px] uppercase tracking-[0.3em] font-bold text-primary hover:tracking-[0.4em] transition-all">Explore All Zanzibar Tours</a>
          </div>
        </div>
      </section>

      {/* Safari Explorer Section */}
      <section className="py-32 bg-[#232d2b] text-white">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary-light mb-6">Mainland Adventures</p>
                 <h2 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Beyond the Coast:<br/> African Safaris</h2>
                 <p className="text-white/60 font-light italic text-lg leading-relaxed mb-12">
                   Complement your island stay with an authentic bush experience. We arrange private fly-in safaris to Tanzania&apos;s world-renowned national parks.
                 </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                    <div className="border-l border-white/10 pl-6">
                        <h4 className="font-serif text-xl mb-2 text-primary-light">Selous (Nyerere)</h4>
                        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Unspoiled Wilderness</p>
                    </div>
                    <div className="border-l border-white/10 pl-6">
                        <h4 className="font-serif text-xl mb-2 text-primary-light">Serengeti</h4>
                        <p className="text-xs text-white/40 uppercase tracking-widest font-bold">The Great Migration</p>
                    </div>
                 </div>
                 <a href="/arrangements" className="btn-primary inline-block">View Safari Packages</a>
              </div>
              <div className="relative h-[600px] rounded-[3rem] overflow-hidden group">
                 <img src="https://images.unsplash.com/photo-1516428940258-29737c5ae124?q=80&w=1200" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Safari Jeep" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#232d2b] via-transparent to-transparent" />
              </div>
           </div>
        </div>
      </section>

      {/* Luxury CTA */}
      <section className="py-32 relative overflow-hidden bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img 
             src="https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=2670" 
             className="w-full h-full object-cover"
             alt="background"
           />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">Ready for your bespoke <br/> Zanzibar experience?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/255776654215" className="bg-white text-primary px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-secondary hover:text-primary transition-all shadow-xl">
              Inquire via WhatsApp
            </a>
            <a href="/contact" className="border border-white/30 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
