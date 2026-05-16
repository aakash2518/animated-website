"use client";

import { Nav } from "@/components/Nav";
import { Teams } from "@/components/Teams";
import { Footer } from "@/components/Footer";
import { CTA } from "@/components/CTA";


export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      
      {/* Main Teams Component */}
      <Teams />

      {/* Join Section */}
      <CTA 
        title={<>WANT TO JOIN <br /> <span className="italic text-black/80">OUR TEAM?</span></>}
        subtitle="We are always looking for visionary talent to join our collective."
        linkText="Apply Now →"
      />

      <Footer />
    </main>
  );
}
