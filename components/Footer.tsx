import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-serif tracking-widest mb-6">ZANZSTAR</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Zanzibar&apos;s trusted tours & concierge team. We redefine island experiences through personalized service and exclusive access.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
           <h4 className="text-sm uppercase tracking-[0.2em] font-bold mb-8">Quick Links</h4>
           <ul className="space-y-4 text-gray-400 text-sm">
             <li><Link href="/tours" className="hover:text-primary-light transition-colors">Zanzibar Tours</Link></li>
             <li><Link href="/services" className="hover:text-primary-light transition-colors">Concierge Services</Link></li>
             <li><Link href="/about" className="hover:text-primary-light transition-colors">Our Story</Link></li>
             <li><Link href="/contact" className="hover:text-primary-light transition-colors">Get in Touch</Link></li>
           </ul>
        </div>

        <div>
           <h4 className="text-sm uppercase tracking-[0.2em] font-bold mb-8">Contact Us</h4>
           <ul className="space-y-6 text-gray-400 text-sm">
             <li className="flex gap-4">
               <Phone size={18} className="text-primary-light flex-shrink-0" />
               <a href="tel:+255656443740" className="hover:text-primary-light transition-colors">+255 656 443 740</a>
             </li>
             <li className="flex gap-4">
               <Mail size={18} className="text-primary-light flex-shrink-0" />
               <span>info@zanzstar.com</span>
             </li>
             <li className="flex gap-4">
               <MapPin size={18} className="text-primary-light flex-shrink-0" />
               <span>Stone Town, Zanzibar</span>
             </li>
           </ul>
        </div>

        <div>
           <h4 className="text-sm uppercase tracking-[0.2em] font-bold mb-8">Newsletter</h4>
           <p className="text-gray-400 text-sm mb-6 font-light">Join our club for exclusive Zanzibar travel guides and offers.</p>
           <form className="flex gap-2">
             <input 
               type="email" 
               placeholder="Your Email" 
               className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg focus:outline-none focus:border-primary-light flex-grow text-sm"
             />
             <button className="bg-primary px-4 py-2 rounded-lg text-sm font-bold uppercase transition-colors hover:bg-primary-light">Join</button>
           </form>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-xs text-gray-500 uppercase tracking-widest font-medium">
        <span>© 2026 Zanzstar Tours & Concierge</span>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
