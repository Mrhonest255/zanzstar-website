"use client";
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";
import { useSettings } from "@/lib/settings-context";

export default function ContactPage() {
  const { settings } = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'contact' })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white">\n      <Navbar />
      
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
                      <a href={`tel:${settings.contact_phone.replace(/\s/g, '')}`} className="text-gray-800 font-medium hover:text-primary">{settings.contact_phone}</a>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Email Us</span>
                      <a href={`mailto:${settings.contact_email}`} className="text-gray-800 font-medium hover:text-primary">{settings.contact_email}</a>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Visit Us</span>
                      <span className="text-gray-800 font-medium">{settings.address}</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
             <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900 mb-4">Message Sent!</h3>
                    <p className="text-gray-600 mb-8">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                    <button onClick={() => setIsSuccess(false)} className="btn-primary">Send Another Message</button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                   {error && (
                     <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">{error}</div>
                   )}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Your Name *</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-gray-700" 
                          placeholder="John Doe" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-gray-700" 
                          placeholder="john@example.com" 
                        />
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Phone Number</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-gray-700" 
                          placeholder="+1 234 567 890" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Subject</label>
                        <input 
                          type="text" 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-gray-700" 
                          placeholder="Tour Inquiry" 
                        />
                      </div>
                   </div>
                   <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-400 mb-3">Your Message *</label>
                      <textarea 
                        rows={4} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-primary transition-colors text-gray-700 resize-none" 
                        placeholder="Tell us about your dream trip..."
                      ></textarea>
                   </div>
                   <button 
                     type="submit"
                     disabled={isSubmitting}
                     className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     {isSubmitting ? (
                       <>
                         <Loader2 className="w-4 h-4 animate-spin" />
                         Sending...
                       </>
                     ) : (
                       <>
                         Send Inquiry <Send size={16} />
                       </>
                     )}
                   </button>
                </form>
                )}
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
