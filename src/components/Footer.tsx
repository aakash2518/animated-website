"use client";

import Link from "next/link";
import { contact, services } from "@/data/site";
import logo from "../assets/logo.png";
import footerImg from "@/assets/footer.webp";
import { Mail, Phone, MapPin, Star } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/teams", label: "Teams" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-black pt-40 pb-12 overflow-hidden border-t border-white/5">
      {/* Wavy Top Shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[100px] md:h-[150px] fill-[#0B0B0B]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="px-6 md:px-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src={typeof logo === 'string' ? logo : logo.src} alt="RoyalFinity" className="w-8 h-8 object-contain" />
              <span className="font-display text-xl tracking-tight text-[#D4AF37]">
                RoyalFinity
              </span>
            </Link>
            <p className="text-white/50 text-xs leading-relaxed max-w-xs">
              We create brands that communicate and connect with people to inspire them. We specialize in various creative and sustainable branding solutions such as Digital Marketing, Corporate Identity Design, Website Designing, and many more.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Services</h4>
            <ul className="space-y-4">
              <li key="web"><Link href="/services/website-development" className="text-white/40 hover:text-white text-[11px] transition-colors">Website Development</Link></li>
              <li key="app"><Link href="/services/mobile-apps" className="text-white/40 hover:text-white text-[11px] transition-colors">Mobile App Development</Link></li>
              <li key="design"><Link href="/services/ui-ux-design" className="text-white/40 hover:text-white text-[11px] transition-colors">UI/UX Design</Link></li>
              <li key="marketing"><Link href="/services/digital-marketing" className="text-white/40 hover:text-white text-[11px] transition-colors">Digital Marketing</Link></li>
              <li key="seo"><Link href="/services/seo" className="text-white/40 hover:text-white text-[11px] transition-colors">SEO Optimization</Link></li>
              <li key="ads"><Link href="/services/google-ads" className="text-white/40 hover:text-white text-[11px] transition-colors">Google Ads (PPC)</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link 
                    href={l.to} 
                    className="text-white/40 hover:text-white text-[11px] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Get in Touch</h4>
            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin size={14} className="text-[#D4AF37] shrink-0" />
                <p className="text-white/40 text-[11px] leading-relaxed">
                  {contact.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#D4AF37] shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-white/40 hover:text-white text-[11px]">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#D4AF37] shrink-0" />
                <a href={`tel:${contact.phone}`} className="text-white/40 hover:text-white text-[11px]">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Social/Trust Illustration */}
          <div className="relative h-40">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 md:w-64 floating pointer-events-none z-10">
              <img src={typeof footerImg === 'string' ? footerImg : footerImg.src} alt="" className="w-full h-auto" />
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            © 2026 RoyalFinity Technologies. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-mono uppercase tracking-[0.25em] text-white/30">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
