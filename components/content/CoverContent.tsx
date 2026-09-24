'use client';

import React from 'react';
import { BOOK_DATA } from '@/lib/data';
import { useBookStore } from '@/lib/store';
import { BookOpen, Sparkles } from 'lucide-react';

export default function CoverContent() {
  const { openBook, setSimpleMode } = useBookStore();

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-7 sm:p-10 text-center select-none">
      {/* En-tête de couverture avec ornement discret */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-gold)] text-[10px] font-sans-ui tracking-widest uppercase text-[var(--gold)] font-semibold">
          <Sparkles size={11} /> {BOOK_DATA.cover.edition} · {BOOK_DATA.cover.year}
        </div>
        <p className="font-editorial text-xs tracking-widest uppercase text-[var(--ink-soft)] mt-2">
          {BOOK_DATA.cover.author}
        </p>
      </div>

      {/* Titre principal & Gaufrage */}
      <div className="space-y-4 my-auto">
        <div className="w-12 h-12 mx-auto rounded-full border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold)] mb-3">
          <span className="font-editorial text-2xl font-bold">A</span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[var(--ink)] uppercase">
          {BOOK_DATA.cover.title}
        </h1>

        <div className="w-20 h-[1.5px] bg-[var(--gold)] mx-auto opacity-60" />

        <p className="font-editorial italic text-sm sm:text-base text-[var(--ink-soft)] max-w-[280px] mx-auto leading-relaxed">
          {BOOK_DATA.cover.subtitle}
        </p>
      </div>

      {/* Bouton d'action "Ouvrir le livre" */}
      <div className="space-y-3 w-full pt-4">
        <button
          onClick={openBook}
          className="w-full max-w-[240px] mx-auto py-3 px-5 rounded bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--paper)] font-sans-ui text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          aria-label="Ouvrir le livre du portfolio"
        >
          <BookOpen size={16} className="transition-transform group-hover:scale-110" />
          <span>{BOOK_DATA.cover.cta}</span>
        </button>

        <div>
          <button
            onClick={() => setSimpleMode(true)}
            className="text-[11px] font-sans-ui text-[var(--ink-soft)] hover:text-[var(--gold)] underline cursor-pointer"
            aria-label="Passer en mode lecture simple sans 3D"
          >
            Mode lecture simple (sans 3D)
          </button>
        </div>
      </div>
    </div>
  );
}
