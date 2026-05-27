"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
const logo = "/assets/logo.png";
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
  { to: "/blog",     label: "Blog"      },
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
    window.addEventListener("scroll", handleScroll, { passive: true });
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
    <>
    <header
      className={`nav-header fixed top-0 left-0 right-0 z-999 transition-all duration-500 ${
        isScrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md py-3 border-b border-white/5 shadow-2xl" : "bg-transparent py-5"
      } ${isOpen ? "bg-[#0A0A0A]! py-4!" : ""}`}
    >
      <div className="relative flex items-center justify-between w-full px-6 md:px-10">
        {/* Logo — left aligned */}
        <Link href="/" className="flex items-center gap-3 group relative z-50 shrink-0" onClick={() => setIsOpen(false)}>
          <Image
            src={logo}
            alt="RoyalFinity"
            width={64}
            height={64}
            className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <span className={`nav-logo-text font-display tracking-tight text-(--gold) ${isOpen ? "hidden" : "hidden sm:block"}`}>
            RoyalFinity Technologies
          </span>
        </Link>

        <nav 
          className={`nav-links nav-desktop hidden lg:flex items-center gap-6 xl:gap-8 uppercase tracking-[0.2em] text-(--bone) font-mono absolute left-1/2 -translate-x-1/2`}
        >
          {links.map((l) => (
            <div
              key={l.label}
              className="relative group"
              onMouseEnter={() => l.hasSubmenu && setShowSubmenu(true)}
              onMouseLeave={() => l.hasSubmenu && setShowSubmenu(false)}
            >
              <Link
                href={l.to}
                className={`hover:text-(--ember) transition-colors flex items-center gap-1 py-4 ${pathname === l.to ? "text-(--ember)" : ""}`}
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
                      className="absolute top-full left-0 w-64 bg-[#0B0B0B] border border-[#D4AF37]/30 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-110"
                    >
                      <div className="flex flex-col py-2">
                        {l.submenu.map((item) => (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => goToService(item.slug)}
                            className="w-full text-left px-6 py-4 text-[10px] tracking-widest text-white/70 hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-0 cursor-pointer"
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
          className="nav-links nav-desktop hidden md:block uppercase tracking-[0.2em] text-(--bone) font-mono"
        >
          (+91 92118 16999)
        </a>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle z-60 p-2 text-(--bone) hover:text-(--gold) transition-colors relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          title="Toggle menu"
          type="button"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

    </header>

    {/* ── Mobile Menu (Outside header for full viewport control) ── */}
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-1000 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-[#0A0A0A] z-1001 flex flex-col lg:hidden border-l border-white/10"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <Image
                src={logo}
                alt="RoyalFinity"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/70 hover:text-(--gold) transition-colors"
                aria-label="Close menu"
                title="Close menu"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col flex-1 overflow-y-auto">
              {links.map((l) => (
                <div key={l.label} className="border-b border-white/5">
                  <div className="flex items-center justify-between">
                    <Link
                      href={l.to}
                      onClick={() => !l.hasSubmenu && setIsOpen(false)}
                      className={`flex-1 py-6 px-8 text-lg font-sans tracking-wide transition-colors ${pathname === l.to ? "text-(--gold)" : "text-white/80 hover:text-white"}`}
                    >
                      {l.label}
                    </Link>
                    {l.hasSubmenu && (
                      <button 
                        onClick={() => setShowSubmenu(!showSubmenu)}
                        className="px-8 py-6 text-white/40"
                      >
                        <span className="text-2xl leading-none">{showSubmenu ? "−" : "+"}</span>
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu */}
                  {l.hasSubmenu && (
                    <AnimatePresence>
                      {showSubmenu && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-white/2 overflow-hidden"
                        >
                          <div className="flex flex-col py-2 px-8 gap-4 pb-6">
                            {l.submenu.map((item) => (
                              <button
                                key={item.slug}
                                onClick={() => goToService(item.slug)}
                                className="text-left text-sm text-white/40 hover:text-(--gold) transition-colors py-1"
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

            {/* Bottom Info */}
            <div className="p-8 border-t border-white/5 bg-black/20">
              <a href="tel:+919211816999" className="text-(--gold) font-mono text-xs tracking-widest">
                (+91 92118 16999)
              </a>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mt-2">
                Faridabad / India
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
