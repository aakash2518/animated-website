import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { PortfolioStack } from "@/components/PortfolioStack";
import { About } from "@/components/About";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { ServicesHorizontal } from "@/components/ServicesHorizontal";
import { FAQ } from "@/components/FAQ";
import { ReviewsFloating } from "@/components/ReviewsFloating";
import { Footer } from "@/components/Footer";

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
      <Footer />
    </main>
  );
}
