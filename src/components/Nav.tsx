"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SubmenuItem = { label: string; slug: string };

type NavLink =
  | { to: string; label: string; hasSubmenu?: false; submenu?: never }
  | { to: string; label: string; hasSubmenu: true; submenu: SubmenuItem[] };

const submenuItems: SubmenuItem[] = [
  { label: "Website Development",      slug: "website-development"   },
  { label: "Mobile Apps",              slug: "mobile-apps"           },
  { label: "UI/UX Design",             slug: "ui-ux-design"          },
  { label: "Digital Marketing",        slug: "digital-marketing"     },
  { label: "Software & ERP Solution",  slug: "software-erp-solution" },
  { label: "Business Automation",      slug: "business-automation"   },
];

const links: NavLink[] = [
  { to: "/",         label: "Home"      },
  { to: "/about",    label: "About"     },
  { to: "/services", label: "Services", hasSubmenu: true, submenu: submenuItems },
  { to: "/portfolio",label: "Portfolio" },
  { to: "/teams",    label: "Teams"     },
  { to: "/contact",  label: "Contact"   },
];

export function Nav() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const goToService = (slug: string) => {
    setShowSubmenu(false);
    setIsOpen(false);
    router.push(`/services/${slug}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "bg-[#0A0A0A] py-2 border-b border-white/5 shadow-2xl" : "bg-transparent py-6"
      } ${isOpen ? "bg-black" : ""}`}
    >
      <div className="flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <Image
            src={logo}
            alt="RoyalFinity"
            width={64}
            height={64}
            className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <span className="font-display text-xl tracking-tight text-[var(--gold)]">
            RoyalFinity Technologies
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="nav-desktop items-center gap-8 text-xs uppercase tracking-[0.2em] text-[var(--bone)] font-mono">
          {links.map((l) => (
            <div
              key={l.label}
              className="relative group"
              onMouseEnter={() => l.hasSubmenu && setShowSubmenu(true)}
              onMouseLeave={() => l.hasSubmenu && setShowSubmenu(false)}
            >
              <Link
                href={l.to}
                className={`hover:text-[var(--ember)] transition-colors flex items-center gap-1 py-4 ${pathname === l.to ? "text-[var(--ember)]" : ""}`}
              >
                {l.label}
                {l.hasSubmenu && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${showSubmenu ? "rotate-180" : ""}`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {l.hasSubmenu && (
                <AnimatePresence>
                  {showSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 w-64 bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[110]"
                    >
                      <div className="flex flex-col py-2">
                        {l.submenu.map((item) => (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => goToService(item.slug)}
                            className="w-full text-left px-6 py-4 text-[10px] tracking-[0.1em] text-white/70 hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-0 cursor-pointer"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Phone (Desktop) */}
        <a
          href="tel:+919211816999"
          className="nav-desktop text-xs uppercase tracking-[0.2em] text-[var(--bone)] font-mono"
        >
          (+91 92118 16999)
        </a>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle z-[60] p-2 text-[var(--bone)] hover:text-[var(--gold)] transition-colors relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col md:hidden"
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-8 overflow-y-auto pt-32 pb-20 px-10">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="w-full text-center group"
                >
                  <Link
                    href={l.to}
                    onClick={() => !l.hasSubmenu && setIsOpen(false)}
                    className={`block font-display text-4xl uppercase tracking-tighter transition-all duration-500 hover:text-[var(--gold)] ${pathname === l.to ? "text-[var(--gold)]" : "text-white"}`}
                  >
                    {l.label}
                  </Link>

                  {l.hasSubmenu && (
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6 max-w-xs mx-auto">
                      {l.submenu.map((item) => (
                        <button
                          key={item.slug}
                          type="button"
                          onClick={() => goToService(item.slug)}
                          className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-10 border-t border-white/5 flex flex-col items-center gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40"
            >
              <div className="flex gap-10">
                <a href="tel:+919211816999" className="hover:text-[var(--gold)] transition-colors">
                  (+91 92118 16999)
                </a>
                <span>Faridabad / India</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
