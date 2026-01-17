import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-mint">
        <div className="container mx-auto px-6 text-center">
          <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-primary mb-6">Our Legacy</p>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-8">Crafting Dreams in Zanzibar</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1544644181-14e3532c6680?q=80&w=1200" 
              className="rounded-2xl shadow-2xl"
              alt="Zanzibar Coast"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-gray-900 mb-8">Beyond Standard Tourism</h2>
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                Zanzstar was founded on a simple principle: Zanzibar deserves to be experienced in its most authentic and memorable form. We don&apos;t just sell tours; we curate moments that last a lifetime.
              </p>
              <p>
                From the bustling markets of Stone Town to the pristine sands of Mnemba Atoll, our team of local experts ensures that every step of your journey is seamless, exclusive, and tailored to your desires.
              </p>
              <p>
                Whether you&apos;re seeking a private yacht charter, a bespoke cultural immersion, or a villa stay, Zanzstar is your trusted partner on the island.
              </p>
            </div>
            <div className="mt-12 flex gap-8 border-t border-gray-100 pt-12">
               <div>
                 <span className="block text-3xl font-serif text-primary mb-1">10+</span>
                 <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Years Experience</span>
               </div>
               <div>
                 <span className="block text-3xl font-serif text-primary mb-1">500+</span>
                 <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Curated Experiences</span>
               </div>
               <div>
                 <span className="block text-3xl font-serif text-primary mb-1">100%</span>
                 <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Local Experts</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
