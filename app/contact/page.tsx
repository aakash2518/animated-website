"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/data/site";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import floatingAsset from "@/assets/7.webp";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const services = [
    "Website Development",
    "Mobile Apps",
    "Digital Marketing",
    "Social Media",
    "SEO",
    "Google Ads"
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const whatsappMessage = `Hello RoyalFinity,%0A%0AMy name is ${encodeURIComponent(name)}.%0AEmail: ${encodeURIComponent(email)}.%0AInterested In: ${encodeURIComponent(selectedService || "General Inquiry")}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
    
    window.open(`https://wa.me/919211816999?text=${whatsappMessage}`, "_blank");
    setSent(true);
  };

  return (
    <main className="relative min-h-screen bg-[#050505] overflow-hidden pt-32 md:pt-48">
      {/* Metadata handled by Next.js in layout or page if not use client, but since this is use client, we should use Metadata API in a separate layout or handle it here if possible. Actually, we'll put metadata in a layout.tsx for contact or just accept it might not be indexed perfectly if we don't. But best practice is to have a layout.tsx for metadata if page is use client. */}
      
      {/* Background Large Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-0">
        <h1 className="font-display text-[15vw] md:text-[20vw] leading-none text-white/[0.03] uppercase tracking-widest select-none">
          CONTACT
        </h1>
      </div>

      {/* Tech SVG Elements (Subtle lines) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" className="absolute top-0 left-0">
          <path d="M0,100 L200,100 L250,50 L500,50" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M100%,200 Lcalc(100% - 200px),200 Lcalc(100% - 250px),250 Lcalc(100% - 500px),250" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 px-6 md:px-10 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-32">
        
        {/* Left Side: Get in Touch & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">Contact</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-white mb-6 leading-tight">
              Get in <span className="italic text-[#D4AF37]">touch</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md font-sans">
              Have questions or ready to transform your business with our expertise? Our team is ready to help you scale.
            </p>
          </div>

          <div className="space-y-4">
            <ContactCard 
              icon={<Mail size={20} />} 
              label="Email us" 
              value={contact.email} 
              href={`mailto:${contact.email}`} 
            />
            <ContactCard 
              icon={<Phone size={20} />} 
              label="Call us" 
              value={contact.phone} 
              href={`tel:${contact.phone}`} 
            />
            <ContactCard 
              icon={<MapPin size={20} />} 
              label="Our location" 
              value={contact.address} 
            />
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Floating Asset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute -top-24 -right-12 md:-top-32 md:-right-20 w-48 md:w-64 z-20 pointer-events-none floating"
          >
            <Image 
              src={floatingAsset} 
              alt="" 
              className="w-full h-auto"
            />
          </motion.div>

          <form 
            onSubmit={handleSubmit}
            className="p-8 md:p-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] space-y-8 shadow-2xl relative z-10"
          >
            <div className="space-y-6">
              <Field label="Name" name="name" placeholder="Enter your name" required />
              <Field label="Email" name="email" type="email" placeholder="Enter your email" required />
              
              {/* Service Selection Slider */}
              <div className="space-y-4">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 ml-1">
                  What service are you interested in?
                </label>
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`shrink-0 px-6 py-3 rounded-full border font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                        selectedService === service
                          ? "bg-[#D4AF37] border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                          : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 ml-1">Message</label>
                <textarea 
                  name="message"
                  rows={4} 
                  required
                  placeholder="How can we help you?"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.08] transition-all resize-none font-sans"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={sent}
              className="w-full h-16 bg-white text-black font-display text-lg uppercase tracking-widest rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3 group"
            >
              {sent ? "Message Sent" : "Submit"}
              {!sent && <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>

            {sent && (
              <p className="text-center text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest mt-4">
                We&apos;ll get back to you shortly.
              </p>
            )}
          </form>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const Content = () => (
    <div className="flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-[24px] group hover:bg-white/[0.08] hover:border-white/10 transition-all duration-500">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-1">{label}</p>
        <p className="text-white/80 text-sm md:text-base font-sans tracking-tight">{value}</p>
      </div>
      <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/30 transition-all">
        <ArrowUpRight size={16} />
      </div>
    </div>
  );

  return href ? <a href={href} className="block">{<Content />}</a> : <Content />;
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 ml-1">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-5 text-white/80 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/[0.08] transition-all font-sans"
      />
    </div>
  );
}
