'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Cursor from '@/components/ui/Cursor';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6 relative overflow-hidden">
      <Cursor />
      
      {/* Background Glows */}
      <div className="absolute top-[20%] left-[25%] w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(59,130,246,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[15%] w-[350px] h-[350px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-center z-10">
        <h1 className="font-display text-8xl md:text-[12rem] font-extrabold text-[var(--white)] leading-none mb-4 uppercase">
          404
        </h1>
        <div className="w-12 h-[1px] bg-[var(--cyan)] mx-auto mb-8 opacity-60" />
        <h2 className="text-[var(--gray2)] text-base md:text-xl tracking-[0.2em] uppercase mb-12">
          Page Introuvable
        </h2>
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--blue)] hover:bg-[#2563EB] text-[var(--white)] text-[0.68rem] tracking-[0.1em] uppercase px-8 py-4 transition-all cursor-none"
        >
          <ArrowLeft size={14} /> Retour à l'accueil
        </Link>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.55rem] tracking-[0.2em] uppercase text-[var(--gray)]">
        Lost in the void
      </div>
    </div>
  );
}
