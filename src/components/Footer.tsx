"use client";

import Link from "next/link";
import { contact } from "@/data/site";
import Image from "next/image";
const logo = "/assets/logo.png";
import footerImg from "../assets/footer.webp";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/teams", label: "Teams" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-black pt-32 pb-16 overflow-hidden border-t border-white/5">

      <div className="responsive-container relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-16 gap-x-12">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-6 w-fit">
              <div className="flex items-center gap-3">
                <Image 
                  src={logo} 
                  alt="RoyalFinity" 
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
                <span 
                  className="font-display tracking-tight text-[var(--gold)]"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
                >
                  RoyalFinity
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-loose max-w-xs mt-2">
              We create brands that communicate and connect with people to inspire them. We specialize in various creative and sustainable branding solutions such as Digital Marketing, Corporate Identity Design, Website Designing, and many more.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-display text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-10">Services</h4>
            <ul className="space-y-5">
              <li key="web"><Link href="/services/website-development" className="text-white/40 hover:text-white text-sm transition-colors">Website Development</Link></li>
              <li key="app"><Link href="/services/mobile-apps" className="text-white/40 hover:text-white text-sm transition-colors">Mobile App Development</Link></li>
              <li key="design"><Link href="/services/ui-ux-design" className="text-white/40 hover:text-white text-sm transition-colors">UI/UX Design</Link></li>
              <li key="marketing"><Link href="/services/digital-marketing" className="text-white/40 hover:text-white text-sm transition-colors">Digital Marketing</Link></li>
              <li key="seo"><Link href="/services/seo" className="text-white/40 hover:text-white text-sm transition-colors">SEO Optimization</Link></li>
              <li key="ads"><Link href="/services/google-ads" className="text-white/40 hover:text-white text-sm transition-colors">Google Ads (PPC)</Link></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-display text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-10">Quick Links</h4>
            <ul className="space-y-5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link 
                    href={l.to} 
                    className="text-white/40 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display text-base uppercase tracking-[0.2em] text-[#D4AF37] mb-10">Get in Touch</h4>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-white/40 text-sm leading-relaxed">
                  {contact.address}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={16} className="text-[#D4AF37] shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-white/40 hover:text-white text-sm">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={16} className="text-[#D4AF37] shrink-0" />
                <a href={`tel:${contact.phone}`} className="text-white/40 hover:text-white text-sm">
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Social/Trust Illustration */}
          <div className="relative h-64 lg:h-80 -mt-10 lg:-mt-20">
            <div className="relative h-full overflow-hidden group flex justify-center lg:justify-end">
              <Image 
                src={footerImg} 
                alt="Working" 
                className="object-contain transition-transform duration-700 group-hover:scale-105 mx-auto lg:mx-0"
                style={{ width: "clamp(150px, 30vw, 350px)", height: "auto" }}
              />
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-28 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
            © 2026 RoyalFinity Technologies. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-mono uppercase tracking-[0.2em] text-white/40">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
