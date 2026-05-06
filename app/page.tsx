'use client';

import { useImmersiveNav } from '@/hooks/useImmersiveNav';
import Scene from '@/components/scene/Scene';
import Nav from "@/components/layout/Nav";
import SectionIndicator from "@/components/ui/SectionIndicator";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import HUD from '@/components/ui/HUD';

export default function Home() {
  // Initialize immersive navigation (wheel, touch, keyboard interception)
  useImmersiveNav();

  return (
    <main className="fixed inset-0 overflow-hidden bg-[var(--bg)]">
      {/* 3D Background Scene */}
      <Scene />

      {/* Global UI Overlays */}
      <HUD />
      <Loader />
      <Cursor />
      <Nav />
      <SectionIndicator />
      
      {/* Immersive Sections */}
      <div className="relative w-full h-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
      
      {/* Footer (Floating or fixed if needed, here we'll let it be part of contact or fixed) */}
      <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
        <Footer />
      </div>
    </main>
  );
}
