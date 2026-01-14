import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-white">
      <Navbar />
      
      <section className="pt-40 pb-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-primary-light mb-6">Inquire</p>
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Let&apos;s Design Your <br/> Perfect Stay</h1>
          <div className="w-20 h-1 bg-primary-light mx-auto"></div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h2 className="text-2xl font-serif mb-8 text-gray-900">Contact Details</h2>
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Call Us</span>
                      <span className="text-gray-800 font-medium">+255 776 654 215</span>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Email Us</span>
                      <span className="text-gray-800 font-medium">info@zanzstar.com</span>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Visit Us</span>
                      <span className="text-gray-800 font-medium">Stone Town, Zanzibar</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
             <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Your Name</label>
                        <input type="text" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors italic text-gray-700" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Email Address</label>
                        <input type="email" className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors italic text-gray-700" placeholder="john@example.com" />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Your Message</label>
                      <textarea rows={4} className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors italic text-gray-700 resize-none" placeholder="Tell us about your dream trip..."></textarea>
                   </div>
                   <button className="btn-primary w-full flex items-center justify-center gap-2">
                     Send Inquiry <Send size={16} />
                   </button>
                </form>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
