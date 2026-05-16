import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";

// Dynamic imports for components below the fold
const ServicesHorizontal = dynamic(() => import("@/components/ServicesHorizontal").then(mod => mod.ServicesHorizontal), {
  loading: () => <div className="h-screen bg-black" />,
});
const PortfolioStack = dynamic(() => import("@/components/PortfolioStack").then(mod => mod.PortfolioStack), {
  loading: () => <div className="h-screen bg-black" />,
});
const About = dynamic(() => import("@/components/About").then(mod => mod.About), {
  loading: () => <div className="h-screen bg-black" />,
});
const WhatWeOffer = dynamic(() => import("@/components/WhatWeOffer").then(mod => mod.WhatWeOffer), {
  loading: () => <div className="h-screen bg-black" />,
});
const FAQ = dynamic(() => import("@/components/FAQ").then(mod => mod.FAQ), {
  loading: () => <div className="h-[50vh] bg-black" />,
});
const ReviewsFloating = dynamic(() => import("@/components/ReviewsFloating").then(mod => mod.ReviewsFloating), {
  loading: () => <div className="h-[80vh] bg-black" />,
});
const CTA = dynamic(() => import("@/components/CTA").then(mod => mod.CTA));
const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer));

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Stats />
      <ServicesHorizontal />
      <PortfolioStack />
      <About />
      <WhatWeOffer />
      <FAQ />
      <ReviewsFloating />
      <CTA />
      <Footer />
    </main>
  );
}
